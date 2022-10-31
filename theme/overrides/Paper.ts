import { Theme } from "@mui/material/styles";

export default function Paper(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: "none",
          paddingRight: theme.spacing(2),
          paddingLeft: theme.spacing(2),
          border: "1px solid rgba(145, 158, 171, 0.24)",
          color: theme.palette.text.primary,
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderRadius: ".5rem",
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  };
}
