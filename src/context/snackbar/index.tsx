import React, {
  FC,
  Context,
  ReactNode,
  useContext,
  useState,
  Fragment,
  createContext,
} from "react";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarCloseReason } from "@mui/material";

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

  /**
   * showSuccessAlert - Displays a success message in the Snackbar.
   * @param message - The message to be displayed in the Snackbar.
   */
  const showSuccessAlert = (message: string) => {
    setConfig((prev) => ({
      ...prev,
      open: true,
      message: message,
      color: "success",
    }));
  };

  /**
   * showFailureAlert - Displays an error message in the Snackbar.
   * @param message - The message to be displayed in the Snackbar.
   */
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
    <Fragment>
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
    </Fragment>
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
