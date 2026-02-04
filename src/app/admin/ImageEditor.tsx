import { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { X, Check, Sliders, Wand2, RotateCcw } from 'lucide-react';

/* --- FILTROS MODERNOS Y ELEGANTES --- */
const FILTERS = [
    { name: 'Original', filter: 'none' },
    { name: 'Cinematic', filter: 'contrast(115%) saturate(110%) sepia(20%) hue-rotate(-10deg)' },
    { name: 'Noir', filter: 'grayscale(100%) contrast(120%) brightness(95%)' },
    { name: 'Vivid', filter: 'saturate(140%) contrast(105%) brightness(105%)' },
    { name: 'Muted', filter: 'saturate(70%) contrast(90%) brightness(105%)' },
    { name: 'Warmth', filter: 'sepia(30%) saturate(120%) hue-rotate(-5deg)' },
    { name: 'Cool', filter: 'saturate(105%) hue-rotate(10deg) brightness(105%) contrast(95%)' },
    { name: 'Vintage', filter: 'sepia(40%) contrast(110%) saturate(80%) brightness(95%)' },
    { name: 'Dramatic', filter: 'contrast(130%) saturate(110%) brightness(90%)' }
];

interface ImageEditorProps {
    file: File;
    onSave: (file: File) => void;
    onCancel: () => void;
}

export default function ImageEditor({ file, onSave, onCancel }: ImageEditorProps) {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [adjustments, setAdjustments] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100
    });

    const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 1. Cargar imagen al montar
    useEffect(() => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        const img = new Image();
        img.src = url;
        img.onload = () => {
            setLoadedImage(img);
        };

        return () => URL.revokeObjectURL(url);
    }, [file]);

    // 2. Dibujar imagen RAW (sin filtros en el contexto) cuando carga
    useEffect(() => {
        if (loadedImage && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = loadedImage.width;
            canvas.height = loadedImage.height;

            // Dibujamos la imagen limpia. El filtro lo aplica CSS visualmente.
            ctx.filter = 'none';
            ctx.drawImage(loadedImage, 0, 0);
        }
    }, [loadedImage]);

    // Función SAVE: Aquí sí aplicamos el filtro "quemándolo" en los píxeles antes de guardar
    const handleSave = () => {
        const canvas = canvasRef.current;
        if (!canvas || !loadedImage) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1. Re-aplicar filtros al contexto
        const baseFilter = FILTERS[selectedFilter].filter === 'none' ? '' : FILTERS[selectedFilter].filter;
        const manualFilter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`;
        ctx.filter = `${baseFilter} ${manualFilter}`.trim() || 'none';

        // 2. Redibujar la imagen con el filtro activo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loadedImage, 0, 0);

        // 3. Exportar
        canvas.toBlob((blob) => {
            if (blob) {
                const editedFile = new File([blob], file.name, { type: file.type });
                onSave(editedFile);
            }
        }, file.type, 0.9); // Calidad alta (0.9)
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] flex overflow-hidden shadow-2xl flex-col md:flex-row">

                {/* --- LADO IZQUIERDO: PREVIEW --- */}
                <div className="flex-1 bg-[#0f172a] relative flex items-center justify-center p-8 overflow-hidden">
                    {/* Usamos filtros CSS en el canvas para preview instantáneo y fiable */}
                    <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-white/10 transition-all duration-300"
                        style={{
                            filter: (() => {
                                const base = FILTERS[selectedFilter].filter === 'none' ? '' : FILTERS[selectedFilter].filter;
                                const manual = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`;
                                return `${base} ${manual}`.trim();
                            })()
                        }}
                    />

                    <div className="absolute top-4 left-4 text-white/50 text-xs font-mono uppercase tracking-widest">
                        Editor de Estudio (Preview CSS)
                    </div>
                </div>

                {/* --- LADO DERECHO: CONTROLES --- */}
                <div className="w-full md:w-96 bg-white p-6 flex flex-col h-full overflow-y-auto border-l border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Wand2 className="w-5 h-5 text-purple-600" /> Edición Pro
                        </h3>
                        <Button variant="ghost" size="icon" onClick={onCancel}>
                            <X className="w-5 h-5 text-slate-400" />
                        </Button>
                    </div>

                    {/* Filtros */}
                    <div className="mb-8">
                        <Label className="uppercase text-xs font-bold text-slate-400 mb-4 block tracking-wider">Filtros de Tendencia</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {FILTERS.map((filter, index) => (
                                <button
                                    key={filter.name}
                                    onClick={() => setSelectedFilter(index)}
                                    className={`
                                        p-2 rounded-xl text-sm font-medium transition-all duration-200
                                        flex flex-col items-center gap-2 border
                                        ${selectedFilter === index
                                            ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900 ring-offset-2'
                                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-300 hover:bg-slate-100'}
                                    `}
                                >
                                    {/* Mini vista previa CSS puro para rendimiento UI */}
                                    <div
                                        className="w-full h-12 rounded-lg bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${previewUrl})`,
                                            filter: filter.filter
                                        }}
                                    />
                                    {filter.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ajustes Manuales */}
                    <div className="space-y-6 mb-8">
                        <Label className="uppercase text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 tracking-wider">
                            <Sliders className="w-3 h-3" /> Ajustes Manuales
                        </Label>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Brillo</span>
                                <span className="font-mono text-slate-400">{adjustments.brightness}%</span>
                            </div>
                            <input
                                type="range" min="50" max="150"
                                value={adjustments.brightness}
                                onChange={(e) => setAdjustments({ ...adjustments, brightness: Number(e.target.value) })}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Contraste</span>
                                <span className="font-mono text-slate-400">{adjustments.contrast}%</span>
                            </div>
                            <input
                                type="range" min="50" max="150"
                                value={adjustments.contrast}
                                onChange={(e) => setAdjustments({ ...adjustments, contrast: Number(e.target.value) })}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Saturación</span>
                                <span className="font-mono text-slate-400">{adjustments.saturation}%</span>
                            </div>
                            <input
                                type="range" min="0" max="200"
                                value={adjustments.saturation}
                                onChange={(e) => setAdjustments({ ...adjustments, saturation: Number(e.target.value) })}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                    </div>

                    {/* Acciones Footer */}
                    <div className="mt-auto pt-6 border-t border-slate-100 flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                                setSelectedFilter(0);
                                setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
                            }}
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> Reset
                        </Button>
                        <Button
                            className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={handleSave}
                        >
                            <Check className="w-4 h-4 mr-2" /> Guardar y Subir
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
