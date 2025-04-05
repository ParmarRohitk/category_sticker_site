'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchCategoryBySlug } from '@/app/api/fetchdata';

const GalleryClient = ({ category }: { category: string }) => {
    const [images, setImages] = useState<string[] | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (category) {
            const categoryData = fetchCategoryBySlug(category);
            setImages(categoryData?.images || null);
        }
    }, [category]);

    const openFullscreen = (index: number) => {
        setSelectedImageIndex(index);
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setSelectedImageIndex(null);
    };

    const goToNext = () => {
        if (selectedImageIndex === null || !images) return;
        setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    };

    const goToPrev = () => {
        if (selectedImageIndex === null || !images) return;
        setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    };

    if (images === null) {
        return (
            <>
                <h1 className="text-2xl font-bold mb-4 capitalize">Gallery for Category</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                    {Array.from({ length: 15 }).map((_, idx) => (
                        <div key={idx} className="w-full aspect-square bg-gray-300 animate-pulse rounded-lg" />
                    ))}
                </div>
            </>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 capitalize">Gallery for {category}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {images.map((img, idx) => (
                    <Image
                        key={idx}
                        src={img}
                        width={200}
                        height={200}
                        alt={`Image ${idx + 1}`}
                        className="w-full h-auto rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => openFullscreen(idx)}
                    />
                ))}
            </div>

            {isFullscreen && selectedImageIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative text-center">
                        <Image
                            src={images[selectedImageIndex]}
                            width={800}
                            height={800}
                            alt={`Fullscreen Image ${selectedImageIndex + 1}`}
                            className="max-w-[90vw] max-h-[90vh] rounded-lg"
                        />
                        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-3/4">
                            <button onClick={goToPrev} className="bg-white bg-opacity-70 px-4 py-2 text-xl rounded-lg hover:bg-opacity-100 transition">
                                <i className="fas fa-arrow-left w-5 h-5 mr-2" /> Prev
                            </button>
                            <a
                                href={images[selectedImageIndex]}
                                download
                                className="bg-white bg-opacity-70 px-4 py-2 text-xl rounded-lg hover:bg-opacity-100 transition"
                            >
                                <i className="fas fa-download w-5 h-5 mr-2" /> Download
                            </a>
                            <button onClick={goToNext} className="bg-white bg-opacity-70 px-4 py-2 text-xl rounded-lg hover:bg-opacity-100 transition">
                                <i className="fas fa-arrow-right w-5 h-5 mr-2" /> Next
                            </button>
                        </div>
                        <button
                            title="Close"
                            onClick={closeFullscreen}
                            className="absolute top-5 right-5 bg-white bg-opacity-70 p-2 rounded-full text-xl hover:bg-opacity-100 transition"
                        >
                            <i className="fas fa-times text-red-600 w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryClient;
