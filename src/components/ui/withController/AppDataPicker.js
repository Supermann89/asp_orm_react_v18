import React from "react";
import { Controller } from "react-hook-form";
import AppDatePicker from "../AppDataPicker/";

const ControllerAppDatePicker = ({ control, name, label, textFieldProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
        formState: { isValidating },
      }) => (
        <AppDatePicker
          value={value}
          onValueChange={onChange}
          isValidating={isValidating}
          textFieldProps={{
            ...textFieldProps,
            label: label,
            error: invalid,
            helperText: error?.message,
          }}
        />
      )}
    />
  );
};

export default ControllerAppDatePicker;
