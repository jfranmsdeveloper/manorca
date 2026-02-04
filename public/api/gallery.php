<?php
require_once 'common.php';

$method = $_SERVER['REQUEST_METHOD'];
$file = 'gallery.json';

switch ($method) {
    case 'GET':
        $gallery = readData($file);
        sendResponse($gallery);
        break;

    case 'POST':
        $data = getJsonInput();
        if (!$data) sendResponse(['error' => 'Invalid JSON'], 400);

        $gallery = readData($file);
        
        if (!isset($data['id']) || !$data['id']) {
            $data['id'] = (string)(time() * 1000);
        }

        $exists = false;
        foreach ($gallery as $k => $g) {
            if ($g['id'] === $data['id']) {
                $gallery[$k] = $data;
                $exists = true;
                break;
            }
        }
        if (!$exists) $gallery[] = $data;

        writeData($file, $gallery);
        sendResponse(['success' => true, 'item' => $data]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id && isset($_SERVER['PATH_INFO'])) {
             $parts = explode('/', trim($_SERVER['PATH_INFO'], '/'));
             $id = end($parts);
        }

        if (!$id) sendResponse(['error' => 'Missing ID'], 400);

        $gallery = readData($file);
        $gallery = array_values(array_filter($gallery, function($g) use ($id) {
            return $g['id'] !== $id;
        }));

        writeData($file, $gallery);
        sendResponse(['success' => true]);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?>
