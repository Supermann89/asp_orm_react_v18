import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KindPurposeDetailContainer from "./Container";
import { useDispatch } from "react-redux";
import { create, clear } from "../../../../actions/kindPurposeActions";
import { snackBarShow } from "../../../../actions/commonActions";

const KindPurposeNew = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handlerButtonSave = async (name) => {
    setIsSendingRequest(true);
    const { payload } = await dispatch(create(name));

    if (Object.keys(payload).length) {
      const id = payload.id;
      await dispatch(snackBarShow("success", "Данные успешно сохранены!"));
      await dispatch(clear());
      navigate(`/admin/kind-purpose/${id}`, {replace: true});
    } else {
      dispatch(
        snackBarShow("error", "Произошла ошибка при сохранении данных!")
      );
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Виды целей. Создание</h1>
      <KindPurposeDetailContainer
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default KindPurposeNew;
