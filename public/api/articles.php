<?php
require_once 'common.php';

$method = $_SERVER['REQUEST_METHOD'];
$file = 'articles.json';

switch ($method) {
    case 'GET':
        $articles = readData($file);
        sendResponse($articles);
        break;

    case 'POST':
        $data = getJsonInput();
        if (!$data) {
            sendResponse(['error' => 'Invalid JSON input'], 400);
        }

        $articles = readData($file);
        $updated = false;

        // Ensure ID
        if (!isset($data['id']) || !$data['id']) {
            $data['id'] = (string)(time() * 1000); // Simple JS-like timestamp ID
        }

        foreach ($articles as $key => $article) {
            if ($article['id'] === $data['id']) {
                $articles[$key] = $data;
                $updated = true;
                break;
            }
        }

        if (!$updated) {
            $articles[] = $data;
        }

        writeData($file, $articles);
        sendResponse(['success' => true, 'article' => $data]);
        break;

    case 'DELETE':
        // ID usually passed as query param ?id=123 in simple PHP setups 
        // or embedded in URL if using RewriteRules. 
        // For simplicity without .htaccess rewrite maps, we'll support query param `?id=`
        // But the frontend is calling DELETE /api/articles/:id
        // So we need to parse the path if we want to match exactly, OR change frontend to use query params for PHP.
        // EASIEST: Frontend update is needed anyway. 
        // BUT: To keep URLs clean-ish, let's look at $_GET['id'].
        // If the server doesn't support rewrites, DELETE /api/articles.php?id=123 is standard.
        // My plan said I'd update frontend client. So I will make frontend send ?id=... for PHP DELETEs?
        // Actually, let's try to support parsing PATH_INFO if available, or fallback to $_GET.
        
        $id = $_GET['id'] ?? null;
        
        // If using /articles.php/123 style
        if (!$id && isset($_SERVER['PATH_INFO'])) {
             $parts = explode('/', trim($_SERVER['PATH_INFO'], '/'));
             $id = end($parts);
        }

        if (!$id) {
            sendResponse(['error' => 'Missing ID'], 400);
        }

        $articles = readData($file);
        $articles = array_values(array_filter($articles, function($a) use ($id) {
            return $a['id'] !== $id;
        }));

        writeData($file, $articles);
        sendResponse(['success' => true]);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
        break;
}
?>
