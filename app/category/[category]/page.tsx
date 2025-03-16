'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Gallery = () => {
    const [images, setImages] = useState<string[]>([]); // Store the image URLs
    const [error, setError] = useState<string | null>(null); // Handle errors
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // Track selected image
    const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state

    const pathname = usePathname(); // Get the current pathname
    const category = pathname?.split('/')[2]; // Extract category from path

    useEffect(() => {
        if (!category) return; // Don't fetch if category is undefined

        const fetchImages = async () => {
            try {
                const response = await fetch(`/api/images?category=${category}`);
                if (!response.ok) throw new Error('Failed to fetch images');
                const data = await response.json();
                setImages(data.images || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };

        fetchImages();
    }, [category]);

    // Handle opening/closing fullscreen view
    const openFullscreen = (index: number) => {
        setSelectedImageIndex(index);
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setSelectedImageIndex(null);
    };

    // Handle next/previous image navigation
    const goToNext = () => {
        if (selectedImageIndex === null) return;
        const nextIndex = (selectedImageIndex + 1) % images.length;
        setSelectedImageIndex(nextIndex);
    };

    const goToPrev = () => {
        if (selectedImageIndex === null) return;
        const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
        setSelectedImageIndex(prevIndex);
    };

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gallery for {category}</h1>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Image ${idx + 1}`}
                        className="w-full h-auto rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => openFullscreen(idx)}
                    />
                ))}
            </div>

            {/* Fullscreen Image View */}
            {isFullscreen && selectedImageIndex !== null && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative text-center">
                        <img
                            src={images[selectedImageIndex]}
                            alt={`Fullscreen Image ${selectedImageIndex + 1}`}
                            className="max-w-[90vw] max-h-[90vh] rounded-lg"
                        />
                        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-3/4">
                            <button onClick={goToPrev} className="bg-white bg-opacity-70 px-4 py-2 text-xl rounded-lg hover:bg-opacity-100 transition"><i className="fas fa-arrow-left w-5 h-5 mr-2" />Prev</button>
                            <a
                                href={images[selectedImageIndex]}
                                download
                                className="bg-white bg-opacity-70 px-4 py-2 text-xl rounded-lg hover:bg-opacity-100 transition"
                            >
                                <i className="fas fa-download w-5 h-5 mr-2" /> Download
                            </a>
                            <button onClick={goToNext} className="bg-white bg-opacity-70 px-4 py-2 text-xl rounded-lg hover:bg-opacity-100 transition"> <i className="fas fa-arrow-right w-5 h-5 mr-2" />Next</button>
                        </div>
                        <button
                            onClick={closeFullscreen}
                            className="absolute top-5 right-5 bg-white bg-opacity-70 p-2 rounded-full text-xl hover:bg-opacity-100 transition"
                        >
                            <i className="fas fa-times text-red-600 w-6 h-6" /> {/* Font Awesome 'times' icon with red color */}
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
