import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { Lightbox } from '@/app/components/ui/Lightbox';

import { api } from '@/lib/api';

export function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const data = await api.getGallery();
                setGalleryImages(data);
            } catch (error) {
                console.error("Failed to load gallery", error);
            }
        };
        loadGallery();
    }, []);

    const getSpanClass = (size: string) => {
        switch (size) {
            case 'large': return 'md:col-span-2 md:row-span-2';
            case 'tall': return 'md:row-span-2';
            default: return '';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Lightbox
                isOpen={!!selectedImage}
                image={selectedImage?.image}
                title={selectedImage?.title}
                onClose={() => setSelectedImage(null)}
            />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-[#0F172A] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Volver al inicio</span>
                    </Link>
                    <h1 className="text-xl font-bold text-[#0F172A]">Galería Visual</h1>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">Momentos Destacados</h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Una colección de instantes que definen nuestra trayectoria académica y profesional.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {galleryImages.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all ${getSpanClass(item.size)}`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                <span className="text-sm text-blue-300 font-medium mb-1 block">{item.category}</span>
                                <h3 className="text-white text-xl font-bold flex items-center justify-between">
                                    {item.title}
                                    <Maximize2 className="w-5 h-5 opacity-70" />
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
