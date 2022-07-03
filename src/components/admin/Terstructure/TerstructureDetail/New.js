import React, { useState } from "react";
import TerstructureDetailContainer from "../../Terstructure/TerstructureDetail/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clear, create } from "../../../../actions/terstructureActions";
import { snackBarShow } from "../../../../actions/commonActions";

const TerstructureNew = (props) => {
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
      navigate(`/admin/terstructure/${id}`, {replace: true});
    } else {
      dispatch(
        snackBarShow("error", "Произошла ошибка при сохранении данных!")
      );
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Территориальная структура. Создание
      </h1>
      <TerstructureDetailContainer
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default TerstructureNew;
