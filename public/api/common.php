<?php
// Prevent direct access to variables if included
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

// --- CONFIGURATION ---
$DATA_DIR = __DIR__ . '/../data';
$UPLOADS_DIR = __DIR__ . '/../uploads';

// Ensure data directory exists
if (!file_exists($DATA_DIR)) {
    mkdir($DATA_DIR, 0755, true);
}

// --- CORS & HEADERS ---
function handleCors() {
    // Allow from any origin (or strict it to specific domains in prod)
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
    
    header('Content-Type: application/json');
}

// --- SECURITY HELPERS ---
function sanitizeInput($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitizeInput($value);
        }
        return $data;
    }
    // Remove dangerous tags but allow basic text
    // htmlspecialchars is usually enough for JSON APIs to prevent XSS when consumed
    if (is_string($data)) {
        return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    }
    return $data;
}

function validateFilename($filename) {
    // Prevent path traversal (e.g. ../../etc/passwd)
    if (strpos($filename, '..') !== false || strpos($filename, '/') !== false || strpos($filename, '\\') !== false) {
        throw new Exception("Invalid filename");
    }
    return $filename;
}

// --- DATA HELPERS ---
function readData($filename) {
    global $DATA_DIR;
    try {
        validateFilename($filename);
        $filepath = "$DATA_DIR/$filename";
        if (!file_exists($filepath)) {
            return [];
        }
        $json = file_get_contents($filepath);
        return json_decode($json, true) ?: [];
    } catch (Exception $e) {
        return [];
    }
}

function writeData($filename, $data) {
    global $DATA_DIR;
    try {
        validateFilename($filename);
        $filepath = "$DATA_DIR/$filename";
        // Sanitize data before writing? 
        // Ideally we store raw usually and sanitize on output, OR sanitize input.
        // Let's sanitize input in the getJsonInput function instead.
        file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    } catch (Exception $e) {
        // Silent fail or log
    }
}

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();
}

function getJsonInput() {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    // Optional: Sanitize all inputs automatically
    // $data = sanitizeInput($data); 
    // WARN: Sanitizing JSON input might break rich text editors (HTML content).
    // Better to let frontend handle XSS rendering protection (React does this by default).
    // So we will NOT aggressive sanitize here to preserve HTML for articles.
    return $data;
}

// Initialize
handleCors();
?>
