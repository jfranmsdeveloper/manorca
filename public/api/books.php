<?php
require_once 'common.php';

$method = $_SERVER['REQUEST_METHOD'];
$file = 'books.json';

switch ($method) {
    case 'GET':
        $books = readData($file);
        sendResponse($books);
        break;

    case 'POST':
        $data = getJsonInput();
        if (!$data) sendResponse(['error' => 'Invalid JSON'], 400);

        // Ensure rating is number
        if (isset($data['rating'])) {
            $data['rating'] = floatval($data['rating']);
        }

        $books = readData($file);
        
        if (!isset($data['id']) || !$data['id']) {
            $data['id'] = (string)(time() * 1000);
        }

        $exists = false;
        foreach ($books as $k => $b) {
            if ($b['id'] === $data['id']) {
                $books[$k] = $data;
                $exists = true;
                break;
            }
        }
        if (!$exists) $books[] = $data;

        writeData($file, $books);
        sendResponse(['success' => true, 'book' => $data]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id && isset($_SERVER['PATH_INFO'])) {
             $parts = explode('/', trim($_SERVER['PATH_INFO'], '/'));
             $id = end($parts);
        }

        if (!$id) sendResponse(['error' => 'Missing ID'], 400);

        $books = readData($file);
        $books = array_values(array_filter($books, function($b) use ($id) {
            return $b['id'] !== $id;
        }));

        writeData($file, $books);
        sendResponse(['success' => true]);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?>
