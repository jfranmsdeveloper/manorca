import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Activity, ArrowUpRight, ArrowDownRight, Users, Clock, Globe, Search, BarChart2, AlertCircle } from 'lucide-react';

// Mock Data (Fallback)
const mockDataTraffic = [
    { name: 'Lun', visits: 4000, pv: 2400, amt: 2400 },
    { name: 'Mar', visits: 3000, pv: 1398, amt: 2210 },
    { name: 'Mie', visits: 2000, pv: 9800, amt: 2290 },
    { name: 'Jue', visits: 2780, pv: 3908, amt: 2000 },
    { name: 'Vie', visits: 1890, pv: 4800, amt: 2181 },
    { name: 'Sab', visits: 2390, pv: 3800, amt: 2500 },
    { name: 'Dom', visits: 3490, pv: 4300, amt: 2100 },
];

const mockDataSources = [
    { name: 'Directo', value: 400, color: '#60A5FA' },
    { name: 'Social', value: 300, color: '#34D399' },
    { name: 'Orgánico', value: 300, color: '#A78BFA' },
    { name: 'Referral', value: 200, color: '#F472B6' },
];

const mockTopPages = [
    { path: '/', visits: '12,453', time: '2m 14s', bounce: '45%' },
    { path: '/blog/inteligencia-artificial', visits: '8,234', time: '4m 32s', bounce: '32%' },
    { path: '/sobre-mi', visits: '6,123', time: '3m 05s', bounce: '28%' },
    { path: '/servicios', visits: '4,567', time: '1m 54s', bounce: '56%' },
];

const KPICard = ({ title, value, change, icon: Icon, color }: any) => {
    const isPositive = change.startsWith('+');
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 p-6 shadow-2xl transition-all duration-300"
        >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-500`} style={{ background: color }}></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {change}
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
                <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
            </div>
        </motion.div>
    );
};

export default function SeoDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [analyticsData, setAnalyticsData] = useState<any>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                // In development (npm run dev), this might need absolute URL if not proxying.
                // Assuming relative path works for production or proxy setup.
                // If local dev without PHP server running, this will fail and fall back to mock.
                const response = await fetch('/api/analytics.php');

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                if (data.error) throw new Error(data.error);
                if (data.status === 'mock_mode') throw new Error('Mock Mode (No credentials)');

                setAnalyticsData(data);
                setError(null);
            } catch (err: any) {
                console.warn("Using Mock Data:", err.message);
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    // Use real data if available, otherwise mock
    const displayTraffic = analyticsData?.traffic || mockDataTraffic;
    const displaySources = analyticsData?.sources || mockDataSources;
    const displayPages = analyticsData?.pages || mockTopPages;
    const metrics = analyticsData?.metrics || {
        users: "45.2K",
        time: "4m 32s",
        bounce: "32.4%",
        pagesSession: "3.8"
    };

    return (
        <div className="min-h-screen p-8 text-white space-y-8 font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-2">
                        SEO Analytics
                    </h1>
                    <p className="text-slate-400 flex items-center gap-2">
                        Visión general del rendimiento.
                        {error && (
                            <span className="text-xs text-amber-400 bg-amber-950/30 px-2 py-1 rounded-full border border-amber-900/50 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Modo Demo: {error}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md">
                        <option>Últimos 30 días</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
                        Exportar Reporte
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Usuarios Totales" value={metrics.users} change="+12.5%" icon={Users} color="#60A5FA" />
                <KPICard title="Tiempo Promedio" value={metrics.time} change="+5.2%" icon={Clock} color="#34D399" />
                <KPICard title="Tasa de Rebote" value={metrics.bounce} change="-2.1%" icon={Activity} color="#F472B6" />
                <KPICard title="Páginas / Sesión" value={metrics.pagesSession} change="+8.4%" icon={Globe} color="#A78BFA" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Traffic Chart */}
                <div className="lg:col-span-2 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-blue-400" />
                            Tráfico del Sitio
                        </h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={displayTraffic}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="visits" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 p-6 shadow-2xl">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Search className="w-5 h-5 text-purple-400" />
                        Fuentes de Tráfico
                    </h2>
                    <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={displaySources}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {displaySources.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-white">100%</span>
                                <span className="text-xs text-slate-400">Total</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-3">
                        {displaySources.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-slate-300">{item.name}</span>
                                </div>
                                <span className="font-medium text-white">{((item.value / 1200) * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Pages Table */}
            <div className="rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold mb-6">Páginas Más Visitadas</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-400 text-sm border-b border-white/10">
                                <th className="pb-4 font-medium pl-4">Página</th>
                                <th className="pb-4 font-medium">Visitas</th>
                                <th className="pb-4 font-medium">Tiempo Prom.</th>
                                <th className="pb-4 font-medium text-right pr-4">Rebote</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {displayPages.map((page: any, index: number) => (
                                <tr key={index} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4 font-medium text-white rounded-l-xl">{page.path}</td>
                                    <td className="py-4 text-slate-300">{page.visits}</td>
                                    <td className="py-4 text-slate-300">{page.time}</td>
                                    <td className="py-4 text-right pr-4 rounded-r-xl">
                                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${parseInt(page.bounce) < 40 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {page.bounce}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
