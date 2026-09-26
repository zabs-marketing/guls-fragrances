import type {Metadata} from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

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
  title: "Gul's | Premium Fragrances",
  description: "Experience the house of Gul's. Sophisticated perfumes and luxury scents for the modern individual.",
  openGraph: {
    title: "Gul's | Premium Fragrances",
    description: "Experience the house of Gul's. Sophisticated perfumes and luxury scents for the modern individual.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gul's | Premium Fragrances",
    description: "Experience the house of Gul's. Sophisticated perfumes and luxury scents for the modern individual.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="bg-[#FAF9F6] text-[#1A1A1A] antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
