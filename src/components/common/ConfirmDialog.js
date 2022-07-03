import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDialog = ({ open, content, onSuccess, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{content}</DialogTitle>
      <DialogActions>
        <Button onClick={onSuccess} color="primary">
          Да
        </Button>
        <Button onClick={onClose} color="error" autoFocus>
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
