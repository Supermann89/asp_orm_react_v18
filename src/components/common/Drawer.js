import * as React from "react";
import pages from "./pages";
import { List, ListItemButton, ListItemText } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useNavigate } from "react-router-dom";

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const AppDrawer = ({ open, onOpen, onClose }) => {
  const navigate = useNavigate();

  const onClickHandler = (path) => {
    navigate(path);
    onClose();
  };
  return (
    <SwipeableDrawer
      anchor="left"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >
      <List>
        {pages.childRoutes
          .filter((page) => page?.isMenuPage)
          .map((page) => {
            return (
              <ListItemButton
                key={page.title}
                onClick={() => onClickHandler(pages.root + page.path || "/")}
              >
                <ListItemText primary={page.title} />
              </ListItemButton>
            );
          })}
      </List>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
