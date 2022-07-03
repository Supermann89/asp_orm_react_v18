import React from "react";
import { Switch } from "@mui/material";
import { Controller } from "react-hook-form";

const ControllerSwitch = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Switch checked={value} onChange={onChange} />
      )}
    />
  );
};

export default ControllerSwitch;
