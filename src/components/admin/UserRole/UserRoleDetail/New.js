import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRoleDetailContainer from "./Container";
import { useDispatch } from "react-redux";
import { create } from "../../../../actions/userRoleActions";
import { snackBarShow } from "../../../../actions/commonActions";
import Typography from "@mui/material/Typography";

const UserRoleNew = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handlerButtonSave = async (name) => {
    setIsSendingRequest(true);
    const { payload } = await dispatch(create(name));
    const { userRole: data = {}, message = "" } = payload;
    setIsSendingRequest(false);

    if (Object.keys(data).length) {
      const id = data.id;
      await dispatch(snackBarShow("success", "Данные успешно сохранены!"));
      navigate(`/admin/user-role/${id}`, {replace: true});
    } else {
      await dispatch(
        snackBarShow(
          "error",
          message || "Произошла ошибка при сохранении данных!"
        )
      );
    }
  };

  return (
    <>
      <Typography variant="h5" textAlign="center" my={2}>
        Роли пользователей. Создание
      </Typography>
      <UserRoleDetailContainer
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default UserRoleNew;
