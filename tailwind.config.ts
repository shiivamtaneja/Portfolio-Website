import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'md2': '872px'
      },
      fontSize: {
        'title': 'clamp(3rem, 10vw, 9rem)',
        'heading-1': 'clamp(2.5rem, 6.5vw, 10rem)',
        'heading-2': 'clamp(2.4rem, 8vw, 10rem)',
        'heading-3': 'clamp(2rem, 5vw, 2.75rem)',
        'special': 'clamp(2rem, 4vw, 3.25rem)',
        'works-title': 'clamp(1.25rem, 2vw, 1.5rem)',
        'body-1': 'clamp(1.1rem, 2vw, 1.3rem)',
        'body-2': 'clamp(1rem, 1.5vw, 1.5rem)',
        'body-3': '1.1rem',
        'body-4': 'clamp(0.75rem, 3vw, 1rem)',
      },
      letterSpacing: {
        'headings': '-0.03em'
      },
      backgroundColor: {
        'accent-200': '#e8e8e3',
        'accent-300': '#e1e1db',
        'accent-400': '#bfbfb1',
        'mid': '#a29e9a',
        'dark': '#393632',
        'darkest': '#080807',
      },
      textColor: {
        'accent-200': '#ddddd5',
        'accent-300': '#d1d1c7',
        'accent-400': '#bfbfb1',
        'accent-500': '#aeae9d',
        'mid': '#a29e9a',
        'mid-200': '#9e978f',
        'dark': '#393632',
        'darkest': '#080807',
      },
      // colors: {
      //   'dark': '#5A5B63',
      //   'lighter': '#81848F',
      //   'lightest': '#F7F7F7',
      //   'highlight': '#545E8C',
      //   'highlight-light': '#D9DFF2',
      // },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;