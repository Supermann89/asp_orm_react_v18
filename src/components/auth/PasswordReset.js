import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Grid, TextField, Typography } from "@mui/material";
import AuthContainer from "./authContainer";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../../actions/authActions";
import { snackBarShow } from "../../actions/commonActions";
import ProgressButton from "../common/ProgressButton";

const PasswordReset = () => {
  const { token } = useParams();

  let navigate = useNavigate();
  let location = useLocation();

  const { isLoading = false, isLoggedIn = false } = useSelector(({ auth }) => {
    return auth;
  });

  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      if (location.state?.from) {
        navigate(location.state?.from,{replace: true});
      } else {
        navigate("/", {replace: true});
      }
    }
  }, [navigate, isLoggedIn, location.state?.from]);

  const dispatch = useDispatch();

  const handlerPasswordChange = (event) => setPassword(event.target.value);
  const handlerPasswordConfirmChange = (event) =>
    setPasswordConfirm(event.target.value);

  const handlerSubmit = async () => {
    if (!password) return setErrorMessage("Не заполнен новый пароль");
    if (!passwordConfirm)
      return setErrorMessage("Не заполнен пароль для подтверждения");
    if (password !== passwordConfirm)
      return setErrorMessage("Введённые пароли не совпадают");

    if (errorMessage) setErrorMessage("");
    setIsSendingRequest(true);

    const error = await dispatch(
      resetPassword(token, password, passwordConfirm)
    );
    setIsSendingRequest(false);

    if (!error.payload.message)
      dispatch(snackBarShow("success", "Пароль успешно сохранён!"));
    else setErrorMessage(error.payload.message);
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
          <Typography variant="h5">Форма восстановления пароля</Typography>
        </Grid>
        <Grid container item>
          <TextField
            variant="standard"
            id="password"
            label="Новый пароль"
            type="password"
            value={password}
            onChange={handlerPasswordChange}
            fullWidth
            required
          />
        </Grid>
        <Grid container item>
          <TextField
            variant="standard"
            id="passwordConfirm"
            label="Повторите новый пароль"
            type="password"
            value={passwordConfirm}
            onChange={handlerPasswordConfirmChange}
            fullWidth
            required
          />
        </Grid>
        {Error}
        <Grid container justifyContent="center" mt={1}>
          <ProgressButton loading={isSendingRequest} onClick={handlerSubmit}>
            Сохранить
          </ProgressButton>
        </Grid>
      </AuthContainer>
    )
  );
};

export default PasswordReset;
