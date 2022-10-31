import React, { useState } from "react";
import { useConnect } from "wagmi";
import {
  Typography,
  Button,
  Modal,
  Box,
  Grid,
  Alert,
  Collapse,
} from "@mui/material";
import WalletButton from "./WalletButton";

export function ConnectToWalletButton() {
  const { connect, connectors, error, status } = useConnect();
  const [open, setOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setAlertStatus(false);
    }, 5000);
  };
  const handleConnect = (connector: any) => {
    setAlertStatus(true);
    connect({ connector: connector });
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Connect
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="connect-to-wallet-modal"
        aria-describedby="connect-to-wallet-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 550,
            maxWidth: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Connect Wallet
          </Typography>
          <Grid container spacing={2}>
            {connectors.map((x) => (
              <Grid item xs={12} sm={6} key={x.id} justifyContent="center">
                <WalletButton
                  handleConnect={() => handleConnect(x)}
                  imageName={x.name}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>

      {error && (
        <Collapse in={alertStatus}>
          <Alert
            severity="error"
            sx={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
          >
            {error.message}
          </Alert>
        </Collapse>
      )}

      {status === "success" && (
        <Collapse in={alertStatus}>
          <Alert
            severity="success"
            sx={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
            id="connect-to-wallet-alert"
            aria-labelledby="connect-to-wallet-alert"
          >
            Connected
          </Alert>
        </Collapse>
      )}
    </>
  );
}
