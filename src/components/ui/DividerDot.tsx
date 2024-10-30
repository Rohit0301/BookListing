import { FC } from "react";
import { Box } from "@mui/material";

interface Props {
  size: "small" | "medium" | "large";
  sx?: object;
}

const SIZES: { [key: string]: { width: string; height: string } } = {
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
      sx={{ borderRadius: "50%", bgcolor: "#cecece", ...SIZES[size], ...sx }}
    ></Box>
  );
};
export default DividerDot;
