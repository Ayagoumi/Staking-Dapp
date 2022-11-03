import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";
import { ConnectToWalletButton } from "./ConnectToWalletButton";

export default function Connect() {
  const theme = useTheme();
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          width: "450px",
          flexDirection: "column",
          py: theme.spacing(3),
          gap: "1rem",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Welcome to test dapp
        </Typography>
        <Typography variant="body1" gutterBottom>
          To get started, connect your wallet.
        </Typography>
        <ConnectToWalletButton />
      </Paper>
    </div>
  );
}
