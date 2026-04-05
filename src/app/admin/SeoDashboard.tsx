import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Activity, ArrowUpRight, ArrowDownRight, Users, Clock, Globe, Search, BarChart2, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';

// Mock Data (Fallback - Used only if API completely fails or no data yet)
const mockDataTraffic = [
    { name: 'Lun', visits: 0, pv: 0 }, { name: 'Mar', visits: 0, pv: 0 }, { name: 'Mie', visits: 0, pv: 0 }
];

const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2 align-middle z-50">
        <HelpCircle className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-help transition-colors" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-white/90 backdrop-blur-xl border border-white/20 text-slate-700 text-xs font-medium rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-all whitespace-normal w-56 text-center pointer-events-none transform translate-y-2 group-hover:translate-y-0 duration-300">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/90"></div>
        </div>
    </div>
);

const KPICard = ({ title, value, change, icon: Icon, color, info }: any) => {
    // Determine if change is positive, negative or neutral (N/A)
    const isPositive = change && change.includes('+');
    const isNeutral = !change || change === 'N/A' || change === '0.0%';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/60 border border-white/80 p-6 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.03)] ring-1 ring-white/50 transition-all duration-300 hover:shadow-[0_25px_50px_-10px_rgba(59,130,246,0.1)]"
        >
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform duration-500`} style={{ background: color }}></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 rounded-2xl bg-white border border-white/50 shadow-sm">
                    <Icon className="w-6 h-6" style={{ color: color }} />
                </div>
                {!isNeutral && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border backdrop-blur-sm ${isPositive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {change}
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    {title}
                    <InfoTooltip text={info} />
                </h3>
                <div className="text-3xl font-black text-slate-800 tracking-tight drop-shadow-sm mt-2">{value}</div>
            </div>
        </motion.div>
    );
};

export default function SeoDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [analyticsData, setAnalyticsData] = useState<any>(null);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/analytics.php');
            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse JSON:", text.substring(0, 100));
                throw new Error('Respuesta inválida del servidor. Revisa la consola.');
            }

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            if (data.error) throw new Error(data.error);
            if (data.status === 'mock_mode') throw new Error('Credenciales no encontradas (Modo Demo)');

            setAnalyticsData(data);
        } catch (err: any) {
            console.warn("Analytics Error:", err.message);
            setError(err.message || 'Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    // Use real data if available, otherwise fallback
    const displayTraffic = analyticsData?.traffic || mockDataTraffic;
    const displaySources = analyticsData?.sources || []; // Empty if no data
    const displayPages = analyticsData?.pages || [];

    const metrics = analyticsData?.metrics || {
        users: "0",
        time: "0m 00s",
        bounce: "0.0%",
        pagesSession: "0.0"
    };

    return (
        <div className="font-sans space-y-8 relative z-10">

            {/* Header - Transparent & Clean */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-2 drop-shadow-sm flex items-center gap-3 tracking-tight">
                        SEO Analytics
                        <InfoTooltip text="Panel de control que muestra el rendimiento de tu web en los últimos 30 días." />
                    </h1>
                    <div className="flex items-center gap-3">
                        <p className="text-slate-500 font-medium">Panel de rendimiento en tiempo real</p>
                        {error && (
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-2">
                                <AlertCircle className="w-3 h-3" />
                                {error}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchAnalytics}
                        className="p-3 rounded-2xl bg-white/50 hover:bg-white text-slate-500 transition-all border border-white/60 shadow-sm hover:shadow-md hover:text-blue-600"
                        title="Recargar datos"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <div className="relative group">
                        <select className="appearance-none bg-white/50 border border-white/60 rounded-2xl px-6 py-3 text-sm text-slate-700 font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-sm cursor-pointer hover:shadow-md transition-all pr-10">
                            <option>Últimos 30 días</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                    <button className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-slate-900/20 active:scale-95">
                        Exportar Reporte
                    </button>
                </div>
            </div>

            {/* LOADING STATE OVERLAY */}
            {loading && !analyticsData && (
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-progress origin-left shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
            )}

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Usuarios Totales"
                    value={metrics.users}
                    change="+0%"
                    icon={Users}
                    color="#3B82F6"
                    info="Número de personas únicas que han visitado tu web."
                />
                <KPICard
                    title="Tiempo Promedio"
                    value={metrics.time}
                    change="+0%"
                    icon={Clock}
                    color="#10B981"
                    info="Tiempo medio que pasa un usuario leyendo tu contenido."
                />
                <KPICard
                    title="Tasa de Rebote"
                    value={metrics.bounce}
                    change="N/A"
                    icon={Activity}
                    color="#F43F5E"
                    info="Porcentaje de visitas que entran y se van sin interactuar. Menos es mejor."
                />
                <KPICard
                    title="Páginas / Sesión"
                    value={metrics.pagesSession}
                    change="+0%"
                    icon={Globe}
                    color="#8B5CF6"
                    info="Promedio de cuántas páginas ve cada usuario antes de irse."
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Traffic Chart */}
                <div className="lg:col-span-2 rounded-3xl backdrop-blur-2xl bg-white/60 border border-white/80 p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.03)] ring-1 ring-white/50">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
                            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                                <BarChart2 className="w-5 h-5" />
                            </div>
                            Tráfico del Sitio
                            <InfoTooltip text="Evolución de las visitas día a día durante el último mes." />
                        </h2>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={displayTraffic}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    fontWeight={600}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                    fontWeight={600}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,1)',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '12px', fontWeight: '600' }}
                                    cursor={{ stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '5 5' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563EB' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="rounded-3xl backdrop-blur-2xl bg-white/60 border border-white/80 p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.03)] ring-1 ring-white/50">
                    <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                            <Search className="w-5 h-5" />
                        </div>
                        Fuentes de Tráfico
                        <InfoTooltip text="De dónde vienen tus visitantes (Búsquedas, Redes Sociales, Directo...)." />
                    </h2>
                    <div className="h-[250px] relative mb-6">
                        {displaySources.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={displaySources}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={6}
                                        dataKey="value"
                                        cornerRadius={8}
                                    >
                                        {displaySources.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#1e293b', fontWeight: 'bold', fontSize: '14px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                <Activity className="w-10 h-10 mb-3 opacity-30" />
                                <p className="text-sm font-medium">Sin datos suficientes aún</p>
                            </div>
                        )}

                        {displaySources.length > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <span className="block text-3xl font-black text-slate-800 tracking-tighter">100%</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        {displaySources.map((item: any, index: number) => (
                            // Calculate percentage based on local total of top 5
                            <div key={index} className="flex items-center justify-between text-sm group">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-slate-600 font-semibold group-hover:text-slate-900 transition-colors">{item.name}</span>
                                </div>
                                <span className="font-bold text-slate-800 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Pages Table */}
            <div className="rounded-3xl backdrop-blur-2xl bg-white/60 border border-white/80 p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.03)] ring-1 ring-white/50">
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                    Páginas Más Visitadas
                    <InfoTooltip text="Listado de los artículos o secciones más populares de tu web." />
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200/60">
                                <th className="pb-4 font-bold pl-4">Página</th>
                                <th className="pb-4 font-bold">Visitas</th>
                                <th className="pb-4 font-bold">Tiempo Prom.</th>
                                <th className="pb-4 font-bold text-right pr-4">Rebote</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {displayPages.length > 0 ? (
                                displayPages.map((page: any, index: number) => (
                                    <tr key={index} className="group hover:bg-white/60 transition-colors border-b border-slate-50 last:border-none">
                                        <td className="py-4 pl-4 font-bold text-slate-700 rounded-l-xl break-all max-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-8 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                {page.path}
                                            </div>
                                        </td>
                                        <td className="py-4 text-slate-600 font-medium">{page.visits}</td>
                                        <td className="py-4 text-slate-600 font-medium">{page.time}</td>
                                        <td className="py-4 text-right pr-4 rounded-r-xl">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold shadow-sm border ${parseInt(page.bounce) < 40
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                {page.bounce}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-400 italic bg-slate-50/50 rounded-xl mt-4">
                                        No hay datos de páginas disponibles todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
