import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getById, updateById } from "../../../../actions/userRoleActions";
import Typography from "@mui/material/Typography";
import UserRoleDetailContainer from "./Container";
import { snackBarShow } from "../../../../actions/commonActions";
import { clear } from "../../../../actions/userActions";
import EmptyPage from "../../../common/EmptyPage";

const initObj = { name: "" };

const UserRoleEdit = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [userRole, setUserRole] = useState(initObj);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isNotFound, setIsNotFound] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const data = await dispatch(getById(id));
      const newUserRole = { ...initObj, ...data.payload };

      setUserRole(newUserRole);
      if (Object.keys(data.payload).length) setIsNotFound(false);
      setIsLoading(false);
    };

    fetchUserRole();

    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  const handlerButtonSave = async (name) => {
    setIsSendingRequest(true);
    const { payload } = await dispatch(updateById({ ...userRole, name }));
    const { userRole: data = {}, message = "" } = payload;
    setIsSendingRequest(false);

    if (Object.keys(data).length) {
      await dispatch(snackBarShow("success", "Данные успешно сохранены!"));
    } else {
      await dispatch(
        snackBarShow(
          "error",
          message || "Произошла ошибка при сохранении данных!"
        )
      );
    }
  };

  return isLoading ? (
    <div>Загрузка данных...</div>
  ) : isNotFound ? (
    <EmptyPage />
  ) : (
    <>
      <Typography variant="h5" textAlign="center" my={2}>
        Роли пользователей. Редактирование {id}
      </Typography>
      <UserRoleDetailContainer
        userRole={userRole}
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default UserRoleEdit;
