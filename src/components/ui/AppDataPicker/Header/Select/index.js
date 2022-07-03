import React, { useState } from "react";
import { MenuItem, Popper, Button, Box } from "@mui/material";
import ClickAwayListener from '@mui/base/ClickAwayListener'
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const HeaderSelect = ({
  data,
  value,
  onChange,
  selectStyles = {},
  MenuItemStyles = {},
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handlerItemClick = (event, newValue) => {
    onChange(newValue);
    setOpen(false);
  };

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        size="small"
        onClick={handleClick}
        // endIcon={<KeyboardArrowDownIcon />}
        sx={{ width: 100, ...selectStyles }}
      >
        {value}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal={true}
      >
        <ClickAwayListener
          onClickAway={(e) => {
            setOpen(false);
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 1,
              maxHeight: 340,
              overflowY: "auto",
            }}
          >
            {data.map((option) => (
              <MenuItem
                key={option}
                value={option}
                selected={option === value}
                onClick={(event) => handlerItemClick(event, option)}
                sx={{
                  py: { xs: 0, md: "2px" },
                  minHeight: "auto",
                  width: 100,
                  ...MenuItemStyles,
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
export default React.memo(HeaderSelect);
