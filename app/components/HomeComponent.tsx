import Link from 'next/link';
import Image from 'next/image';
import { HOMEPAGEIMAGES } from '../api/fetchdata';

const HomePage = () => {
    const categoryImages = HOMEPAGEIMAGES;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-semibold text-center mb-8 mt-4">
                Our Collection of Stickers for Different Categories
            </h1>

            <div className="space-y-8">
                {categoryImages && categoryImages.length > 0 ? (
                    categoryImages.map((categoryData, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-start border p-4 rounded-lg hover:shadow-lg transition"
                        >
                            <Link href={`/category/${categoryData.slug}`} passHref>
                                <h2 className="text-2xl font-semibold text-center mb-4 cursor-pointer hover:text-blue-600">
                                    {categoryData.name} Sticker
                                </h2>
                                <div className="grid grid-cols-4 gap-4 w-full">
                                    {categoryData.images.slice(0, 4).map((image, i) => (
                                        <div key={i} className="flex justify-center">
                                            <Image
                                                src={image}
                                                width={200}
                                                height={200}
                                                alt={`PNG image from ${categoryData.name} category ${i + 1}`}
                                                className="w-full h-auto object-cover rounded-md max-w-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    // Show skeleton if categoryImages is empty or undefined
                    Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="border p-4 rounded-lg animate-pulse space-y-4"
                        >
                            <div className="h-6 w-48 bg-gray-300 rounded mb-4" />
                            <div className="grid grid-cols-4 gap-4">
                                {Array.from({ length: 4 }).map((_, imgIdx) => (
                                    <div
                                        key={imgIdx}
                                        className="aspect-square bg-gray-300 rounded"
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
