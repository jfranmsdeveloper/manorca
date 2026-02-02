import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function GalleryManager() {
    const [images, setImages] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [newImage, setNewImage] = useState({
        title: '',
        category: 'Eventos',
        image: '',
        size: 'medium'
    });

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const data = await api.getGallery();
            setImages(data);
        } catch (error) {
            toast.error('Error al cargar la galería');
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await api.uploadImage(file);
            setNewImage({ ...newImage, image: url });
            toast.success('Imagen subida correctamente');
        } catch (error) {
            toast.error('Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        if (!newImage.title || !newImage.image) {
            toast.error('Por favor completa los campos requeridos');
            return;
        }

        try {
            await api.saveGalleryImage(newImage);
            loadGallery();
            setNewImage({ title: '', category: 'Eventos', image: '', size: 'medium' });
            toast.success('Imagen añadida a la galería');
        } catch (error) {
            toast.error('Error al guardar la imagen');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar esta imagen?')) {
            try {
                await api.deleteGalleryImage(id);
                loadGallery();
                toast.success('Imagen eliminada');
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-800">Gestor de Galería Plus</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Añadir Nueva Imagen
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <Label>Título</Label>
                            <Input
                                value={newImage.title}
                                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                                placeholder="Ej. Graduación 2026"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Categoría</Label>
                            <select
                                className="w-full mt-1 p-2 border border-slate-200 rounded-lg bg-white"
                                value={newImage.category}
                                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                            >
                                <option value="Eventos">Eventos</option>
                                <option value="Campus">Campus</option>
                                <option value="Investigación">Investigación</option>
                                <option value="Deporte">Deporte</option>
                                <option value="Celebración">Celebración</option>
                                <option value="Infraestructura">Infraestructura</option>
                            </select>
                        </div>

                        <div>
                            <Label>Tamaño en Grid</Label>
                            <select
                                className="w-full mt-1 p-2 border border-slate-200 rounded-lg bg-white"
                                value={newImage.size}
                                onChange={(e) => setNewImage({ ...newImage, size: e.target.value })}
                            >
                                <option value="medium">Normal (1x1)</option>
                                <option value="large">Grande (2x2)</option>
                                <option value="tall">Alto (1x2)</option>
                            </select>
                        </div>

                        <div>
                            <Label>Imagen</Label>
                            <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {newImage.image ? (
                                    <img src={newImage.image} alt="Preview" className="h-32 mx-auto object-cover rounded-lg shadow-md" />
                                ) : (
                                    <div className="text-slate-400">
                                        <Upload className="w-8 h-8 mx-auto mb-2" />
                                        <span className="text-sm">{isUploading ? 'Subiendo...' : 'Click para subir imagen'}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button onClick={handleSave} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white mt-4">
                            Añadir a Galería
                        </Button>
                    </div>
                </Card>

                {/* Gallery Grid */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100"
                            >
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(item.id)}
                                        className="rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white text-xs font-medium truncate">{item.title}</p>
                                </div>
                            </motion.div>
                        ))}
                        {images.length === 0 && (
                            <div className="col-span-full py-12 text-center text-slate-400">
                                <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>No hay imágenes en la galería</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
