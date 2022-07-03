import React from "react";
import { useNavigate } from "react-router-dom";
import pages from "../../common/pages";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const onClickHandler = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <h1>Админка. Главная страница</h1>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {pages.childRoutes
          .filter((page) => page?.isMenuPage)
          .map((page) => {
            return page?.path && page?.path !== "/" ? (
              <ListItem
                button
                key={page.title}
                onClick={() => onClickHandler(pages?.root + page?.path || "/")}
              >
                <ListItemText primary={page.title} />
              </ListItem>
            ) : null;
          })}
      </List>
    </Box>
  );
};

export default Home;
