import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F1E3',
        navy: {
          DEFAULT: '#163B4D',
          light: '#1F4C63'
        },
        gold: {
          DEFAULT: '#C79A4B',
          light: '#D9B876'
        },
        ink: '#2B2B28'
      },
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '72rem'
      }
    }
  },
  plugins: []
} satisfies Config;
