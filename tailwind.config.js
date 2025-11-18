/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Pro', 'serif'],
        sans: ['Newsreader', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        slate: {
          950: '#0a0f14',
        },
      },
    },
  },
  plugins: [],
}
