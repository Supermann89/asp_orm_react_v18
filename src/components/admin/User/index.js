import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  changeIsDeleted,
  changeSearchString,
  clear,
  changePage,
  changeRowsPerPage,
} from "../../../actions/userActions";

import CustomTable from "../Table/index";
import CustomTableSearch from "../Table/CustomTableSearch";

import { _getSearchibleFields } from "../Table/utils";

const headCells = [
  { id: "id", label: "ID", width: "20px", disablePadding: false },
  {
    id: "email",
    label: "Email",
    searchible: true,
    disablePadding: false,
    renderRowCell: (item) => {
      return (
        <Link component={RouterLink} to={`/admin/user/${item.id}`}>
          {item.email}
        </Link>
      );
    },
  },
  {
    id: "fio",
    label: "ФИО",
    searchible: true,
    disablePadding: false,
  },
  {
    id: "is_deleted",
    label: "Удалён",
    searchible: false,
    disablePadding: false,
    renderRowCell: (item) => {
      return <> {item.is_deleted ? "Да" : ""}</>;
    },
  },
];

const User = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const searchibleFields = useMemo(() => _getSearchibleFields(headCells), []);

  const {
    userListFiltered: userList,
    page,
    rowsPerPage,
    searchString,
    showIsDeleted,
  } = useSelector(({ user }) => {
    return user;
  });

  useEffect(() => {
    const fetchAllUser = async () => {
      await dispatch(getAll(searchibleFields));
      setIsLoading(false);
    };

    fetchAllUser();

    return () => {
      dispatch(clear());
    };
  }, [dispatch, searchibleFields]);

  const handlerAddClick = useCallback(
    (event) => {
      event.preventDefault();
      navigate("/admin/user/new");
    },
    [navigate]
  );

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

  const handlerOnSearch = (searchString) => {
    dispatch(changeSearchString(searchString));
  };

  const handleShowIsDeleted = (event) => {
    dispatch(changeIsDeleted(parseInt(event.target.value)));
  };

  return (
    <>
      <h1>Пользователи</h1>
      <Box
        display="flex"
        alignItems="center"
        px={2}
        sx={{
          xs: {
            justifyContent: "flex-start",
          },
          md: {
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          sx={{
            width: "100%",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <CustomTableSearch
            onChange={handlerOnSearch}
            searchString={searchString}
            sx={{
              minWidth: "300px",
              width: {
                xs: "100%",
                sm: "50%",
                md: 500,
              },
            }}
          />
          <FormControl
            variant="standard"
            sx={{
              mt: {
                xs: 3,
                sm: 0,
              },
              ml: {
                xs: 0,
                sm: 3,
              },
              width: ["100%", 200],
            }}
          >
            <InputLabel id="user-isDeleted-label">
              Показывать удалённых
            </InputLabel>
            <Select
              labelId="user-isDeleted-label"
              id="user-isDeleted-selecct"
              label="Показывать удалённых"
              value={showIsDeleted}
              onChange={handleShowIsDeleted}
            >
              <MenuItem value={0}>Действующие</MenuItem>
              <MenuItem value={1}>Удалённые</MenuItem>
              <MenuItem value={-1}>Все</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <IconButton
          aria-label="add"
          color="primary"
          onClick={handlerAddClick}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
      {!isLoading && (
        <CustomTable
          disableCheckColumn
          rows={userList}
          headCells={headCells}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={memoizedOnChangePage}
          onChangeRowsPage={memoizedOnChangeRowsPerPage}
        />
      )}
    </>
  );
};

export default User;
