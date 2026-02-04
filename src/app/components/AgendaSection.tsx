import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';

export function AgendaSection() {
  const events = [
    {
      id: 1,
      date: '15',
      month: 'MAR',
      year: '2026',
      title: 'Conferencia Internacional de Educación',
      time: '09:00 - 17:00',
      location: 'Auditorio Principal',
      category: 'Conferencia',
      color: 'bg-[#0F172A]',
      description: 'Tendencias en educación superior y metodologías innovadoras.',
    },
    {
      id: 2,
      date: '22',
      month: 'MAR',
      year: '2026',
      title: 'Seminario de Investigación Aplicada',
      time: '10:00 - 14:00',
      location: 'Sala de Seminarios',
      category: 'Seminario',
      color: 'bg-[#1E293B]',
      description: 'Presentación de proyectos de investigación en curso.',
    },
    {
      id: 3,
      date: '05',
      month: 'ABR',
      year: '2026',
      title: 'Workshop: Publicaciones Científicas',
      time: '15:00 - 18:00',
      location: 'Biblioteca Central',
      category: 'Workshop',
      color: 'bg-[#334155]',
      description: 'Cómo publicar en revistas de alto impacto.',
    },
    {
      id: 4,
      date: '18',
      month: 'ABR',
      year: '2026',
      title: 'Encuentro Deportivo Interuniversitario',
      time: '08:00 - 20:00',
      location: 'Polideportivo',
      category: 'Deporte',
      color: 'bg-[#475569]',
      description: 'Competencias en diversas disciplinas deportivas.',
    },
    {
      id: 5,
      date: '10',
      month: 'MAY',
      year: '2026',
      title: 'Jornada UNESCO: Cultura y Patrimonio',
      time: '09:30 - 16:30',
      location: 'Centro Cultural',
      category: 'UNESCO',
      color: 'bg-[#0F172A]',
      description: 'Preservación del patrimonio cultural local.',
    },
  ];

  const categories = ['Todos', 'Conferencia', 'Seminario', 'Workshop', 'Deporte', 'UNESCO'];

  return (
    <section id="agenda" className="py-28 bg-muted/30 dark:bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-[#0F172A]/10 border border-[#0F172A]/20 rounded-full text-[#0F172A] text-sm mb-4">
            Próximos Eventos
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Agenda Académica
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Mantente al día con nuestros eventos, conferencias y actividades programadas
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full transition-all ${index === 0
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground shadow-md border border-border'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline Events */}
        <div className="max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index < events.length - 1 && (
                <div className="absolute left-[74px] top-32 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="flex flex-col md:flex-row gap-6 p-6 bg-card shadow-xl hover:shadow-2xl rounded-3xl border border-border overflow-hidden">
                  {/* Date Badge */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      className={`w-32 h-32 ${event.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <span className="text-4xl font-bold relative z-10">{event.date}</span>
                      <span className="text-sm uppercase tracking-wider relative z-10">{event.month}</span>
                      <span className="text-xs opacity-80 relative z-10">{event.year}</span>
                    </motion.div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <Badge className={`${event.color} text-white border-none mb-3`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {event.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground mb-2 hover:text-blue-700 transition-colors cursor-pointer">
                          {event.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="mt-4 text-foreground hover:text-blue-700 font-semibold flex items-center gap-2 group"
                    >
                      Ver detalles
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary/90 transition-all flex items-center gap-3 mx-auto"
          >
            <Calendar className="w-5 h-5" />
            Ver Calendario Completo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
