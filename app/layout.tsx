import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext'; 

// Setup fonts
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gul's Collection | Wear Your Era",
  description: "Premium fragrances crafted for identity. Made to last. Bringing luxury niche fragrances within reach.",
  keywords: "perfume, fragrance, Gul's Collection, luxury perfume Pakistan, wear your era",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen w-full relative">
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