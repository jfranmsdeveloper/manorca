import { motion } from 'motion/react';
import { Target, Trophy, Users, Medal, Calendar } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

export function DeporteSection() {
  const featuredNews = {
    title: 'Campeonato Universitario 2026',
    subtitle: 'Nuestro equipo alcanza la final nacional',
    image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhdGhsZXRpY3MlMjBydW5uaW5nfGVufDF8fHx8MTc2OTk1MDI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '25 Feb 2026',
    category: 'Competencia',
  };

  const news = [
    {
      id: 1,
      title: 'Victoria en Torneo Regional',
      excerpt: 'El equipo de baloncesto logra un triunfo histórico',
      category: 'Baloncesto',
      date: '20 Feb 2026',
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGUlMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2OTk1MDI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Récord Personal en Atletismo',
      excerpt: 'Estudiante establece nueva marca en 100 metros',
      category: 'Atletismo',
      date: '18 Feb 2026',
      image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhdGhsZXRpY3MlMjBydW5uaW5nfGVufDF8fHx8MTc2OTk1MDI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Inauguración Nueva Piscina',
      excerpt: 'Instalaciones deportivas de primer nivel',
      category: 'Instalaciones',
      date: '15 Feb 2026',
      image: 'https://images.unsplash.com/photo-1762341118883-13bbd9d79927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMG9mZmljZXxlbnwxfHx8fDE3Njk5NTAyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const stats = [
    {
      icon: Trophy,
      value: '24',
      label: 'Campeonatos',
      color: 'from-[#0F172A] to-[#1E293B]',
      progress: 85,
    },
    {
      icon: Medal,
      value: '156',
      label: 'Medallas',
      color: 'from-[#1E293B] to-[#334155]',
      progress: 92,
    },
    {
      icon: Users,
      value: '450+',
      label: 'Atletas',
      color: 'from-[#334155] to-[#475569]',
      progress: 78,
    },
    {
      icon: Target,
      value: '12',
      label: 'Disciplinas',
      color: 'from-[#475569] to-[#64748B]',
      progress: 95,
    },
  ];

  return (
    <section id="deporte" className="py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-[#0F172A]/10 border border-[#0F172A]/20 rounded-full text-[#0F172A] text-sm mb-4">
            Logros y Actividades
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
            Deporte
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Noticias deportivas, logros y eventos atléticos
          </p>
        </motion.div>

        {/* Featured Hero News */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="relative overflow-hidden rounded-3xl border-none shadow-2xl group cursor-pointer">
            <div className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-[#0F172A] text-white border-2 border-white/20">
                    <Calendar className="w-3 h-3 mr-1" />
                    {featuredNews.date}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-none">
                    {featuredNews.category}
                  </Badge>
                  <Badge className="bg-blue-500 text-white border-none animate-pulse">
                    ✨ Destacado
                  </Badge>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {featuredNews.title}
                </h3>
                <p className="text-xl text-white/90 mb-6">
                  {featuredNews.subtitle}
                </p>
                <motion.button
                  whileHover={{ x: 10 }}
                  className="px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  Leer noticia completa →
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className={`p-6 rounded-3xl border-none shadow-lg hover:shadow-2xl transition-all bg-gradient-to-br ${stat.color} text-white overflow-hidden relative`}>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                <div className="relative z-10">
                  <stat.icon className="w-10 h-10 mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-white/90 mb-4">{stat.label}</div>
                  <Progress value={stat.progress} className="h-2 bg-white/20" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group overflow-hidden rounded-3xl border-none shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-[#0F172A] text-white border-none">
                    {item.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 mb-3">{item.date}</p>
                  <p className="text-[#0F172A] leading-relaxed">{item.excerpt}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-4 text-[#0F172A] hover:text-blue-700 font-semibold flex items-center gap-2"
                  >
                    Leer más
                    <motion.span>→</motion.span>
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto p-12 rounded-3xl border-none shadow-2xl bg-[#0F172A] text-white overflow-hidden relative">
            {/* Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10">
              <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
              <h3 className="text-3xl font-bold mb-4">
                Únete a Nuestros Equipos Deportivos
              </h3>
              <p className="text-lg mb-8 text-slate-300 max-w-2xl mx-auto">
                Descubre tu potencial atlético y forma parte de nuestra comunidad deportiva
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Información e Inscripciones
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
