import { motion } from 'motion/react';
import { BookOpen, Trophy, Globe, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { EditableImage } from '@/app/components/admin/EditableImage';

const defaultHeroImage = '/assets/manuel-hero-new.jpg';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  // Local state logic removed, handled by EditableImage

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
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-300">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500" />

        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 hidden lg:block skew-x-12 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left space-y-8 lg:max-w-xl"
            >


              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
                  Manuel Ortega
                  <br />
                  <span className="text-muted-foreground">Caballero</span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Transformando la educación con visión, excelencia y un compromiso inquebrantable con el futuro.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('trayectoria')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                >
                  Ver Trayectoria
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('contacto')}
                  className="bg-card border-border text-foreground hover:bg-muted px-8 py-6 text-lg rounded-xl transition-all"
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
                <div className="absolute inset-0 bg-[#0F172A]/5 mix-blend-multiply z-10 pointer-events-none" />
                <EditableImage
                  section="hero"
                  defaultSrc={defaultHeroImage}
                  alt="Dr. Manuel Ortega Caballero"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
                  aspectRatio={4 / 5}
                />
              </div>

              {/* Decorative Frame Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="sobre-mi" className="py-20 lg:py-32 bg-background relative overflow-hidden transition-colors duration-300">
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
                className="group p-8 liquid-card hover:bg-white/10 dark:hover:bg-slate-800/20 text-left border-transparent hover:border-primary/20"
              >
                <div className="mb-6 w-12 h-12 rounded-lg bg-background flex items-center justify-center shadow-sm group-hover:bg-primary-foreground/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary-foreground mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors text-sm">
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
