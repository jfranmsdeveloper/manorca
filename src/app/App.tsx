import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '@/lib/api'; // Import API
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { SmartScrollButton } from '@/app/components/SmartScrollButton';
import { AdminControls } from '@/app/components/admin/AdminControls';

// Lazy load below-the-fold components
const SobreMiSection = lazy(() => import('@/app/components/SobreMiSection').then(module => ({ default: module.SobreMiSection })));
const TrayectoriaSection = lazy(() => import('@/app/components/TrayectoriaSection').then(module => ({ default: module.TrayectoriaSection })));
const AgendaSection = lazy(() => import('@/app/components/AgendaSection').then(module => ({ default: module.AgendaSection })));
const PublicacionesSection = lazy(() => import('@/app/components/PublicacionesSection').then(module => ({ default: module.PublicacionesSection })));
const UniversidadSection = lazy(() => import('@/app/components/UniversidadSection').then(module => ({ default: module.UniversidadSection })));
const OrientacionSection = lazy(() => import('@/app/components/OrientacionSection').then(module => ({ default: module.OrientacionSection })));
const DeporteSection = lazy(() => import('@/app/components/DeporteSection').then(module => ({ default: module.DeporteSection })));
const UnescoSection = lazy(() => import('@/app/components/UnescoSection').then(module => ({ default: module.UnescoSection })));
const EventosSection = lazy(() => import('@/app/components/EventosSection').then(module => ({ default: module.EventosSection })));
const ContactoSection = lazy(() => import('@/app/components/ContactoSection').then(module => ({ default: module.ContactoSection })));
const Footer = lazy(() => import('@/app/components/Footer').then(module => ({ default: module.Footer })));


export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const navigate = useNavigate();

  // Log visit once on mount
  useEffect(() => {
    api.logVisit();
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'inicio',
        'sobre-mi',
        'trayectoria',
        'agenda',
        'publicaciones',
        'universidad',
        'orientacion',
        'deporte',
        'unesco',
        'eventos',
        'contacto',
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    if (section === 'admin-panel') {
      navigate('/login');
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>Manuel Ortega Caballero | Psicopedagogo, Orientador y Coach</title>
        <meta name="description" content="Portafolio profesional de Manuel Ortega Caballero. Psicopedagogo, Orientador y Coach. Trayectoria en educación y proyectos internacionales." />
        <meta name="keywords" content="Manuel Ortega Caballero, Psicopedagogo, Orientador, Coach, Educación, Portafolio" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manuelortegacaballero.es/" />
        <meta property="og:title" content="Manuel Ortega Caballero | Psicopedagogo, Orientador y Coach" />
        <meta property="og:description" content="Portafolio profesional de Manuel Ortega Caballero. Psicopedagogo, Orientador y Coach. Trayectoria en educación y proyectos internacionales." />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Manuel Ortega Caballero | Psicopedagogo, Orientador y Coach" />
        <meta property="twitter:description" content="Portafolio profesional de Manuel Ortega Caballero. Psicopedagogo, Orientador y Coach. Trayectoria en educación y proyectos internacionales." />
      </Helmet>

      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="max-w-[2000px] mx-auto">
        <HeroSection onNavigate={handleNavigate} />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <SobreMiSection />
          <TrayectoriaSection />
          <AgendaSection />

          <PublicacionesSection />
          <UniversidadSection />
          <OrientacionSection />
          <DeporteSection />
          <UnescoSection />
          <EventosSection />
          <ContactoSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer onNavigate={handleNavigate} />
        <SmartScrollButton />
        <AdminControls />
      </Suspense>
    </div>
  );
}