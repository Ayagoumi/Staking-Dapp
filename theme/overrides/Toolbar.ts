import { Theme } from "@mui/material/styles";
import { APPBAR_MOBILE } from "../../constants";

export default function Toolbar(theme: Theme) {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          minHeight: APPBAR_MOBILE,
          padding: theme.spacing(0, 5),
        },
      },
    },
  };
}
