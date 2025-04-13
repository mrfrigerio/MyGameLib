import React, { useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Masonry from "@mui/lab/Masonry";
import { GameCard } from "../components/GameCard";
import { useForm } from "react-hook-form";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../context/Auth";
import { api } from "../service/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearch } from "../context/Search";

export const Library: React.FC = () => {
  const [displayTable, setDisplayTable] = useState(true);
  const { isLogged, user } = useAuth();
  const { search } = useSearch();
  const methods = useForm();
  const queryClient = useQueryClient();

  const fetchMyGames = async () => {
    const res = await api.get(`/library/${user?.id}`);
    if (search) {
      return res.data.filter((game: any) =>
        game.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return res.data;
  };

  const { data, isLoading } = useQuery<IGameResponse[]>({
    queryKey: ["userGames", { userId: user?.id }],
    queryFn: fetchMyGames,
    enabled: !!user,
  });

  const removeGameFromLibrary = async ({
    userId,
    gameId,
  }: {
    userId: number;
    gameId: number;
  }) => {
    const response = await api.delete("/library", { data: { userId, gameId } });
    return response.data;
  };

  const removeGameFromUserMutation = useMutation({
    mutationFn: removeGameFromLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userGames", { userId: user?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["userGames", { userId: user?.id }],
      });
    },
  });
  const games: IGameResponse[] | undefined = useMemo(() => {
    if (search) {
      return data?.filter((game: IGameResponse) =>
        game.game.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return data;
  }, [data, search]);

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
            Minha Biblioteca
          </Typography>
          <Typography variant="caption" color="textPrimary">
            Jogos que você adicionou na sua biblioteca
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton
            sx={{ bgcolor: displayTable ? "#3B3B3B" : "transparent" }}
            onClick={() => setDisplayTable(true)}
          >
            <TableRowsIcon />
          </IconButton>
          <IconButton
            sx={{ bgcolor: displayTable ? "transparent" : "#3B3B3B" }}
            onClick={() => setDisplayTable(false)}
          >
            <DashboardIcon />
          </IconButton>
        </Stack>
      </Stack>

      {isLoading ? (
        <Box sx={{ textAlign: "center", mr: 3 }}>
          <LinearProgress
            color="secondary"
            sx={{ backgroundColor: "#308fe8" }}
          />
        </Box>
      ) : displayTable ? (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "calc(100vh - 240px)", width: "100%" }}
        >
          <Table stickyHeader sx={{ bgcolor: "#121212", pr: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "200px",
                    backgroundColor: "#1E1E1E",
                  }}
                >
                  Imagem
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1E1E1E", fontWeight: "bold" }}
                >
                  Nome
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1E1E1E", fontWeight: "bold" }}
                >
                  Descrição
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#1E1E1E",
                    fontWeight: "bold",
                    width: "140px",
                  }}
                >
                  Adicionado em
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#1E1E1E",
                    fontWeight: "bold",
                    borderRadius: "0 4px 0 0",
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games?.map((game) => (
                <TableRow key={game.gameId}>
                  <TableCell>
                    <img
                      src={game.game.imageUrl}
                      alt={game.game.name}
                      style={{ width: "100%", borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>{game.game.name}</TableCell>
                  <TableCell>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          game.game.description.length > 500
                            ? `${game.game.description.slice(0, 500)}...`
                            : game.game.description,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(game.addedAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        removeGameFromUserMutation.mutate({
                          userId: user!.id,
                          gameId: game.gameId,
                        })
                      }
                      disabled={removeGameFromUserMutation.isPending}
                    >
                      <DeleteIcon sx={{ color: "#FF5555" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Masonry spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
          {games!.map((game) => (
            <Box key={game.gameId} sx={{ display: "flex", width: "100%" }}>
              <GameCard gameId={game.gameId} />
            </Box>
          ))}
        </Masonry>
      )}
    </Box>
  );
};
