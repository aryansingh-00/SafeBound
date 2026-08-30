/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#ECE7FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#6355F6',
          700: '#5842F5',
          800: '#4C30DB',
          900: '#3A20B3',
          DEFAULT: '#6355F6',
        },
        safeblue: '#0284C7',
        safeteal: '#0D9488',
        safepink: '#DB2777',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 12px 32px -4px rgba(99, 85, 246, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'hero-search': '0 20px 50px -10px rgba(99, 85, 246, 0.15), 0 8px 24px -4px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px rgba(99, 85, 246, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
