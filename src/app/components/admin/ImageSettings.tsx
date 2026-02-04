import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface ImageSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (style: React.CSSProperties) => void;
    initialStyle?: React.CSSProperties;
}

export function ImageSettings({
    isOpen,
    onClose,
    onSave,
    initialStyle = {}
}: ImageSettingsProps) {
    const [width, setWidth] = useState(initialStyle.width || '');
    const [height, setHeight] = useState(initialStyle.height || '');

    useEffect(() => {
        if (isOpen) {
            setWidth(initialStyle.width || '');
            setHeight(initialStyle.height || '');
        }
    }, [isOpen, initialStyle]);

    const handleSave = () => {
        const newStyle: React.CSSProperties = {
            ...initialStyle,
            width: width ? width : undefined,
            height: height ? height : undefined
        };
        onSave(newStyle);
        onClose();
    };

    const handleSmartAdapt = () => {
        const smartStyle: React.CSSProperties = {
            ...initialStyle,
            width: '100%',
            height: '100%',
            transform: 'none' // Reset position
        };
        onSave(smartStyle); // Save immediately
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ajustes de Diseño</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="css-width">Ancho (CSS)</Label>
                        <Input
                            id="css-width"
                            placeholder="Ej: 100%, 300px, auto"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                        />
                        <p className="text-xs text-muted-foreground">Ocupación visual horizontal.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="css-height">Alto (CSS)</Label>
                        <Input
                            id="css-height"
                            placeholder="Ej: 400px, auto"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                        />
                        <p className="text-xs text-muted-foreground">Ocupación visual vertical.</p>
                    </div>
                </div>

                <div className="flex justify-end pb-4 px-1">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleSmartAdapt} // Call the new handler
                        className="w-full"
                    >
                        ✨ Adaptar al Layout (Smart)
                    </Button>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
