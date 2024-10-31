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
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        margin: 0
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: "#333",
        display: "block",
        fontWeight: 500,
        fontSize: "14px",
        marginBottom: "2px",
        letterSpacing: "0.02em",
      },
    },
  },
};
