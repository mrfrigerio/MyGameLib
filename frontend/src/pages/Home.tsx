import React, { useRef, useEffect } from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { GameCard } from "../components/GameCard";
import { HomeDropdown } from "../components/HomeDropdown";
import { useForm, FormProvider } from "react-hook-form";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../context/Auth";
import { useGames } from "../hooks/useGames";
import { useSearch } from "../context/Search";

export const Home: React.FC = () => {
  const { isLogged } = useAuth();
  const methods = useForm();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { search } = useSearch();
  const platforms = methods.watch("platforms");
  const ordering = methods.watch("ordering");

  useEffect(() => {
    console.log("Ordering:", ordering);
    console.log("Platforms:", platforms);
  }, [platforms, ordering]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGames({
    search,
    ordering,
    platforms,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const games = data?.pages.flatMap((page) => page.results) || [];

  return (
    <Box
      sx={{
        height: "calc(100% - 100px)",
        marginTop: "100px",
        width: "100%",
        backgroundColor: "#121212",
        overflowY: "scroll",
        transition: "opacity 0.3s ease-in-out",
        opacity: isLogged ? 1 : 0.05,
      }}
    >
      <LoginForm isOpen={!isLogged} handleClose={() => methods.reset()} />

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
              name="ordering"
              control={methods.control}
              placeholder="Ordenar por"
              values={[
                { label: "Data de lançamento", value: "-released" },
                { label: "Popularidade", value: "-rating" },
                { label: "Avaliação", value: "-metacritic" },
              ]}
            />
            <HomeDropdown
              name="platforms"
              control={methods.control}
              placeholder="Plataforma"
              values={[
                { label: "Playstation", value: 4 },
                { label: "Xbox", value: 1 },
                { label: "Nintendo", value: 7 },
                { label: "PC", value: 4 },
                { label: "Android", value: 21 },
                { label: "iOS", value: 3 },
              ]}
            />
          </Stack>
        </FormProvider>
      </Stack>

      <Masonry spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
        {games.map((game: any) => (
          <Box key={game.id} sx={{ display: "flex", width: "100%" }}>
            <GameCard gameData={game} />
          </Box>
        ))}
      </Masonry>

      <Box ref={observerRef} sx={{ p: 4, textAlign: "center" }}>
        {isFetchingNextPage && <CircularProgress />}
      </Box>
    </Box>
  );
};
