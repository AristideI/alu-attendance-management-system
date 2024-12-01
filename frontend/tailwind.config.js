/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#101132",
          200: "#d54cc0",
          300: "#514cb1",
          400: "#ffc138",
        },
      },
    },
  },
  plugins: [],
};
