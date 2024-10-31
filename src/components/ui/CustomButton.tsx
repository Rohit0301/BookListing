import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FC, Fragment, MouseEvent, ReactNode } from "react";


interface Props {
  label: string;
  Icon?: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  otherProps?: object;
}

const CustomButton: FC<Props> = ({
  label,
  Icon,
  onClick,
  disabled = false,
  color = "primary",
  otherProps = {},
}): JSX.Element => {
  return (
    <Fragment>
      {Icon ? (
        <IconButton
          onClick={onClick}
          aria-label={label}
          color={color}
          sx={{
            p: 0,
            "&:focus": {
              outline: "none",
            },
          }}
        >
          {Icon}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          size="small"
          aria-label={label}
          color={color}
          onClick={onClick}
          disabled={disabled}
          {...otherProps}
        >
          {label}
        </Button>
      )}
    </Fragment>
  );
};
export default CustomButton;
