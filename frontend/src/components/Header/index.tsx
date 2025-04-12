import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaUserEdit } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Logout } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledAvatar } from "./styles";
import { useAuth } from "../../context/Auth";
import logoImg from "../../assets/my-game-library-logo.png";
import logoImgWhite from "../../assets/my-game-library-logo.png";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router";

interface IHeaderProps {
  handleDrawerToggle: () => void;
}

export const Header: React.FC<IHeaderProps> = ({ handleDrawerToggle }) => {
  const { isLogged, user, signOut } = useAuth();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarString = (): string | undefined => {
    if (user && user?.name) {
      const nameArray = user?.name.split(" ");
      const nameLength = nameArray?.length;
      const firstLetter = String(nameArray[0]).charAt(0);
      const secondLetter = String(nameArray[nameLength - 1]).charAt(0);
      return firstLetter + secondLetter;
    }
    return undefined;
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: 1250, height: "100px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isLogged && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          {theme.palette.mode === "light" ? (
            <img
              src={logoImg}
              alt="Logo"
              style={{ height: "50px", margin: "4px 10px" }}
            />
          ) : (
            <img
              src={logoImgWhite}
              alt="Logo"
              style={{ height: "50px", margin: "4px 10px" }}
            />
          )}
        </Box>
        <SearchBar games={879323} onSearch={(query) => console.log(query)} />
        {isLogged && (
          <>
            <Tooltip
              placement="left"
              title={
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">{user?.name}</Typography>
                  <Typography variant="caption">{user?.email}</Typography>
                </Box>
              }
            >
              <IconButton onClick={handleClick}>
                <StyledAvatar
                  alt={user?.name}
                  src={"https://i.pravatar.cc/300"}
                >
                  {handleAvatarString()}
                </StyledAvatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem disableTouchRipple disableRipple> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px 10px 10px 10px",
                }}
              >
                <Typography variant="caption">{user?.name}</Typography>
                <Typography variant="caption">{user?.email}</Typography>
              </Box>
              {/* </MenuItem> */}
              <Divider />
              <MenuItem onClick={() => navigate("/editprofile")}>
                <ListItemIcon>
                  <FaUserEdit />
                </ListItemIcon>
                Editar Perfil
              </MenuItem>
              <MenuItem onClick={signOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
