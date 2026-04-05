import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Book, Star, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function BookManager() {
    const [books, setBooks] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // Initial state for proper reset
    const initialBookState = {
        title: '',
        author: '',
        summary: '',
        rating: 5,
        cover: '',
        link: '',
        category: 'recommended', // 'own' | 'recommended'
        technicalDetails: {
            pages: '',
            editorial: '',
            language: '',
            binding: '',
            isbn: '',
            year: '',
            location: '',
            releaseDate: '',
            height: '',
            width: '',
            thickness: '',
            weight: '',
            collection: ''
        }
    };

    const [newBook, setNewBook] = useState(initialBookState);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await api.getBooks();
            setBooks(data);
        } catch (error) {
            toast.error('Error al cargar la librería');
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            // Upload directly without editing
            const url = await api.uploadImage(file);
            setNewBook(prev => ({ ...prev, cover: url }));
            toast.success('Portada subida correctamente');
        } catch (error) {
            toast.error('Error al subir la portada');
            console.error(error);
        } finally {
            setIsUploading(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleTechnicalChange = (field: string, value: string) => {
        setNewBook(prev => ({
            ...prev,
            technicalDetails: {
                ...prev.technicalDetails,
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        if (!newBook.title || !newBook.cover) {
            toast.error('Título y portada son obligatorios');
            return;
        }

        try {
            await api.saveBook(newBook);
            loadBooks();
            setNewBook(initialBookState);
            toast.success('Libro añadido a la estantería');
        } catch (error) {
            toast.error('Error al guardar el libro');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar este libro de la colección?')) {
            try {
                await api.deleteBook(id);
                loadBooks();
                toast.success('Libro eliminado');
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Gestión de Librería</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Formulario */}
                <Card className="md:col-span-4 p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200 h-fit">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                        <Plus className="w-5 h-5 text-blue-600" /> Nuevo Libro
                    </h3>

                    <div className="space-y-4">
                        {/* Category Selection */}
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/50 rounded-lg">
                            <button
                                onClick={() => setNewBook({ ...newBook, category: 'own' })}
                                className={`py-2 px-3 text-sm font-medium rounded-md transition-all ${newBook.category === 'own'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Publicación Propia
                            </button>
                            <button
                                onClick={() => setNewBook({ ...newBook, category: 'recommended' })}
                                className={`py-2 px-3 text-sm font-medium rounded-md transition-all ${newBook.category === 'recommended'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Recomendado
                            </button>
                        </div>

                        {/* Portada Upload */}
                        <div className="group relative aspect-[2/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                disabled={isUploading}
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
                            />
                            {newBook.cover ? (
                                <>
                                    <img src={newBook.cover} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium backdrop-blur-sm">
                                        <Upload className="w-5 h-5 mr-2" /> Cambiar
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4 text-center group-hover:bg-slate-50/50 transition-colors">
                                    {isUploading ? (
                                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                                    ) : (
                                        <Book className="w-10 h-10 mb-2 opacity-50" />
                                    )}
                                    <span className="text-sm font-medium text-slate-600">
                                        {isUploading ? 'Subiendo...' : 'Subir Portada'}
                                    </span>
                                    <span className="text-xs opacity-70 mt-1">Formato vertical</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <Label className="text-slate-700">Título</Label>
                            <Input
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                placeholder="El Principito"
                                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                        </div>

                        <div>
                            <Label className="text-slate-700">Autor</Label>
                            <Input
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                placeholder="Antoine de Saint-Exupéry"
                                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                        </div>

                        <div>
                            <Label className="text-slate-700">Sinopsis</Label>
                            <Textarea
                                value={newBook.summary}
                                onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
                                placeholder="Breve descripción..."
                                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 min-h-[100px]"
                            />
                        </div>

                        {/* Technical Details Section */}
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-4">
                            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <Book className="w-4 h-4 text-slate-400" />
                                Información Técnica (Opcional)
                            </h4>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-1">
                                    <Label className="text-xs text-slate-500">Páginas</Label>
                                    <Input
                                        value={newBook.technicalDetails?.pages || ''}
                                        onChange={(e) => handleTechnicalChange('pages', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="100"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Label className="text-xs text-slate-500">Idioma</Label>
                                    <Input
                                        value={newBook.technicalDetails?.language || ''}
                                        onChange={(e) => handleTechnicalChange('language', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="Castellano"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label className="text-xs text-slate-500">Editorial</Label>
                                    <Input
                                        value={newBook.technicalDetails?.editorial || ''}
                                        onChange={(e) => handleTechnicalChange('editorial', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="Nombre Editorial"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label className="text-xs text-slate-500">Colección</Label>
                                    <Input
                                        value={newBook.technicalDetails?.collection || ''}
                                        onChange={(e) => handleTechnicalChange('collection', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="Ej: Educación / Poemario"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Label className="text-xs text-slate-500">Encuadernación</Label>
                                    <Input
                                        value={newBook.technicalDetails?.binding || ''}
                                        onChange={(e) => handleTechnicalChange('binding', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="Tapa blanda"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Label className="text-xs text-slate-500">Año Edición</Label>
                                    <Input
                                        value={newBook.technicalDetails?.year || ''}
                                        onChange={(e) => handleTechnicalChange('year', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="2020"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label className="text-xs text-slate-500">ISBN</Label>
                                    <Input
                                        value={newBook.technicalDetails?.isbn || ''}
                                        onChange={(e) => handleTechnicalChange('isbn', e.target.value)}
                                        className="h-8 text-sm bg-white" placeholder="978-..."
                                    />
                                </div>
                                <div className="col-span-2 border-t border-slate-200/60 my-2 pt-2">
                                    <span className="text-xs font-semibold text-slate-400 block mb-2">Dimensiones</span>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <Label className="text-[10px] text-slate-400">Alto (cm)</Label>
                                            <Input
                                                value={newBook.technicalDetails?.height || ''}
                                                onChange={(e) => handleTechnicalChange('height', e.target.value)}
                                                className="h-7 text-xs bg-white"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[10px] text-slate-400">Ancho (cm)</Label>
                                            <Input
                                                value={newBook.technicalDetails?.width || ''}
                                                onChange={(e) => handleTechnicalChange('width', e.target.value)}
                                                className="h-7 text-xs bg-white"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[10px] text-slate-400">Peso (gr)</Label>
                                            <Input
                                                value={newBook.technicalDetails?.weight || ''}
                                                onChange={(e) => handleTechnicalChange('weight', e.target.value)}
                                                className="h-7 text-xs bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label className="text-slate-700">Valoración (1-5)</Label>
                            <div className="flex items-center gap-1 mt-1 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setNewBook({ ...newBook, rating: star })}
                                        className={`transition-all p-1 hover:scale-110 ${star <= newBook.rating ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                                    >
                                        <Star className="w-6 h-6 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleSave}
                            disabled={isUploading}
                            className="w-full bg-[#0F172A] hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            Guardar Libro
                        </Button>
                    </div>
                </Card>

                {/* Grid de Libros */}
                <div className="md:col-span-8">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <motion.div
                                key={book.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-[2/3] overflow-hidden relative bg-slate-100">
                                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {book.rating}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="absolute top-2 left-2 p-2 bg-red-500/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h4 className="font-bold text-slate-900 leading-tight mb-1 line-clamp-1">{book.title}</h4>
                                    <p className="text-sm text-slate-500 mb-3">{book.author}</p>
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed opacity-80">{book.summary}</p>
                                </div>
                            </motion.div>
                        ))}
                        {books.length === 0 && (
                            <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                                <Book className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p className="text-lg font-medium text-slate-500">Tu biblioteca está vacía</p>
                                <p className="text-sm text-slate-400 mt-1">Añade tu primera lectura recomendada</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
