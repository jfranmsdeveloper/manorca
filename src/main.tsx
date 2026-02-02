
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
import LoginPage from './app/auth/LoginPage';
import { AuthProvider } from './app/context/AuthContext';
import { ProtectedRoute } from './app/auth/ProtectedRoute';
import { Toaster } from '@/app/components/ui/sonner';
import './styles/index.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gallery" element={<GalleryPage />} />
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
            <Route path="settings" element={<div className="p-8">Configuración</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  </StrictMode>
);