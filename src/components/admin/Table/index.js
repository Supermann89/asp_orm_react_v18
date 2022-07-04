import React, { useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomTableBody from "./CustomTableBody";
import Pagination from "./Pagination";
import CustomTableHeader from "./CustomTableHeader";

export default function CustomTable({
  disableCheckColumn = false,
  rows,
  headCells,
  selected = [],
  onRowSelect,
  onChangePage,
  onChangeRowsPage,
  page,
  rowsPerPage,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.id);
        onRowSelect(newSelecteds);
        return;
      }
      onRowSelect([]);
    },
    [onRowSelect, rows]
  );

  const handleRowClick = useCallback(
    (event, id) => {
      if (event.target.getAttribute("type") !== "checkbox") return;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      onRowSelect(newSelected);
    },
    [onRowSelect, selected]
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      onChangePage(newPage);
    },
    [onChangePage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      onChangeRowsPage(parseInt(event.target.value, 10), 0);
    },
    [onChangeRowsPage]
  );

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 500,
        }}
        aria-label="custom pagination table"
      >
        <CustomTableHeader
          disableCheckColumn={disableCheckColumn}
          headCells={headCells}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows?.length || 0}
        />
        <CustomTableBody
          disableCheckColumn={disableCheckColumn}
          rows={rows}
          headCells={headCells}
          page={page}
          rowsPerPage={rowsPerPage}
          order={order}
          orderBy={orderBy}
          selected={selected}
          handleRowClick={handleRowClick}
        />
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "Все", value: -1 }]}
              colSpan={3}
              count={rows?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              labelDisplayedRows={({ from, to, count }) =>
                to !== -1
                  ? `Строк на странице: ${from}-${to} из ${count}`
                  : `Строк на странице: ${count}`
              }
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={Pagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
