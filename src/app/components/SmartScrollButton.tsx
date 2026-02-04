import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function SmartScrollButton() {
    const [direction, setDirection] = useState<'up' | 'down'>('down');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.offsetHeight;

            // Logic:
            // 1. If at very top (< 100px) -> Force DOWN
            // 2. If at very bottom (within 100px) -> Force UP
            // 3. Else, follow scroll direction (Scrolled down -> show Down (to continue?), Scrolled up -> show Up)

            // Improved UX Logic:
            // Usually "Smart" means:
            // - Scrolling DOWN -> I might want to go back UP? Or go to bottom?
            // - Request: "detect scroll down and take you to end"

            if (currentScrollY < 100) {
                setDirection('down');
                setIsVisible(true);
            } else if (windowHeight + currentScrollY >= documentHeight - 100) {
                setDirection('up');
                setIsVisible(true);
            } else {
                // Middle of page
                if (currentScrollY > lastScrollY) {
                    // Scrolling DOWN
                    setDirection('down');
                } else {
                    // Scrolling UP
                    setDirection('up');
                }
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        if (direction === 'up') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-[#0F172A] hover:scale-110 transition-all hover:shadow-[0_0_20px_rgba(15,23,42,0.5)]"
                >
                    <AnimatePresence mode="wait">
                        {direction === 'up' ? (
                            <motion.div
                                key="up"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUp className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="down"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowDown className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
