import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmptyPage from "../../../common/EmptyPage";
import { getById, updateById } from "../../../../actions/kindPurposeActions";
import KindPurposeDetailContainer from "./Container";
import { snackBarShow } from "../../../../actions/commonActions";
import { clear } from "../../../../actions/userActions";

const initObj = { name: "" };

const KindPurposeEdit = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [kindPurpose, setKindPurpose] = useState(initObj);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isNotFound, setIsNotFound] = useState(true);

  useEffect(() => {
    const fetchKindPurpose = async (id) => {
      const data = await dispatch(getById(id));
      const newKindPurpose = { ...initObj, ...data.payload };

      setKindPurpose(newKindPurpose);
      if (Object.keys(data.payload).length) setIsNotFound(false);
      setIsLoading(false);
    };

    fetchKindPurpose(id);

    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  const handlerButtonSave = async (name) => {
    setIsSendingRequest(true);
    const { payload } = await dispatch(updateById({ ...kindPurpose, name }));
    setIsSendingRequest(false);

    if (Object.keys(payload).length) {
      setKindPurpose(payload);
      dispatch(snackBarShow("success", "Данные успешно сохранены!"));
    } else {
      dispatch(
        snackBarShow("error", "Произошла ошибка при сохранении данных!")
      );
    }
  };

  return isLoading ? (
    <div>Загрузка данных...</div>
  ) : isNotFound ? (
    <EmptyPage />
  ) : (
    <>
      <h1 style={{ textAlign: "center" }}>Виды целей. Редактирование {id}</h1>
      <KindPurposeDetailContainer
        kindPurpose={kindPurpose}
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default KindPurposeEdit;
