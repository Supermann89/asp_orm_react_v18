import React, { useState } from "react";
import { FormControl, Input, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedCallback } from "use-debounce";

const CustomTableSearch = ({
  onChange,
  delayTime = 300,
  searchString = "",
  ...props
}) => {
  const [value, setValue] = useState(searchString);

  const handleClickClearSearch = (event) => {
    setValue("");
    debounced("");
  };

  // Debounce callback
  const debounced = useDebouncedCallback(
    (searchText) => onChange(searchText),
    delayTime
  );

  const handleChange = (event) => {
    setValue(event.target.value);
    debounced(event.target.value);
  };

  return (
    <FormControl {...props}>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={"Поиск по таблице"}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search filter"
              onClick={handleClickClearSearch}
              size="large"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CustomTableSearch;
