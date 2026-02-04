import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from 'motion/react';
import { Users, Target, Heart, Lightbulb } from 'lucide-react';
import { TimelineSection } from './TimelineSection';
import { EditableImage } from '@/app/components/admin/EditableImage';

// Helper image imports (from Unsplash or assets)
const manuelImage3 = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
const manuelImage4 = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
const manuelImage5 = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

export function SobreMiSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const galleryImages = [
    { src: manuelImage3, alt: "Dr. Manuel Ortega Caballero en su despacho" },
    { src: manuelImage4, alt: "Manuel Ortega Caballero en conferencia" },
    { src: manuelImage5, alt: "Manuel Ortega Caballero enseñando" }
  ];

  const valores = [
    {
      icon: Heart,
      title: 'Pasión por la Educación',
      description: 'Dedicación completa al desarrollo integral de cada estudiante',
      color: '#0F172A',
    },
    {
      icon: Target,
      title: 'Excelencia Académica',
      description: 'Compromiso con los más altos estándares de calidad educativa',
      color: '#1E293B',
    },
    {
      icon: Users,
      title: 'Enfoque Humano',
      description: 'Cada estudiante es único y merece atención personalizada',
      color: '#334155',
    },
    {
      icon: Lightbulb,
      title: 'Innovación Continua',
      description: 'Búsqueda constante de nuevas metodologías y enfoques',
      color: '#475569',
    },
  ];



  const expertiseAreas = [
    'Metodologías Educativas Innovadoras',
    'Orientación Profesional',
    'Desarrollo del Deporte Educativo',
    'Evaluación y Mejora Continua',
    'Liderazgo Educativo',
    'Investigación Pedagógica',
    'Educación Inclusiva',
    'Tecnología Educativa',
  ];

  return (
    <section id="sobre-mi" className="py-20 lg:py-32 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-slate-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="px-6 py-2 text-sm bg-muted rounded-full border border-border text-muted-foreground font-medium">
              Sobre Mí
            </div>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Conoce a Manuel Ortega Caballero
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Una vida dedicada a transformar la educación y el desarrollo integral de estudiantes
          </p>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Mi Historia</h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Doctor en Ciencias de la Educación por la Universidad de Granada, con más de 15 años
                  de experiencia en el ámbito académico y educativo. Mi trayectoria profesional ha estado
                  marcada por una pasión inquebrantable por la innovación pedagógica y el desarrollo integral
                  de estudiantes.
                </p>
                <p>
                  A lo largo de mi carrera, he tenido el privilegio de trabajar con instituciones educativas
                  de prestigio internacional, participar en proyectos de investigación innovadores y contribuir
                  al desarrollo de metodologías que transforman la manera en que enseñamos y aprendemos.
                </p>
                <p>
                  Mi enfoque se centra en la persona: cada estudiante es único, con sus propias aspiraciones,
                  desafíos y potencial. Creo firmemente en la educación como herramienta de transformación
                  social y desarrollo personal.
                </p>
              </div>
            </div>

            {/* Expertise Areas */}
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-4">Áreas de Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.map((area) => (
                  <motion.div
                    key={area}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-muted border border-border rounded-full text-sm text-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {area}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Professional Image 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              <EditableImage
                section="sobre-mi-main"
                defaultSrc={manuelImage3}
                alt="Dr. Manuel Ortega Caballero en su despacho"
                className="w-full h-auto object-cover"
                onClick={() => { setPhotoIndex(0); setLightboxOpen(true); }}
                aspectRatio={4 / 5}
              />
            </motion.div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              >
                <EditableImage
                  section="sobre-mi-grid-1"
                  defaultSrc={manuelImage4}
                  alt="Manuel Ortega Caballero en conferencia"
                  className="w-full h-full object-cover"
                  onClick={() => { setPhotoIndex(1); setLightboxOpen(true); }}
                  aspectRatio={4 / 3}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              >
                <EditableImage
                  section="sobre-mi-grid-2"
                  defaultSrc={manuelImage5}
                  alt="Manuel Ortega Caballero enseñando"
                  className="w-full h-full object-cover"
                  onClick={() => { setPhotoIndex(2); setLightboxOpen(true); }}
                  aspectRatio={4 / 3}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Lightbox Component */}
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={photoIndex}
            slides={galleryImages.map(img => ({ src: img.src, alt: img.alt }))}
          />

        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-4xl font-bold text-foreground text-center mb-12">Mis Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {valores.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-full p-6 bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-background border border-border"
                    >
                      <valor.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3">{valor.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{valor.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Timeline - Now using Timeline Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-foreground text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:text-gray-100">
            Trayectoria y Logros
          </h3>
          <div className="max-w-4xl mx-auto">
            <TimelineSection />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#0F172A] rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10">
              ¿Quieres colaborar o conocer más sobre mi trabajo?
            </h3>
            <p className="text-slate-300 text-lg mb-8 relative z-10">
              Estoy siempre abierto a nuevas oportunidades de colaboración, proyectos de investigación
              y contribuciones al desarrollo educativo.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-background text-foreground rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative z-10"
            >
              Ponte en Contacto
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}