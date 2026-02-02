import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, PenTool, Settings, LogOut, Home, Calendar, Image } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function AdminLayout() {
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Nueva Publicación', path: '/admin/editor/new', icon: PenTool },
        { label: 'Agenda', path: '/admin/events', icon: Calendar },
        { label: 'Galería', path: '/admin/gallery', icon: Image },
        { label: 'Configuración', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F172A] text-white fixed top-0 bottom-0 left-0 z-50 flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white overflow-hidden">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                        </div>
                        <span className="font-bold text-lg">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700 space-y-2">
                    <Link to="/">
                        <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                            <Home className="w-4 h-4 mr-2" />
                            Ver Sitio Web
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}
