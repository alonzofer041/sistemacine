// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  themes: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    layout:{
      spacingUnit:{
        
        'unit-xs': '8px', // 2 * spacingUnit
    'unit-sm': '12px', // 3 * spacingUnit
    'unit-md': '16px', // 4 * spacingUnit
    'unit-lg': '22px', // 5.5 * spacingUnit
    'unit-xl': '36px', // 9 * spacingUnit
    'unit-2xl': '48px', // 12 * spacingUnit
    'unit-3xl': '80px', // 20 * spacingUnit
    'unit-4xl': '120px', // 30 * spacingUnit
    'unit-5xl': '224px', // 56 * spacingUnit
    'unit-6xl': '288px', // 72 * spacingUnit
    'unit-7xl': '384px', // 96 * spacingUnit
    'unit-8xl': '512px', // 128 * spacingUnit
    'unit-9xl': '640px', // 160 * spacingUnit
    'unit-0': '0px', // 0 * spacingUnit
    'unit-1': '4px', // 1 * spacingUnit
    'unit-2': '8px', // 2 * spacingUnit
    'unit-3': '12px', // 3 * spacingUnit
    'unit-3_5': '14px', // 3.5 * spacingUnit
    'unit-4': '16px', // 4 * spacingUnit
    'unit-5': '20px', // 5 * spacingUnit
    'unit-6': '24px', // 6 * spacingUnit
    'unit-7': '28px', // 7 * spacingUnit
    'unit-8': '32px', // 8 * spacingUnit
    'unit-9': '36px', // 9 * spacingUnit
    'unit-10': '40px', // 10 * spacingUnit
    'unit-11': '44px', // 11 * spacingUnit
    'unit-12': '48px', // 12 * spacingUnit
    'unit-13': '52px', // 13 * spacingUnit
    'unit-14': '56px', // 14 * spacingUnit
    'unit-15': '60px', // 15 * spacingUnit
    'unit-16': '64px', // 16 * spacingUnit
    'unit-17': '68px', // 17 * spacingUnit
    'unit-18': '72px', // 18 * spacingUnit
    'unit-20': '80px', // 20 * spacingUnit
    'unit-24': '96px', // 24 * spacingUnit
    'unit-28': '112px', // 28 * spacingUnit
    'unit-32': '128px', // 32 * spacingUnit
    'unit-36': '144px', // 36 * spacingUnit
    'unit-40': '160px', // 40 * spacingUnit
    'unit-44': '176px', // 44 * spacingUnit
    'unit-48': '192px', // 48 * spacingUnit
    'unit-52': '208px', // 52 * spacingUnit
    'unit-56': '224px', // 56 * spacingUnit
    'unit-60': '240px', // 60 * spacingUnit
    'unit-64': '256px', // 64 * spacingUnit
    'unit-72': '288px', // 72 * spacingUnit
    'unit-80': '320px', // 80 * spacingUnit
    'unit-96': '384px', // 96 * spacingUnit
      }
    },
    themes: {
        dark:{
            colors: {
                primary: {
                  DEFAULT: "#BFF264",
                  foreground: "#FFF",
                },
                focus: "#BEF264",
              }
        },
      },
  }),require("tw-elements/dist/plugin.cjs")]
}