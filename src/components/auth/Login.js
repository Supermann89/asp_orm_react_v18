import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import AuthContainer from "./authContainer";
import { useDispatch, useSelector } from "react-redux";
import { Face, Fingerprint } from "@mui/icons-material";
import { login, clearErrorMessage } from "../../actions/authActions";
import { getCookie } from "../../utils/cookie";
import ProgressButton from "../common/ProgressButton";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const {
    isLoading = true,
    isLoggedIn = false,
    message = null,
    user = null,
  } = useSelector(({ auth }) => {
    return auth;
  });

  let emailFromCookie;
  try {
    emailFromCookie = JSON.parse(getCookie("user"))?.email || null;
  } catch {
    emailFromCookie = null;
  }

  const [email, setEmail] = React.useState(
    user?.email || emailFromCookie || ""
  );
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = React.useState();
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  useEffect(() => {
    setErrorMessage(message);
  }, [message]);

  useEffect(() => {
    return () => {
      dispatch(clearErrorMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.need_change_password) {
        navigate("/change-password", {replace: true});
      } else if (location.state?.from) {
        navigate(location.state?.from, {replace: true});
      } else {
        navigate("/", {replace: true});
      }
    }
  }, [navigate, isLoggedIn, user?.need_change_password, location.state?.from]);

  const handlerEmailChange = (event) => setEmail(event.target.value);
  const handlerPasswordChange = (event) => setPassword(event.target.value);
  const handlerSubmit = useCallback(async () => {
    if (!email) {
      setErrorMessage("Не заполено поле email");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Неверно заполнено поле email");
      return;
    }
    if (!password) {
      setErrorMessage("Не введён пароль");
      return;
    }
    setIsSendingRequest(true);

    await dispatch(login(email, password));

    setIsSendingRequest(false);
  }, [dispatch, email, password]);

  const handleLinkForgotPassword = () => {
    navigate("forgot-password");
  };

  let Error;
  if (errorMessage) {
    Error = (
      <Grid container alignItems="center" justifyContent="flex-start">
        <Grid item>
          <Typography color="error">{errorMessage}</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    !isLoading &&
    !isLoggedIn && (
      <AuthContainer>
        <Grid item>
          <Typography variant="h4">Войдите в систему</Typography>
        </Grid>
        <Grid item container columnSpacing={2} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item flexGrow={1}>
            <TextField
              variant="standard"
              id="email"
              label="email"
              type="email"
              value={email}
              onChange={handlerEmailChange}
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item flexGrow={1}>
            <TextField
              variant="standard"
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlerPasswordChange}
              fullWidth
              inputProps={{
                autoComplete: "off",
              }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Button
              onClick={handleLinkForgotPassword}
              disableFocusRipple
              disableRipple
              style={{ textTransform: "none" }}
              variant="text"
              color="primary"
            >
              Забыли пароль?
            </Button>
          </Grid>
        </Grid>
        {Error}
        <Grid container justifyContent="center" mt={1}>
          <ProgressButton loading={isSendingRequest} onClick={handlerSubmit}>
            Войти
          </ProgressButton>
        </Grid>
      </AuthContainer>
    )
  );
};

export default Login;
