<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Define path to service account credentials
// IMPORTANT: This file should ideally be OUTSIDE public_html for security
$service_account_path = __DIR__ . '/../../credentials/service-account.json';
$property_id = 'YOUR_GA4_PROPERTY_ID'; // Replace with actual Property ID

if (!file_exists($service_account_path)) {
    echo json_encode([
        'error' => 'Service account credentials not found.',
        'path' => $service_account_path,
        'status' => 'mock_mode'
    ]);
    exit;
}

// Minimal function to get access token using service account JSON
// This avoids needing heavy Composer dependencies like google/apiclient for simple reads
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

    $signatureInput = $base64UrlHeader . "." . $base64UrlClaim;
    $privateKey = $jsonKey['private_key'];
    
    $signature = '';
    openssl_sign($signatureInput, $signature, $privateKey, 'SHA256');
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    $jwt = $signatureInput . "." . $base64UrlSignature;

    // Exchange JWT for Access Token
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

function runReport($accessToken, $propertyId) {
    $url = "https://analyticsdata.googleapis.com/v1beta/properties/" . $propertyId . ":runReport";
    
    // Last 30 days
    $body = [
        'dateRanges' => [['startDate' => '30daysAgo', 'endDate' => 'today']],
        'metrics' => [
            ['name' => 'activeUsers'],
            ['name' => 'screenPageViews'],
            ['name' => 'averageSessionDuration'],
            ['name' => 'bounceRate']
        ],
        'dimensions' => [
            ['name' => 'date'] // We can add more dimensions if needed
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RequestBody, json_encode($body)); // PHP 8.1+ might differ, usually CURLOPT_POSTFIELDS
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

// --- Main Execution ---

$token = getAccessToken($service_account_path);

if (!$token) {
    echo json_encode(['error' => 'Failed to get access token']);
    exit;
}

$report = runReport($token, $property_id);

echo json_encode($report);
?>
