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
import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api";

interface IGameCardProps {
  gameData: Game;
}

export function GameCard({ gameData }: IGameCardProps) {
  const { data: game, isLoading } = useQuery({
    queryKey: ["game", gameData.id],
    queryFn: async () => {
      const res = await api.get<Game>(`/games/${gameData.id}`);
      return res.data;
    },
  });

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
          height={Math.floor(Math.random() * (200 - 140 + 1)) + 140}
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
            <IconButton
              size="small"
              sx={{ ml: "auto", mr: 1, backgroundColor: "#363636" }}
            >
              <FaPlus size={14} />
            </IconButton>
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
