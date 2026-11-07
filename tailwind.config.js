/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#080808',
          deep: '#030303',
          surface: '#111111',
          card: '#161616',
          border: 'rgba(244, 242, 236, 0.08)',
        },
        bone: {
          DEFAULT: '#f4f2ec',
          bright: '#ffffff',
          muted: '#8e8c85',
          dim: '#4a4945',
        },
        accent: {
          acid: '#d4ff3f',
          vermilion: '#ff3e24',
          cyan: '#38ef7d',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}