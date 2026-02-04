<?php
require_once 'common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

// Ensure uploads dir exists (handled in common.php but good to verify permissions)
if (!file_exists($UPLOADS_DIR)) {
    if (!mkdir($UPLOADS_DIR, 0755, true)) {
        sendResponse(['error' => 'Failed to create uploads directory'], 500);
    }
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    sendResponse(['error' => 'No file uploaded or upload error'], 400);
}

$file = $_FILES['image'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// 1. Check Extension
$allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];
if (!in_array($ext, $allowedExts)) {
    sendResponse(['error' => 'File type not allowed'], 400);
}

// 2. Check MIME Type (Content sniffing)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
];

if (!in_array($mime, $allowedMimes)) {
    sendResponse(['error' => 'Invalid file content'], 400);
}

// 3. Size Limit (e.g. 10MB)
if ($file['size'] > 10 * 1024 * 1024) {
    sendResponse(['error' => 'File too large (Max 10MB)'], 400);
}

// 4. Randomize Filename to prevent overwrites and guessing
$uniqueName = bin2hex(random_bytes(16));
$targetDir = $UPLOADS_DIR . '/';
$finalName = $uniqueName . '.webp';
$targetPath = $targetDir . $finalName;

// WebP Conversion Logic
function convertToWebP($source, $destination, $quality = 80) {
    $info = getimagesize($source);
    $mime = $info['mime'];

    switch ($mime) {
        case 'image/jpeg':
            $image = imagecreatefromjpeg($source);
            break;
        case 'image/png':
            $image = imagecreatefrompng($source);
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
            break;
        case 'image/gif':
            $image = imagecreatefromgif($source);
            break;
        case 'image/webp':
            // Already WebP, just move it
            return move_uploaded_file($source, $destination);
        default:
            return false;
    }

    if ($image) {
        // Save as WebP
        $result = imagewebp($image, $destination, $quality);
        imagedestroy($image);
        return $result;
    }

    return false;
}

// Try to convert to WebP
$conversionSuccess = false;
// For PDF, just move it
if ($mime === 'application/pdf') {
    $finalName = $uniqueName . '.pdf';
    $targetPath = $targetDir . $finalName;
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $conversionSuccess = true;
    }
} else {
    // Attempt WebP conversion
    try {
        if (convertToWebP($file['tmp_name'], $targetPath)) {
            $conversionSuccess = true;
        } else {
            // Fallback: Just move original if conversion fails (e.g. GD missing)
            $finalName = $uniqueName . '.' . $ext;
            $targetPath = $targetDir . $finalName;
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                $conversionSuccess = true;
            }
        }
    } catch (Throwable $e) {
         // Fallback on error
        $finalName = $uniqueName . '.' . $ext;
        $targetPath = $targetDir . $finalName;
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $conversionSuccess = true;
        }
    }
}

if ($conversionSuccess) {
    // Return relative URL assuming /uploads is served from root
    sendResponse(['url' => "/uploads/$finalName"]);
} else {
    sendResponse(['error' => 'Failed to process uploaded file'], 500);
}
?>
