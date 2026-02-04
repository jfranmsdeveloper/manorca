import { motion } from 'motion/react';
import { Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

const timelineItems = [
    {
        year: '2023 - Presente',
        title: 'Consultor Independiente',
        description: 'Asesoramiento en transformación digital y nuevas tecnologías para empresas e instituciones educativas.',
        icon: <Briefcase className="w-5 h-5" />,
    },
    {
        year: '2018 - 2023',
        title: 'Doctorado en Ciencias de la Educación',
        description: 'Investigación centrada en la integración de la tecnología en procesos de aprendizaje. Tesis con mención Cum Laude.',
        icon: <GraduationCap className="w-5 h-5" />,
    },
    {
        year: '2015 - 2018',
        title: 'Project Manager Internacional',
        description: 'Gestión de proyectos educativos financiados por la Unión Europea en colaboración con socios de 5 países.',
        icon: <Award className="w-5 h-5" />,
    },
    {
        year: '2012 - 2015',
        title: 'Máster en Desarrollo Social',
        description: 'Especialización en intervención comunitaria y políticas públicas.',
        icon: <GraduationCap className="w-5 h-5" />,
    }
];

export function TimelineSection() {
    return (
        <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-12 my-10 transition-colors duration-300">
            {timelineItems.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 md:pl-12 group"
                >
                    {/* Dot */}
                    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-primary group-hover:scale-125 transition-all duration-300" />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            <Calendar className="w-3 h-3" />
                            {item.year}
                        </span>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                    </div>

                    <div className="p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300">
                        <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
