import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const Theme = {
  primary: "#6b6bbd",
  secondary: "#004990",
  
  primaryText: "#242424",
  secondaryText: "#626971",

  fontFamily: "canada-type-gibson, Gibson, Noto Sans, Avenir, Helvetica, Arial, sans-serif",

  button: "#6b6bbd",
  buttonText : '#FFFFFF',
};

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: Theme.primaryText,
    },
    primary: {
      main: Theme.primary,
    },
    secondary: {
      main: Theme.secondary,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: Theme.fontFamily,
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 16,
    fontWeightRegular: "300",
    fontWeightMedium: "500",
  },
});

export default theme;
