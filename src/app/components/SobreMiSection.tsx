import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from 'motion/react';
import { Award, BookOpen, Users, Globe, GraduationCap, Target, Heart, Lightbulb } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';

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

  const logros = [
    {
      icon: Award,
      title: 'Premio UNESCO 2025',
      description: 'Reconocimiento a la excelencia en educación global',
      year: '2025',
    },
    {
      icon: BookOpen,
      title: '20+ Publicaciones',
      description: 'Artículos e investigaciones en revistas indexadas',
      year: '2015-2026',
    },
    {
      icon: GraduationCap,
      title: 'Doctor en Educación',
      description: 'Universidad de Granada - Mención Internacional',
      year: '2010',
    },
    {
      icon: Globe,
      title: 'Proyectos Internacionales',
      description: 'Colaboración con instituciones de 15 países',
      year: '2012-2026',
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
    <section id="sobre-mi" className="py-20 lg:py-32 bg-white relative overflow-hidden">
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
            <div className="px-6 py-2 text-sm bg-slate-100 rounded-full border border-slate-200 text-slate-700 font-medium">
              Sobre Mí
            </div>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
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
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4">Mi Historia</h3>
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
              <h4 className="text-2xl font-bold text-[#0F172A] mb-4">Áreas de Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.map((area) => (
                  <motion.div
                    key={area}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm text-[#0F172A] font-medium hover:bg-[#0F172A] hover:text-white transition-colors"
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
              onClick={() => { setPhotoIndex(0); setLightboxOpen(true); }}
            >
              <img
                src={manuelImage3}
                alt="Dr. Manuel Ortega Caballero en su despacho"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity">
                  Ver imagen
                </div>
              </div>
            </motion.div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                onClick={() => { setPhotoIndex(1); setLightboxOpen(true); }}
              >
                <img
                  src={manuelImage4}
                  alt="Manuel Ortega Caballero en conferencia"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                onClick={() => { setPhotoIndex(2); setLightboxOpen(true); }}
              >
                <img
                  src={manuelImage5}
                  alt="Manuel Ortega Caballero enseñando"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
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
          <h3 className="text-4xl font-bold text-[#0F172A] text-center mb-12">Mis Valores</h3>
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
                <div className="relative h-full p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 group">
                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-white border border-slate-200"
                    >
                      <valor.icon className="w-8 h-8 text-[#0F172A]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-3">{valor.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{valor.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-[#0F172A] text-center mb-12">
            Trayectoria y Logros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {logros.map((logro, index) => (
              <motion.div
                key={logro.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative p-6 h-full bg-white border border-slate-200 hover:border-[#0F172A] transition-all group overflow-hidden">
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#0F172A] text-white">
                      {logro.year}
                    </Badge>
                  </div>

                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <logro.icon className="w-7 h-7 text-[#0F172A]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0F172A] mb-2 pr-16">{logro.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{logro.description}</p>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-slate-50 rounded-full blur-xl" />
                </Card>
              </motion.div>
            ))}
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
              className="px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative z-10"
            >
              Ponte en Contacto
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}