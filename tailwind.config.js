module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    "./.eleventy.js",
    "./src/_includes/**/*.njk",
    "./src/pages/**/*.njk",
    "./src/index.njk",
  ],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#131b4b",
      secondry: "#fe8f00",
      thirdary: "#43B0F1",
      background: "#FFFFFF",
    }),
    extend: {
      fontFamily: {
        title: ["Bebas Neue", "sans"],
        text: ["Roboto", "sans-serif"],
      },
      textColor: {
        gold: "#fe8f00",
      },
      borderColor: {
        gold: "#fe8f00",
      },
    },
  },
  variants: {},
  plugins: [],
};
