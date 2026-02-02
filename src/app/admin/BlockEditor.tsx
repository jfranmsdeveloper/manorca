import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function BlockEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [category, setCategory] = useState('Investigación');
    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined>(undefined);
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
                    ? block.content.map(c => c.text).join(' ')
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

    if (isLoading) return <div className="p-8">Cargando editor...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between sticky top-0 bg-slate-50 py-4 z-40 border-b border-slate-200">
                <Button variant="ghost" onClick={() => navigate('/admin')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSave}>
                        Guardar Borrador
                    </Button>
                    <Button onClick={handleSave} className="bg-[#0F172A] text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Publicar
                    </Button>
                </div>
            </div>

            {/* Meta Data */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Título de la Publicación</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Escribe un título atractivo..."
                        className="text-2xl font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-slate-300"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-[#0F172A] focus:outline-none"
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
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Imagen de Portada</label>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <label className="cursor-pointer bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                try {
                                                    const url = await api.uploadImage(file);
                                                    setCoverImage(url);
                                                    toast.success('Imagen subida correctamente');
                                                } catch (err) {
                                                    console.error(err);
                                                    toast.error('Error al subir imagen');
                                                }
                                            }
                                        }}
                                    />
                                    Subir Imagen
                                </label>
                                <span className="text-xs text-slate-400">o pega una URL abajo</span>
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    placeholder="https://..."
                                    className="flex-1"
                                />
                                {coverImage && (
                                    <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor Area */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[500px] p-4">
                <BlockNoteView editor={editor} theme="light" />
            </div>
        </div>
    );
}
