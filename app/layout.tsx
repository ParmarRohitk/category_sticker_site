import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sticker Online Shop | Free Download Unlimited Stickers",
  description:
    "Discover a wide range of free stickers, including Witchy, Weather, Traveling, and Transparent Sticky Notes. Download high-quality stickers instantly from Sticker Online Shop.",
  keywords: [
    "free stickers",
    "download stickers",
    "witchy stickers",
    "weather stickers",
    "travel stickers",
    "transparent sticky notes",
    "Sticker Online Shop",
  ],
  authors: [{ name: "Sticker Online Shop", url: "https://moviestremtv.com/" }],
  creator: "Sticker Online Shop Team",
  publisher: "Sticker Online Shop Inc.",
  applicationName: "Sticker Online Shop",
  robots: "index, follow",
  /* alternates: {
    canonical: "https://moviestremtv.com/",
  }, */
  openGraph: {
    type: "website",
    url: "https://moviestremtv.com/",
    title: "Sticker Online Shop | Free Download Unlimited Stickers",
    description:
      "Explore Witchy, Weather, Traveling, and Transparent Sticky Notes stickers. Download high-quality free stickers instantly from Sticker Online Shop.",
    siteName: "Sticker Online Shop",
    /* images: [
      {
        url: "https://moviestremtv.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free Stickers Collection",
      },
    ], */
  },
  twitter: {
    card: "summary_large_image",
    title: "Sticker Online Shop | Free Download Unlimited Stickers",
    description:
      "Get unlimited free stickers! Download Witchy, Weather, Traveling, and Transparent Sticky Notes stickers instantly.",
    site: "@stickeronlineshop",
    creator: "@stickeronlineshop",
    // images: ["https://moviestremtv.com/twitter-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const baseUrl = "https://moviestremtv.com";
  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <html lang="en">
      <head>

        <link rel="canonical" href={canonicalUrl} />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
          {/* Footer */}
          <footer className="sticky bottom-0 mt-12 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Sticker Shop. All rights reserved.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
