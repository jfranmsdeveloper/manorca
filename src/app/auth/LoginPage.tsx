import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { KeyRound, User, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { toast } from 'sonner';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Get the page the user was trying to access
    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Simulate network delay for better UX
        setTimeout(() => {
            const success = login(password, username);

            if (success) {
                toast.success('Sesión iniciada correctamente');
                navigate(from, { replace: true });
            } else {
                setError(true);
                toast.error('Credenciales incorrectas');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Panel de Administración</h1>
                        <p className="text-slate-400">Accede para gestionar el contenido</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={`pl-12 py-6 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-blue-500 ${error ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                />
                            </div>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`pl-12 py-6 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-blue-500 ${error ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-white text-[#0F172A] hover:bg-slate-200 font-bold rounded-xl transition-all group"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    < div className="w-4 h-4 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
                                    <span>Verificando...</span>
                                </div>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Iniciar Sesión
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm text-center mt-4 bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                        >
                            El usuario o la contraseña no son correctos
                        </motion.p>
                    )}

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-slate-500 hover:text-white text-sm transition-colors"
                        >
                            ← Volver al sitio web
                        </button>
                    </div>
                </div>
            </motion.div >
        </div >
    );
}
