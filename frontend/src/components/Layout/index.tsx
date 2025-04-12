import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PiCardsThreeBold } from "react-icons/pi";
import HomeIcon from "@mui/icons-material/Home";
import Toolbar from "@mui/material/Toolbar";
import { Header } from "../Header";
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router";

const drawerWidth = 260;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ height: 100 }} />
      <List>
        <ListItem onClick={() => navigate("/")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Início"} />
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/library")}>
          <ListItemButton>
            <ListItemIcon>
              <PiCardsThreeBold size={22} />
            </ListItemIcon>
            <ListItemText primary={"Minha Biblioteca"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {children}
      </Box>
    </>
  );
};
