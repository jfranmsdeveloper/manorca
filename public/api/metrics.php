<?php
require_once 'common.php';

$method = $_SERVER['REQUEST_METHOD'];
$file = 'hits.json';

if ($method === 'GET') {
    $hits = readData($file);
    // If it's a visit tracking request (frontend might call this to just log a hit??)
    // Actually the Node.js server had middleware that tracked hits on EVERY request.
    // In PHP, we can't easily do "middleware" for static files unless all traffic goes through PHP.
    // So the frontend needs to explicitly call an endpoint to register a "hit" if we want to count it.
    // OR we just return the data here.
    
    // Let's check the Node implementation. It returned hits on GET /api/metrics.
    // And it counted hits on middleware.
    // Since we are moving to static hosting + API, we lose the middleware hit counting for index.html.
    // Option: The frontend `useEffect` in App.tsx could call `POST /api/metrics` to count a visit.
    
    // For now, let's just support reading.
    sendResponse($hits);
} elseif ($method === 'POST') {
    // Basic hit counter implementation for frontend to call
    $hits = readData($file);
    $today = date('Y-m-d');
    
    $found = false;
    foreach ($hits as &$h) {
        if ($h['date'] === $today) {
            $h['count']++;
            $found = true;
            break;
        }
    }
    unset($h); // break reference
    
    if (!$found) {
        $hits[] = ['date' => $today, 'count' => 1];
    }
    
    // Keep last 30
    if (count($hits) > 30) {
        $hits = array_slice($hits, -30);
    }
    
    writeData($file, $hits);
    sendResponse(['success' => true]);
} else {
    sendResponse(['error' => 'Method not allowed'], 405);
}
?>
