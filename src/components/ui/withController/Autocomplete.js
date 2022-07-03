import React from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

const daysOfWeekSuggestions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const ControllerAutocomplete = ({ control, name, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { ref, ...field }, fieldState: { error } }) => {
        console.log(field);
        return (
          <Autocomplete
            {...field}
            disablePortal
            clearOnEscape
            getOptionLabel={(option) => option?.label || ""}
            onChange={(event, value) => field.onChange(value)}
            options={daysOfWeekSuggestions}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={!!error}
                helperText={error?.message}
                label={label || ""}
                variant="standard"
              />
            )}
          />
        );
      }}
    />
  );
};

export default ControllerAutocomplete;
