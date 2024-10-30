import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography  from "@mui/material/Typography";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import React, { FC, Fragment, MouseEvent, ReactNode } from "react";

import CustomButton from "./CustomButton";

interface Props {
  title: string;
  modalBody?: ReactNode;
  showFooter?: boolean;
  buttonText?: string;
  cancelText?: string;
  okText?: string;
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  onOk?: (event: MouseEvent<HTMLButtonElement>) => void;
  ButtomComponent?: FC;
}

const CustomModal: FC<Props> = ({
  title,
  modalBody,
  onCancel = null,
  onOk = null,
  cancelText = "Cancel",
  okText = "Save",
  showFooter = false,
  ButtomComponent = CustomButton,
  buttonText = "Open",
}) => {
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
    if (onOk) onOk(event);
    handleClose();
  };
  return (
    <Fragment>
      <ButtomComponent label={buttonText} onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <Box className="custom-modal">
          <Box
            className="d-flex align-items-center justify-content-between"
            sx={{ p: 1, borderBottom: 1, borderColor: "#cecece" }}
          >
            <Typography variant="h6">{title}</Typography>
            <CustomButton
              color="info"
              label="close-modal-btn"
              onClick={handleClose}
              Icon={<CloseOutlined />}
            />
          </Box>
          {Boolean(modalBody) && modalBody}
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
              />
              {Boolean(onOk) && (
                <CustomButton onClick={handleOk} label={okText} />
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CustomModal;
