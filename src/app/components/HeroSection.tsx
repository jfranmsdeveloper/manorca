import { motion } from 'motion/react';
import { BookOpen, Trophy, Globe, FileText, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
const manuelImage1 = '/assets/manuel-hero-new.jpg';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const features = [
    {
      icon: BookOpen,
      title: 'Universidad',
      description: 'Liderando la innovación educativa',
      iconColor: '#0F172A', // Navy
      section: 'universidad',
    },
    {
      icon: FileText,
      title: 'Publicaciones',
      description: 'Investigación de alto impacto',
      iconColor: '#334155', // Slate 700
      section: 'publicaciones',
    },
    {
      icon: Trophy,
      title: 'Deporte',
      description: 'Excelencia y disciplina',
      iconColor: '#0F172A', // Navy
      section: 'deporte',
    },
    {
      icon: Globe,
      title: 'UNESCO',
      description: 'Compromiso global',
      iconColor: '#475569', // Slate 600
      section: 'unesco',
    },
  ];

  return (
    <>
      {/* Hero Section - Premium Navy Theme */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFBFC]">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0F172A] hidden lg:block skew-x-12 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left space-y-8 lg:max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200"
              >
                <div className="w-2 h-2 bg-[#0F172A] rounded-full" />
                <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Doctor en Ciencias de la Educación</span>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-tight">
                  Manuel Ortega
                  <br />
                  <span className="text-[#334155]">Caballero</span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Transformando la educación con visión, excelencia y un compromiso inquebrantable con el futuro.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('publicaciones')}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1"
                >
                  Ver Trayectoria
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('contacto')}
                  className="bg-white border-slate-200 text-[#0F172A] hover:bg-slate-50 px-8 py-6 text-lg rounded-xl transition-all"
                >
                  Contactar
                </Button>
              </div>
            </motion.div>

            {/* Right - Image (Protagonist) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[#0F172A]/5 mix-blend-multiply z-10" />
                <img
                  src={manuelImage1}
                  alt="Dr. Manuel Ortega Caballero"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
                />

                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20 border border-slate-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Experiencia</p>
                      <p className="text-2xl font-bold text-[#0F172A]">20+ Años</p>
                    </div>
                    <div className="h-12 w-[1px] bg-slate-200" />
                    <div>
                      <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Proyectos</p>
                      <p className="text-2xl font-bold text-[#0F172A]">100+</p>
                    </div>
                    <div className="h-10 w-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Frame Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.button
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate(feature.section)}
                className="group p-8 bg-slate-50 hover:bg-[#0F172A] rounded-2xl transition-colors duration-300 text-left border border-slate-100 hover:border-[#0F172A]"
              >
                <div className="mb-6 w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-white/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#0F172A] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-white mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 group-hover:text-slate-300 transition-colors text-sm">
                  {feature.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
