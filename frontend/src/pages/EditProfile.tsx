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
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { search } = useSearch();
  const platforms = methods.watch("platforms");
  const ordering = methods.watch("ordering");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGames({
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

      {isLoading ? (
        <Box sx={{ textAlign: "center", mr: 3 }}>
          <LinearProgress
            color="secondary"
            sx={{ backgroundColor: "#308fe8" }}
          />
        </Box>
      ) : (
        <Masonry spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
          {games.map((game: any) => (
            <Box key={game.id} sx={{ display: "flex", width: "100%" }}>
              <GameCard gameId={game.id} />
            </Box>
          ))}
        </Masonry>
      )}

      <Box ref={observerRef} sx={{ p: 4, textAlign: "center" }}>
        {isFetchingNextPage && <CircularProgress />}
      </Box>
    </Box>
  );
};
