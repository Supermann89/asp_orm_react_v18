import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmptyPage from "../../../common/EmptyPage";
import { getById, updateById } from "../../../../actions/terstructureActions";
import { snackBarShow } from "../../../../actions/commonActions";
import { clear } from "../../../../actions/userActions";
import TerstructureDetailContainer from "./Container";

const initObj = { name: "", id_parent: null, code: "" };

const TerstructureEdit = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [terstructure, setTerstructure] = useState(initObj);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isNotFound, setIsNotFound] = useState(true);

  useEffect(() => {
    const fetchTerstructure = async (id) => {
      const data = await dispatch(getById(id));
      const newTerstructure = { ...initObj, ...data.payload };

      setTerstructure(newTerstructure);
      if (Object.keys(data.payload).length) setIsNotFound(false);
      setIsLoading(false);
    };

    fetchTerstructure(id);

    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  const handlerButtonSave = async (newTerstrucure) => {
    delete newTerstrucure.id;

    setIsSendingRequest(true);
    const { payload } = await dispatch(
      updateById({ ...terstructure, ...newTerstrucure })
    );
    setIsSendingRequest(false);

    if (Object.keys(payload).length) {
      setTerstructure(payload);
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
      <h1 style={{ textAlign: "center" }}>
        Территориальная структура. Редактирование {id}
      </h1>
      <TerstructureDetailContainer
        terstructure={terstructure}
        isSendingRequest={isSendingRequest}
        handlerButtonSave={handlerButtonSave}
      />
    </>
  );
};

export default TerstructureEdit;
