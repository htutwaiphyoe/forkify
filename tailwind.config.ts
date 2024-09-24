import type { Config } from "tailwindcss";
import tailwindcssPlugin from "tailwindcss-plugin";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { getMapToken, seedsToCSSVars } from "./tailwind";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
    },
    padding: getMapToken("padding"),
    borderRadius: getMapToken("borderRadius"),
    boxShadow: { none: "none" },
    fontFamily: { sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans] },
    extend: {
      textColor: getMapToken("content"),
      backgroundColor: getMapToken("background"),
    },
  },
  plugins: [
    tailwindcssPlugin(),
    plugin(({ theme, addBase, matchUtilities }) => {
      addBase({ ":root": seedsToCSSVars("color") });
      addBase({ ":root": seedsToCSSVars("spacing") });

      matchUtilities(
        { sw: (value) => ({ "--skeleton-width": value }) },
        { values: theme("width") }
      );
      matchUtilities(
        { sh: (value) => ({ "--skeleton-height": value }) },
        { values: theme("height") }
      );
    }),
  ],
};

export default config;
