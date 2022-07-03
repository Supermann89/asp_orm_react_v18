import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailContainer from "./Container";
import { useDispatch } from "react-redux";
import { create } from "../../../../actions/userActions";
import { snackBarShow } from "../../../../actions/commonActions";
import { getAll } from "../../../../actions/userRoleActions";

const UserNew = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    const fetchRoleList = async () => {
      const roleList = await dispatch(getAll());
      setRoleList(roleList.payload);
    };

    fetchRoleList();
  }, [dispatch]);

  const handlerButtonSave = useCallback(
    async (user) => {
      setIsSendingRequest(true);
      const { payload } = await dispatch(
        create(user.fio, user.email, user.roles)
      );
      setIsSendingRequest(false);

      if (Object.keys(payload?.user || {}).length) {
        const id = payload?.user.id;
        navigate(`/admin/user/${id}`,{replace: true});

        dispatch(snackBarShow("success", "Данные успешно сохранены!"));
      } else {
        dispatch(
          snackBarShow(
            "error",
            payload?.message || "Произошла ошибка при сохранении данных!"
          )
        );
      }
    },
    [dispatch, navigate]
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Создание нового пользователя</h1>
      <UserDetailContainer
        newTemplate
        roleList={roleList}
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default UserNew;
