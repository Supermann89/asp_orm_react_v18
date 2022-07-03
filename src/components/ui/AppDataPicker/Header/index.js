import React, { useMemo } from "react";
import HeaderSelect from "./Select";
import HeaderArrow from "./Arrow";
import { getYear, format } from "date-fns";

const getAllMonthNames = (locale) => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(locale.localize.month(i));
  }
  return months;
};

const AppDatePickerHeader = (props) => {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    locale,
  } = props;

  const years = [
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
  ];
  const months = useMemo(() => getAllMonthNames(locale), [locale]);

  return (
    <div
      style={{
        margin: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <HeaderArrow type="back" onClick={() => changeYear(getYear(date) - 1)} />
      <HeaderSelect
        value={getYear(date)}
        onChange={(value) => changeYear(value)}
        data={years.sort((a, b) => b - a)}
        selectStyles={{
          minWidth: 45,
          width: 45,
          px: 0,
        }}
        MenuItemStyles={{ width: 53, pl: 1 }}
      />
      <HeaderArrow
        type="forward"
        onClick={() => changeYear(getYear(date) + 1)}
      />

      <HeaderArrow
        type="back"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        sx={{ ml: 3 }}
      />
      <HeaderSelect
        value={format(date, "LLLL", { locale: locale })}
        onChange={(value) => changeMonth(months.indexOf(value))}
        data={months}
        selectStyles={{
          width: 80,
        }}
      />
      <HeaderArrow
        type="forward"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </div>
  );
};

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.date === nextProps.date && prevProps.locale === nextProps.locale
  );
}

export default React.memo(AppDatePickerHeader, propsAreEqual);
