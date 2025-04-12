import React from "react";
import { Box, Typography } from "@mui/material";

export const Registration: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100% - 100px)",
        marginTop: "100px",
        width: "100%",
        flex: 1,
        backgroundColor: "#121212",
      }}
    >
      <Typography variant="h4" color="primary">
        Favorites
      </Typography>
    </Box>
  );
};
