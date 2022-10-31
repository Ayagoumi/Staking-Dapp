import { Theme } from "@mui/material/styles";

export default function CardActionArea(theme: Theme) {
  return {
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[200],
          width: "min-content",
        },
      },
    },
  };
}
