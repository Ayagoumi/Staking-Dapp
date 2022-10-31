import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Navbar />
      {children}
    </Box>
  );
}
