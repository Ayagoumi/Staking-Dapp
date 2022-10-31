import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  // log;

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div>
      <button
        onClick={() => {
          // change the color mode
          dispatch(toggleTheme());
        }}
      >
        Toggle color mode
      </button>
    </div>
  );
}
