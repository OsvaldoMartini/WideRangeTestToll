module.exports = {
  presets: [require("./node_modules/subject-selector-design/tailwind.config.js")],
  purge: {
    enabled: true,
    content: ["./src/**/*.{ts,tsx}", "./node_modules/subject-selector-design/dist/*.{js,jsx}"],
  },
};
