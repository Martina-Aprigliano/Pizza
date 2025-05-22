/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lobster', 'cursive'], // For headings and prominent text
        body: ['Open Sans', 'sans-serif'], // For body text
      },
      colors: {
        primary: '#3A5F0B',       // Olive Drab - for main elements like footer, scrolled header
        secondary: '#84A98C',     // Sage Green - for accents, active links, borders
        background: '#F8FBF8',   // Subtle off-white with a hint of green - for page background
        card: '#FFFFFF',           // White for cards, can be adjusted e.g., to #EBF0EA (very light sage)
        textDark: '#2F3E2F',     // Dark Olive Green - for main text
        textLight: '#F0F8F0',    // Very Light Honeydew - for text on dark backgrounds
        accentRed: '#C08261',     // Terracotta - for CTA buttons
        naturalGreen: '#6B8E23',  // Olive Drab (more vibrant) - for plant SVGs
        heroOverlay: 'rgba(0,0,0,0.4)', // Dark overlay for hero text readability
        allergenBg: '#F0F8F0', // Light Honeydew for allergen section background
        allergenBorder: '#A0A08C', // Muted Sage for allergen section border
        allergenText: '#3A5F0B',   // Olive Drab for allergen section title
      },
      backgroundImage: {
        'hero-pizza': "url('/immagini/gennaio-pizza-o-fiore-mio.jpg')",
      }
    },
  },
  plugins: [],
}

