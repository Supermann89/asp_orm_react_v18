import React, { forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import AppDatePickerHeader from "./Header";
import NumberFormat from "react-number-format";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

import ruLocale from "date-fns/locale/ru";
import { format } from "date-fns";

const AppDatePicker = ({
  value,
  onValueChange,
  isValidating,
  name,
  textFieldProps,
}) => {
  const wrapperRef = useRef(null);

  const DateFormatCustom = forwardRef(function DateFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange(values.formattedValue);
        }}
        format="##.##.####"
        mask="_"
        //mask={["д", "д", "м", "м", "г", "г", "г", "г"]}
      />
    );
  });

  const handlerOnChange = (strDate) => {
    if (strDate && strDate.match(/\d{2}.\d{2}.\d{4}/)) {
      onValueChange(strDate.split(".").reverse().join("-"));
    } else if (!strDate) {
      onValueChange(undefined);
    }
  };

  const handlerOnBlur = (event, onClick) => {
    const strDate = event.target.value;
    strDate
      ? onValueChange(strDate.split(".").reverse().join("-"))
      : onValueChange(undefined);

    if (
      wrapperRef.current &&
      wrapperRef.current.contains(event.relatedTarget)
    ) {
      onClick(event);
    }
  };

  const CustomInput = forwardRef(({ onClick }, ref) => (
    <TextField
      {...textFieldProps}
      variant="standard"
      value={
        value &&
        value.toString().substring(0, 10).split("-").reverse().join(".")
      }
      ref={wrapperRef}
      onChange={handlerOnChange}
      onBlur={(event) => handlerOnBlur(event, onClick, ref)}
      InputProps={{
        inputComponent: DateFormatCustom,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="datepicker open"
              ref={ref}
              onClick={onClick}
              edge="end"
            >
              <InsertInvitationIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ));

  return (
    <DatePicker
      name={name}
      selected={
        !isValidating && !textFieldProps?.error && value
          ? new Date(value)
          : undefined
      }
      onChange={(date) => onValueChange(format(date, "yyyy-MM-dd"))}
      customInput={<CustomInput />}
      locale={ruLocale}
      dateFormat="dd.MM.yyyy"
      renderCustomHeader={(props) => (
        <AppDatePickerHeader {...props} locale={ruLocale} />
      )}
    />
  );
};
export default AppDatePicker;
