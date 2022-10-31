import React from "react";
import { Box, Typography, Card } from "@mui/material";

export default function Actions({ chainName }: { chainName: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          width: "450px",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          Connected to {chainName}
        </Typography>
      </Card>
    </Box>
  );
}
