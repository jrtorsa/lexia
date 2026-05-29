import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import FacebookPixel from "@/app/components/FacebookPixel";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lexia — Directorio de Abogados en México",
  description: "Encuentra al abogado ideal para tu caso. El directorio más completo de abogados verificados en México.",
  verification: {
    google: "o4OSbbUGPVshzIXUFuHPiuOnS58yZEImIK5FsuiK6Rs",
  },
  other: {
    "facebook-domain-verification": "zb0vjdgp8937yp90m8r33ukmybrdz7",
    "color-scheme": "light",
  },
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lexia",
  url: "https://lexiamx.com",
  description:
    "Directorio de abogados verificados en México. Encuentra al abogado ideal para tu caso en Chihuahua y toda la república.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://lexiamx.com/abogados?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Lexia MX",
    url: "https://lexiamx.com",
    logo: {
      "@type": "ImageObject",
      url: "https://lexiamx.com/icon-512.png",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-PX5YCRM2PQ" />
        <FacebookPixel />
      </body>
    </html>
  );
}
