import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          py: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
