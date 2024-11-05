// .eslintrc.js
module.exports = {
    overrides: [
      {
        files: ["*.spec.js", "*.spec.ts"],
        rules: {
          "testing-library/prefer-screen-queries": "off",
        }
      }
    ]
  };