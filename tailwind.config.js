/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        background : "#FFE6E6", 
        themePurple : {
          100 : "#E1AFD1",
          200 : "#AD88C6",
          300 : "#7469B6"
        },
        lightBlue : {
            100 : "#CAF4FF",
            200 : "#A0DEFF",
            300 : "#5AB2FF"  
        },
        title : "#F3CA52"
      }
    },
    fontFamily: {
      'Roboto': ['Roboto'],
    },
  },
  plugins: [],
}

