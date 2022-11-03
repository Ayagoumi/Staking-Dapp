import React, { useEffect, useState } from "react";
import {
  Card,
  useTheme,
  OutlinedInput,
  Typography,
  Button,
} from "@mui/material";
import { setStakedBalance } from "@/redux/slices/wagmiSlice";
import {
  useUnstake,
  useStake,
  useApprove,
  useTotalStaked,
} from "@/hooks/index";
import { useAppDispatch } from "@/redux/store";

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
        width: "450px",
        flexDirection: "column",
        py: theme.spacing(3),
        gap: "1rem",
      }}
    >
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
        disabled={stakeAmount === 0}
        writeFunction={writeApprove}
        label="Approve"
        pendingLabel="Approving..."
      />
      {isApproved === "approved" && (
        <>
          <ActionButtonsLabel
            status={isUnstaked}
            disabled={
              stakeAmount > 0 && stakeAmount <= stakedBalance ? false : true
            }
            writeFunction={writeUnstake}
            label="Unstake"
            pendingLabel="Unstaking..."
          />
          <ActionButtonsLabel
            status={isStaked}
            disabled={stakeAmount > 0 ? false : true}
            writeFunction={writeStake}
            label="Stake"
            pendingLabel="Staking..."
          />
        </>
      )}
    </Card>
  );
}

interface IActionButtonsLabel {
  status: "idle" | "pending" | "approved" | "denied";
  disabled: boolean;
  writeFunction: (() => void) | undefined;
  label: string;
  pendingLabel: string;
}

export function ActionButtonsLabel({
  status,
  disabled,
  writeFunction,
  label,
  pendingLabel,
}: IActionButtonsLabel) {
  return (
    <>
      {(status === "idle" || status === "denied") && (
        <>
          {writeFunction && (
            <Button
              variant="outlined"
              sx={{ borderRadius: 2 }}
              onClick={() => writeFunction()}
              disabled={disabled}
            >
              {label}
            </Button>
          )}
        </>
      )}
      {status === "pending" && (
        <Button variant="outlined" sx={{ borderRadius: 2 }} disabled>
          {pendingLabel}
        </Button>
      )}
    </>
  );
}
