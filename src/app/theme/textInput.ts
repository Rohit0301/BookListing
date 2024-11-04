export const textInputStyles = {
  MuiTextField: {
    styleOverrides: {
      root: {
        width: "100%",
        padding: 0,
        "& input": {
          padding: 0,
          fontSize: "14px",
          '::placeholder': {
            fontSize: '14px',
          },
        },
        "& textarea": {
          padding: 0,
          fontSize: "14px",
          '::placeholder': {
            fontSize: '14px',
          },
        }
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        padding: "8px",

        "&.MuiInputBase-multiline": {
          padding: "8px"
        }
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
