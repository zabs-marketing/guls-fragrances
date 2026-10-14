import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#ffffff',
          offwhite: '#F3E9D7',
          beige: '#D8C6A5',
          black: '#29251D',
          green: '#183629',
          'green-dark': '#0B1B12',
          gold: '#C9A66B',
          'gold-light': '#E8D2A5',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'], // Yahan Montserrat variable use kiya
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'soft-md': '0 6px 20px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 12px 32px -6px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 20px 48px -8px rgba(0, 0, 0, 0.10), 0 8px 18px -3px rgba(0, 0, 0, 0.04)',
        'soft-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 20px 40px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
};

export default config;