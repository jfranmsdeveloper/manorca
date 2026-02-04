import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

const logoImage = '/logo.png';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Perfil' },
    { id: 'publicaciones', label: 'Publicaciones' },
    { id: 'unesco', label: 'UNESCO' },
    { id: 'lecturas', label: 'Librería', path: '/books' },
    { id: 'universidad', label: 'Universidad' },
    { id: 'deporte', label: 'Deporte' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (item: any) => {
    if (item.path) {
      navigate(item.path);
    } else {
      onNavigate(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-3'
          : 'py-4'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <nav
            className={`liquid-glass rounded-2xl transition-all duration-500 ${isScrolled
              ? 'shadow-lg'
              : 'shadow-md'
              }`}
          >
            <div className="relative flex items-center justify-between px-6 py-3">
              {/* Logo */}
              <motion.button
                onClick={() => onNavigate('inicio')}
                className="flex items-center gap-3 group relative z-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl p-2 flex items-center justify-center border border-slate-800 dark:border-slate-100 group-hover:bg-slate-800 dark:group-hover:bg-slate-100 transition-colors">
                  <img
                    src={logoImage}
                    alt="Manuel Ortega Caballero Logo"
                    className="w-full h-full object-contain brightness-0 invert dark:brightness-0 dark:invert-0"
                  />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    Manuel Ortega Caballero
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Doctor en Ciencias de la Educación
                  </span>
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex items-center gap-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`glass-hover relative px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${activeSection === item.id
                      ? 'text-white dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-slate-900 dark:bg-white rounded-xl shadow-md"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ModeToggle />
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden relative z-10 hover:bg-muted text-foreground"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl shadow-2xl z-50 xl:hidden border-l border-border"
            >
              <div className="relative h-full flex flex-col p-8">
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:bg-muted rounded-xl text-muted-foreground"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item)}
                      className={`w-full text-left px-6 py-4 rounded-xl font-medium transition-all ${activeSection === item.id
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10'
                        : 'text-muted-foreground hover:bg-muted'
                        }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="pt-8 border-t border-slate-100">
                  <p className="text-sm text-muted-foreground text-center">
                    © 2026 Manuel Ortega Caballero
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
