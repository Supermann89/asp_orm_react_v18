import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, getById, updateById } from "../../../../actions/userActions";
import { isAuth } from "../../../../actions/authActions";
import UserDetailContainer from "./Container";
import { snackBarShow } from "../../../../actions/commonActions";
import { getAll } from "../../../../actions/userRoleActions";
import EmptyPage from "../../../common/EmptyPage";

const initObj = { fio: "", email: "", roles: [] };

const UserEdit = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [user, setUser] = useState(initObj);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isNotFound, setIsNotFound] = useState(true);
  const [roleList, setRoleList] = useState([]);

  const { id: loginedId } = useSelector(({ auth }) => {
    return auth.user;
  });

  useEffect(() => {
    const fetchRoleList = async () => {
      const roleList = await dispatch(getAll());
      setRoleList(roleList.payload);
    };

    fetchRoleList();
  }, [dispatch]);

  useEffect(() => {
    const fetchUser = async (id) => {
      const data = await dispatch(getById(id));
      const newUser = { ...initObj, ...data.payload };

      setUser(newUser);
      if (Object.keys(data.payload).length) setIsNotFound(false);
      setIsLoading(false);
    };

    fetchUser(id);

    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  const handlerButtonSave = useCallback(
    async (newUser) => {
      setIsSendingRequest(true);
      const { payload } = await dispatch(updateById(newUser));
      setIsSendingRequest(false);

      if (Object.keys(payload?.user || {}).length) {
        setUser(payload?.user);
        dispatch(snackBarShow("success", "Данные успешно сохранены!"));
      } else {
        dispatch(
          snackBarShow(
            "error",
            payload?.message || "Произошла ошибка при сохранении данных!"
          )
        );
      }

      if (loginedId === parseInt(id)) {
        await dispatch(isAuth());
      }
    },
    [dispatch, loginedId, id]
  );

  return isLoading ? (
    <div>Загрузка данных...</div>
  ) : isNotFound ? (
    <EmptyPage />
  ) : (
    <>
      <h1 style={{ textAlign: "center" }}>Пользователь {id}</h1>
      <UserDetailContainer
        roleList={roleList}
        user={user}
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default UserEdit;
