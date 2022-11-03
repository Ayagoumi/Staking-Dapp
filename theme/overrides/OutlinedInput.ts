export default function OutlinedInput() {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: ".5rem",
          ".MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(145, 158, 171, 0.24)",
          },
          ".MuiOutlinedInput-notchedOutline:hover": {
            borderColor: "none",
          },
        },
      },
    },
  };
}
