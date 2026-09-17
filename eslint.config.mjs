import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
      "no-unused-vars": "warn",
    },
  },
]);
