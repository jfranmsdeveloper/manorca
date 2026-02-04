<?php
require_once 'common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

// Get API Key from environment or hardcoded (not recommended but necessary if no .env support on shared hosting without config)
// Best practice: Set env var in Hostinger or use a config file outside public_html.
// For now, we'll try to use getenv or a fallback placeholder.
$API_KEY = getenv('GEMINI_API_KEY') ?: 'AIzaSyBoVdCsjg_YC8CY28h0fL4ZP1s7Lofff0M'; // WARNING: Replace with real secure handling if possible

$input = $_POST; // For multipart/form-data (upload), $_POST is populated, not php://input

$textToAnalyze = '';
$source = '';

try {
    // 1. Handle File Upload (PDF)
    // NOTE: Reading PDF text in pure PHP without `vendor` libraries (like smalot/pdfparser) is hard.
    // Hostinger might not have `pdftotext` installed.
    // For this simplified version, we will warn if PDF is uploaded, or rely on frontend to extract text if possible?
    // Frontend cannot extract PDF text easily.
    // We will attempt to use a simple text extraction if possible, otherwise fail gracefully.
    if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] === UPLOAD_ERR_OK) {
        $pdfFile = $_FILES['pdf']['tmp_name'];
        // Attempt to extract text?
        // If we can't extract text server-side easily without Composer, we might be stuck.
        // Option: Just support Text/URL for now.
        $textToAnalyze = "PDF analysis is currently limited on this hosting environment. Please copy and paste the text.";
        $source = "PDF: " . $_FILES['pdf']['name'];
    } 
    // 2. Handle URL
    elseif (isset($input['url'])) {
        $url = $input['url'];
        $source = "URL: $url";
        // Simple fetch
        $html = @file_get_contents($url);
        if ($html === FALSE) {
            throw new Exception("Failed to fetch URL");
        }
        // Strip tags
        $textToAnalyze = strip_tags($html);
        // Basic cleanup
        $textToAnalyze = preg_replace('/\s+/', ' ', $textToAnalyze);
    } 
    // 3. Handle Text
    elseif (isset($input['text'])) {
        $source = "Raw Text";
        $textToAnalyze = $input['text'];
    } else {
        sendResponse(['error' => 'No input provided'], 400);
    }

    // Call Gemini API
    $apiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$API_KEY";

    $prompt = "
    You are an expert Data Analyst. Analyze the following content (from $source) and produce a JSON report.
    Schema:
    {
        \"summary\": \"Executive summary (max 200 words).\",
        \"key_insights\": [\"Insight 1\", \"Insight 2\"],
        \"stats\": [{\"label\": \"Metric\", \"value\": \"10\", \"unit\": \"kg\"}],
        \"charts\": [
            {\"title\": \"Chart\", \"type\": \"bar\", \"data\": [{\"name\": \"A\", \"value\": 10}]}
        ]
    }
    Return RAW JSON only. No markdown.
    Content: " . substr($textToAnalyze, 0, 30000); // Truncate safety

    $payload = [
        "contents" => [
            [
                "parts" => [
                    ["text" => $prompt]
                ]
            ]
        ]
    ];

    $ch = curl_init($apiEndpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        throw new Exception(curl_error($ch));
    }
    
    curl_close($ch);
    
    $jsonResponse = json_decode($response, true);
    
    if (isset($jsonResponse['candidates'][0]['content']['parts'][0]['text'])) {
        $rawText = $jsonResponse['candidates'][0]['content']['parts'][0]['text'];
        // Clean markdown code blocks
        $rawText = preg_replace('/^```json\s*/', '', $rawText);
        $rawText = preg_replace('/\s*```$/', '', $rawText);
        
        $analysis = json_decode($rawText, true);
        sendResponse(['success' => true, 'analysis' => $analysis]);
    } else {
        throw new Exception("Invalid response from Gemini: " . substr($response, 0, 200));
    }

} catch (Exception $e) {
    sendResponse(['error' => $e->getMessage()], 500);
}
?>
