import React from "react";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

interface IWalletButton {
  handleConnect: () => void;
  imageName: string;
}

export default function WalletButton({
  handleConnect,
  imageName,
}: IWalletButton) {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleConnect}
      fullWidth
      sx={{
        flexDirection: "column",
        py: 1,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Image
        src={`/images/${imageName}.png`}
        alt={imageName}
        width={30}
        height={30}
      />
      <Typography
        variant="subtitle2"
        gutterBottom
        fontWeight="semibold"
        sx={{ mt: 1 }}
      >
        {imageName}
      </Typography>
    </Button>
  );
}
