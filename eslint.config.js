export default [
    {
      files: ["**/*.js"],
      ignores: ["node_modules/**"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module"
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off"
      }
    }
  ];
  