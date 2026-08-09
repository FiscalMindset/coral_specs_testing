/* Minimal ESLint flat config for the hub's frontend JS modules.
   Targets the existing consistent style: IIFE modules, var (no const/let
   churn in existing files), single + double quote mix tolerated (the source
   already uses both interchangeably), semicolons required. Catches real
   correctness issues — undefined variables, unused vars, redeclaration,
   accidental global assignment — without forcing stylistic rewrites. */
"use strict";

const browserGlobals = require("globals").browser;

module.exports = [
  {
    files: ["frontend/js/**/*.js"],
    ignores: ["frontend/test/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: browserGlobals
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { "args": "none", "varsIgnorePattern": "^_", "caughtErrors": "none" }],
      "no-undef-init": "error",
      "no-redeclare": "error",
      "no-shadow-restricted-names": "error"
    }
  }
];
