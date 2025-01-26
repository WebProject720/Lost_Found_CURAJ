// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red_color: 'red',
      },
      screens: {
        phone: '0px',//min-width:480px
        desktop: '720px'//w-3/4
      },
    }
  },
  plugins: [],
};
