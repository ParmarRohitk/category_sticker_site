import React from 'react'

export const Footer = () => {
    return (
        <footer className="sticky bottom-0 mt-12 text-center !bg-gray-100 text-gray-500 bg-white py-3 rounded-md">
            <div className="space-x-4">
                <a href="/privacy-policy/" className="text-gray-700 hover:text-blue-500">Privacy Policy</a>
                <a href="/about-us/" className="text-gray-700 hover:text-blue-500">About</a>
                <a href="/disclaimer/" className="text-gray-700 hover:text-blue-500">Disclaimer</a>
            </div>
            <p className="mt-4">&copy; 2025 Moviestremtv. All rights reserved.</p>
        </footer>
    )
}
