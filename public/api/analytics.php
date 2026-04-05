<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// DEBUG: Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$service_account_path = __DIR__ . '/../../credentials/service-account.json';
$property_id = '523128581'; 

if (!file_exists($service_account_path)) {
    echo json_encode(['error' => 'Service account credentials not found via API.', 'status' => 'mock_mode']);
    exit;
}

function getAccessToken($jsonKeyPath) {
    if (!file_exists($jsonKeyPath)) return null;
    $jsonKey = json_decode(file_get_contents($jsonKeyPath), true);
    if (!isset($jsonKey['client_email']) || !isset($jsonKey['private_key'])) return null;

    $header = ['alg' => 'RS256', 'typ' => 'JWT'];
    $now = time();
    $claim = [
        'iss' => $jsonKey['client_email'],
        'scope' => 'https://www.googleapis.com/auth/analytics.readonly',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => $now + 3600,
        'iat' => $now
    ];

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));
    $base64UrlClaim = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($claim)));
    $privateKey = $jsonKey['private_key'];
    $signature = '';
    openssl_sign($base64UrlHeader . "." . $base64UrlClaim, $signature, $privateKey, 'SHA256');
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    $jwt = $base64UrlHeader . "." . $base64UrlClaim . "." . $base64UrlSignature;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);
    return $data['access_token'] ?? null;
}

function runBatchReport($accessToken, $propertyId) {
    // We use batchRunReports to get everything in one HTTP call
    $url = "https://analyticsdata.googleapis.com/v1beta/properties/" . $propertyId . ":batchRunReports";
    
    $commonDateRange = ['startDate' => '30daysAgo', 'endDate' => 'today'];

    $body = [
        'requests' => [
            // Request 0: MAIN TRENDS (By Date)
            [
                'dateRanges' => [$commonDateRange],
                'metrics' => [
                    ['name' => 'activeUsers'],
                    ['name' => 'screenPageViews'],
                    ['name' => 'averageSessionDuration'],
                    ['name' => 'bounceRate']
                ],
                'dimensions' => [['name' => 'date']],
                'orderBys' => [['dimension' => ['dimensionName' => 'date']]]
            ],
            // Request 1: TRAFFIC SOURCES (By Session Source)
            [
                'dateRanges' => [$commonDateRange],
                'metrics' => [['name' => 'activeUsers']],
                'dimensions' => [['name' => 'sessionSource']],
                'orderBys' => [['metric' => ['metricName' => 'activeUsers'], 'desc' => true]],
                'limit' => 5
            ],
            // Request 2: TOP PAGES
            [
                'dateRanges' => [$commonDateRange],
                'metrics' => [
                    ['name' => 'screenPageViews'],
                    ['name' => 'averageSessionDuration'],
                    ['name' => 'bounceRate']
                ],
                'dimensions' => [['name' => 'pagePath']],
                'orderBys' => [['metric' => ['metricName' => 'screenPageViews'], 'desc' => true]],
                'limit' => 10
            ]
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

function formatDate($yyyymmdd) {
    if (strlen($yyyymmdd) !== 8) return $yyyymmdd;
    return date('d M', strtotime($yyyymmdd));
}

function processBatchData($batchReport) {
    // --- PART 1: OVERVIEW & TRAFFIC LINE CHART ---
    $report0 = $batchReport['reports'][0] ?? [];
    $traffic = [];
    $totalUsers = 0;
    $totalViews = 0;
    $totalDuration = 0;
    $totalBounce = 0;
    $days = 0;

    if (isset($report0['rows'])) {
        foreach ($report0['rows'] as $row) {
            $users = (int)($row['metricValues'][0]['value'] ?? 0);
            $views = (int)($row['metricValues'][1]['value'] ?? 0);
            $duration = (float)($row['metricValues'][2]['value'] ?? 0);
            $bounce = (float)($row['metricValues'][3]['value'] ?? 0);

            $traffic[] = [
                'name' => formatDate($row['dimensionValues'][0]['value']),
                'visits' => $users,
                'pv' => $views
            ];

            $totalUsers += $users;
            $totalViews += $views;
            // Weighted averages are better, but simple average of days is okay for "Avg Duration" trend
            // However, strict GA way is TotalDurationSeconds / TotalSessions. 
            // Here we do a simplified aggregation for the dashboard summary.
            $totalDuration += ($duration * $users); 
            $totalBounce += ($bounce * $users);     
            $days++;
        }
    }

    $avgDuration = $totalUsers > 0 ? $totalDuration / $totalUsers : 0;
    $avgBounce = $totalUsers > 0 ? $totalBounce / $totalUsers : 0;
    $pagesPerUser = $totalUsers > 0 ? $totalViews / $totalUsers : 0;

    $minutes = floor($avgDuration / 60);
    $seconds = $avgDuration % 60;
    $timeStr = $minutes . "m " . sprintf("%02d", $seconds) . "s";

    // --- PART 2: SOURCES ---
    $report1 = $batchReport['reports'][1] ?? [];
    $sources = [];
    $sourceColors = ['#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#FBBF24']; // Blue, Emerald, Purple, Pink, Amber
    
    if (isset($report1['rows'])) {
        foreach ($report1['rows'] as $i => $row) {
            if ($i >= 5) break; 
            $sources[] = [
                'name' => ucfirst($row['dimensionValues'][0]['value']),
                'value' => (int)($row['metricValues'][0]['value'] ?? 0),
                'color' => $sourceColors[$i] ?? '#CBD5E1'
            ];
        }
    }
    // If empty, frontend handles it, or we send empty array

    // --- PART 3: PAGES ---
    $report2 = $batchReport['reports'][2] ?? [];
    $pages = [];
    
    if (isset($report2['rows'])) {
        foreach ($report2['rows'] as $row) {
            $path = $row['dimensionValues'][0]['value'];
            $pViews = (int)$row['metricValues'][0]['value'];
            $pDur = (float)$row['metricValues'][1]['value'];
            $pBounce = (float)$row['metricValues'][2]['value'];
            
            $pMin = floor($pDur / 60);
            $pSec = $pDur % 60;

            $pages[] = [
                'path' => $path,
                'visits' => number_format($pViews),
                'time' => $pMin . "m " . sprintf("%02d", $pSec) . "s",
                'bounce' => number_format($pBounce * 100, 1) . "%"
            ];
        }
    }

    return [
        'metrics' => [
            'users' => number_format($totalUsers),
            'time' => $timeStr,
            'bounce' => number_format($avgBounce * 100, 1) . "%",
            'pagesSession' => number_format($pagesPerUser, 1)
        ],
        'traffic' => $traffic,
        'sources' => $sources,
        'pages' => $pages
    ];
}

// --- execution ---

$token = getAccessToken($service_account_path);

if (!$token) {
    echo json_encode(['error' => 'Failed to get access token', 'path' => $service_account_path]);
    exit;
}

$batchData = runBatchReport($token, $property_id);

if (isset($batchData['error'])) {
    echo json_encode(['error' => 'Google API Error: ' . json_encode($batchData['error'])]);
    exit;
}

echo json_encode(processBatchData($batchData));
?>
