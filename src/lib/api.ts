const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? 'http://localhost:3001/api' : '/api';

// Helper to determine endpoint URL based on environment
const getEndpoint = (resource: string) => {
    if (isDev) {
        return `${BASE_URL}/${resource}`; // e.g., http://localhost:3001/api/articles
    }
    return `${BASE_URL}/${resource}.php`; // e.g., /api/articles.php
};

// Helper for DELETE requests (Node uses URL params, PHP uses query params or path info)
const getDeleteEndpoint = (resource: string, id: string) => {
    if (isDev) {
        return `${BASE_URL}/${resource}/${id}`;
    }
    // For PHP, we'll use query params to be safe on all hostings
    return `${BASE_URL}/${resource}.php?id=${id}`;
};

export const api = {
    // Articles
    getArticles: async () => {
        try {
            const res = await fetch(getEndpoint('articles'));
            if (!res.ok) throw new Error('Failed to fetch articles');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    saveArticle: async (article: any) => {
        const res = await fetch(getEndpoint('articles'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        });
        if (!res.ok) throw new Error('Failed to save article');
        return await res.json();
    },
    deleteArticle: async (id: string) => {
        const res = await fetch(getDeleteEndpoint('articles', id), {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete article');
        return await res.json();
    },

    // Events
    getEvents: async () => {
        try {
            const res = await fetch(getEndpoint('events'));
            if (!res.ok) throw new Error('Failed to fetch events');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    saveEvent: async (event: any) => {
        const res = await fetch(getEndpoint('events'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
        });
        if (!res.ok) throw new Error('Failed to save event');
        return await res.json();
    },
    deleteEvent: async (id: string) => {
        const res = await fetch(getDeleteEndpoint('events', id), {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete event');
        return await res.json();
    },

    // Gallery
    getGallery: async () => {
        try {
            const res = await fetch(getEndpoint('gallery'));
            if (!res.ok) throw new Error('Failed to fetch gallery');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    saveGalleryImage: async (item: any) => {
        const res = await fetch(getEndpoint('gallery'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error('Failed to save gallery item');
        return await res.json();
    },
    deleteGalleryImage: async (id: string) => {
        const res = await fetch(getDeleteEndpoint('gallery', id), {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete gallery item');
        return await res.json();
    },

    // Books
    getBooks: async () => {
        const response = await fetch(getEndpoint('books'));
        return response.json();
    },

    saveBook: async (book: any) => {
        const response = await fetch(getEndpoint('books'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        return response.json();
    },

    deleteBook: async (id: string) => {
        const response = await fetch(getDeleteEndpoint('books', id), {
            method: 'DELETE',
        });
        return response.json();
    },

    // Upload
    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(getEndpoint('upload'), {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();

        // Return full URL
        if (isDev) {
            return `http://localhost:3001${data.url}`;
        }
        return data.url; // Relative path on prod
    },

    // Metrics
    logVisit: async () => {
        try {
            await fetch(getEndpoint('metrics'), { method: 'POST' });
        } catch (e) {
            console.error('Failed to log visit', e);
        }
    },
    getMetrics: async () => {
        const res = await fetch(getEndpoint('metrics'));
        return res.json();
    },

    // AI Analysis
    analyzeContent: async (data: { text?: string, url?: string, pdf?: File }) => {
        const formData = new FormData();
        if (data.text) formData.append('text', data.text);
        if (data.url) formData.append('url', data.url);
        if (data.pdf) formData.append('pdf', data.pdf);

        // Uses simplified analyze.php in prod
        let endpoint = getEndpoint('research/analyze');
        if (!isDev) endpoint = getEndpoint('analyze'); // Simplified naming for PHP: api/analyze.php

        const res = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error('Analysis failed');
        return await res.json();
    }
};
