import { Box, Modal } from "@mui/material";
import React, { FC, Fragment, MouseEvent, ReactNode } from "react";
import { CloseOutlined } from "@mui/icons-material";

import CustomButton from "./CustomButton";

import "./styles.css";

interface Props {
  title: string;
  modalBody: ReactNode;
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
          <Box className="modal-header">
            <Box className="title">{title}</Box>
            <CustomButton
              color="info"
              label="close-modal-btn"
              onClick={handleClose}
              Icon={<CloseOutlined />}
            />
          </Box>
          {modalBody}
          {showFooter && (
            <Box className="modal-footer">
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
