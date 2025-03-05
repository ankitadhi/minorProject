/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths based on your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      spacing: {
        12: "3rem", // For `h-12` and `w-12`
        10: "2.5rem", // For `md:h-10`
      },
      minWidth: {
        120: "120px", // For `md:min-w-[120px]`
      },
      colors: {
        primaryBlack: "#000000", // Custom color for `bg-primaryBlack`
      },
      backgroundImage: {
        gradientPinkRed: "linear-gradient(to right, #ff7eb3, #ff758c)", // Already included
      },
      boxShadow: {
        button: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", // Already included
      },
      screens: {
        sidebar: "1024px", // Already included
      },
      borderRadius: {
        full: "9999px", // `rounded-full`, default but retained for clarity
      },
    },
  },
  plugins: [],
};
