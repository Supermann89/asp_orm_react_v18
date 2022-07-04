import React, { useCallback, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { pink } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  deleteSome,
  changePage,
  changeRowsPerPage,
} from "../../../actions/userRoleActions";
import userRoleApi from "../../../api/userRole";

import CustomTable from "../Table/index";
import ConfirmDialog from "../../common/ConfirmDialog";
import { snackBarShow } from "../../../actions/commonActions";
import { clear } from "../../../actions/userActions";

const UserRole = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { userRoleList, page, rowsPerPage } = useSelector(({ userRole }) => {
    return userRole;
  });

  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [countReferences, setCountReferences] = useState(0);

  useEffect(() => {
    const fetchAllUserRole = async () => {
      dispatch(getAll());
    };

    fetchAllUserRole();

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
          <Link component={RouterLink} to={`/admin/user-role/${item.id}`}>
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
      navigate("/admin/user-role/new");
    },
    [navigate]
  );

  const handlerDeleteClick = async () => {
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

  const handlerOpenDialog = async () => {
    let countReferences = 0;
    try {
      const response = await userRoleApi.checkReference(selected);
      if (response.status === 200) {
        countReferences = response.data.data;
      }
    } finally {
      setCountReferences(parseInt(countReferences));
      setOpenDialog(true);
    }
  };

  return (
    <>
      <h1>Роли пользователей</h1>
      <Box
        display="flex"
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
          onClick={handlerOpenDialog}
          size="large"
        >
          <DeleteForeverIcon fontSize="large" sx={{ color: pink[500] }} />
        </IconButton>
      </Box>

      <CustomTable
        rows={userRoleList}
        headCells={headCells}
        selected={selected}
        onRowSelect={handlerRowSelect}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={memoizedOnChangePage}
        onChangeRowsPage={memoizedOnChangeRowsPerPage}
      />
      <ConfirmDialog
        open={openDialog}
        content={
          countReferences ? (
            <>
              <Typography variant="inherit" display="block">
                Удаляемые роли выбраны у {countReferences} пользователей(я).
              </Typography>
              <Typography variant="inherit" display="block">
                "Вы подтверждаете удаление выделенных записей?"
              </Typography>
            </>
          ) : (
            "Вы подтверждаете удаление выделенных записей?"
          )
        }
        onClose={() => setOpenDialog(false)}
        onSuccess={handlerDeleteClick}
      />
    </>
  );
};

export default UserRole;
