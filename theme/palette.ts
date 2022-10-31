import { alpha } from "@mui/material/styles";

declare module "@mui/material" {
  interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}

const PRIMARY = {
  light: "#1C1C1C",
  main: alpha("#1890FF", 0.6),
  dark: "#FFFFFF",
};
const SECONDARY = {
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
};
const INFO = {
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
};
const SUCCESS = {
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
};
const WARNING = {
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
};
const ERROR = {
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
};

const GREY = {
  0: "#FFFFFF",
  100: "#E3E3E3",
  200: "#C6C6C6",
  300: "#AAAAAA",
  400: "#8E8E8E",
  500: "#717171",
  600: "#555555",
  700: "#393939",
  800: "#1C1C1C ",
  900: "#000000",
  500_8: alpha("#717171", 0.08),
  100_12: alpha("#E3E3E3", 0.12),
  500_12: alpha("#717171", 0.12),
  500_16: alpha("#717171", 0.16),
  500_24: alpha("#717171", 0.24),
  500_32: alpha("#717171", 0.32),
  500_48: alpha("#717171", 0.48),
  500_56: alpha("#717171", 0.56),
  500_80: alpha("#717171", 0.8),
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#fff" },
  grey: GREY,
};

const palette = {
  light: {
    ...COMMON,
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#F8F8F8", default: "#fff" },
  },
  dark: {
    ...COMMON,
    text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
    background: { paper: "#181818", default: GREY[900] },
  },
};

export default palette;
