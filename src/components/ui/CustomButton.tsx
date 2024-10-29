import { FC, Fragment, MouseEvent, ReactNode } from "react";
import { Button, IconButton } from "@mui/material";

import "./styles.css"

interface Props {
  label: string;
  Icon?: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  otherProps?: object;
}

const CustomButton: FC<Props> = ({
  label,
  Icon,
  onClick,
  color = "primary",
  otherProps = {},
}): JSX.Element => {
  return (
    <Fragment>
      {Icon ? (
        <IconButton onClick={onClick} className="icon-button" aria-label={label} color={color} sx={{ p: 0}}>
          {Icon}
        </IconButton>
      ) : (
        <Button variant="contained" size="medium" color={color} onClick={onClick} {...otherProps}>
          {label}
        </Button>
      )}
    </Fragment>
  );
};
export default CustomButton;
