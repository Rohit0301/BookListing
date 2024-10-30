export const modalStyles = {
  MuiModal: {
    styleOverrides: {
      root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .custom-modal": {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "600px",
          backgroundColor: "#fff",
          padding: "2px",
          borderRadius: "4px",
          transform: "translate(-50%, -50%)",
        },
        "& .modal-header": {
          display: "flex",
          padding: "8px",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #cecece",
        },
        "& .modal-header .title": {
          fontSize: "20px",
          fontWeight: 500,
        },
        "& .modal-footer": {
          gap: "12px",
          padding: "8px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          borderTop: "1px solid #cecece",
        },
      },
    },
  },
};
