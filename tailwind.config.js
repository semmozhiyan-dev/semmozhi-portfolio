/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        display: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        noir: {
          DEFAULT: '#050406',
          pure: '#000000',
          base: '#050406',
          surface: '#0B090D',
          card: '#100D13',
          hover: '#17121A',
          elevated: '#1D1722',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        wine: {
          deep: '#26050C',
          dark: '#3D0A13',
          DEFAULT: '#781223',
          medium: '#8E172B',
          light: '#A51D35',
          ruby: '#C02240',
          vibrant: '#DE2F52',
          glow: 'rgba(192, 34, 64, 0.22)',
        },
        champagne: {
          muted: '#807982',
          light: '#B2AAB5',
          white: '#F8F6F8',
        },
      },
      boxShadow: {
        'wine-sm': '0 2px 12px rgba(120, 18, 35, 0.2)',
        'wine-md': '0 10px 35px rgba(120, 18, 35, 0.28)',
        'wine-lg': '0 20px 60px rgba(192, 34, 64, 0.35)',
        'wine-glow': '0 0 45px rgba(192, 34, 64, 0.25)',
        'card-3d': '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(120, 18, 35, 0.15)',
      }
    },
  },
  plugins: [],
}
