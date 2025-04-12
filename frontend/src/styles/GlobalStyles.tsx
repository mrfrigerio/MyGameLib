// src/styles/GlobalStyles.tsx
import React from "react";
import { CssBaseline, GlobalStyles as MuiGlobalStyles } from "@mui/material";

const GlobalStyles: React.FC = () => (
  <>
    <CssBaseline />
    <MuiGlobalStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        body: {
          height: "100%",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          backgroundColor: "#121212",
        },
        "#root": {
          height: "100%",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      }}
    />
  </>
);

export default GlobalStyles;
