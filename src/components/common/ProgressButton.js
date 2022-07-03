import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button } from "@mui/material";

export default function ProgressButton({
  loading = false,
  disabled = false,
  onClick = () => {},
  ...props
}) {
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button
        variant="outlined"
        color="primary"
        disabled={loading || disabled}
        onClick={onClick}
      >
        {props.children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: "primary",
            position: "absolute",
            top: "50%",
            left: "50%",
            mt: "-12px",
            ml: "-12px",
          }}
        />
      )}
    </Box>
  );
}
