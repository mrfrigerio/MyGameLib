import React from "react";
import { Box, Typography } from "@mui/material";

export const Library: React.FC = () => {
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
        backgroundColor: "#242424",
      }}
    >
      <Typography variant="h4" color="primary">
        Library
      </Typography>
    </Box>
  );
};
