'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  const canonicalUrl = `https://moviestremtv.com${pathname}`;

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'Moviestremtv';

  const formattedTitle = lastSegment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />

        <title>{`${formattedTitle} Digital Sticker`}</title>
        <meta
          name="description"
          content={`Browse and download customizable ${formattedTitle} digital stickers for messages, social media, and more. Find free and premium designs for every occasion on our easy-to-use site.`}
        />
        <meta
          name="keywords"
          content="free stickers, download stickers, witchy stickers, weather stickers, travel stickers, transparent sticky notes, Sticker Online Shop"
        />
        <meta name="creator" content="Sticker Online Shop Team" />
        <meta name="publisher" content="Sticker Online Shop Inc." />
        <meta name="application-name" content="Sticker Online Shop" />
        <meta name="robots" content="index, follow" />

        {/* Dynamic Canonical Link */}
        <link rel="canonical" href={canonicalUrl} />

        {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TTXR6Z08V2"></script>
        <script>
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TTXR6Z08V2');
      `}
        </script>

        {/* Google Search Console */}
        <meta name="google-site-verification" content="DEwIi8zEBdTw-mVGi0I4YyqCJX30lP5HE3mtdFtQ5zs" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Favicon Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Web Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
          {/* Footer */}
          <Footer />
        </main>
      </body>
    </html>
  );
}
