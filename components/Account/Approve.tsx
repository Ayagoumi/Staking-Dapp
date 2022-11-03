import React, { useEffect, useState } from "react";
import {
  Card,
  useTheme,
  OutlinedInput,
  Typography,
  Button,
  Grid,
  alpha,
  CardActionArea,
} from "@mui/material";
import {
  setStakedBalance,
  getStakedMessage,
  getUnstakedMessage,
  setIsApproved,
  setMsgsReset,
} from "@/redux/slices/wagmiSlice";
import {
  useUnstake,
  useStake,
  useApprove,
  useTotalStaked,
} from "@/hooks/index";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
import { Icon } from "@iconify/react";

// TODO: refactor this component.

interface IApprove {
  spender: `0x${string}`;
}

export default function Approve({ spender }: IApprove) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [stakeAmount, setStakeAmount] = useState(0);
  const { stakedBalance, refetchStaked } = useTotalStaked(spender);
  const { writeUnstake, isUnstaked } = useUnstake(stakeAmount, refetchStaked);
  const { writeStake, isStaked } = useStake(stakeAmount, refetchStaked);
  const { writeApprove, isApproved } = useApprove(stakeAmount, spender);

  useEffect(() => {
    dispatch(setStakedBalance(stakedBalance));
  }, [stakedBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        width: "450px",
        flexDirection: "column",
        py: theme.spacing(3),
        gap: "1rem",
        overflow: "revert",
      }}
    >
      <BackBtn />
      <Typography variant="h6" fontWeight="bold">
        Approve Allowance
      </Typography>
      <Card
        sx={{
          width: "100%",
          textAlign: "left",
          p: theme.spacing(2),
          boxShadow: "none",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Staked Balance:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {`${stakedBalance} YBC`}
        </Typography>
      </Card>
      <OutlinedInput
        sx={{ width: "100%", mt: theme.spacing(2) }}
        placeholder="Amount"
        endAdornment={<Typography variant="body1">YBC</Typography>}
        onChange={(e) => setStakeAmount(Number(e.target.value))}
        type="number"
        disabled={isApproved !== "idle" && isApproved !== "denied"}
      />
      <ActionButtonsLabel
        status={isApproved}
        color="primary"
        disabled={stakeAmount === 0}
        writeFunction={writeApprove}
        label="Approve"
        pendingLabel="Approving..."
      />
      {isApproved === "approved" && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ActionButtonsLabel
              status={isUnstaked}
              color="warning"
              disabled={
                stakeAmount > 0 && stakeAmount <= stakedBalance ? false : true
              }
              writeFunction={writeUnstake}
              label="Unstake"
              pendingLabel="Unstaking..."
            />
          </Grid>
          <Grid item xs={6}>
            <ActionButtonsLabel
              status={isStaked}
              disabled={stakeAmount > 0 ? false : true}
              color="primary"
              writeFunction={writeStake}
              label="Stake"
              pendingLabel="Staking..."
            />
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export function BackBtn() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const stakedMessage = useAppSelector(getStakedMessage);
  const unstakedMessage = useAppSelector(getUnstakedMessage);

  return (
    <>
      {(stakedMessage || unstakedMessage) && (
        <CardActionArea
          onClick={() => {
            dispatch(setIsApproved("idle"));
            dispatch(setMsgsReset());
          }}
          sx={{
            position: "absolute",
            width: "2.7rem",
            height: "2.7rem",
            display: "flex",
            alignItems: "center",
            top: "-1rem",
            left: "-1rem",
            p: 1.5,
            borderRadius: "100%",
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
          }}
        >
          <Icon icon={arrowIosBackFill} width="25" height="25" />
        </CardActionArea>
      )}
    </>
  );
}

interface IActionButtonsLabel {
  status: "idle" | "pending" | "approved" | "denied";
  disabled: boolean;
  writeFunction: (() => void) | undefined;
  label: string;
  pendingLabel: string;
  color: "primary" | "warning";
}

export function ActionButtonsLabel({
  status,
  disabled,
  writeFunction,
  label,
  pendingLabel,
  color,
}: IActionButtonsLabel) {
  return (
    <>
      {(status === "idle" || status === "denied") && (
        <>
          {writeFunction && (
            <Button
              variant="outlined"
              color={color}
              sx={{ borderRadius: 2, width: "100%" }}
              onClick={() => writeFunction()}
              disabled={disabled}
            >
              {label}
            </Button>
          )}
        </>
      )}
      {status === "pending" && (
        <Button
          variant="outlined"
          sx={{ borderRadius: 2, width: "100%" }}
          disabled
        >
          {pendingLabel}
        </Button>
      )}
    </>
  );
}
