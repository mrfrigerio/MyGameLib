import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { GameCard } from "../components/GameCard";
import { HomeDropdown } from "../components/HomeDropdown";
import { useForm, FormProvider } from "react-hook-form";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../context/Auth";

export const Home: React.FC = () => {
  const filledArray = Array.from({ length: 100 }, (_, i) => i + 1);
  const { isLogged } = useAuth();

  const methods = useForm();

  const platformOptions = methods.watch("platform");
  const orderByOptions = methods.watch("orderBy");

  React.useEffect(() => {}, [platformOptions, orderByOptions]);

  return (
    <Box
      sx={{
        height: "calc(100% - 100px)",
        marginTop: "100px",
        backgroundColor: "#121212",
        overflowY: "scroll",
        transition: "opacity 0.3s ease-in-out",
        opacity: isLogged ? 1 : 0.05,
      }}
    >
      <LoginForm
        isOpen={!isLogged}
        handleClose={() => {
          methods.reset();
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
        <FormProvider {...methods}>
          <Stack direction="row" spacing={2}>
            <HomeDropdown
              name="orderBy"
              control={methods.control}
              placeholder="Ordenar por"
              values={[
                "Relevância",
                "Popularidade",
                "Data de lançamento",
                "Média de notas",
              ]}
            />
            <HomeDropdown
              name={"platform"}
              control={methods.control}
              placeholder="Plataforma"
              values={[
                "Playstation",
                "Xbox",
                "Nintendo",
                "PC",
                "Android",
                "iOS",
              ]}
            />
          </Stack>
        </FormProvider>
      </Stack>

      <Masonry
        spacing={3}
        sx={{}}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      >
        {filledArray.map((_, index) => (
          <Box key={index} sx={{ display: "flex", width: "100%" }}>
            <GameCard />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};
