import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { PiCardsThreeBold } from "react-icons/pi";
import { gameData } from "../../assets/game-data";
import {
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
  BsMicrosoft,
  BsAndroid2,
} from "react-icons/bs";
import { FaApple, FaPlus } from "react-icons/fa";
import { Box, Stack, Tooltip } from "@mui/material";

export function GameCard() {
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
      <CardMedia
        component="img"
        height={Math.floor(Math.random() * (200 - 140 + 1)) + 140}
        image={gameData.background_image}
        alt=""
      />
      <CardContent>
        <Typography variant="h6" sx={{}}>
          {gameData.name}
        </Typography>
      </CardContent>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <CardActions disableSpacing>
          <Tooltip title="PC">
            <IconButton size="small">
              <BsMicrosoft size={14} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Playstation">
            <IconButton size="small">
              <BsPlaystation />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xbox">
            <IconButton size="small">
              <BsXbox size={14} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Nintendo Switch">
            <IconButton size="small">
              <BsNintendoSwitch size={14} />
            </IconButton>
          </Tooltip>
          <Tooltip title="iOS">
            <IconButton size="small">
              <FaApple size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Android">
            <IconButton size="small">
              <BsAndroid2 size={16} />
            </IconButton>
          </Tooltip>
        </CardActions>
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
            sx={{
              ml: "auto",
              mr: 1,
              backgroundColor: "#363636",
            }}
          >
            <FaPlus size={14} />
            {/* <PiCardsThreeBold color="#50FA7B" /> */}
          </IconButton>
        </Tooltip>
        <Tooltip title="Metacritic Score">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 1,
              border: "1px solid",
              borderColor: gameData.metacritic > 80 ? "#6DC74A" : "#F3C848",
              padding: "1px 5px",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: gameData.metacritic > 80 ? "#6DC74A" : "#F3C848",
                fontWeight: 600,
              }}
            >
              {gameData.metacritic}
            </Typography>
          </Box>
        </Tooltip>
      </Stack>
    </Card>
  );
}
