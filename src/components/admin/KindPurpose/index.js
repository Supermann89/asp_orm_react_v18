import React, { useCallback, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  deleteSome,
  changePage,
  changeRowsPerPage,
} from "../../../actions/kindPurposeActions";

import CustomTable from "../Table/index";
import ConfirmDialog from "../../common/ConfirmDialog";
import { snackBarShow } from "../../../actions/commonActions";
import { clear } from "../../../actions/userActions";


const KindPurpose = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { kindPurposeList, page, rowsPerPage } = useSelector(
    ({ kindPurpose }) => {
      return kindPurpose;
    }
  );

  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchAllKindPurpose = async () => {
      dispatch(getAll());
    };

    fetchAllKindPurpose();

    return () => {
      dispatch(clear());
    };
  }, [dispatch]);

  const headCells = [
    { id: "id", label: "ID", width: "20px", disablePadding: false },
    {
      id: "name",
      label: "Наименование",
      disablePadding: false,
      renderRowCell: (item) => {
        return (
          <Link component={RouterLink} to={`/admin/kind-purpose/${item.id}`}>
            {item.name}
          </Link>
        );
      },
    },
  ];

  const handlerRowSelect = useCallback((rowSelected) => {
    setSelected(rowSelected);
  }, []);

  const handlerAddClick = useCallback(
    (event) => {
      event.preventDefault();
      navigate("/admin/kind-purpose/new");
    },
    [navigate]
  );

  const handlerDeleteClick = async (event) => {
    await dispatch(deleteSome(selected));
    dispatch(snackBarShow("success", "Данные успешно удалены!"));
    handlerRowSelect([]);
    setOpenDialog(false);
  };

  const memoizedOnChangePage = useCallback(
    (page) => {
      dispatch(changePage(page));
    },
    [dispatch]
  );

  const memoizedOnChangeRowsPerPage = useCallback(
    (rowsPerPage, page) => {
      dispatch(changeRowsPerPage(rowsPerPage, page));
    },
    [dispatch]
  );

  return (
    <>
      <h1>Виды целей</h1>
      <Box display="flex"
           justifyContent="flex-end"
           sx={{
             paddingRight: "3em",
           }}
      >
        <IconButton
          aria-label="add"
          color="primary"
          onClick={handlerAddClick}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          disabled={selected.length === 0}
          onClick={(event) => setOpenDialog(true)}
          size="large"
        >
          <DeleteForeverIcon fontSize="large" />
        </IconButton>
      </Box>

      <CustomTable
        rows={kindPurposeList}
        headCells={headCells}
        onRowSelect={handlerRowSelect}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={memoizedOnChangePage}
        onChangeRowsPage={memoizedOnChangeRowsPerPage}
      />
      <ConfirmDialog
        open={openDialog}
        content={"Вы подтверждаете удаление выделенных записей?"}
        onClose={(event) => setOpenDialog(false)}
        onSuccess={handlerDeleteClick}
      />
    </>
  );
};

export default KindPurpose;
