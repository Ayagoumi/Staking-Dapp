import React from "react";
import { useSwitchNetwork } from "wagmi";
import { Card, Button, CardContent, Box, CardHeader } from "@mui/material";
import { useAppDispatch } from "@/redux/store";
import { setSupportedNetwork } from "@/redux/slices/wagmiSlice";

export function UnsupportedNetworkButton() {
  const dispatch = useAppDispatch();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: "90%",
        width: "450px",
        textAlign: "center",
      }}
    >
      <Box>
        <CardHeader
          title="Unsupported Network"
          subheader={`You are currently connected to an unsupported network. Please switch to Guerli in order to use this app.`}
        />
        <CardContent>
          {switchNetwork && (
            <Button
              variant="outlined"
              sx={{ borderRadius: 2 }}
              onClick={() => {
                switchNetwork(5);
                dispatch(setSupportedNetwork(true));
              }}
            >
              Switch Network
            </Button>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
