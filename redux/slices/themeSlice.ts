import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IThemeState {
  mode: "light" | "dark";
}

const initialState: IThemeState = {
  mode: "dark",
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.mode;

export default ThemeSlice.reducer;
