/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f3f0ff',
          100: '#e9e3ff',
          200: '#d5caff',
          300: '#b8a4ff',
          400: '#9b75ff',
          500: '#7c3aed',   // primary
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b0764',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f1117',
        },
        card: {
          DEFAULT: '#f8f9fc',
          dark: '#1a1d27',
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#252836',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.1)',
        'brand': '0 4px 20px rgba(124,58,237,0.25)',
      },
    },
  },
  plugins: [],
}
