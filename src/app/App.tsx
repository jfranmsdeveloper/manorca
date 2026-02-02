import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { SobreMiSection } from '@/app/components/SobreMiSection';
import { AgendaSection } from '@/app/components/AgendaSection';
import { PublicacionesSection } from '@/app/components/PublicacionesSection';
import { UniversidadSection } from '@/app/components/UniversidadSection';
import { OrientacionSection } from '@/app/components/OrientacionSection';
import { DeporteSection } from '@/app/components/DeporteSection';
import { UnescoSection } from '@/app/components/UnescoSection';
import { EventosSection } from '@/app/components/EventosSection';
import { ContactoSection } from '@/app/components/ContactoSection';
import { Footer } from '@/app/components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const navigate = useNavigate();

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'inicio',
        'sobre-mi',
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
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <HeroSection onNavigate={handleNavigate} />
        <SobreMiSection />
        <AgendaSection />
        <PublicacionesSection />
        <UniversidadSection />
        <OrientacionSection />
        <DeporteSection />
        <UnescoSection />
        <EventosSection />
        <ContactoSection />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}