export const modalStyles = {
  MuiModal: {
    styleOverrides: {
      root: {
        "& .custom-modal": {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "600px",
          padding: "2px",
          borderRadius: "4px",
          backgroundColor: "#fff",
          transform: "translate(-50%, -50%)",
          "&:focus-visible": {
            outline: "none"
          }
        },
      },
    },
  },
};
