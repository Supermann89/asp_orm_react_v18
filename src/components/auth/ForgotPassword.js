import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Face } from "@mui/icons-material";
import ProgressButton from "../common/ProgressButton";
import User from "../../api/user";
import AuthContainer from "./authContainer";

const ForgotPassword = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const {
    isLoading = false,
    isLoggedIn = false,
    message = null,
    user = null,
  } = useSelector(({ auth }) => {
    return auth;
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (location.state?.from) {
        navigate(location.state?.from, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, isLoggedIn, location.state?.from]);

  const [email, setEmail] = useState(user?.email || "");

  const [errorMessage, setErrorMessage] = useState();
  const [isSended, setIsSended] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  useEffect(() => {
    setErrorMessage(message);
  }, [message]);

  const handlerEmailChange = (event) => setEmail(event.target.value);

  const handlerSubmit = useCallback(async () => {
    if (!email) {
      setErrorMessage("Не заполено поле email");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Неверно заполнено поле email");
      return;
    }
    setIsSendingRequest(true);
    const error = await User.forgotPassword(email);
    setIsSendingRequest(false);
    if (!error.message) {
      setIsSended(true);
    } else {
      setErrorMessage(error.message);
    }
  }, [email]);

  const handlerReturnToLogin = () => {
    navigate("login");
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

  const sendedResponse = (
    <Grid container justifyContent="center">
      <Typography variant="h4">Спасибо!</Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        Мы отправили инструкцию по восстановлению пароля на ваш адрес
        электронной почты. Если Вы не получили письмо в течение 10 минут,
        проверьте, указанный вами email.
      </Typography>
      <Grid container justifyContent="center" my={2}>
        <Button
          variant="outlined"
          color="primary"
          style={{ textTransform: "none" }}
          onClick={handlerReturnToLogin}
        >
          Вернуться к форме входа
        </Button>
      </Grid>
    </Grid>
  );

  return (
    !isLoading &&
    !isLoggedIn && (
      <AuthContainer>
        {isSended ? (
          sendedResponse
        ) : (
          <>
            <Grid container justifyContent="center">
              <Typography variant="h4">Восстановление пароля</Typography>
              <Typography variant="subtitle1" gutterBottom>
                Введите адрес почты, к которой привязан ваш аккаунт.
              </Typography>
            </Grid>
            <Grid container columnSpacing={2} alignItems="flex-end">
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
            {Error}
            <Grid container justifyContent="center" mt={1}>
              <ProgressButton
                loading={isSendingRequest}
                onClick={handlerSubmit}
              >
                Продолжить
              </ProgressButton>
            </Grid>
          </>
        )}
      </AuthContainer>
    )
  );
};

export default ForgotPassword;
