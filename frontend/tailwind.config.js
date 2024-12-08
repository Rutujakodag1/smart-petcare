/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // darkMode : "class",
  theme: {
    extend: {
      fontFamily: {
        play: ['"Play"', "sans-serif"],
      },
      colors: {
        // 'dark-blue': '#003366',  // Replace with your desired dark blue color
        // 'dark-cyan': '#004d4d',  // Replace with your desired dark cyan color
        peach: '#FFD5C5',      // Background
        primary: '#4A90E2',    // Buttons and links
        darkGray: '#2F3E46',   // Input fields
        textDark: '#2B2B2B',   // Typography
        lightGray: '#D9D9D9',  // Borders and inactive states
      },
      // backgroundImage: {
      //   'instagram-gradient': 'linear-gradient(135deg, #f58529, #feda75, #dd2a7b, #8134af)', // Define your gradient
      // },
    },
  },
  // plugins: [require('tailwindcss-animate')],
  plugins: [],

}

