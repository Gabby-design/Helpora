/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        helpora: {
          dark: '#090d16',
          slate: '#0f172a',
          card: '#1e293b',
          light: '#f8fafc',
          green: '#059669',
          emerald: '#10b981',
          forest: '#064e3b',
          teal: '#0d9488',
        },
        trust: {
          emerald: '#059669',
          light: '#ecfdf5',
          border: '#a7f3d0',
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'elevated-lg': '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 12px 16px -8px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 35px -10px rgba(5, 150, 105, 0.14), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'glow-brand': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
};
