import React, {
  FC,
  Fragment,
  MouseEvent,
  ReactElement
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

import CustomButton from "./CustomButton";

interface Props {
  title: string; // The title of the modal, displayed at the top
  okText?: string; // Optional text for the OK button (default is "Save")
  showFooter?: boolean; // Optional flag to show the footer with action buttons
  buttonText?: string; // Optional text for the button that opens the modal (default is "Open")
  cancelText?: string; // Optional text for the Cancel button (default is "Cancel")
  modalBody?: ReactElement; // Optional React element to be displayed as the body of the modal
  showOkButton?: boolean; // Optional flag to show the OK button if there is an onOk handler
  okButtonProps?: object; // Optional additional props for the OK button
  buttonComponent?: ReactElement; // Optional custom button component to open the modal
  onOk?: (event: MouseEvent<HTMLButtonElement>) => void; // Optional handler for OK button click
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void; // Optional handler for Cancel button click
}

const CustomModal: FC<Props> = (
  {
    title,
    modalBody,
    onOk = null,
    onCancel = null,
    okText = "Save",
    cancelText = "Cancel",
    showFooter = false,
    buttonComponent = null,
    buttonText = "Open",
    showOkButton = false,
    okButtonProps = {},
  }
) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    if (onCancel) onCancel(event);
    handleClose();
  };
  const handleOk = (event: MouseEvent<HTMLButtonElement>) => {
    if (onOk) {
      onOk(event);
      handleClose();
    }
  };
  return (
    <Fragment>
      {buttonComponent ? (
        React.cloneElement(buttonComponent, {
          label: buttonText,
          onClick: handleOpen,
        })
      ) : (
        <CustomButton label={buttonText} onClick={handleOpen} />
      )}

      <Modal open={open} onClose={handleClose}>
        <Box className="custom-modal">
          <Box
            className="d-flex align-items-center justify-content-between"
            sx={{ p: 1, borderBottom: 1, borderColor: "#cecece" }}
          >
            <Typography variant="subtitle1">{title}</Typography>
            <CustomButton
              color="info"
              label="close-modal-btn"
              onClick={handleClose}
              Icon={<CloseOutlined />}
            />
          </Box>
          {modalBody && 
           React.cloneElement(modalBody, {
            onClose: handleClose,
          })
          }
          {showFooter && (
            <Box
              className="d-flex align-items-center justify-content-end gap-12"
              sx={{
                borderTop: !Boolean(modalBody) ? "none" : 1,
                borderColor: "#cecece",
                p: 1,
              }}
            >
              <CustomButton
                color="secondary"
                onClick={handleCancel}
                label={cancelText}
                otherProps={{ variant: "outlined" }}
              />
              {(showOkButton || Boolean(onOk)) && (
                <CustomButton
                  onClick={handleOk}
                  label={okText}
                  {...okButtonProps}
                />
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CustomModal;
