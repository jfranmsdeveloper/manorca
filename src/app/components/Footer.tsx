import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
const logoImage = '/logo.png';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Explorar': [
      { label: 'Inicio', section: 'inicio' },
      { label: 'Agenda', section: 'agenda' },
      { label: 'Publicaciones', section: 'publicaciones' },
      { label: 'Universidad', section: 'universidad' },
    ],
    'Actividades': [
      { label: 'Orientación', section: 'orientacion' },
      { label: 'Deporte', section: 'deporte' },
      { label: 'UNESCO', section: 'unesco' },
      { label: 'Eventos', section: 'eventos' },
    ],
    'Contacto': [
      { label: 'Contacto', section: 'contacto' },
      { label: 'Google Scholar', url: 'https://scholar.google.com' },
      { label: 'ORCID', url: 'https://orcid.org' },
      { label: 'Dialnet', url: 'https://dialnet.unirioja.es' },
    ],
  };

  return (
    <footer className="relative bg-[#0F172A] text-slate-300 pt-20 pb-8 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl p-2 flex items-center justify-center border border-white/10">
                  <img
                    src={logoImage}
                    alt="Manuel Ortega Caballero Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Manuel Ortega Caballero</h3>
                  <p className="text-sm text-slate-400">Doctor en Ciencias de la Educación</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Transformando la educación a través de la innovación, el compromiso y la excelencia académica.
                Más de 15 años dedicados al desarrollo integral de estudiantes.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>contacto@ortegacaballero.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+34 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Campus Universitario, Madrid</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {'section' in link ? (
                      <button
                        onClick={() => onNavigate(link.section)}
                        className="text-slate-400 hover:text-white transition-colors text-sm block"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors text-sm block"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 pb-12 border-b border-white/5"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold mb-4 text-white">Suscríbete a Nuestro Newsletter</h4>
            <p className="text-slate-400 mb-6">
              Recibe las últimas noticias, eventos y publicaciones directamente en tu correo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-blue-500 focus:ring-blue-500"
              />
              <Button className="bg-white text-[#0F172A] hover:bg-slate-200 rounded-xl px-8 font-semibold">
                Suscribirse
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-slate-500 flex items-center gap-2"
          >
            © 2026 Ortega Caballero. Hecho con
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            en Madrid
          </motion.p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Cookies
            </a>
            <button
              onClick={() => onNavigate('admin-panel')}
              className="text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              Panel de Gestión
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-[#0F172A] hover:scale-110 transition-all hover:shadow-[0_0_20px_rgba(15,23,42,0.5)]"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}