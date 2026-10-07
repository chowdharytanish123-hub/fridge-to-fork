import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: '#2F4F3E',
        sage: '#8FA58F',
        ivory: '#F7F3EA',
        warmWhite: '#FFFDF8',
        terracotta: '#C86B4A',
        mustard: '#D5A447',
        charcoal: '#252A26',
        olive: '#6F766D',
        success: '#4F8A5B',
        warning: '#D69A32',
        danger: '#B85C55',
      },
      boxShadow: {
        soft: '0 16px 40px rgba(47,79,62,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
