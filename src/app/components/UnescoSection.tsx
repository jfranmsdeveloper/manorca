import { motion } from 'motion/react';
import { Globe, Heart, Users, BookOpen, TreePine, Waves, Mountain, Building2 } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export function UnescoSection() {
  const sdgGoals = [
    {
      id: 1,
      icon: BookOpen,
      title: 'Educación de Calidad',
      description: 'Garantizar educación inclusiva y equitativa',
      color: 'from-[#C5192D] to-[#d43d4f]',
    },
    {
      id: 2,
      icon: Heart,
      title: 'Salud y Bienestar',
      description: 'Promover el bienestar para todas las edades',
      color: 'from-[#DDA63A] to-[#e5b85c]',
    },
    {
      id: 3,
      icon: TreePine,
      title: 'Acción por el Clima',
      description: 'Adoptar medidas urgentes contra el cambio climático',
      color: 'from-[#3F7E44] to-[#5a9560]',
    },
    {
      id: 4,
      icon: Waves,
      title: 'Vida Submarina',
      description: 'Conservar y utilizar sosteniblemente los océanos',
      color: 'from-[#0A97D9] to-[#2daae6]',
    },
    {
      id: 5,
      icon: Mountain,
      title: 'Vida de Ecosistemas',
      description: 'Proteger ecosistemas terrestres',
      color: 'from-[#56C02B] to-[#75cd4d]',
    },
    {
      id: 6,
      icon: Building2,
      title: 'Ciudades Sostenibles',
      description: 'Ciudades y comunidades inclusivas y resilientes',
      color: 'from-[#FD6925] to-[#fd8649]',
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'Patrimonio Cultural Local',
      description: 'Preservación y promoción del patrimonio histórico de la región',
      image: 'https://images.unsplash.com/photo-1756808818231-58248cf273f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmVzY28lMjB3b3JsZCUyMGhlcml0YWdlJTIwY3VsdHVyZXxlbnwxfHx8fDE3Njk5NTAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'En Curso',
      progress: 75,
    },
    {
      id: 2,
      title: 'Educación para la Sostenibilidad',
      description: 'Programas educativos sobre desarrollo sostenible y medio ambiente',
      image: 'https://images.unsplash.com/photo-1524591282491-edb48a0fca8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnklMjBzdHVkeSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3Njk5NTAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Activo',
      progress: 90,
    },
    {
      id: 3,
      title: 'Diversidad Cultural',
      description: 'Celebración y respeto de la diversidad cultural y el diálogo intercultural',
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGUlMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2OTk1MDI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Planificado',
      progress: 45,
    },
  ];

  const timeline = [
    { year: '2024', event: 'Inicio del programa UNESCO', status: 'completed' },
    { year: '2025', event: 'Proyectos de conservación', status: 'completed' },
    { year: '2026', event: 'Expansión internacional', status: 'active' },
    { year: '2027', event: 'Certificación avanzada', status: 'upcoming' },
  ];

  return (
    <section id="unesco" className="py-28 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-[#0F172A]/10 border border-[#0F172A]/20 rounded-full text-[#0F172A] text-sm mb-4">
            Iniciativas Globales
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
            UNESCO
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Proyectos e iniciativas alineadas con los Objetivos de Desarrollo Sostenible
          </p>
        </motion.div>

        {/* SDG Goals Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
            Objetivos de Desarrollo Sostenible
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className={`p-6 rounded-3xl border-none shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br ${goal.color} text-white overflow-hidden relative group cursor-pointer`}>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <goal.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{goal.title}</h4>
                    <p className="text-sm text-white/90 leading-relaxed">{goal.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
            Proyectos Activos
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-3xl border-none shadow-xl hover:shadow-2xl transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-[#0F172A] text-white border-2 border-white/20">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Progreso</span>
                        <span className="font-semibold text-[#0F172A]">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#0F172A] to-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
            Línea de Tiempo
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0F172A] via-blue-500 to-[#0F172A]/20 transform -translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="p-6 rounded-2xl border-none shadow-lg hover:shadow-xl transition-all bg-white">
                      <span className="text-3xl font-bold text-[#0F172A] mb-2 block">{item.year}</span>
                      <p className="text-slate-600">{item.event}</p>
                    </Card>
                  </div>
                  <div className="w-2/12 flex justify-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${item.status === 'completed'
                          ? 'bg-[#0F172A]'
                          : item.status === 'active'
                            ? 'bg-blue-600 animate-pulse'
                            : 'bg-slate-300'
                        }`}
                    >
                      {item.status === 'completed' && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Card className="max-w-4xl mx-auto p-12 rounded-3xl border-none shadow-2xl bg-[#0F172A] text-white">
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              Únete a Nuestras Iniciativas UNESCO
            </h3>
            <p className="text-lg mb-8 text-slate-300 max-w-2xl mx-auto">
              Participa en proyectos que generan impacto global y contribuyen al desarrollo sostenible
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Conoce Más
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
