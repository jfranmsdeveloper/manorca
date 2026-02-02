import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure data directory exists
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure uploads directory exists
const UPLOADS_DIR = process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, 'uploads')
    : path.join(__dirname, 'public/uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for rich text content
app.use(express.static(path.join(__dirname, 'dist'))); // Serve built frontend
app.use('/uploads', express.static(UPLOADS_DIR)); // Serve uploads from dynamic path

// Helper to read/write JSON
const readData = (file) => {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) return [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = (file, data) => {
    const filePath = path.join(DATA_DIR, file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- API Routes ---

// Articles
app.get('/api/articles', (req, res) => {
    const articles = readData('articles.json');
    res.json(articles);
});

app.post('/api/articles', (req, res) => {
    const newArticle = req.body;
    let articles = readData('articles.json');

    if (articles.some(a => a.id === newArticle.id)) {
        // Update existing
        articles = articles.map(a => a.id === newArticle.id ? newArticle : a);
    } else {
        // Create new
        articles.push(newArticle);
    }

    writeData('articles.json', articles);
    res.json({ success: true, article: newArticle });
});

app.delete('/api/articles/:id', (req, res) => {
    const { id } = req.params;
    let articles = readData('articles.json');
    articles = articles.filter(a => a.id !== id);
    writeData('articles.json', articles);
    res.json({ success: true });
});

// Events
app.get('/api/events', (req, res) => {
    const events = readData('events.json');
    res.json(events);
});

app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    let events = readData('events.json');

    if (!newEvent.id) newEvent.id = Date.now().toString();

    if (events.some(e => e.id === newEvent.id)) {
        events = events.map(e => e.id === newEvent.id ? newEvent : e);
    } else {
        events.push(newEvent);
    }

    writeData('events.json', events);
    res.json({ success: true, event: newEvent });
});

app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    let events = readData('events.json');
    events = events.filter(e => e.id !== id);
    writeData('events.json', events);
    res.json({ success: true });
});

// Gallery
app.get('/api/gallery', (req, res) => {
    const gallery = readData('gallery.json');
    res.json(gallery);
});

app.post('/api/gallery', (req, res) => {
    const newItem = req.body;
    let gallery = readData('gallery.json');

    if (!newItem.id) newItem.id = Date.now().toString();

    if (gallery.some(g => g.id === newItem.id)) {
        gallery = gallery.map(g => g.id === newItem.id ? newItem : g);
    } else {
        gallery.push(newItem);
    }

    writeData('gallery.json', gallery);
    res.json({ success: true, item: newItem });
});

app.delete('/api/gallery/:id', (req, res) => {
    const { id } = req.params;
    let gallery = readData('gallery.json');
    gallery = gallery.filter(g => g.id !== id);
    writeData('gallery.json', gallery);
    res.json({ success: true });
});

// Image Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the URL accessible via the static middleware
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

// SPA Catch-all (Must be after API routes)
app.get('*', (req, res) => {
    // Check if it's an API call that missed (optional, but good practice not to serve HTML for 404 API)
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
        return res.status(404).json({ error: 'Not Found' });
    }
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server API running on http://localhost:${PORT}`);
    console.log(`Data Directory: ${DATA_DIR}`);
});
