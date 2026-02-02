import { motion } from 'motion/react';
import { Compass, GraduationCap, Briefcase, Lightbulb, Target, Users, TrendingUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export function OrientacionSection() {
  const topicsData = [
    {
      id: '1',
      icon: GraduationCap,
      title: 'Orientación Académica',
      color: 'from-[#0F172A] to-[#1E293B]',
      content: 'Guías completas para la selección de programas de estudio, estrategias de aprendizaje efectivas y técnicas de gestión del tiempo para maximizar tu rendimiento académico.',
      tags: ['Estudio', 'Metodología', 'Planificación'],
    },
    {
      id: '2',
      icon: Briefcase,
      title: 'Orientación Profesional',
      color: 'from-[#1E293B] to-[#334155]',
      content: 'Recursos para el desarrollo de tu carrera profesional, incluyendo preparación de CV, técnicas de entrevista, networking y estrategias para el crecimiento profesional.',
      tags: ['Carrera', 'Networking', 'Empleo'],
    },
    {
      id: '3',
      icon: Users,
      title: 'Desarrollo Personal',
      color: 'from-[#334155] to-[#475569]',
      content: 'Herramientas y técnicas para el desarrollo de habilidades blandas, inteligencia emocional, liderazgo y gestión de equipos en entornos académicos y profesionales.',
      tags: ['Liderazgo', 'Soft Skills', 'Bienestar'],
    },
    {
      id: '4',
      icon: TrendingUp,
      title: 'Competencias Digitales',
      color: 'from-[#475569] to-[#64748B]',
      content: 'Formación en herramientas digitales esenciales, alfabetización digital, análisis de datos y tecnologías emergentes para profesionales del siglo XXI.',
      tags: ['Tecnología', 'Digital', 'Innovación'],
    },
    {
      id: '5',
      icon: Lightbulb,
      title: 'Investigación y Publicación',
      color: 'from-[#64748B] to-[#94A3B8]',
      content: 'Guías para el proceso de investigación académica, metodología, redacción científica y estrategias para publicar en revistas de alto impacto.',
      tags: ['Investigación', 'Publicación', 'Metodología'],
    },
  ];

  const resources = [
    {
      title: 'Guía de Estudio Efectivo',
      category: 'Académico',
      views: 2345,
    },
    {
      title: 'Preparación para Entrevistas',
      category: 'Profesional',
      views: 1876,
    },
    {
      title: 'Gestión del Tiempo',
      category: 'Personal',
      views: 3210,
    },
    {
      title: 'Herramientas Digitales',
      category: 'Tecnología',
      views: 2567,
    },
  ];

  return (
    <section id="orientacion" className="py-28 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-[#0F172A]/10 border border-[#0F172A]/20 rounded-full text-[#0F172A] text-sm mb-4">
            Recursos de Apoyo
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
            Orientación
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Guías y recursos para tu desarrollo académico y profesional
          </p>
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {topicsData.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={topic.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w - 14 h - 14 bg - gradient - to - br ${topic.color} rounded - 2xl flex items - center justify - center flex - shrink - 0`}>
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#0F172A]">{topic.title}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6">
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {topic.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-slate-100 text-[#0F172A] border-none hover:bg-[#0F172A] hover:text-white transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="mt-4 text-[#0F172A] hover:text-blue-700 font-semibold flex items-center gap-2"
                    >
                      Explorar recursos
                      <motion.span className="inline-block">→</motion.span>
                    </motion.button>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Featured Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
            Recursos Destacados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-6 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all bg-white hover:border-[#0F172A]">
                  <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center mb-4">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-slate-100 text-[#0F172A] border-none mb-3">
                    {resource.category}
                  </Badge>
                  <h4 className="text-lg font-bold text-[#0F172A] mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {resource.views.toLocaleString()} vistas
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto p-12 rounded-3xl border-none shadow-2xl bg-[#0F172A] text-white">
            <h3 className="text-3xl font-bold mb-4">
              ¿Necesitas orientación personalizada?
            </h3>
            <p className="text-lg mb-8 text-slate-300">
              Agenda una sesión de consultoría académica o profesional con nuestro equipo
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Solicitar Orientación
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
