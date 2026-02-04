import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Filter, Ticket } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export function EventosSection() {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [dynamicEvents, setDynamicEvents] = useState<any[]>([]);

  const filters = ['Todos', 'Conferencia', 'Taller', 'Seminario', 'Workshop', 'Social', 'Deportivo', 'Cultural', 'Otro'];

  // Premium Glass Button Styles
  const glassButtonActive = "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(15,23,42,0.3)] border border-primary/50 backdrop-blur-md";
  const glassButtonInactive = "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-700/60 text-muted-foreground shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90 hover:scale-105";


  const staticEvents = [
    {
      id: 1,
      title: 'Simposio Internacional de Investigación',
      date: '2026-03-15',
      time: '09:00 - 18:00',
      location: 'Auditorio Central',
      attendees: 250,
      category: 'Conferencia',
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwZW9wbGUlMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2OTk1MDI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Inscripciones Abiertas',
      daysUntil: 12,
    },
    // ... keep a few static ones for "fullness" or remove if user wants pure dynamic. Let's keep one.
    {
      id: 2,
      title: 'Maratón Universitaria 2026',
      date: '2026-04-18',
      time: '07:00 - 12:00',
      location: 'Campus Deportivo',
      attendees: 320,
      category: 'Deportivo',
      image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhdGhsZXRpY3MlMjBydW5uaW5nfGVufDF8fHx8MTc2OTk1MDI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Inscripciones Abiertas',
      daysUntil: 46,
    },
  ];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await api.getEvents();
        if (data && data.length > 0) {
          const mapped = data.map((e: any) => ({
            id: e.id,
            title: e.title,
            date: e.date,
            time: e.time || 'Horario por definir',
            location: e.location || 'Campus',
            attendees: 0,
            category: e.type || e.category || 'Evento',
            image: e.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
            status: 'Confirmado',
            daysUntil: e.date ? Math.ceil((new Date(e.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0
          }));
          setDynamicEvents(mapped);
        }
      } catch (error) {
        console.error("Failed to load events", error);
      }
    };
    loadEvents();
  }, []);

  const events = [...dynamicEvents, ...staticEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Conferencia: 'bg-[#0F172A] text-white',
      Workshop: 'bg-blue-600 text-white',
      Social: 'bg-slate-700 text-white',
      Deportivo: 'bg-slate-800 text-white',
      Cultural: 'bg-blue-800 text-white',
    };
    return colors[category] || 'bg-slate-500 text-white';
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Abiertas')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status.includes('Últimos')) return 'bg-red-50 text-red-700 border-red-200';
    if (status.includes('Próximamente')) return 'bg-slate-50 text-slate-600 border-slate-200';
    return 'bg-slate-100 text-[#0F172A] border-slate-300';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <section id="eventos" className="py-28 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-muted rounded-full border border-border text-muted-foreground text-sm mb-4">
            Próximas Actividades
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Eventos
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Participa en nuestros eventos académicos, deportivos y culturales
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-slate-500">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filtrar:</span>
          </div>
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter)}
              className={`relative px-6 py-3 rounded-full transition-all duration-300 font-medium ${selectedFilter === filter
                ? glassButtonActive
                : glassButtonInactive
                }`}
            >
              <div className={`absolute inset-0 rounded-full opacity-20 pointer-events-none ${selectedFilter === filter ? 'bg-gradient-to-t from-white/20 to-transparent' : 'hidden'}`} />
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-3xl border border-border bg-card shadow-xl hover:shadow-2xl transition-all h-full flex flex-col hover:border-primary">
                {/* Event Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />

                  {/* Countdown Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                      <div className="text-2xl font-bold text-primary">{event.daysUntil}</div>
                      <div className="text-xs text-slate-500">días</div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <Badge className={`absolute top-4 right-4 ${getCategoryColor(event.category)} border-none`}>
                    {event.category}
                  </Badge>
                </div>

                {/* Event Details */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Clock className="w-4 h-4 text-foreground flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <MapPin className="w-4 h-4 text-foreground flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Users className="w-4 h-4 text-foreground flex-shrink-0" />
                      <span>{event.attendees} asistentes</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge className={`${getStatusColor(event.status)} border mb-4 w-fit`}>
                    {event.status}
                  </Badge>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl group/btn"
                    onClick={() => toast.info('El registro estará disponible próximamente')}
                  >
                    <Ticket className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    Registrarse
                  </Button>
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
          className="mt-20 text-center"
        >
          <Card className="max-w-4xl mx-auto p-12 rounded-3xl border-none shadow-2xl bg-card text-card-foreground">
            <Calendar className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              ¿Organizas un Evento?
            </h3>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Publica tu evento en nuestra plataforma y alcanza a toda la comunidad académica
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.info('Contacta con administración para publicar un evento')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Publicar Evento
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </section >
  );
}
