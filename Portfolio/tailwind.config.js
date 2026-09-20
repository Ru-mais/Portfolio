/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)'],
        jakarta: ['var(--font-jakarta)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        background: 'var(--bg-color)',
        surface: 'var(--surface-color)',
        surfaceHover: 'var(--surface-hover)',
        textMain: 'var(--text-main)',
        textSecondary: 'var(--text-secondary)',
        accent: 'var(--accent-color)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        }
      }
    },
  },
  plugins: [],
};
