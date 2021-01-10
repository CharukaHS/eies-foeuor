module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#1E3D58",
      secondry: "#057DCD",
      thirdary: "#43B0F1",
      background: "#E8EEF1",
    }),
    extend: {
      fontFamily: {
        title: ["Bebas Neue", "sans"],
        text: ["Roboto", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
