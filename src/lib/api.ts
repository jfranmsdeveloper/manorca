const API_URL = 'http://localhost:3001/api';

export const api = {
    // Articles
    getArticles: async () => {
        try {
            const res = await fetch(`${API_URL}/articles`);
            if (!res.ok) throw new Error('Failed to fetch articles');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    saveArticle: async (article: any) => {
        const res = await fetch(`${API_URL}/articles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        });
        if (!res.ok) throw new Error('Failed to save article');
        return await res.json();
    },
    deleteArticle: async (id: string) => {
        const res = await fetch(`${API_URL}/articles/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete article');
        return await res.json();
    },

    // Events
    getEvents: async () => {
        try {
            const res = await fetch(`${API_URL}/events`);
            if (!res.ok) throw new Error('Failed to fetch events');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    saveEvent: async (event: any) => {
        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
        });
        if (!res.ok) throw new Error('Failed to save event');
        return await res.json();
    },
    deleteEvent: async (id: string) => {
        const res = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete event');
        return await res.json();
    },

    // Gallery
    getGallery: async () => {
        try {
            const res = await fetch(`${API_URL}/gallery`);
            if (!res.ok) throw new Error('Failed to fetch gallery');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    saveGalleryImage: async (item: any) => {
        const res = await fetch(`${API_URL}/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error('Failed to save gallery item');
        return await res.json();
    },
    deleteGalleryImage: async (id: string) => {
        const res = await fetch(`${API_URL}/gallery/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete gallery item');
        return await res.json();
    },

    // Upload
    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        // Return full URL assuming local dev for now. 
        // In prod this would be relative or absolute based on domain.
        return `http://localhost:3001${data.url}`;
    }
};
