import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { snackBarHide } from "../../actions/commonActions";

const SnackBar = () => {
  const dispatch = useDispatch();
  const {
    snackBarShow: open,
    snackBarMessage: message,
    snackBarSeverity: severity,
  } = useSelector(({ common }) => {
    return common;
  });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackBarHide());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleAlertClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
