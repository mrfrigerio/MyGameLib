import React, { useEffect, useRef } from "react";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { GameCard } from "../components/GameCard";
import { EditProfileForm } from "../components/EditProfileForm";
import { FormProvider, useForm } from "react-hook-form";
import { HomeDropdown } from "../components/HomeDropdown";
import { useNavigate } from "react-router";
import { useGames } from "../hooks/useGames";
import { useSearch } from "../context/Search";

export const EditProfile: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const methods = useForm();
  const navigate = useNavigate();

  const { search } = useSearch();

  return (
    <Box
      sx={{
        height: "calc(100% - 100px)",
        marginTop: "100px",
        backgroundColor: "#121212",
        overflowY: "scroll",
        transition: "opacity 0.3s ease-in-out",
        opacity: 0.05,
      }}
    >
      <EditProfileForm
        isOpen={isOpen}
        handleClose={() => {
          methods.reset();
          navigate(-1);
          setIsOpen(false);
        }}
      />
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "start", sm: "start", md: "end" }}
        sx={{ mb: 2, pr: 3, width: "100%" }}
      >
        <Box>
          <Typography
            variant="h2"
            color="textPrimary"
            sx={{ fontWeight: "bold" }}
          >
            Top jogos
          </Typography>
          <Typography variant="caption" color="textPrimary">
            Baseado no ranking dos usuários
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
