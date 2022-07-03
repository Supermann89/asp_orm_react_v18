import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Grid, Typography } from "@mui/material";
import AuthContainer from "./authContainer";

const Profile = () => {
  let navigate = useNavigate();

  const { isLoggedIn = false, user = null } = useSelector(({ auth }) => {
    return auth;
  });

  const changePasswordHandler = () => {
      navigate("/change-password");
  };

  return (
    isLoggedIn && (
      <AuthContainer>
        <Grid item justifyContent="center" mb={2}>
          <Typography variant="h4">Мой профиль</Typography>
        </Grid>
        <Grid container my={1}>
          <Grid item xs={3}>
            <Typography>ФИО</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.fio}</Typography>
          </Grid>
        </Grid>
        <Grid container my={1}>
          <Grid item xs={3}>
            <Typography>email</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.email}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          mr={4}
          mb={1}
        >
          <Grid item>
            <Button
              disableFocusRipple
              disableRipple
              style={{
                textTransform: "none",
                backgroundColor: "transparent",
              }}
              variant="text"
              color="primary"
              onClick={changePasswordHandler}
            >
              Сменить пароль
            </Button>
          </Grid>
        </Grid>
      </AuthContainer>
    )
  );
};

export default Profile;
