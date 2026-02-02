import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo } from 'react';

interface ArticleModalProps {
    article: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
    if (!article) return null;

    // Initialize read-only editor
    const editor = useCreateBlockNote({
        initialContent: article.content || [],
    });

    // Lock editing
    useEffect(() => {
        if (editor) {
            editor.isEditable = false;
        }
    }, [editor, article]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
                    >
                        {/* Header Image */}
                        <div className="relative h-64 md:h-80 flex-shrink-0">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <Badge className="mb-3 bg-blue-600 border-none text-white hover:bg-blue-700">
                                    {article.category}
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                                    {article.title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-slate-200">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(article.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {article.readTime || '5 min'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-8 custom-scrollbar bg-white">
                            {article.content ? (
                                <div className="prose prose-lg max-w-none">
                                    <BlockNoteView editor={editor} theme="light" editable={false} />
                                </div>
                            ) : (
                                <div className="text-slate-600 leading-relaxed text-lg">
                                    {article.excerpt}
                                    <br /><br />
                                    <p className="italic text-slate-400">Este es un artículo de ejemplo estático. El contenido completo no está disponible.</p>
                                </div>
                            )}

                            {/* Tags */}
                            <div className="mt-12 pt-6 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Etiquetas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags?.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
