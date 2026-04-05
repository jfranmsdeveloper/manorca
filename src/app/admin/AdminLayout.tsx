import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, PenTool, Settings, LogOut, Home, Calendar, Image, Book, Activity } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function AdminLayout() {
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Nueva Publicación', path: '/admin/editor/new', icon: PenTool },
        { label: 'Agenda', path: '/admin/events', icon: Calendar },
        { label: 'Galería', path: '/admin/gallery', icon: Image },
        { label: 'Lecturas', path: '/admin/books', icon: Book },
        { label: 'SEO Dashboard', path: '/admin/seo', icon: Activity },
        { label: 'Configuración', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans relative">
            {/* Ambient Background for Layout */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] left-[0%] w-[30%] h-[30%] bg-blue-300/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-indigo-300/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Sticky Glass Sidebar */}
            <aside className="w-64 fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white/70 backdrop-blur-2xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-6 border-b border-black/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
                            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
                        </div>
                        <span className="font-bold text-lg text-slate-800 tracking-tight">Panel Admin</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${isActive
                                        ? 'text-blue-700 font-semibold bg-blue-50/80 shadow-sm border border-blue-100/50'
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-black/5 space-y-2 bg-white/30 backdrop-blur-sm">
                    <Link to="/">
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 hover:bg-white/60 transition-colors">
                            <Home className="w-4 h-4 mr-2" />
                            Ver Sitio Web
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50/50">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}
