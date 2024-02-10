const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B6BAF",
        primaryAlfa: {
          50: "#1b6aafc3",
        },
        dark: "#1F2333",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
});
