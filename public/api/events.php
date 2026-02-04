<?php
require_once 'common.php';

$method = $_SERVER['REQUEST_METHOD'];
$file = 'events.json';

switch ($method) {
    case 'GET':
        $events = readData($file);
        sendResponse($events);
        break;

    case 'POST':
        $data = getJsonInput();
        if (!$data) sendResponse(['error' => 'Invalid JSON'], 400);

        $events = readData($file);
        
        if (!isset($data['id']) || !$data['id']) {
            $data['id'] = (string)(time() * 1000);
        }
        
        $exists = false;
        foreach ($events as $k => $e) {
            if ($e['id'] === $data['id']) {
                $events[$k] = $data;
                $exists = true;
                break;
            }
        }
        
        if (!$exists) $events[] = $data;

        writeData($file, $events);
        sendResponse(['success' => true, 'event' => $data]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        // Support PATH_INFO /events.php/123
        if (!$id && isset($_SERVER['PATH_INFO'])) {
             $parts = explode('/', trim($_SERVER['PATH_INFO'], '/'));
             $id = end($parts);
        }

        if (!$id) sendResponse(['error' => 'Missing ID'], 400);

        $events = readData($file);
        $events = array_values(array_filter($events, function($e) use ($id) {
            return $e['id'] !== $id;
        }));

        writeData($file, $events);
        sendResponse(['success' => true]);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?>
