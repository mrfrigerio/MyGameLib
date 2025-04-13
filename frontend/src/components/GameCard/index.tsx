import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
  BsMicrosoft,
  BsAndroid2,
} from "react-icons/bs";
import { FaApple, FaPlus } from "react-icons/fa";
import { Box, Skeleton, Stack, Tooltip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api";
import { useAuth } from "../../context/Auth";
import { PiCardsThreeBold } from "react-icons/pi";

interface IGameCardProps {
  gameId: number;
}

export function GameCard({ gameId }: IGameCardProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const userGamesQuery = useQuery({
    queryKey: ["userGames", { userId: user?.id }],
    queryFn: async () => {
      const res = await api.get<IGameResponse[]>(`/library/${user?.id}`);
      return res.data;
    },
  });

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const res = await api.get<GameDetails>(`/games/${gameId}`);
      return res.data;
    },
    enabled: !!userGamesQuery.data,
  });

  function seededRandom(): number {
    // Linear Congruential Generator params (valores clássicos)
    if (game) {
      const a = 1664525;
      const c = 1013904223;
      const m = 2 ** 32;

      let seed = game?.id;

      // Calcula valor pseudoaleatório normalizado (0 a 1)
      seed = (a * seed + c) % m;
      const random = seed / m;

      // Escala o valor para o intervalo desejado: 140 a 200
      const min = 140;
      const max = 200;
      return Math.floor(random * (max - min + 1)) + min;
    }
    return 140;
  }

  const addGameToLibrary = async (payload: IAddGameToUserLibrary) => {
    const response = await api.post("/library", payload);
    return response.data;
  };

  const addGameToUserMutation = useMutation({
    mutationFn: addGameToLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userGames", { userId: user?.id }],
      });
    },
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

  // useEffect(() => {}, [userGamesQuery.data]);

  return (
    <Card
      sx={{
        position: "relative",
        minWidth: "160px",
        maxWidth: "320px",
        flex: 1,
        borderRadius: 3,
        ":hover": {
          transition: "0.5s",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: "#1e1e1e",
          transform: "scale(1.03)",
          cursor: "pointer",
        },
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" height={180} animation="wave" />
      ) : (
        <CardMedia
          component="img"
          height={seededRandom()}
          image={game?.background_image}
          alt={game?.name || ""}
        />
      )}

      <CardContent>
        {isLoading ? (
          <Skeleton variant="text" width="80%" height={30} animation="wave" />
        ) : (
          <Typography variant="h6">{game?.name}</Typography>
        )}
      </CardContent>

      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <CardActions disableSpacing>
          {[
            { title: "PC", icon: <BsMicrosoft size={14} /> },
            { title: "Playstation", icon: <BsPlaystation /> },
            { title: "Xbox", icon: <BsXbox size={14} /> },
            { title: "Nintendo", icon: <BsNintendoSwitch size={14} /> },
            { title: "iOS", icon: <FaApple size={18} /> },
            { title: "Android", icon: <BsAndroid2 size={16} /> },
          ].map((platform, idx) => {
            if (
              game?.platforms.some((p) =>
                p.platform.slug
                  .toLowerCase()
                  .includes(platform.title.toLowerCase())
              )
            ) {
              return (
                <Tooltip title={platform.title} key={idx}>
                  <IconButton size="small" disabled={isLoading}>
                    {platform.icon}
                  </IconButton>
                </Tooltip>
              );
            }
          })}
        </CardActions>

        {isLoading ? (
          <Skeleton variant="circular" width={30} height={30} sx={{ mx: 1 }} />
        ) : (
          <Tooltip
            title={
              <Stack>
                <Typography variant="caption">Adicionar na</Typography>
                <Typography variant="caption">Minha Biblioteca</Typography>
              </Stack>
            }
          >
            {userGamesQuery.data?.find(
              (gamesLib) => gamesLib.gameId === game?.id
            ) ? (
              <IconButton
                size="small"
                sx={{ ml: "auto", mr: 1, backgroundColor: "#363636" }}
                onClick={() =>
                  removeGameFromUserMutation.mutate({
                    userId: user!.id,
                    gameId: game!.id,
                  })
                }
                disabled={removeGameFromUserMutation.isPending}
              >
                <PiCardsThreeBold color="#50FA7B" />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                sx={{ ml: "auto", mr: 1, backgroundColor: "#363636" }}
                onClick={() =>
                  addGameToUserMutation.mutate({
                    gameId: game!.id,
                    name: game!.name,
                    description: game!.description,
                    userId: user!.id,
                    imageUrl: game!.background_image,
                    metacritic: game!.metacritic,
                  })
                }
                disabled={addGameToUserMutation.isPending}
              >
                <FaPlus size={14} />
              </IconButton>
            )}
          </Tooltip>
        )}

        {isLoading ? (
          <Skeleton variant="text" width={30} height={20} sx={{ mr: 1 }} />
        ) : (
          game &&
          game.metacritic && (
            <Tooltip title="Metacritic Score">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 1,
                  border: "1px solid",
                  borderColor:
                    game.metacritic > 80
                      ? "#6DC74A"
                      : game.metacritic < 59
                      ? "#FF5555"
                      : "#F3C848",
                  padding: "1px 5px",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      game.metacritic > 80
                        ? "#6DC74A"
                        : game.metacritic < 59
                        ? "#FF5555"
                        : "#F3C848",
                    fontWeight: 600,
                  }}
                >
                  {game?.metacritic}
                </Typography>
              </Box>
            </Tooltip>
          )
        )}
      </Stack>
    </Card>
  );
}
