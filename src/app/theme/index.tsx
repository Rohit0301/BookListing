import { FC, ReactNode } from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#cbcbcb',
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
};

const theme = createTheme(themeOptions);
 const Theme: FC<{children: ReactNode}> = ({ children }): JSX.Element => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme