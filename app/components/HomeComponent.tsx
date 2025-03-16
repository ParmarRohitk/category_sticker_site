'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CategoryImage {
    category: string;
    images: string[];
    slug: string; // Added to use in the link for category navigation
    name: string; // Added description for SEO-friendly content
}

const HomePage = () => {
    const [categoryImages, setCategoryImages] = useState<CategoryImage[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch the category images when the component mounts
    useEffect(() => {
        const fetchCategoryImages = async () => {
            try {
                const response = await fetch('/api/home'); // Call the home page API
                if (!response.ok) {
                    throw new Error('Failed to fetch category images');
                }
                const data = await response.json();
                setCategoryImages(data.categoryImages || []);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            }
        };

        fetchCategoryImages();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-semibold text-center mb-8 mt-4">
                Our Collection of Stickers for Different Categories
            </h1>


            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Display categories list vertically with images horizontally */}
            <div className="space-y-8">
                {categoryImages.length > 0 ? (
                    categoryImages.map((categoryData, idx) => (
                        <div key={idx} className="flex flex-col items-start border p-4 rounded-lg hover:shadow-lg transition">
                            {/* Category Title with Link */}
                            <Link href={`/category/${categoryData.slug}`} passHref>
                                <h2 className="text-2xl font-semibold text-center mb-4 cursor-pointer hover:text-blue-600">
                                    {categoryData.name} Sticker
                                </h2>

                                {/* Category Images Displayed Horizontally and with Responsive Grid */}
                                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
                                    {categoryData.images.slice(0, 4).map((image, i) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <div key={i} className="flex justify-center">
                                            <img
                                                src={image}
                                                alt={`PNG image from ${categoryData.category} category ${i + 1}`}
                                                className="w-full h-auto object-cover rounded-md max-w-full" // Adjust the image size to fill the available space
                                            />
                                        </div>
                                    ))}
                                </div>

                            </Link>

                        </div>
                    ))
                ) : (
                    <p className="text-center">No categories available.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
