import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext'; 
import NextTopLoader from 'nextjs-toploader';

// Setup fonts: Elegant Serif for Headings and clean modern Sans for UI/Body
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Gul's Premium Fragrances | Wear Your Era",
  description: "Ultra-luxury, minimal artisanal perfumes handcrafted for distinction and lasting presence.",
  keywords: "perfume, luxury fragrance, Gul's Collection, niche perfumes, minimal luxury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen w-full relative bg-brand-white text-brand-black antialiased selection:bg-brand-green/10 selection:text-brand-green">
        <NextTopLoader
          color="#0a3d24"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0a3d24,0 0 5px #0a3d24"
        />
        <StoreProvider>
          {/* Main content wrapper */}
          <div className="flex-grow w-full flex flex-col">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}