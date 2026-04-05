import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

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
}: EditableImageProps) {
    const [currentSrc, setCurrentSrc] = useState(defaultSrc);
    const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});

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

    const { width, height, ...imgSpecificStyle } = imageStyle;

    return (
        <div
            className={cn("relative group", className)}
            onClick={onClick}
            style={{ width, height }} // Container controls layout size
        >
            <img
                src={currentSrc}
                alt={alt}
                style={imgSpecificStyle} // Image controls position/transform
                className={cn(
                    "w-full h-full transition-all duration-300",
                    objectFit === 'cover' ? 'object-cover' : 'object-contain',
                    onClick && "cursor-pointer"
                )}
            />
        </div>
    );
}
