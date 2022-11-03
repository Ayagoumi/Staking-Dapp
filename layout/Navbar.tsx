import React, { useState } from "react";
import { Icon } from "@iconify/react";
import moonFill from "@iconify/icons-eva/moon-fill";
import sunFill from "@iconify/icons-eva/sun-fill";
import {
  useTheme,
  Toolbar,
  Box,
  CardActionArea,
  Container,
  Stack,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toggleTheme } from "@/redux/slices/themeSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDisconnect } from "wagmi";
import {
  setConnectionStatus,
  getConnectionStatus,
  getAddress,
  resetStore,
} from "@/redux/slices/wagmiSlice";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { disconnect } = useDisconnect();

  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(getConnectionStatus);
  const address = useAppSelector(getAddress);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDisconnect = () => {
    // reset store
    dispatch(setConnectionStatus(false));
    disconnect();
    dispatch(resetStore());
    setAnchorEl(null);
  };

  return (
    <Toolbar>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ ml: "auto" }}
        >
          {isConnected && (
            <>
              <Button
                id="logout-button"
                aria-controls={open ? "logout-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ px: 1.5, borderRadius: 2 }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ width: "75px" }}
                  noWrap
                >
                  {address}
                </Typography>
              </Button>
              <Menu
                id="logout-menu"
                MenuListProps={{ "aria-labelledby": "logout-button" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: { mt: 1, borderRadius: 2, px: 0.8 },
                }}
              >
                <MenuItem sx={{ borderRadius: 2 }} onClick={handleDisconnect}>
                  Disconnect
                </MenuItem>
              </Menu>
            </>
          )}
          <ToggleButton />
        </Stack>
      </Container>
    </Toolbar>
  );
}

function ToggleButton() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <CardActionArea
      onClick={() => dispatch(toggleTheme())}
      sx={{ borderRadius: 8 }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          color: "text.primary",
          justifyContent: "center",
        }}
      >
        <Icon
          icon={theme.palette.mode === "dark" ? sunFill : moonFill}
          width={24}
          height={24}
        />
      </Box>
    </CardActionArea>
  );
}
