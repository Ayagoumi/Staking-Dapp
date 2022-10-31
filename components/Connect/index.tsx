import React from "react";
import { Paper, Typography } from "@mui/material";
import { ConnectToWalletButton } from "./ConnectToWalletButton";

export default function Connect() {
  return (
    <div>
      <Paper>
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
