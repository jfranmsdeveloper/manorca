import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, MapPin, X, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { api } from '@/lib/api';

interface Event {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    time: string;
    location: string;
    type: 'Conferencia' | 'Taller' | 'Seminario' | 'Otro';
    image?: string;
    description?: string;
}

export default function EventManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');

    // Form State
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        type: 'Conferencia'
    });

    // Load events from API
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const serverEvents = await api.getEvents();
                setEvents(serverEvents);
            } catch (error) {
                console.error("Failed to load events", error);
                toast.error('Error al cargar eventos');
            }
        };
        loadEvents();
    }, []);

    const saveEvents = (updatedEvents: Event[]) => {
        setEvents(updatedEvents);
        localStorage.setItem('manorca_events', JSON.stringify(updatedEvents));
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sunday
    };

    const handleDateClick = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        setNewEvent({ ...newEvent, date: dateStr, type: 'Conferencia' });
        setIsModalOpen(true);
    };

    const handleSaveEvent = async () => {
        if (!newEvent.title || !newEvent.date) {
            toast.error('Por favor completa los campos obligatorios');
            return;
        }

        const eventToSave: Event = {
            id: crypto.randomUUID(),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time || '09:00',
            location: newEvent.location || 'Online',
            type: newEvent.type as any || 'Otro',
            description: newEvent.description || '',
            image: newEvent.image
        };

        try {
            await api.saveEvent(eventToSave); // Assuming saveEvent handles both create/update or just create for now
            setEvents(prevEvents => [...prevEvents, eventToSave]);
            setIsModalOpen(false);
            setNewEvent({ type: 'Conferencia' }); // Reset form
            toast.success('Evento creado correctamente');
        } catch (error) {
            console.error("Error saving event:", error);
            toast.error('Error al guardar evento');
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (confirm('¿Eliminar evento?')) {
            try {
                await api.deleteEvent(id);
                setEvents(prevEvents => prevEvents.filter(e => e.id !== id));
                toast.success('Evento eliminado');
            } catch (error) {
                console.error("Error deleting event:", error);
                toast.error('Error al eliminar evento');
            }
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 rounded-2xl"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString();

            days.push(
                <motion.div
                    key={i}
                    layoutId={`day-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    onClick={() => handleDateClick(i)}
                    className={`h-32 rounded-2xl p-3 cursor-pointer transition-all duration-300 relative group overflow-hidden
                        ${isToday
                            ? 'bg-blue-500/10 border-2 border-blue-500 shadow-blue-500/20 shadow-lg'
                            : 'bg-white/40 hover:bg-white/60 border border-white/50 hover:border-white/80 hover:shadow-xl hover:-translate-y-1'
                        } backdrop-blur-md`}
                >
                    <div className="flex justify-between items-start">
                        <span className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-slate-700 group-hover:text-[#0F172A]'}`}>{i}</span>
                        {dayEvents.length > 0 && (
                            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                    </div>

                    <div className="mt-2 space-y-1.5 overflow-y-auto max-h-[calc(100%-30px)] custom-scrollbar">
                        {dayEvents.map(ev => (
                            <div key={ev.id} className="text-[10px] font-medium bg-[#0F172A]/90 text-white px-2 py-1 rounded-md shadow-sm backdrop-blur-sm truncate">
                                {ev.time} {ev.title}
                            </div>
                        ))}
                    </div>

                    {/* Hover Add Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/5 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-[#0F172A] p-1.5 rounded-full text-white shadow-lg">
                            <Plus className="w-4 h-4" />
                        </div>
                    </div>
                </motion.div>
            );
        }
        return days;
    };

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
        <div className="relative h-full flex flex-col p-6 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-[#0F172A] tracking-tight mb-1">Agenda y Eventos</h1>
                    <p className="text-slate-500 text-lg">Gestiona tus próximos compromisos con estilo.</p>
                </div>
                <div className="flex items-center gap-6 bg-white/30 backdrop-blur-xl p-2 pr-6 rounded-2xl border border-white/50 shadow-xl shadow-slate-900/5">
                    <div className="flex items-center bg-white/50 rounded-xl p-1 shadow-inner">
                        <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="hover:bg-white rounded-lg transition-all">
                            <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleNextMonth} className="hover:bg-white rounded-lg transition-all">
                            <ChevronRight className="w-5 h-5 text-slate-700" />
                        </Button>
                    </div>
                    <span className="font-bold text-2xl text-[#0F172A] min-w-[200px] text-center tracking-tight">
                        {monthNames[currentDate.getMonth()]} <span className="text-slate-400 font-light">{currentDate.getFullYear()}</span>
                    </span>
                </div>
            </div>

            <Card className="flex-1 p-6 border-white/40 shadow-2xl shadow-slate-900/5 bg-white/20 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden flex flex-col ring-1 ring-white/60">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-4 mb-6 text-center">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
                        <div key={d} className="text-sm font-bold text-slate-400/80 uppercase tracking-widest">{d}</div>
                    ))}
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {renderCalendar()}
                </div>
            </Card>

            {/* Upcoming List (Mini) - Glass Pill */}
            <div className="mt-8 bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-lg flex flex-col gap-4">
                <h3 className="font-bold text-[#0F172A] flex items-center gap-2 text-lg">
                    <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                    Próximos Eventos Globales
                </h3>
                <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                    {events
                        .filter(e => new Date(e.date) >= new Date())
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .slice(0, 5)
                        .map(e => (
                            <motion.div
                                key={e.id}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="min-w-[280px] bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm flex items-center gap-4 group cursor-pointer transition-all hover:shadow-md"
                            >
                                <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-white">
                                    {e.image ? (
                                        <img src={e.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <CalendarIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-[#0F172A] truncate">{e.title}</div>
                                    <div className="text-sm text-slate-500 truncate">{new Date(e.date).toLocaleDateString()} • {e.location}</div>
                                </div>
                                <button onClick={(ev) => { ev.stopPropagation(); handleDeleteEvent(e.id); }} className="h-8 w-8 flex items-center justify-center rounded-full text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    {events.length === 0 && <span className="text-slate-400 italic">No hay eventos próximos para mostrar.</span>}
                </div>
            </div>

            {/* Add Event Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 w-full max-w-lg relative z-10 shadow-2xl border border-white/40 ring-1 ring-black/5"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0F172A] transition-colors">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">Nuevo Evento</h2>
                                <p className="text-slate-500">Programar para el <span className="font-semibold text-blue-600">{new Date(selectedDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span></p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-800 ml-1">Título del Evento</label>
                                    <Input
                                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-blue-500/20 active:scale-[0.99] transition-all"
                                        value={newEvent.title || ''}
                                        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                        placeholder="Ej. Conferencia de Innovación"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-800 ml-1">Hora</label>
                                        <Input
                                            type="time"
                                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                                            value={newEvent.time || ''}
                                            onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-800 ml-1">Tipo</label>
                                        <select
                                            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            value={newEvent.type}
                                            onChange={e => setNewEvent({ ...newEvent, type: e.target.value as any })}
                                        >
                                            <option value="Conferencia">Conferencia</option>
                                            <option value="Taller">Taller</option>
                                            <option value="Seminario">Seminario</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-800 ml-1">Ubicación</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200"
                                            value={newEvent.location || ''}
                                            onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                            placeholder="Madrid, España (o enlace Zoom)"
                                        />
                                    </div>
                                </div>

                                {/* Description Field */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline px-1">
                                        <label className="text-sm font-semibold text-slate-800">Descripción</label>
                                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                            {(newEvent.description?.length || 0)}/800
                                        </span>
                                    </div>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                        value={newEvent.description || ''}
                                        onChange={e => {
                                            if (e.target.value.length <= 800) {
                                                setNewEvent({ ...newEvent, description: e.target.value });
                                            }
                                        }}
                                        placeholder="Escribe los detalles importantes del evento..."
                                        rows={4}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300">
                                    <label className="text-sm font-semibold text-slate-800 block mb-3">Imagen de Portada</label>
                                    <div className="flex items-center gap-4">
                                        {newEvent.image && (
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm relative group">
                                                <img src={newEvent.image} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center transition-all">
                                                    <span className="text-white text-xs font-bold">Cambiar</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="block w-full text-sm text-slate-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-blue-50 file:text-blue-700
                                                    hover:file:bg-blue-100
                                                    transition-all cursor-pointer"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const toastId = toast.loading('Subiendo imagen...');
                                                        try {
                                                            const url = await api.uploadImage(file);
                                                            setNewEvent(prev => ({ ...prev, image: url }));
                                                            toast.success('Imagen subida', { id: toastId });
                                                        } catch (error) {
                                                            console.error(error);
                                                            toast.error('Error al subir imagen', { id: toastId });
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl h-12 shadow-xl shadow-slate-900/10 text-base font-medium transition-transform active:scale-[0.98]" onClick={handleSaveEvent}>
                                    Guardar Evento
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
