/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A0F1E',
          900: '#0D1526',
          800: '#111827',
          700: '#1E293B',
        },
        indigo: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #1E293B 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot': '32px 32px',
      },
      animation: {
        'scan': 'scan 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          to: { boxShadow: '0 0 40px rgba(99,102,241,0.6)' },
        }
      }
    },
  },
  plugins: [],
}
