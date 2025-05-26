import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color tokens
export const colors = {
  primary: {
    50: "hsl(var(--primary-50))",
    100: "hsl(var(--primary-100))",
    200: "hsl(var(--primary-200))",
    300: "hsl(var(--primary-300))",
    400: "hsl(var(--primary-400))",
    500: "hsl(var(--primary-500))",
    600: "hsl(var(--primary-600))",
    700: "hsl(var(--primary-700))",
    800: "hsl(var(--primary-800))",
    900: "hsl(var(--primary-900))",
    950: "hsl(var(--primary-950))",
  },
  neutral: {
    50: "hsl(var(--neutral-50))",
    100: "hsl(var(--neutral-100))",
    200: "hsl(var(--neutral-200))",
    300: "hsl(var(--neutral-300))",
    400: "hsl(var(--neutral-400))",
    500: "hsl(var(--neutral-500))",
    600: "hsl(var(--neutral-600))",
    700: "hsl(var(--neutral-700))",
    800: "hsl(var(--neutral-800))",
    900: "hsl(var(--neutral-900))",
    950: "hsl(var(--neutral-950))",
  },
  success: {
    light: "hsl(var(--success-light))",
    DEFAULT: "hsl(var(--success))",
    dark: "hsl(var(--success-dark))",
  },
  warning: {
    light: "hsl(var(--warning-light))",
    DEFAULT: "hsl(var(--warning))",
    dark: "hsl(var(--warning-dark))",
  },
  error: {
    light: "hsl(var(--error-light))",
    DEFAULT: "hsl(var(--error))",
    dark: "hsl(var(--error-dark))",
  },
} as const;

// Spacing tokens
export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// Border radius tokens
export const radius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// Shadow tokens
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
} as const;

// Animation tokens
export const animations = {
  duration: {
    fastest: "100ms",
    fast: "200ms",
    normal: "300ms",
    slow: "500ms",
    slowest: "1000ms",
  },
  timing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// Z-index tokens
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
  dropdown: "1000",
  sticky: "1020",
  fixed: "1030",
  modal: "1040",
  popover: "1050",
  tooltip: "1060",
} as const;

// Typography tokens
export const typography = {
  fontFamily: {
    sans: "var(--font-sans)",
    serif: "var(--font-serif)",
    mono: "var(--font-mono)",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

// Export all tokens
export const tokens = {
  colors,
  spacing,
  radius,
  shadows,
  animations,
  zIndex,
  typography,
} as const;

// Type exports
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadows;
export type AnimationToken = keyof typeof animations;
export type ZIndexToken = keyof typeof zIndex;
export type TypographyToken = keyof typeof typography; 