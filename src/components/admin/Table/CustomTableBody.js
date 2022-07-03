import React, { useCallback, useMemo } from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";

const CustomTableBody = (props) => {
  const {
    rows,
    headCells,
    page,
    rowsPerPage,
    order,
    orderBy,
    disableCheckColumn,
    selected,
    handleRowClick,
  } = props;

  const isSelected = useCallback((id) => selected.indexOf(id) !== -1, [
    selected,
  ]);

  const stableSort = useCallback(
    (array) => {
      return array.sort((a, b) => {
        const res =
          a[orderBy] > b[orderBy] ? 1 : b[orderBy] > a[orderBy] ? -1 : 0;
        return order === "asc" ? res : -res;
      });
    },
    [order, orderBy]
  );

  const cellsDirection = useMemo(
    () =>
      headCells.map((item) => {
        return item.id;
      }),
    [headCells]
  );

  return (
    <TableBody>
      {(rowsPerPage > 0
        ? stableSort(rows).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : stableSort(rows)
      ).map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => handleRowClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={`row-${row.id}`}
            selected={isItemSelected}
          >
            {!disableCheckColumn && (
              <TableCell style={{ width: 20 }} component="td" scope="row">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                  color="primary"
                />
              </TableCell>
            )}
            {Object.keys(row, index)
              .sort(function (a, b) {
                return cellsDirection.indexOf(a) - cellsDirection.indexOf(b);
              })
              .map((field, index) => {
                if (!cellsDirection.includes(field)) return null;
                const { renderRowCell, width = "auto" } = headCells.find(
                  (item) => item.id === field
                );

                return (
                  <TableCell
                    key={`cell-td-${index}`}
                    align="left"
                    component="th"
                    scope="row"
                    style={{ width }}
                  >
                    {renderRowCell ? renderRowCell(row) : row[field]}
                  </TableCell>
                );
              })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CustomTableBody;
