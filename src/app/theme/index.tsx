import { FC, ReactNode } from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material";

import { modalStyles } from "./modal";
import { textInputStyles } from "./textInput";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#6e6e6e',
    },
    info: {
      main: '#cbcbcb',
    },
    divider: 'rgba(0,0,0,0.15)',
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    ...textInputStyles,
    ...modalStyles,
    MuiCardHeader: {
      styleOverrides: {
        title: {
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: "1",
          WebkitBoxOrient: "vertical",
        },
        subheader: {
          fontStyle: "italic",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          p: {
            color: "#6e6e6e",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          },
        },
      },
    }
  },
};

const theme = createTheme(themeOptions);
 const Theme: FC<{children: ReactNode}> = ({ children }): JSX.Element => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme