import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Book, Star } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';
import ImageEditor from './ImageEditor';

export default function BookManager() {
    const [books, setBooks] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [editingFile, setEditingFile] = useState<File | null>(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        summary: '',
        rating: 5,
        cover: '',
        link: ''
    });

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditingFile(file);
            e.target.value = '';
        }
    };

    const handleEditorSave = async (processedFile: File) => {
        setEditingFile(null);
        try {
            setIsUploading(true);
            const url = await api.uploadImage(processedFile);
            setNewBook(prev => ({ ...prev, cover: url }));
            toast.success('Portada lista');
        } catch (error) {
            toast.error('Error al subir la portada');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        if (!newBook.title || !newBook.cover) {
            toast.error('Título y portada son obligatorios');
            return;
        }

        try {
            await api.saveBook(newBook);
            loadBooks();
            setNewBook({ title: '', author: '', summary: '', rating: 5, cover: '', link: '' });
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
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Lecturas Recomendadas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Formulario */}
                <Card className="md:col-span-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-200 h-fit">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-purple-600" /> Nuevo Libro
                    </h3>

                    <div className="space-y-4">
                        {/* Portada Upload */}
                        <div className="group relative aspect-[2/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden hover:border-purple-400 transition-colors cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                            />
                            {newBook.cover ? (
                                <>
                                    <img src={newBook.cover} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                        Cambiar Portada
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4 text-center">
                                    <Book className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="text-sm font-medium">{isUploading ? 'Subiendo...' : 'Subir Portada'}</span>
                                    <span className="text-xs opacity-70 mt-1">Formato vertical ideal</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <Label>Título</Label>
                            <Input
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                placeholder="El Principito"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Autor</Label>
                            <Input
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                placeholder="Antoine de Saint-Exupéry"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Valoración (1-5)</Label>
                            <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setNewBook({ ...newBook, rating: star })}
                                        className={`transition-colors ${star <= newBook.rating ? 'text-yellow-400' : 'text-slate-200'}`}
                                    >
                                        <Star className="w-6 h-6 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label>Reseña breve</Label>
                            <Textarea
                                value={newBook.summary}
                                onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
                                placeholder="Una historia mágica sobre..."
                                className="mt-1 resize-none"
                                rows={3}
                            />
                        </div>

                        <Button onClick={handleSave} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white">
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
                                className="group relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                            >
                                <div className="aspect-[2/3] overflow-hidden relative bg-slate-100">
                                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" /> {book.rating}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="absolute top-2 left-2 p-2 bg-red-500/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h4 className="font-bold text-slate-900 leading-tight mb-1">{book.title}</h4>
                                    <p className="text-sm text-slate-500 mb-2">{book.author}</p>
                                    <p className="text-xs text-slate-600 line-clamp-3">{book.summary}</p>
                                </div>
                            </motion.div>
                        ))}
                        {books.length === 0 && (
                            <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
                                <Book className="w-16 h-16 mx-auto mb-4 opacity-10" />
                                <p className="text-lg font-medium text-slate-400">Tu biblioteca está vacía</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Editor Modal */}
            {editingFile && (
                <ImageEditor
                    file={editingFile}
                    onSave={handleEditorSave}
                    onCancel={() => setEditingFile(null)}
                />
            )}
        </div>
    );
}
