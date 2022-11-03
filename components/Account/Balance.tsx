import React, { useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  Chip,
  alpha,
  useTheme,
  CardActionArea,
  Tooltip,
} from "@mui/material";
import { useBalance } from "wagmi";
import { ybcAddress } from "@/constants/addresses";
import refreshFill from "@iconify/icons-eva/refresh-fill";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getStakedBalance, setBalance } from "@/redux/slices/wagmiSlice";

export default function Balance({
  spenderAddress,
}: {
  spenderAddress: `0x${string}` | undefined;
}) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const stakedBalance = useAppSelector(getStakedBalance);
  const { data: dataBalance, refetch } = useBalance({
    addressOrName: spenderAddress,
    token: ybcAddress,
  });

  useEffect(() => {
    dispatch(setBalance(dataBalance?.formatted));
  }, [dataBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetch();
  }, [stakedBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {spenderAddress && (
        <Card
          sx={{
            display: "flex",
            width: "450px",
            textAlign: "center",
            minHeight: "85px",
            py: 2,
            position: "relative",
            overflow: "revert",
          }}
        >
          <Tooltip title="Refresh Balance" placement="top">
            <CardActionArea
              onClick={() => refetch()}
              sx={{
                position: "absolute",
                width: "2.7rem",
                height: "2.7rem",
                display: "flex",
                alignItems: "center",
                top: "-1rem",
                right: "-1rem",
                p: 1.5,
                borderRadius: "100%",
                backgroundColor: alpha(theme.palette.primary.main, 0.5),
              }}
            >
              <Icon icon={refreshFill} width="25" height="25" />
            </CardActionArea>
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Balance
            </Typography>
            <Chip
              label={`${dataBalance?.formatted} YBC`}
              sx={{
                backgroundColor: alpha(theme.palette.info.main, 0.3),
                borderRadius: ".5rem",
                fontWeight: "bold",
                minWidth: "8rem",
              }}
            />
          </Box>
        </Card>
      )}
    </>
  );
}
