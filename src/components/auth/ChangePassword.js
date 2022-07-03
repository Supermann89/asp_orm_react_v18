import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/authActions";
import { snackBarShow } from "../../actions/commonActions";
import ProgressButton from "../common/ProgressButton";
import AuthContainer from "./authContainer";

const ChangePassword = () => {
  const navigate = useNavigate();
  let { isLoggedIn = false, message = null } = useSelector(({ auth }) => {
    return auth;
  });

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage(message);
  }, [message]);

  const handlerPasswordChange = (event) => setPassword(event.target.value);
  const handlerPasswordCurrentChange = (event) =>
    setPasswordCurrent(event.target.value);
  const handlerPasswordConfirmChange = (event) =>
    setPasswordConfirm(event.target.value);

  const handlerSubmit = useCallback(async () => {
    if (!passwordCurrent) return setErrorMessage("Не заполнен текущий пароль");
    if (!password) return setErrorMessage("Новый пароль не введён");

    if (password !== passwordConfirm)
      return setErrorMessage("Введённые пароли не совпадают");

    if (errorMessage) setErrorMessage("");
    setIsSendingRequest(true);
    const error = await dispatch(
      changePassword(password, passwordConfirm, passwordCurrent)
    );

    setIsSendingRequest(false);
    if (!error.payload.message) {
      navigate("/profile", {replace: true});
      dispatch(snackBarShow("success", "Пароль успешно сохранён!"));
    }
  }, [
    dispatch,
    navigate,
    errorMessage,
    password,
    passwordConfirm,
    passwordCurrent,
  ]);

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
    isLoggedIn && (
      <AuthContainer>
        <Grid container justifyContent="center">
          <Typography variant="h5">Форма смены пароля</Typography>
        </Grid>
        <Grid container item>
          <TextField
            variant="standard"
            id="passwordCurrent"
            label="Текущий пароль"
            type="password"
            value={passwordCurrent}
            onChange={handlerPasswordCurrentChange}
            fullWidth
            required
          />
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
            Сменить
          </ProgressButton>
        </Grid>
      </AuthContainer>
    )
  );
};

export default ChangePassword;
