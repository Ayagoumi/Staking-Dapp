import React, { useMemo } from "react";
import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeOptions, createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "@/redux/store";
import { selectedMode } from "@/redux/slices/themeSlice";
import palette from "./palette";

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
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
