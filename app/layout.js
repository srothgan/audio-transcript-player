import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Transcript Editor - Efficient Audio and Text Synchronization",
  description: "Edit and manage your transcripts effortlessly with our advanced transcript editor. Perfect for podcasts, meetings, and interviews.",
  keywords: "transcript editor, audio transcription, text synchronization, podcast transcription, interview transcription",
  author: "Simon Rothgang",
  robots: "index, follow",
  openGraph: {
    title: "Transcript Editor",
    description: "Edit and manage your transcripts effortlessly with our advanced transcript editor.",
    url: "transcript-edit.vercel.app", // Replace with your domain
    type: "website",
    images: [
      {
        url: "transcript-edit.vercel.app/public/flaticon.png", // Replace with an actual image URL
        width: 1200,
        height: 630,
        alt: "Transcript Editor",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/flaticon.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="canonical" href="https://transcript-edit.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Transcript Editor",
              description: "Edit and manage your transcripts effortlessly with our advanced transcript editor.",
              url: "https://transcript-edit.vercel.app/",
              creator: {
                "@type": "Person",
                name: "Simon Rothgang",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Toaster />
        <Navbar />
        <main id="main-content" className="flex-grow overflow-y-auto">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
