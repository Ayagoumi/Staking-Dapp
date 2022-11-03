import React from "react";
import { useAppSelector } from "@/redux/store";
import {
  getAddress,
  getApprovedMessage,
  getStakedMessage,
  getUnstakedMessage,
} from "@/redux/slices/wagmiSlice";
import { Card, Box, useTheme, Typography } from "@mui/material";
import Balance from "./Balance";
import Approve from "./Approve";

export default function AccountInterface() {
  const spender = useAppSelector(getAddress);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Balance spenderAddress={spender} />
      {spender && <Approve spender={spender} />}
      <ErrorMessages />
    </Box>
  );
}

export function ErrorMessages() {
  const theme = useTheme();
  const errorMsgInApprove = useAppSelector(getApprovedMessage);
  const errorMsgInStake = useAppSelector(getStakedMessage);
  const errorMsgInUnstake = useAppSelector(getUnstakedMessage);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: "450px",
          py: theme.spacing(3),
          overflow: "auto",
        }}
      >
        {errorMsgInApprove && (
          <Typography variant="subtitle2" fontWeight="bold" color="error">
            {errorMsgInApprove}
          </Typography>
        )}
        {errorMsgInStake && (
          <Typography variant="subtitle2" fontWeight="bold" color="error">
            {errorMsgInStake}
          </Typography>
        )}
        {errorMsgInUnstake && (
          <Typography variant="subtitle2" fontWeight="bold" color="error">
            {errorMsgInUnstake}
          </Typography>
        )}
      </Card>
    </>
  );
}
