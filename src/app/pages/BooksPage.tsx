import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, BookOpen, X } from 'lucide-react';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';

export function BooksPage() {
    const [ownBooks, setOwnBooks] = useState<any[]>([]);
    const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'own' | 'recommended'>('own');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const allBooks = await api.getBooks();
            const own = allBooks.filter((b: any) => b.category === 'own');
            const recommended = allBooks.filter((b: any) => b.category !== 'own');
            setOwnBooks(own);
            setRecommendedBooks(recommended);
        } catch (error) {
            console.error('Error loading books');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
                        <div className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="uppercase tracking-widest text-xs font-semibold">Volver</span>
                    </Link>
                    <h1 className="font-serif text-xl tracking-wider text-slate-900 font-bold">LIBRERÍA PERSONAL</h1>
                    <div className="w-20"></div>
                </div>
            </div>

            <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/40 shadow-sm mb-6"
                    >
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Colección Curada</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 font-serif text-slate-900"
                    >
                        Lecturas Esenciales
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        Una colección seleccionada de libros que han moldeado mi pensamiento, mi carrera y mi visión del mundo educativo.
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="bg-slate-200/50 p-1 rounded-full flex items-center relative">
                        {/* Active Tab Background */}
                        <motion.div
                            layout
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className="absolute inset-y-1 bg-white rounded-full shadow-sm z-0"
                            style={{
                                left: activeTab === 'own' ? '4px' : '50%',
                                right: activeTab === 'own' ? '50%' : '4px',
                                width: 'calc(50% - 4px)'
                            }}
                        />

                        <button
                            onClick={() => setActiveTab('own')}
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${activeTab === 'own' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            MIS PUBLICACIONES
                        </button>
                        <button
                            onClick={() => setActiveTab('recommended')}
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${activeTab === 'recommended' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            RECOMENDADOS
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'own' && ownBooks.length > 0 && (
                        <motion.div
                            key="own"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                                {ownBooks.map((book: any, index: number) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setSelectedBook(book)}
                                        className="group cursor-pointer relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100 flex gap-6 items-start"
                                    >
                                        <div className="relative w-1/3 aspect-[2/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 py-2">
                                            <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-3">
                                                Autor
                                            </div>
                                            <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                                                {book.title}
                                            </h4>
                                            <div className="flex items-center gap-1 mb-4">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                                                {book.summary}
                                            </p>
                                            <span className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Ver detalle <ChevronLeft className="w-4 h-4 rotate-180" />
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'recommended' && (
                        <motion.div
                            key="recommended"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                                {recommendedBooks.map((book: any, index: number) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setSelectedBook(book)}
                                        className="group cursor-pointer relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100 flex gap-6 items-start"
                                    >
                                        <div className="relative w-1/3 aspect-[2/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 py-2">
                                            <div className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-3">
                                                Recomendado
                                            </div>
                                            <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                                                {book.title}
                                            </h4>
                                            <div className="flex items-center gap-1 mb-3">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-sm font-bold text-slate-800 mb-2">
                                                {book.author}
                                            </p>

                                            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                                                {book.summary}
                                            </p>

                                            <span className="text-purple-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Ver detalle <ChevronLeft className="w-4 h-4 rotate-180" />
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Book Detail Modal */}
            <AnimatePresence>
                {selectedBook && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBook(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`book-${selectedBook.id}`}
                            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="grid md:grid-cols-2">
                                <div className="bg-slate-50 p-8 md:p-12 flex items-center justify-center">
                                    <div className="relative w-48 md:w-64 aspect-[2/3] shadow-2xl rounded-lg overflow-hidden">
                                        <img
                                            src={selectedBook.cover}
                                            alt={selectedBook.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="p-8 md:p-12">
                                    <button
                                        onClick={() => setSelectedBook(null)}
                                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-slate-500" />
                                    </button>

                                    <div className="mb-2">
                                        <span className="text-blue-600 font-bold tracking-wider text-xs uppercase bg-blue-50 px-3 py-1 rounded-full">
                                            {selectedBook.category === 'own' ? 'Publicación Original' : 'Recomendación'}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                                        {selectedBook.title}
                                    </h2>
                                    <p className="text-lg text-slate-500 font-medium mb-6">
                                        {selectedBook.author}
                                    </p>

                                    <div className="flex items-center gap-1 mb-8">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < selectedBook.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-6 text-slate-600 leading-relaxed">
                                        <p className="border-l-4 border-blue-200 pl-4 italic bg-slate-50/50 py-2">
                                            "{selectedBook.summary || 'Sin descripción disponible.'}"
                                        </p>

                                        {/* Technical Details */}
                                        {selectedBook.technicalDetails && Object.values(selectedBook.technicalDetails).some(v => v) && (
                                            <div className="mt-8 pt-6 border-t border-slate-100">
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4" />
                                                    Ficha Técnica
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                                                    {selectedBook.technicalDetails.pages && (
                                                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Páginas</span>
                                                            <span className="text-sm font-semibold text-slate-900">{selectedBook.technicalDetails.pages}</span>
                                                        </div>
                                                    )}
                                                    {selectedBook.technicalDetails.language && (
                                                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Idioma</span>
                                                            <span className="text-sm font-semibold text-slate-900">{selectedBook.technicalDetails.language}</span>
                                                        </div>
                                                    )}
                                                    {selectedBook.technicalDetails.editorial && (
                                                        <div className="col-span-1 sm:col-span-2 flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Editorial</span>
                                                            <span className="text-sm font-semibold text-slate-900 text-right pl-4">{selectedBook.technicalDetails.editorial}</span>
                                                        </div>
                                                    )}
                                                    {selectedBook.technicalDetails.collection && (
                                                        <div className="col-span-1 sm:col-span-2 flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Colección</span>
                                                            <span className="text-sm font-semibold text-slate-900 text-right pl-4">{selectedBook.technicalDetails.collection}</span>
                                                        </div>
                                                    )}
                                                    {selectedBook.technicalDetails.binding && (
                                                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Encuadernación</span>
                                                            <span className="text-sm font-semibold text-slate-900">{selectedBook.technicalDetails.binding}</span>
                                                        </div>
                                                    )}
                                                    {selectedBook.technicalDetails.year && (
                                                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Año</span>
                                                            <span className="text-sm font-semibold text-slate-900">{selectedBook.technicalDetails.year}</span>
                                                        </div>
                                                    )}
                                                    {selectedBook.technicalDetails.isbn && (
                                                        <div className="col-span-1 sm:col-span-2 flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">ISBN</span>
                                                            <span className="text-sm font-family-mono text-slate-600 tracking-wide">{selectedBook.technicalDetails.isbn}</span>
                                                        </div>
                                                    )}
                                                    {(selectedBook.technicalDetails.height || selectedBook.technicalDetails.width) && (
                                                        <div className="col-span-1 sm:col-span-2 flex items-center justify-between py-2 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500 font-medium">Dimensiones</span>
                                                            <span className="text-sm font-semibold text-slate-900">
                                                                {selectedBook.technicalDetails.height ? `${selectedBook.technicalDetails.height}cm` : ''}
                                                                {selectedBook.technicalDetails.width ? ` x ${selectedBook.technicalDetails.width}cm` : ''}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

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
