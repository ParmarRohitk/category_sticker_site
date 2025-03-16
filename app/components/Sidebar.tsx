"use client";

import { useState } from "react";
import Link from "next/link";
import CATEGORIES from "../api/category.json";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); // State to handle sidebar toggle
    const categories = CATEGORIES || [];

    // Toggle the sidebar open/close
    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            {/* Mobile Menu Toggle Icon */}
            {isOpen ? ' ' : <button
                aria-label="Toggle Sidebar"
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 text-black p-3 rounded-full z-50"
            >
                <i className="fas fa-bars" />
            </button>}

            {/* Sidebar */}
            <aside
                className={`${isOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-0 bg-white text-black shadow-md lg:relative lg:translate-x-0 lg:block lg:w-64 p-6 h-screen overflow-y-auto transition-transform duration-300 ease-in-out z-40`}
            >
                {/* Close Button */}
                <button
                    aria-label="Close Sidebar"
                    onClick={toggleSidebar}
                    className="lg:hidden absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
                >
                    <i className="fas fa-times" />
                </button>

                <Link href="/" className="text-xl font-bold mb-4">
                    <i className="fas fa-home w-6 h-6" /> Home
                </Link>
                <hr />
                <h2 className="text-lg font-bold mb-4 mt-3">
                    <i className="fas fa-th-large w-6 h-6" /> Categories
                </h2>

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
            </aside>
        </>
    );
}
