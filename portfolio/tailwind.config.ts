/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0d0d11',
        'bg-secondary': '#15151a',
        'bg-tertiary': '#1e1e24',
        'bg-card': '#1a1a20',
        /* Arknights Endfield specific colors */
        'accent-yellow': '#f0c808', /* Industrial yellow */
        'accent-yellow-dim': '#8a7500',
        'accent-teal': '#2bc0d4', /* Endfield's muted tech blue/teal */
        'accent-teal-dim': '#145c66',
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
        'text-muted': '#666666',
        'border-subtle': '#333333',
        'border-active': '#f0c808',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hazard-stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(240, 200, 8, 0.1) 10px, rgba(240, 200, 8, 0.1) 20px)',
      }
    },
  },
  plugins: [],
}
