import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#F9423A",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
