import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FC, Fragment, memo, MouseEvent, ReactNode } from "react";


interface Props {
  label: string; // The text displayed on the button
  Icon?: ReactNode; // Optional icon component to display instead of a text label
  disabled?: boolean; // Optional prop to disable the button
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Function to call on button click
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"; // MUI color variants
  otherProps?: object; // Additional props to spread on the button
}

const CustomButton: FC<Props> = memo(({
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
});
export default CustomButton;
