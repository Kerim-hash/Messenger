import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
      fontFamily: [
        "Rubik",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
      h2: {
        fontWeight: 800,
        fontSize: 64,
        lineHeight: "80px",
        "@media (max-width: 1020px)": {
          fontSize: 48,
        },
        "@media (max-width: 600px)": {
          fontSize: 32,
        },
      },
      h6: {
        fontWeight: 700,
        fontSize: 20,
      },
    },
    palette: {
      tonalOffset: "rgb(5 115 255 / 74%)",
      primary: {
        main: "#fff",
        dark: "#fff",
      },
      secondary: {
        main: "#f7f9f9",
        dark: "#fff",
        light: "rgb(83 62 255 / 43%)",
      },
      icon: {
        main: "#0F1419",
      },
      textarea: {
        main: "#fff",
      },
      background: {
        default: "#fff",
      },
      text: {
        primary: "#fff",
        secondary: "#fff",
        grey: {
          light: "#474B4E",
          main: "#fff",
          dark: "#74828C",
          contrastText: "#fff",
        },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height: 45,
            textTransform: "none",
            borderRadius: 30,
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(175px)",
            background: "rgba(255, 255, 255, 0.2)",
            height: 45,
            color: "#fff",
            textTransform: "none",
            borderRadius: 50,
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 20,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 10,
            display: "flex",
            padding: 10,
            backdropFilter: "blur(75px)",
            background: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    },
  });