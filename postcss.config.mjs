import colors from "tailwindcss/colors";

const config = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#8B0000",
          100: "#ADFF2F",
        },
        blue: "#0000FF",
        error: "#FF0000",
        light: {
          100: "#333F4E",
          200: "#A3B2C7",
          300: "#F2F5F9",
          400: "#F2F4F8",
        },
        dark: {
          100: "#04050C",
          200: "#131524",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      boxShadow: {
        "drop-1": "0px 10px 30px 0px rgba(66, 71, 97, 0.1)",
        "drop-2": "0px 8px 30px 0 rgba(65, 89, 214, 0.3)",
        "drop-3": "0px 8px 30px 0 rgba(65, 89, 214, 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%,50%": { opacity: 0 },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out- infinite",
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
