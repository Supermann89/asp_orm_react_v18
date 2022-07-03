import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppDrawer from "../../common/Drawer";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/authActions";

export default function MenuAppBar() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isLoggedIn = false, user = null } = useSelector(({ auth }) => {
    return auth;
  });

  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleMainMenu = () => {
    navigate("/admin");
  };

  const hanleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <>
      <AppDrawer
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
      />
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" sx={{ flexGrow: 1 }}>
            <Grid item container alignItems="center" sx={{ flexGrow: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                size="large"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                sx={{
                  typography: { sm: "subtitle1", md: "h6" },
                  mr: 2,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={handleMainMenu}
              >
                АС Премирование
              </Typography>
            </Grid>
            {isLoggedIn && (
              <Grid
                item
                container
                alignItems="center"
                justifyContent="flex-end"
                sx={{ width: "auto", flexShrink: 0 }}
              >
                <Typography variant="h6" sx={{ display: ["none", "block"] }}>
                  {user ? user?.fio : ""}
                </Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  size="large"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openProfile}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Профиль</MenuItem>
                  <MenuItem onClick={hanleLogout}>Выйти</MenuItem>
                </Menu>
              </Grid>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
