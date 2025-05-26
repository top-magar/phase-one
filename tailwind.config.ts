import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--neutral-200))",
        input: "hsl(var(--neutral-200))",
        ring: "hsl(var(--primary-500))",
        background: "hsl(var(--neutral-50))",
        foreground: "hsl(var(--neutral-900))",
        primary: {
          DEFAULT: "hsl(var(--primary-600))",
          foreground: "hsl(var(--neutral-50))",
        },
        secondary: {
          DEFAULT: "hsl(var(--neutral-200))",
          foreground: "hsl(var(--neutral-900))",
        },
        destructive: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--neutral-50))",
        },
        muted: {
          DEFAULT: "hsl(var(--neutral-100))",
          foreground: "hsl(var(--neutral-500))",
        },
        accent: {
          DEFAULT: "hsl(var(--neutral-100))",
          foreground: "hsl(var(--neutral-900))",
        },
        popover: {
          DEFAULT: "hsl(var(--neutral-50))",
          foreground: "hsl(var(--neutral-900))",
        },
        card: {
          DEFAULT: "hsl(var(--neutral-50))",
          foreground: "hsl(var(--neutral-900))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
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
  plugins: [],
} satisfies Config;

export default config; 