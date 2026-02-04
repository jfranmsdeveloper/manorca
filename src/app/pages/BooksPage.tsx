import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft } from 'lucide-react';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';

export function BooksPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await api.getBooks();
            setBooks(data);
        } catch (error) {
            console.error('Error loading books');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="uppercase tracking-widest text-xs font-medium">Volver</span>
                    </Link>
                    <h1 className="font-serif text-xl tracking-wider">LIBRERÍA PERSONAL</h1>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>
            </div>

            <main className="container mx-auto px-6 pt-32 pb-20">
                {/* Hero Literal */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 font-serif relative z-10"
                    >
                        Lecturas Esenciales
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-light"
                    >
                        Una colección curada de libros que han moldeado mi pensamiento, mi carrera y mi visión del mundo.
                    </motion.p>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 perspective-1000">
                    {books.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            onClick={() => setSelectedBook(book)}
                            className="group cursor-pointer relative"
                        >
                            {/* Book Cover 3D Effect */}
                            <div className="relative aspect-[2/3] rounded-sm shadow-2xl transition-all duration-500 transform-gpu group-hover:rotate-y-[-10deg] group-hover:shadow-purple-900/20">
                                <div className="absolute inset-0 bg-white/5 rounded-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity" /> {/* Gloss */}
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-full h-full object-cover rounded-sm shadow-[5px_0_15px_rgba(0,0,0,0.5)]"
                                />
                                {/* Spine shadow */}
                                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-r from-white/40 to-transparent z-20" />
                            </div>

                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-purple-400 transition-colors">{book.title}</h3>
                                <p className="text-sm text-slate-500 uppercase tracking-widest mb-3">{book.author}</p>
                                <div className="flex items-center justify-center gap-1 text-yellow-500/80">
                                    {Array.from({ length: book.rating }).map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedBook && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBook(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            layoutId={selectedBook.id}
                            className="relative bg-[#0F0F0F] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden"
                        >
                            <div className="md:w-1/3 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10 md:hidden" />
                                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover min-h-[300px]" />
                            </div>
                            <div className="flex-1 p-8 md:p-12 flex flex-col">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">{selectedBook.title}</h2>
                                        <p className="text-purple-400 text-lg">{selectedBook.author}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedBook(null)}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6 rotate-180" />
                                    </button>
                                </div>

                                <div className="flex gap-2 mb-8">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < selectedBook.rating ? 'text-yellow-400 fill-current' : 'text-slate-800'}`}
                                        />
                                    ))}
                                </div>

                                <div className="relative pl-8 border-l-2 border-purple-500/30">
                                    <Quote className="absolute -top-1 -left-3 w-6 h-6 text-purple-500 bg-[#0F0F0F] p-1" />
                                    <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                                        "{selectedBook.summary}"
                                    </p>
                                </div>

                                <div className="mt-auto pt-12 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                        <img src="/logo.png" className="w-6 opacity-50 brightness-0 invert" alt="Logo" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-500">Recomendado por</p>
                                        <p className="text-sm font-medium">Manuel Ortega Caballero</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
