import { FC } from "react";
import { Box } from "@mui/material";

interface Props {
  size: "small" | "medium" | "large"; // Determines the size of the divider dot
  sx?: object; // Optional custom styles to apply to the Box component
}

export const SIZES: { [key: string]: { width: string; height: string } } = {
  small: {
    width: "4px",
    height: "4px",
  },
  medium: {
    width: "8px",
    height: "8px",
  },
  large: {
    width: "12px",
    height: "12px",
  },
};

const DividerDot: FC<Props> = ({ size, sx = {} }) => {
  return (
    <Box 
      aria-label="divider-dot"
      sx={{ borderRadius: "50%", bgcolor: "#cecece", ...SIZES[size], ...sx }}
    ></Box>
  );
};
export default DividerDot;
