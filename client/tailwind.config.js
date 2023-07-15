/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ytRed: "#FF0000",
        ytBlue: "#4B5FD4",
        ytGray: "#989898",
        ytLightGray: "#FFFFFF1A",
        ytMilky: "#E5E5E5",
        ytBlack: "#131415",
        ytDropDown: "#282828",
        ytRed: "#FF0000",
      },
      width: {
        halfPrimary: "130px",
        halfSecondary: "250px",
        uploadVideo: "290px",
        mediumWidth: "500px",
      },
      height: {
        uploadVideo: "300px",
      },
    },
    plugins: [],
  },
};
