import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://moviestremtv.com";

// Dynamic metadata function
export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata> {
  const pathname = params.slug ? `/${params.slug}` : "/"; // Get slug-based dynamic path
  const canonicalUrl = `${baseUrl}${pathname}`;

  return {
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
    authors: [{ name: "Sticker Online Shop", url: baseUrl }],
    creator: "Sticker Online Shop Team",
    publisher: "Sticker Online Shop Inc.",
    applicationName: "Sticker Online Shop",
    robots: "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: "Sticker Online Shop | Free Download Unlimited Stickers",
      description:
        "Explore Witchy, Weather, Traveling, and Transparent Sticky Notes stickers. Download high-quality free stickers instantly from Sticker Online Shop.",
      siteName: "Sticker Online Shop",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sticker Online Shop | Free Download Unlimited Stickers",
      description:
        "Get unlimited free stickers! Download Witchy, Weather, Traveling, and Transparent Sticky Notes stickers instantly.",
      site: "@stickeronlineshop",
      creator: "@stickeronlineshop",
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
