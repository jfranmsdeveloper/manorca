import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
    image: string;
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}

export function Lightbox({ image, title, isOpen, onClose, onNext, onPrev }: LightboxProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl"
                onClick={onClose}
            >
                {/* Navigation Buttons (if provided) */}
                {onPrev && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-50"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                )}

                {onNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-50"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={image}
                        alt={title || "Gallery Image"}
                        className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
                    />
                    {title && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                            <h3 className="text-white text-xl font-bold">{title}</h3>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
