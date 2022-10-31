import React from "react";
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
} from "@mui/material";
import { useAppDispatch } from "@/redux/store";
import { toggleTheme } from "@/redux/slices/themeSlice";

export default function Navbar() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Toolbar>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ ml: "auto" }}
        >
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
        </Stack>
      </Container>
    </Toolbar>
  );
}
