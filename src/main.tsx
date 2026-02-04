
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/App.tsx';
import { GalleryPage } from './app/pages/GalleryPage';
import { AdminLayout } from './app/admin/AdminLayout';
import { PostManager } from './app/admin/PostManager';
import BlockEditor from './app/admin/BlockEditor';
import EventManager from './app/admin/EventManager';
import GalleryManager from './app/admin/GalleryManager';
import SeoDashboard from './app/admin/SeoDashboard';
import LoginPage from './app/auth/LoginPage';
import { AuthProvider } from './app/context/AuthContext';
import { ProtectedRoute } from './app/auth/ProtectedRoute';
import { Toaster } from '@/app/components/ui/sonner';
import './styles/index.css';
import { initGA, logPageView } from '@/lib/analytics';

// Initialize GA
initGA();
logPageView(); // Log initial page load



import { BooksPage } from './app/pages/BooksPage';
import BookManager from './app/admin/BookManager';

// Handle Loading Screen Transition
const loader = document.getElementById('initial-loader');
if (loader) {
  console.log("Loader encontrado:", loader);
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.remove();
    }, 1500); // Wait for transition needed
  }, 2000); // 2 seconds minimum display time
}

import { ThemeProvider } from "@/app/components/theme-provider"
import { HelmetProvider } from 'react-helmet-async';

// ... (existing imports)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<PostManager />} />
                <Route path="editor/:id" element={<BlockEditor />} />
                <Route path="events" element={<EventManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="books" element={<BookManager />} />
                <Route path="seo" element={<SeoDashboard />} />
                <Route path="settings" element={<div className="p-8">Configuración</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);