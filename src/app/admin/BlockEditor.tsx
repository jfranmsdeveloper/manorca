import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Save, ArrowLeft, Image } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function BlockEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [category, setCategory] = useState('Investigación');
    const [initialContent] = useState<PartialBlock[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize editor
    const editor = useCreateBlockNote({
        initialContent: initialContent,
    });

    // Load data if editing existing post
    useEffect(() => {
        if (id && id !== 'new') {
            api.getArticles().then(savedArticles => {
                const article = savedArticles.find((a: any) => a.id === id);

                if (article) {
                    setTitle(article.title);
                    setCoverImage(article.image || '');
                    setCategory(article.category);

                    // Load blocks into editor
                    if (article.content) {
                        editor.replaceBlocks(editor.document, article.content);
                    }
                }
            });
        }
        setIsLoading(false);
    }, [id, editor]);

    const handleSave = async () => {
        if (!title) {
            toast.error('Por favor añade un título');
            return;
        }

        // Generate excerpt from blocks
        let excerpt = '';
        for (const block of editor.document) {
            if (block.content) {
                const text = Array.isArray(block.content)
                    ? block.content.map((c: any) => c.text || '').join(' ')
                    : (block.content as any).text || '';

                if (text) {
                    excerpt += text + ' ';
                }
                if (excerpt.length > 150) break;
            }
        }
        excerpt = excerpt.slice(0, 150) + (excerpt.length > 150 ? '...' : '');

        const newArticle = {
            id: id === 'new' ? crypto.randomUUID() : id,
            title,
            image: coverImage,
            category,
            content: editor.document,
            date: new Date().toISOString(),
            status: 'published',
            excerpt: excerpt || "Artículo sin contenido previo.",
            tags: ['Nuevo']
        };

        try {
            await api.saveArticle(newArticle);
            toast.success('Publicación guardada correctamente');
            navigate('/admin');
        } catch (error) {
            toast.error('Error al guardar la publicación');
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 animate-pulse font-medium">Cargando editor...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20 relative overflow-hidden">
            {/* Ambient Background Blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-pink-400/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Header Actions - Floating Glass Bar */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-4 z-50 mx-auto max-w-5xl px-4 mb-8"
            >
                <div className="backdrop-blur-2xl bg-white/70 border border-white/60 rounded-2xl p-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin')}
                        className="text-slate-500 hover:text-slate-800 hover:bg-black/5 transition-colors gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancelar
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center text-xs font-semibold text-slate-400 px-4 border-r border-slate-200 mr-1 uppercase tracking-wider">
                            {id === 'new' ? 'Nueva Publicación' : 'Editando Publicación'}
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleSave}
                            className="text-slate-600 hover:text-slate-900 hover:bg-black/5 border border-transparent hover:border-black/5"
                        >
                            Guardar Borrador
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-black/80 hover:bg-black text-white shadow-lg shadow-black/10 border border-transparent backdrop-blur-md transition-all"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Publicar
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8 px-4 relative z-10">
                {/* Meta Data Card - Liquid Glass */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/60 border border-white/80 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/50"
                >
                    {/* Iridescent shine effect on top edge */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>

                    <div className="space-y-8 relative z-10">
                        {/* Title Input */}
                        <div>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Escribe un título brillante..."
                                className="text-4xl font-black bg-transparent border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-slate-300 text-slate-800 h-auto py-2 tracking-tight"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200/50">
                            {/* Category Selector */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Categoría</label>
                                <div className="relative group">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full rounded-2xl bg-white/50 border border-white/60 text-slate-700 p-4 text-sm font-medium focus:border-blue-400/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm hover:shadow-md appearance-none cursor-pointer"
                                    >
                                        <option value="Investigación">Investigación</option>
                                        <option value="Artículos">Artículos</option>
                                        <option value="Premios">Premios</option>
                                        <option value="Eventos">Eventos</option>
                                        <option value="Pedagogía">Pedagogía</option>
                                        <option value="Evaluación">Evaluación</option>
                                        <option value="Tecnología">Tecnología</option>
                                        <option value="Neurociencia">Neurociencia</option>
                                        <option value="Currículo">Currículo</option>
                                        <option value="Gestión">Gestión</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Image Uploader */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Portada</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <div className="relative group">
                                            <Input
                                                value={coverImage}
                                                onChange={(e) => setCoverImage(e.target.value)}
                                                placeholder="https://..."
                                                className="w-full rounded-2xl bg-white/50 border border-white/60 text-slate-600 pl-4 pr-10 py-6 text-sm font-medium focus:border-blue-400/50 focus:visible:ring-4 focus:visible:ring-blue-500/10 shadow-sm hover:shadow-md transition-all"
                                            />
                                            <label className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2 hover:bg-white/80 rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200" title="Subir imagen">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const toastId = toast.loading('Subiendo imagen...');
                                                            try {
                                                                const url = await api.uploadImage(file);
                                                                setCoverImage(url);
                                                                toast.success('Imagen subida', { id: toastId });
                                                            } catch (err) {
                                                                console.error(err);
                                                                toast.error('Error al subir', { id: toastId });
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Image className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            </label>
                                        </div>
                                    </div>

                                    {coverImage && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg relative group/img cursor-pointer"
                                            onClick={() => setCoverImage('')}
                                        >
                                            <img src={coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white drop-shadow-md">×</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Editor Area - Paper Glass */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-3xl backdrop-blur-3xl bg-white/70 border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] min-h-[600px] overflow-hidden relative ring-1 ring-white/50"
                >
                    {/* Editor Label */}
                    <div className="absolute top-4 right-4 z-10 pointer-events-none opacity-40">
                        <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm">Editor Visual</span>
                    </div>

                    <div className="p-8 md:p-12 editor-wrapper-light">
                        <BlockNoteView editor={editor} theme="light" className="bg-transparent" />
                    </div>
                </motion.div>
            </div>

            {/* Custom CSS specifically for this liquid aesthetic */}
            <style>{`
                .editor-wrapper-light .bn-editor { bg-transparent !important; }
                .editor-wrapper-light { --bn-colors-editor-text: #1e293b; }
            `}</style>
        </div>
    );
}
