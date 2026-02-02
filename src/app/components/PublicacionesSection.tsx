import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Calendar, Tag, ExternalLink, Search, BookOpen, Award, TrendingUp, Lightbulb, CheckCircle, Cpu, Brain, Laptop, Briefcase } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { ArticleModal } from './ArticleModal';
import { api } from '@/lib/api';

export function PublicacionesSection() {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [publicaciones, setPublicaciones] = useState<any[]>([]);

  // Premium Glass Button Styles
  const glassButtonActive = "bg-[#0F172A] text-white shadow-[0_4px_20px_rgba(15,23,42,0.3)] border border-[#0F172A]/50 backdrop-blur-md";
  const glassButtonInactive = "bg-white/60 backdrop-blur-md border border-white/60 text-slate-600 shadow-sm hover:shadow-md hover:bg-white/90 hover:scale-105";

  const categories = [
    { id: 'todas', label: 'Todas', icon: BookOpen },
    { id: 'Investigación', label: 'Investigación', icon: FileText },
    { id: 'Artículos', label: 'Artículos', icon: TrendingUp },
    { id: 'Premios', label: 'Premios y Logros', icon: Award },
    { id: 'Eventos', label: 'Eventos', icon: Calendar },
    { id: 'Pedagogía', label: 'Pedagogía', icon: Lightbulb },
    { id: 'Evaluación', label: 'Evaluación', icon: CheckCircle },
    { id: 'Tecnología', label: 'Tecnología', icon: Cpu },
    { id: 'Neurociencia', label: 'Neurociencia', icon: Brain },
    { id: 'Currículo', label: 'Currículo', icon: Laptop },
    { id: 'Gestión', label: 'Gestión', icon: Briefcase },
  ];

  // Static initial data
  const staticPublicaciones = [
    {
      id: 1,
      title: 'Innovación en Metodologías Educativas: Estrategias para el Siglo XXI',
      excerpt: 'Un análisis profundo sobre las nuevas tendencias en educación y cómo están transformando el aprendizaje en las universidades modernas.',
      category: 'Investigación',
      date: '2026-01-15',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1764002673517-fe61da14dc6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGFydGljbGUlMjBwdWJsaWNhdGlvbnxlbnwxfHx8fDE3Njk5NTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Educación', 'Innovación', 'Metodología'],
    },
    {
      id: 2,
      title: 'El Deporte como Herramienta de Formación Integral',
      excerpt: 'Explorando la conexión entre el desarrollo deportivo y el rendimiento académico en estudiantes universitarios.',
      category: 'Artículos',
      date: '2026-01-08',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1634562876572-5abe57afcceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2OTk1MTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Deporte', 'Educación', 'Desarrollo'],
    },
    {
      id: 3,
      title: 'Premio UNESCO a la Excelencia en Educación Global 2025',
      excerpt: 'Reconocimiento internacional por la contribución a programas educativos sostenibles y de impacto global.',
      category: 'Premios',
      date: '2025-12-20',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1758519292136-8792f1c3655a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3Njk5NTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['UNESCO', 'Premio', 'Educación Global'],
    },
    {
      id: 4,
      title: 'Transformación Digital en la Educación Superior',
      excerpt: 'Análisis de las tecnologías emergentes y su impacto en la transformación de las instituciones educativas.',
      category: 'Investigación',
      date: '2025-12-05',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1764002673517-fe61da14dc6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGFydGljbGUlMjBwdWJsaWNhdGlvbnxlbnwxfHx8fDE3Njk5NTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Tecnología', 'Digital', 'Universidad'],
    },
    {
      id: 5,
      title: 'Orientación Profesional: Claves para el Éxito',
      excerpt: 'Estrategias efectivas para guiar a los estudiantes en su desarrollo profesional y toma de decisiones de carrera.',
      category: 'Artículos',
      date: '2025-11-18',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1634562876572-5abe57afcceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2OTk1MTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Orientación', 'Carrera', 'Desarrollo'],
    },
    {
      id: 6,
      title: 'Colaboración Internacional en Investigación Educativa',
      excerpt: 'Reflexiones sobre proyectos de investigación transnacionales y su impacto en la comunidad académica global.',
      category: 'Investigación',
      date: '2025-11-01',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1758519292136-8792f1c3655a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3Njk5NTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Internacional', 'Investigación', 'Colaboración'],
    },
  ];

  // ... inside component ...

  useEffect(() => {
    // Load dynamic articles from server API
    const loadArticles = async () => {
      try {
        const savedArticles = await api.getArticles();
        const published = savedArticles.filter((a: any) => a.status === 'published');

        // Normalize data structure for dynamic articles
        const dynamicArticles = published.map((a: any) => ({
          id: a.id,
          title: a.title,
          excerpt: a.excerpt || 'Haz clic para leer el artículo completo.',
          category: a.category,
          date: a.date,
          readTime: '5 min', // Estimation
          image: a.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
          tags: a.tags || ['Nuevo'],
          content: a.content // Ensure content is passed for modal
        }));

        setPublicaciones([...dynamicArticles, ...staticPublicaciones]);
      } catch (error) {
        console.error("Failed to load articles", error);
        // Fallback to just static if API fails
        setPublicaciones([...staticPublicaciones]);
      }
    };

    loadArticles();
  }, []);

  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredPublicaciones = publicaciones.filter((pub) => {
    const matchesCategory = selectedCategory === 'todas' || pub.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="publicaciones" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="px-6 py-2 text-sm bg-[#0F172A] rounded-full text-white font-medium">
              Contenido Original
            </div>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
            Publicaciones & Artículos
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Investigaciones, artículos y reflexiones de Manuel Ortega Caballero sobre educación, deporte y desarrollo profesional
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar publicaciones por título, contenido o etiquetas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-slate-200 focus:border-[#0F172A] bg-white transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                  ? glassButtonActive
                  : glassButtonInactive
                  }`}
              >
                <div className={`absolute inset-0 rounded-full opacity-20 pointer-events-none ${selectedCategory === category.id ? 'bg-gradient-to-t from-white/20 to-transparent' : 'hidden'}`} />
                <category.icon className="w-4 h-4 ml-0.5" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Publications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {filteredPublicaciones.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-3xl border border-slate-200 hover:border-[#0F172A] transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 h-full flex flex-col bg-white">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#0F172A]/90 backdrop-blur-sm text-white border-0">
                        {categories.find((c) => c.id === pub.category)?.label || pub.category}
                      </Badge>
                    </div>

                    {/* Read More Icon */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink className="w-5 h-5 text-[#0F172A]" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(pub.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {pub.readTime}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {pub.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 mb-4 leading-relaxed flex-grow line-clamp-3">
                      {pub.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pub.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 hover:bg-[#0F172A] hover:text-white transition-colors"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedArticle(pub)}
                      className="w-full group-hover:bg-[#0F172A] group-hover:text-white transition-all mt-auto"
                    >
                      Leer más
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Article Modal */}
        <ArticleModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

        {/* No Results Message */}
        {filteredPublicaciones.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500">No se encontraron publicaciones con estos criterios</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}