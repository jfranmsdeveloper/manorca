import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, LogOut, Edit3, X, Eye } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';

export function AdminControls() {
    const { isAuthenticated, isEditMode, toggleEditMode, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!isAuthenticated) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl min-w-[200px]"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-4">
                                <Label htmlFor="edit-mode" className="text-white text-sm font-medium flex items-center gap-2">
                                    {isEditMode ? <Edit3 className="w-4 h-4 text-blue-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                                    Modo Edición
                                </Label>
                                <Switch
                                    id="edit-mode"
                                    checked={isEditMode}
                                    onCheckedChange={toggleEditMode}
                                    className="data-[state=checked]:bg-blue-500"
                                />
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <Button
                                onClick={logout}
                                variant="ghost"
                                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 text-sm"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border border-white/10 transition-colors ${isEditMode
                    ? 'bg-blue-500 text-white shadow-blue-500/20'
                    : 'bg-[#0F172A] text-slate-400 hover:text-white'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
