import { blue } from "@mui/material/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Anton", "sans-serif"],
        subheading: ["Oswald", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
        text: ["Manrope", "sans-serif"],
        audiowide: ["Audiowide", "cursive"],
      },
      colors: {
        copper: {
          DEFAULT: "#C19A6B",
          light: "#D4AF37",
          dark: "#8B5A2B",
          glow: "rgba(193, 154, 107, 0.3)",
        },
        carbon: {
          DEFAULT: "#050505",
          light: "#111111",
          lighter: "#1A1A1A",
          border: "#262626",
        },
        steel: {
          DEFAULT: "#E5E7EB",
          dim: "#9CA3AF",
          dark: "#4B5563",
        },
      },
      spacing: {
        base: "1rem",
      },
      borderRadius: {
        small: "2px",
        large: "0px",
        pill: "9999px",
      },
      boxShadow: {
        "copper-glow": "0 0 30px rgba(193, 154, 107, 0.15)",
        "copper-strong": "0 0 50px rgba(193, 154, 107, 0.25)",
        premium: "0 20px 40px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        metallic: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
        "copper-gradient":
          "linear-gradient(135deg, #C19A6B 0%, #F3E5AB 50%, #C19A6B 100%)",
        "metallic-copper":
          "linear-gradient(135deg, #C19A6B 0%, #F3E5AB 50%, #8B5A2B 100%)",
      },
      letterSpacing: {
        tightest: "-0.05em",
        wid: "0.1em",
        ultra: "0.25em",
      },
      animation: {
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shine: "shine 4s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [],
};
