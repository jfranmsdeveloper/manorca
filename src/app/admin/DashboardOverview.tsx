import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, FileText, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { PostManager } from './PostManager';

interface Hit {
    date: string;
    count: number;
}

export function DashboardOverview() {
    const [stats, setStats] = useState({
        totalHits: 0,
        todayHits: 0,
        articlesCount: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                // Fetch Hits
                const metricsRes = await fetch('http://localhost:3001/api/metrics');
                const hitsData: Hit[] = await metricsRes.json();

                const totalHits = hitsData.reduce((acc, curr) => acc + curr.count, 0);
                const today = new Date().toISOString().split('T')[0];
                const todayHits = hitsData.find(h => h.date === today)?.count || 0;

                // Fetch Articles Count (reusing existing endpoint)
                const articlesRes = await fetch('http://localhost:3001/api/articles');
                const articles = await articlesRes.json();

                setStats({
                    totalHits,
                    todayHits,
                    articlesCount: articles.length
                });

            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }

        fetchStats();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard General</h1>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {/* Visits Card */}
                <motion.div variants={item}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Visitas (Últimos 30 días)
                            </CardTitle>
                            <Users className="w-4 h-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalHits}</div>
                            <p className="text-xs text-slate-500 mt-1">
                                +{stats.todayHits} hoy
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Articles Card */}
                <motion.div variants={item}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Artículos Publicados
                            </CardTitle>
                            <FileText className="w-4 h-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.articlesCount}</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3 text-green-500" />
                                Activos en el blog
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Gestión de Publicaciones</h2>
                <PostManager />
            </div>
        </div>
    );
}
