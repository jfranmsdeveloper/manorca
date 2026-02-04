import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Upload,
    FileText,
    BarChart3,
    Download,
    Loader2,
    Sparkles,
    BrainCircuit,
    Link as LinkIcon,
    Type,
    X,
    CheckCircle2
} from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart as ReLineChart,
    Line
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface AIAnalysis {
    summary: string;
    key_insights: string[];
    stats: Array<{
        label: string;
        value: string | number;
        unit?: string;
    }>;
    charts: Array<{
        title: string;
        type: 'bar' | 'line' | 'pie';
        data: any[];
    }>;
}

export default function ResearchAnalyst() {
    const [activeTab, setActiveTab] = useState('url'); // Default to URL as requested being easier

    // Inputs
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAnalysis(null);

        try {
            let body;
            let headers = {};

            if (activeTab === 'pdf') {
                if (!file) {
                    alert('Por favor selecciona un archivo PDF');
                    setIsAnalyzing(false);
                    return;
                }
                const formData = new FormData();
                formData.append('pdf', file);
                body = formData;
                // No headers needed, browser sets multipart/form-data automatically
            } else if (activeTab === 'url') {
                if (!url) {
                    alert('Por favor introduce una URL válida');
                    setIsAnalyzing(false);
                    return;
                }
                body = JSON.stringify({ url });
                headers = { 'Content-Type': 'application/json' };
            } else if (activeTab === 'text') {
                if (!text) {
                    alert('Por favor introduce texto para analizar');
                    setIsAnalyzing(false);
                    return;
                }
                body = JSON.stringify({ text });
                headers = { 'Content-Type': 'application/json' };
            }

            const response = await fetch('http://localhost:3001/api/research/analyze', {
                method: 'POST',
                headers: headers,
                body: body
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error + (errorData.details ? `: ${errorData.details}` : '') || 'Error en el análisis');
            }

            const data = await response.json();
            if (data.success) {
                setAnalysis(data.analysis);
            } else {
                throw new Error('No se pudo generar el análisis');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al analizar el contenido. ' + (error as Error).message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const exportToPDF = async () => {
        if (!dashboardRef.current) return;

        try {
            const canvas = await html2canvas(dashboardRef.current, {
                scale: 2,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('reporte_investigacion_ai.pdf');
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Error al exportar el PDF');
        }
    };

    return (
        <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        <BrainCircuit className="w-8 h-8 text-purple-400" />
                        Analista AI
                    </h1>
                    <p className="text-slate-400 mt-1">Genera insights y visualizaciones de tus investigaciones en segundos.</p>
                </div>
                {analysis && (
                    <Button
                        onClick={exportToPDF}
                        className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar PDF
                    </Button>
                )}
            </div>

            {/* Input Area */}
            {!analysis && (
                <Card className="p-8 border-none bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                    <div className="relative z-10">
                        <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/40 p-1 rounded-xl">
                                <TabsTrigger value="url" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg">
                                    <LinkIcon className="w-4 h-4 mr-2" /> URL Web
                                </TabsTrigger>
                                <TabsTrigger value="text" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg">
                                    <Type className="w-4 h-4 mr-2" /> Texto / Notas
                                </TabsTrigger>
                                <TabsTrigger value="pdf" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg">
                                    <FileText className="w-4 h-4 mr-2" /> Subir PDF
                                </TabsTrigger>
                            </TabsList>

                            <div className="min-h-[200px] flex flex-col items-center justify-center p-4">

                                <TabsContent value="url" className="w-full max-w-2xl space-y-4">
                                    <div className="text-center mb-4 text-slate-300">
                                        Analiza cualquier artículo, noticia o paper online pegando aquí su enlace.
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <Input
                                                placeholder="https://ejemplo.com/articulo-investigacion"
                                                className="pl-10 bg-black/20 border-white/10 text-white h-12"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="text" className="w-full max-w-3xl space-y-4">
                                    <div className="text-center mb-4 text-slate-300">
                                        Pega tus notas, resúmenes o fragmentos de texto para estructurarlos.
                                    </div>
                                    <Textarea
                                        placeholder="Pega aquí el contenido a analizar..."
                                        className="min-h-[200px] bg-black/20 border-white/10 text-white resize-none p-4"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </TabsContent>

                                <TabsContent value="pdf" className="w-full">
                                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-colors bg-black/20">
                                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Upload className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Sube tu documento de investigación</h3>
                                        <p className="text-slate-400 mb-6 max-w-md mx-auto">
                                            Arrastra y suelta tu PDF aquí, o haz clic para buscar en tus archivos.
                                        </p>
                                        <div className="flex justify-center">
                                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                                <div className="bg-white text-black hover:bg-slate-200 transition-colors px-6 py-3 rounded-full font-medium flex items-center shadow-lg shadow-purple-500/20">
                                                    Seleccionar Archivo
                                                </div>
                                                <input
                                                    id="pdf-upload"
                                                    type="file"
                                                    accept=".pdf"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                        {file && (
                                            <div className="mt-6 flex items-center justify-center gap-2 text-green-400 bg-green-500/10 py-2 px-4 rounded-full inline-flex border border-green-500/20">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-sm font-medium">{file.name}</span>
                                                <button onClick={() => setFile(null)} className="ml-2 hover:text-white"><X className="w-4 h-4" /></button>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                            </div>

                            <div className="flex justify-center mt-8">
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || (activeTab === 'url' && !url) || (activeTab === 'text' && !text) || (activeTab === 'pdf' && !file)}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-xl shadow-purple-500/25 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 min-w-[200px]"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Analizando...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Generar Informe
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Tabs>
                    </div>
                </Card>
            )}

            {/* Dashboard Results */}
            {analysis && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    ref={dashboardRef}
                    className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 space-y-8"
                >
                    {/* Summary Section */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-purple-400" />
                                    Resumen Ejecutivo
                                </h2>
                                <p className="text-slate-300 leading-relaxed text-lg bg-black/20 p-6 rounded-2xl border border-white/5">
                                    {analysis.summary}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                    Insights Clave
                                </h2>
                                <div className="grid gap-3">
                                    {analysis.key_insights.map((insight, i) => (
                                        <div key={i} className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-xs font-bold text-purple-400">{i + 1}</span>
                                            </div>
                                            <p className="text-slate-300">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Column */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-400" />
                                Métricas Destacadas
                            </h2>
                            {analysis.stats.map((stat, i) => (
                                <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</p>
                                    <div className="text-4xl font-bold text-white tracking-tight">
                                        {stat.value}
                                        {stat.unit && <span className="text-lg text-slate-500 ml-1 font-normal">{stat.unit}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {analysis.charts.map((chart, i) => (
                            <div key={i} className="bg-black/20 p-6 rounded-3xl border border-white/5 h-[400px] flex flex-col">
                                <h3 className="text-lg font-semibold text-white mb-6 text-center">{chart.title}</h3>
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {chart.type === 'bar' ? (
                                            <BarChart data={chart.data}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                />
                                                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        ) : (
                                            <ReLineChart data={chart.data}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                                />
                                                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#1e293b', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                            </ReLineChart>
                                        )}
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
