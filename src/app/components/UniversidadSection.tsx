import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Star, Eye, Download, Bookmark, ExternalLink, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Lightbox } from '@/app/components/ui/Lightbox';

export function UniversidadSection() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const publicacionesPropias = [
    {
      id: 1,
      title: 'Innovación Educativa en el Siglo XXI',
      excerpt: 'Análisis de metodologías activas y su impacto en el aprendizaje estudiantil.',
      category: 'Pedagogía',
      image: 'https://images.unsplash.com/photo-1524591282491-edb48a0fca8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnklMjBzdHVkeSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3Njk5NTAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Enero 2026',
      views: 1234,
      downloads: 456,
    },
    {
      id: 2,
      title: 'Evaluación por Competencias',
      excerpt: 'Estrategias de evaluación formativa y su aplicación práctica en el aula.',
      category: 'Evaluación',
      image: 'https://images.unsplash.com/photo-1769430886896-dc30842be5a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHVuaXZlcnNpdHklMjBjYW1wdXMlMjBtb2Rlcm58ZW58MXx8fHwxNzY5OTUwMjg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Diciembre 2025',
      views: 987,
      downloads: 321,
    },
    {
      id: 3,
      title: 'Tecnología e Inclusión Educativa',
      excerpt: 'Herramientas digitales para la accesibilidad y diversidad en educación.',
      category: 'Tecnología',
      image: 'https://images.unsplash.com/photo-1762341118883-13bbd9d79927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMG9mZmljZXxlbnwxfHx8fDE3Njk5NTAyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Noviembre 2025',
      views: 1456,
      downloads: 678,
    },
  ];

  const publicacionesRecomendadas = [
    {
      id: 1,
      title: 'Neurociencia y Aprendizaje',
      author: 'Dr. María González',
      rating: 4.8,
      category: 'Neurociencia',
    },
    {
      id: 2,
      title: 'Diseño Curricular Moderno',
      author: 'Prof. Juan Martínez',
      rating: 4.6,
      category: 'Currículo',
    },
    {
      id: 3,
      title: 'Liderazgo Educativo',
      author: 'Dra. Ana Rodríguez',
      rating: 4.9,
      category: 'Gestión',
    },
    {
      id: 4,
      title: 'Evaluación del Desempeño',
      author: 'Dr. Carlos López',
      rating: 4.7,
      category: 'Evaluación',
    },
  ];

  const [galeria, setGaleria] = useState<any[]>([]);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await api.getGallery();
        setGaleria(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load gallery for section", error);
      }
    };
    loadGallery();
  }, []);

  return (
    <section id="universidad" className="py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-[#0F172A]/10 border border-[#0F172A]/20 rounded-full text-[#0F172A] text-sm mb-4">
            Contenido Académico
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
            Universidad
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Publicaciones, recursos y contenido académico de calidad
          </p>
        </motion.div>

        <Tabs defaultValue="propias" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-100 p-2 rounded-2xl">
            <TabsTrigger value="propias" className="rounded-xl data-[state=active]:bg-[#0F172A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              Publicaciones Propias
            </TabsTrigger>
            <TabsTrigger value="recomendadas" className="rounded-xl data-[state=active]:bg-[#0F172A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              Recomendadas
            </TabsTrigger>
            <TabsTrigger value="galeria" className="rounded-xl data-[state=active]:bg-[#0F172A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              Galería Plus
            </TabsTrigger>
          </TabsList>

          {/* Publicaciones Propias */}
          <TabsContent value="propias">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicacionesPropias.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl hover:border-[#0F172A] transition-all duration-300">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <Badge className="absolute top-4 right-4 bg-[#0F172A] text-white border-none">
                        {pub.category}
                      </Badge>
                    </div>

                    <div className="p-6">
                      <span className="text-sm text-slate-500 mb-2 block">{pub.date}</span>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-700 transition-colors">
                        {pub.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {pub.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{pub.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{pub.downloads}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl">
                          Leer más
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-slate-200 hover:border-[#0F172A] hover:text-[#0F172A]">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Publicaciones Recomendadas */}
          <TabsContent value="recomendadas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publicacionesRecomendadas.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="p-6 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-slate-50 hover:border-[#0F172A]">
                    <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-[#0F172A]/10 text-[#0F172A] border-none mb-3">
                      {pub.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{pub.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{pub.author}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(pub.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-[#0F172A]">{pub.rating}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full rounded-xl group border-slate-200 hover:border-[#0F172A] hover:text-[#0F172A]">
                      Ver publicación
                      <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Galería Plus */}
          <TabsContent value="galeria">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galeria.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer aspect-video"
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/gallery">
                <Button className="bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 rounded-xl px-8 py-6 text-lg font-medium shadow-sm hover:shadow-md transition-all group">
                  Explorar Galería Completa
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <Lightbox
          isOpen={!!selectedImage}
          image={selectedImage?.image}
          title={selectedImage?.title}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </section>
  );
}
