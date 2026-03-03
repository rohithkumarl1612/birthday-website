export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFF0F3',
          DEFAULT: '#FFB6C1', // Soft Pink
          dark: '#FF8DA1',
        },
        rosegold: {
          light: '#F4E3E0',
          DEFAULT: '#E0BFB8', // Rose Gold
          dark: '#CBA29A',
        },
        champagne: {
          light: '#FDF7EC',
          DEFAULT: '#F7E7CE', // Champagne Gold
          dark: '#ECD7A8',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        'great-vibes': ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'slow-drift': 'drift 20s infinite linear',
      },
      keyframes: {
        drift: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
