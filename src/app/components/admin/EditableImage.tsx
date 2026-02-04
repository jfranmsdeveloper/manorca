import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Loader2, Settings } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ImageCropper } from './ImageCropper';
import { ImageSettings } from './ImageSettings';

interface EditableImageProps {
    section: string;
    defaultSrc: string;
    alt: string;
    className?: string;
    objectFit?: 'cover' | 'contain' | 'fill';
    onClick?: () => void;
    aspectRatio?: number;
}

export function EditableImage({
    section,
    defaultSrc,
    alt,
    className,
    objectFit = 'cover',
    onClick,
    aspectRatio
}: EditableImageProps) {
    const { isEditMode } = useAuth();
    const [currentSrc, setCurrentSrc] = useState(defaultSrc);
    const [isHovering, setIsHovering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Image Data State
    const [imageId, setImageId] = useState<string | null>(null);
    const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cropper State
    const [cropperOpen, setCropperOpen] = useState(false);
    const [selectedFileSrc, setSelectedFileSrc] = useState<string | null>(null);

    // Settings State
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Fetch latest image for this section on mount
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const gallery = await api.getGallery();
                // Find most recent image for this section
                const reversedGallery = [...gallery].reverse();
                const sectionImage = reversedGallery.find((img: any) => img.section === section);

                if (sectionImage) {
                    setCurrentSrc(sectionImage.image);
                    setImageId(sectionImage.id);
                    if (sectionImage.style) {
                        setImageStyle(sectionImage.style);
                    }
                }
            } catch (error) {
                console.error(`Error loading image for section ${section}`, error);
            }
        };

        fetchImage();
    }, [section]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/')) {
            toast.error('Por favor selecciona una imagen válida');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit (relaxed for initial crop)
            toast.error('La imagen es demasiado grande (máx 10MB)');
            return;
        }

        // Read file as DataURL for cropper
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setSelectedFileSrc(reader.result?.toString() || null);
            setCropperOpen(true);
        });
        reader.readAsDataURL(file);

        // Reset input immediately so same file can be selected again if cancelled
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };




    // --- MOVE LOGIC ---
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

    // Parse current transform to get initial X/Y
    const getTransformValues = () => {
        const transform = imageStyle.transform?.toString() || '';
        const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
        if (match) {
            return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
        }
        return { x: 0, y: 0 };
    };

    const handleMoveStart = (e: React.MouseEvent) => {
        if (!isEditMode || isResizing) return;
        // Don't trigger if clicking buttons
        if ((e.target as HTMLElement).closest('.cursor-pointer')) return;

        e.preventDefault();
        e.stopPropagation();

        const { x, y } = getTransformValues();

        setIsDragging(true);
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            currentX: x,
            currentY: y
        };

        window.addEventListener('mousemove', handleMoveMove);
        window.addEventListener('mouseup', handleMoveEnd);
    };

    const handleMoveMove = (e: MouseEvent) => {
        if (!dragRef.current) return;

        const { startX, startY, currentX, currentY } = dragRef.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        setImageStyle(prev => ({
            ...prev,
            transform: `translate(${newX}px, ${newY}px)`
        }));
    };

    const handleMoveEnd = () => {
        setIsDragging(false);
        dragRef.current = null;
        window.removeEventListener('mousemove', handleMoveMove);
        window.removeEventListener('mouseup', handleMoveEnd);
    };

    // Save on move end
    const previousDragging = useRef(false);
    useEffect(() => {
        if (previousDragging.current && !isDragging) {
            const styleToSave = { ...imageStyle };
            handleSaveSettings(styleToSave);
        }
        previousDragging.current = isDragging;
    }, [isDragging, imageStyle]);


    // --- RESIZE LOGIC ---
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
    const currentDimsRef = useRef<{ width: string; height: string } | null>(null);

    const handleResizeStart = (e: React.MouseEvent) => {
        if (!isEditMode) return;
        e.preventDefault();
        e.stopPropagation();

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();

        setIsResizing(true);
        resizeRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startW: rect.width,
            startH: rect.height
        };

        // Attach global listeners
        window.addEventListener('mousemove', handleResizeMove);
        window.addEventListener('mouseup', handleResizeEnd);
    };

    const handleResizeMove = (e: MouseEvent) => {
        if (!resizeRef.current) return;

        const { startX, startY, startW, startH } = resizeRef.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newWidth = Math.max(50, startW + deltaX); // Min 50px
        const newHeight = Math.max(50, startH + deltaY);

        const widthVal = `${newWidth}px`;
        const heightVal = `${newHeight}px`;

        setImageStyle(prev => ({
            ...prev,
            width: widthVal,
            height: heightVal
        }));

        currentDimsRef.current = { width: widthVal, height: heightVal };
    };

    const handleResizeEnd = async () => {
        setIsResizing(false);
        resizeRef.current = null;
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);

        // Save the final style
        // Save is handled by useEffect to ensure state is fresh
        if (currentDimsRef.current) {
            // Just ensure ref is set, though it should be from move
        }
    };

    // Save effect when resizing stops
    const previousResizing = useRef(false);
    useEffect(() => {
        if (previousResizing.current && !isResizing && currentDimsRef.current) {
            // Resizing just finished
            const styleToSave = { ...imageStyle, ...currentDimsRef.current };
            handleSaveSettings(styleToSave); // Reuse the existing save function
        }
        previousResizing.current = isResizing;
    }, [isResizing, imageStyle]);

    // --------------------

    const handleCropComplete = async (croppedBlob: Blob) => {
        try {
            setIsUploading(true);

            // Convert Blob to File
            const file = new File([croppedBlob], "image.webp", { type: "image/webp" });

            // 1. Upload Image
            const uploadedUrl = await api.uploadImage(file);

            // 2. Save to Gallery with correct section tag
            const newImage = {
                id: imageId || undefined, // Update existing if possible or create new? Usually create new entry for history but update ref. 
                // Actually for a simple CMS, creating a new entry is safer, but we lose the style if we don't copy it.
                // Let's create a NEW entry but copy the old style.
                title: `${section}_${Date.now()}`,
                category: 'VisualEdit',
                section: section,
                image: uploadedUrl,
                size: 'medium',
                style: imageStyle // Preserve style on image update
            };

            const savedItem = await api.saveGalleryImage(newImage);

            // 3. Update local state
            setCurrentSrc(uploadedUrl);
            if (savedItem && savedItem.item && savedItem.item.id) {
                setImageId(savedItem.item.id);
            }

            toast.success('Imagen actualizada correctamente');

        } catch (error) {
            console.error(error);
            toast.error('Error al subir la imagen');
        } finally {
            setIsUploading(false);
            setCropperOpen(false);
            setSelectedFileSrc(null);
        }
    };

    const handleSaveSettings = async (newStyle: React.CSSProperties) => {
        setImageStyle(newStyle);

        // We need to update the backend record
        // If we have an ID, update it. If not (default image), we might need to create an entry?
        // If it's a default image (no ID), we can't save style unless we upload it? 
        // Or we just save a record with the currentSrc url and new style to "claim" it.

        try {
            const imageToSave = {
                id: imageId || undefined,
                title: `${section}_style_update`,
                category: 'VisualEdit',
                section: section,
                image: currentSrc,
                style: newStyle
            };

            const savedItem = await api.saveGalleryImage(imageToSave);
            if (savedItem && savedItem.item && savedItem.item.id) {
                setImageId(savedItem.item.id);
            }
            toast.success('Estilo actualizado');
        } catch (e) {
            console.error(e);
            toast.error('Error al guardar estilo');
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isEditMode) {
            e.stopPropagation(); // Prevent opening lightbox in edit mode
            // Only trigger file upload if clicking the main area, handled by overlay buttons now
        } else if (onClick) {
            onClick();
        }
    };



    const handleResetPosition = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { transform, ...rest } = imageStyle;
        const newStyle = { ...rest, transform: undefined }; // Clear transform
        setImageStyle(newStyle);
        handleSaveSettings(newStyle);
        toast.success('Posición restablecida');
    };

    const { width, height, ...imgSpecificStyle } = imageStyle;

    return (
        <>
            <div
                ref={containerRef}
                className={cn("relative group", className)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleClick}
                style={{ width, height }} // Container controls layout size
            >
                <img
                    src={currentSrc}
                    alt={alt}
                    style={imgSpecificStyle} // Image controls position/transform
                    className={cn(
                        "w-full h-full transition-all duration-300",
                        objectFit === 'cover' ? 'object-cover' : 'object-contain',
                        isEditMode && "cursor-pointer group-hover:opacity-90",
                        isEditMode && isHovering && "scale-[1.01]" // Subtle zoom on hover in edit mode
                    )}
                />

                {/* Resize Handle (Bottom Right) */}
                {isEditMode && (
                    <div
                        className={cn(
                            "absolute bottom-0 right-0 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize z-50 flex items-center justify-center shadow-lg transition-transform hover:scale-110",
                            (isHovering || isResizing) ? "opacity-100" : "opacity-0"
                        )}
                        onMouseDown={handleResizeStart}
                    >
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                )}

                {/* Visual Guide while resizing */}
                {isResizing && (
                    <div className="absolute inset-0 border-2 border-blue-500 border-dashed pointer-events-none z-40 bg-blue-500/10" />
                )}


                {/* Hidden Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileSelect}
                />

                {/* Edit Overlay (Hide while resizing to avoid clutter) */}
                <AnimatePresence>
                    {isEditMode && !isResizing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovering || isUploading ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            onMouseDown={handleMoveStart}
                            onDoubleClick={handleResetPosition}
                            title="Doble clic para centrar"
                            className={cn(
                                "absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-row items-center justify-center gap-4 border-4 border-blue-500/50 border-dashed m-1 rounded-xl z-30",
                                isDragging ? "cursor-grabbing" : "cursor-move"
                            )}
                        >
                            {/* ... Buttons ... */}
                            {isUploading ? (
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-xl flex flex-col items-center gap-2 text-white">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <span className="text-xs font-medium">Subiendo...</span>
                                </div>
                            ) : (
                                <>
                                    {/* Upload/Crop Button */}
                                    <div
                                        className="cursor-pointer bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-xl flex flex-col items-center gap-2 text-white hover:bg-white/20 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            fileInputRef.current?.click();
                                        }}
                                    >
                                        <Edit2 className="w-6 h-6" />
                                        <span className="text-xs font-medium">Foto</span>
                                    </div>

                                    {/* Settings Button */}
                                    <div
                                        className="cursor-pointer bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-xl flex flex-col items-center gap-2 text-white hover:bg-white/20 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSettingsOpen(true);
                                        }}
                                    >
                                        <Settings className="w-6 h-6" />
                                        <span className="text-xs font-medium">Layout</span>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Passive Edit Mode Indicator */}
                {isEditMode && !isHovering && !isUploading && !isResizing && (
                    <div className="absolute top-4 right-4 bg-blue-500/90 text-white p-2 rounded-full shadow-lg backdrop-blur-md z-10 pointer-events-none animate-pulse">
                        <Edit2 className="w-4 h-4" />
                    </div>
                )}
            </div>

            {/* Cropper Modal */}
            {selectedFileSrc && (
                <ImageCropper
                    imageSrc={selectedFileSrc}
                    isOpen={cropperOpen}
                    onClose={() => {
                        setCropperOpen(false);
                        setSelectedFileSrc(null);
                    }}
                    onCropComplete={handleCropComplete}
                    aspectRatio={aspectRatio}
                />
            )}

            {/* Layout Settings Modal */}
            <ImageSettings
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                onSave={handleSaveSettings}
                initialStyle={imageStyle}
            />
        </>
    );
}
