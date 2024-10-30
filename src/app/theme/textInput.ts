export const textInputStyles = {
  MuiTextField: {
    styleOverrides: {
      root: {
        width: "100%",
        padding: 0,
        "& input": {
          padding: 0,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        padding: "8px",
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        display: "block",
        fontWeight: 600,
        fontSize: "14px",
        color: "#4e4e4e",
      },
    },
  },
};
