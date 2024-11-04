import React, {
  FC,
  Context,
  ReactNode,
  useContext,
  useState,
  createContext,
} from "react";
import { Alert, Slide, Snackbar, SnackbarCloseReason } from "@mui/material";

interface ISnackBarContext {
  showSuccessAlert: (message: string) => void;
  showFailureAlert: (message: string) => void;
}

export const SnackBarContext: Context<ISnackBarContext> =
  createContext<ISnackBarContext>({
    showSuccessAlert: () => null,
    showFailureAlert: () => null,
  });
export const SnackBarprovider: FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<{
    open: boolean;
    message?: string;
    color?: "success" | "error" | "info";
  }>({ open: false });

  const showSuccessAlert = (message: string) => {
    setConfig((prev) => ({
      ...prev,
      open: true,
      message: message,
      color: "success",
    }));
  };

  const showFailureAlert = (message: string) => {
    setConfig((prev) => ({
      ...prev,
      open: true,
      message: message,
      color: "error",
    }));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setConfig({ open: false });
  };
  return (
    <>
      <Snackbar
        open={config?.open}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          sx={{ width: "100%" }}
          severity={config?.color || "info"}
        >
          {config?.message || ""}
        </Alert>
      </Snackbar>
      <SnackBarContext.Provider value={{ showSuccessAlert, showFailureAlert }}>
        {children}
      </SnackBarContext.Provider>
    </>
  );
};

export const useSnackBarContext = (): ISnackBarContext => {
  const context: ISnackBarContext = useContext(SnackBarContext);
  if (context === undefined) {
    throw new Error(
      "useSnackBarContext must be used within a SnackBarProvider"
    );
  }
  return context;
};
