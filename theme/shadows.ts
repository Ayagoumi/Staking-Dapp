import { alpha } from "@mui/material/styles";
import palette from "./palette";

interface CustomShadowOptions {
  primary: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadowOptions;
  }
  interface ThemeOptions {
    customShadows?: CustomShadowOptions;
  }
}

const LIGHT_MODE = palette.light.grey[500];
const DARK_MODE = "#000000";

const createCustomShadow = (color: string) => {
  const transparent = alpha(color, 0.24);
  return {
    primary: `0 0 2px 0 ${transparent}, 0 16px 32px -4px ${transparent}`,
  };
};

export const customShadows = {
  light: createCustomShadow(LIGHT_MODE),
  dark: createCustomShadow(DARK_MODE),
};
