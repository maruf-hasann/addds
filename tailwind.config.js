const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F2F5F9",
          // 100: "#ce93d8",
        },
        dark: "#1F2333",
      },
    },
  },
  plugins: [],
});
