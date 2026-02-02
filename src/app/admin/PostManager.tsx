import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

// Mock data structure matching our plan
interface Article {
    id: string;
    title: string;
    category: string;
    status: 'published' | 'draft';
    date: string;
    views?: number;
}

export function PostManager() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Load articles from localStorage on mount
    // Load articles from API on mount
    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            const data = await api.getArticles();
            if (data && data.length > 0) {
                setArticles(data);
            } else {
                setArticles([
                    { id: '1', title: 'Innovación Educativa 2026', category: 'Investigación', status: 'published', date: '2026-02-01', views: 120 },
                    { id: '2', title: 'Borrador: Nuevas Metodologías', category: 'Artículos', status: 'draft', date: '2026-02-02' },
                ]);
            }
        } catch (error) {
            console.error("Failed to load articles", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar esta publicación?')) {
            try {
                await api.deleteArticle(id);
                const updated = articles.filter(a => a.id !== id);
                setArticles(updated);
                toast.success('Publicación eliminada correctamente');
            } catch (error) {
                toast.error('Error al eliminar la publicación');
            }
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#0F172A]">Gestor de Publicaciones</h1>
                    <p className="text-slate-500">Administra tus artículos y noticias desde aquí.</p>
                </div>
                <Link to="/admin/editor/new">
                    <Button className="bg-[#0F172A] hover:bg-slate-800 text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Nueva Publicación
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <Card className="p-4 border-slate-200">
                <div className="flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar publicaciones..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </Card>

            {/* Articles List */}
            <div className="grid gap-4">
                {filteredArticles.map((article) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                    >
                        <Card className="p-6 border-slate-200 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-[#0F172A]">{article.title}</h3>
                                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className={article.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-slate-100 text-slate-600'}>
                                        {article.status === 'published' ? 'Publicado' : 'Borrador'}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span>{article.category}</span>
                                    <span>•</span>
                                    <span>{new Date(article.date).toLocaleDateString()}</span>
                                    {article.views && (
                                        <>
                                            <span>•</span>
                                            <span>{article.views} vistas</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link to={`/admin/editor/${article.id}`}>
                                    <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-slate-500 hover:text-blue-600">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" className="hover:bg-red-50 text-slate-500 hover:text-red-500" onClick={() => handleDelete(article.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Eye className="w-4 h-4 mr-2" />
                                            Ver Publicación
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {filteredArticles.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        No se encontraron publicaciones.
                    </div>
                )}
            </div>
        </div>
    );
}
