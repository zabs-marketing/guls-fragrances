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
          light: '#fafafa',
          white: '#ffffff',
          offwhite: '#f7f7f5',
          black: '#121212',
          charcoal: '#1e1e1e',
          muted: '#6b7280',
          border: '#e5e7eb',
          'border-light': '#f0f0ee',
          green: '#0a3d24',
          'green-dark': '#062617',
          'green-light': '#14532d',
          gold: '#cba365',
          'gold-light': '#e0c595',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
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

