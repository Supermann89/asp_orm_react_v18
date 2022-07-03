import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

const ControllerDatePicker = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: { isValid },
      }) => (
        <DatePicker
          inputFormat="dd.MM.yyyy"
          mask="__.__.____"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Дата удаления"
              error={!isValid}
              helperText={error?.message}
            />
          )}
          error="false"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default ControllerDatePicker;
