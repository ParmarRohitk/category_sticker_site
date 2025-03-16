"use client";

import Link from "next/link";
import Image from "next/image";
import CATEGORIES from "../api/category.json";


export default function Sidebar() {
    const categories = CATEGORIES || [];

    return (
        <aside className="sticky top-0 w-64 p-6 bg-white text-black shadow-md h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {/* <Link href="/" className="block">
                <Image
                    src="/logo.png"   // Path to the logo image file
                    alt="Sticker Shop"
                    width={150}        // Set the width of the logo
                    height={50}        // Set the height of the logo
                    className="object-contain"  // Ensures the image maintains its aspect ratio
                />
            </Link>} */}
            <Link href="/" className="text-xl font-bold mb-4">
                <i className="fas fa-home w-6 h-6" /> Home
            </Link>
            <hr />
            <h2 className="text-lg font-bold mb-4 mt-3"><i className="fas fa-th-large w-6 h-6" /> Categories</h2>

            <div className="flex flex-col gap-2">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md"
                    >
                        <i className={`fas ${category.icon} w-6 h-6`} />

                        <span>{category.name}</span>
                    </Link>
                ))}
            </div>
        </aside >
    );
}
