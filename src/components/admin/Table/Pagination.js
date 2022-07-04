import React, { useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

const Pagination = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = useCallback(
    (event) => {
      onPageChange(event, 0);
    },
    [onPageChange]
  );

  const handleBackButtonClick = useCallback(
    (event) => {
      onPageChange(event, page - 1);
    },
    [onPageChange, page]
  );

  const handleNextButtonClick = useCallback(
    (event) => {
      onPageChange(event, page + 1);
    },
    [onPageChange, page]
  );

  const handleLastPageButtonClick = useCallback(
    (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    },
    [onPageChange, count, rowsPerPage]
  );

  return (
    <Box
      sx={{
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

export default Pagination;
