import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, GraduationCap, Trophy, Globe, Calendar } from 'lucide-react';

const milestones = [
    {
        year: '2023 - Presente',
        title: 'Consultor Independiente',
        description: 'Asesoramiento en transformación digital y nuevas tecnologías para empresas e instituciones educativas. Implementación de estrategias de IA y optimización de procesos pedagógicos.',
        icon: Briefcase,
        color: 'bg-blue-500',
        id: 1
    },
    {
        year: '2018 - 2023',
        title: 'Doctorado en Ciencias de la Educación',
        description: 'Investigación centrada en la integración de la tecnología en procesos de aprendizaje. Tesis con mención Cum Laude, enfocada en metodologías inclusivas y accesibilidad digital.',
        icon: GraduationCap,
        color: 'bg-emerald-500',
        id: 2
    },
    {
        year: '2015 - 2018',
        title: 'Project Manager Internacional',
        description: 'Gestión de proyectos educativos financiados por la Unión Europea en colaboración con socios de 5 países. Coordinación de equipos multiculturales y desarrollo de políticas educativas comunes.',
        icon: Globe,
        color: 'bg-purple-500',
        id: 3
    },
    {
        year: '2012 - 2015',
        title: 'Máster en Desarrollo Social',
        description: 'Especialización en intervención comunitaria y políticas públicas. Desarrollo de programas de impacto social en comunidades vulnerables y colaboración con ONGs locales.',
        icon: Trophy,
        color: 'bg-amber-500',
        id: 4
    }
];

export function TrayectoriaSection() {
    return (
        <section id="trayectoria" className="relative py-20 lg:py-32 bg-background overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        Trayectoria y Logros
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Un recorrido por los momentos clave que han definido mi perfil profesional y académico, marcando hitos de aprendizaje y crecimiento continuo.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 lg:left-0 top-4 bottom-0 w-px bg-border lg:ml-[1.2rem]" />

                    <div className="space-y-12 lg:space-y-16">
                        {milestones.map((item, index) => (
                            <TimelineItem key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-12 lg:pl-20"
        >
            {/* Timeline Dot */}
            <div className="absolute left-[11px] lg:left-[1.2rem] top-2 -translate-x-1/2 w-4 h-4 lg:w-5 lg:h-5 rounded-full border-4 border-background bg-muted-foreground/30 z-10" />

            <div className="flex flex-col gap-4">
                {/* Header: Date + Title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground w-fit">
                        <Calendar className="w-3 h-3" />
                        {item.year}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                        {item.title}
                    </h3>
                </div>

                {/* Card Content */}
                <div className="relative group">
                    <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
