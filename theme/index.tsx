import React, { useMemo } from "react";
import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeOptions, createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "@/redux/store";
import { selectedMode } from "@/redux/slices/themeSlice";
import palette from "./palette";
import { customShadows } from "./shadows";
import componentsOverride from "./overrides/";

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const mode = useAppSelector(selectedMode);
  const isLight = mode === "light";
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
