import React from "react";
import { IconButton } from "@mui/material";
import { lighten } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HeaderArrow = ({
  type = "forward", // forward | back
  onClick = () => {},
  disabled = false,
  sx = {},
}) => {
  const renderArrow = (type) => {
    const styles = {
      fontSize: 20,
    };

    switch (type) {
      case "forward":
        return <ArrowForwardIosIcon sx={{ ...styles }} />;
      case "back":
        return <ArrowBackIosIcon sx={{ ...styles }} />;
      default:
        return null;
    }
  };

  return (
    <IconButton
      color="primary"
      size="small"
      component="span"
      onClick={onClick}
      disabled={disabled}
      disableRipple
      disableFocusRipple
      edge="end"
      sx={{
        color: lighten("#1976d2", 0.5),
        width: 22,
        "&:hover": {
          backgroundColor: "transparent",
          color: "primary.main",
        },
        ...sx,
      }}
    >
      {renderArrow(type)}
    </IconButton>
  );
};
export default React.memo(HeaderArrow);
