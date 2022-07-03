import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ruRU } from "@mui/material/locale";
//picker libs
import ruLocale from "date-fns/locale/ru";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Login from "./auth/Login";
import ChangePassword from "./auth/ChangePassword";
import PasswordReset from "./auth/PasswordReset";
import Register from "./auth/Register";
import UserMain from "./user/UserMain";
import { RestrictedAdminPage } from "./RestrictedPage";

import { isAuth } from "../actions/authActions";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./auth/Profile";
import ForgotPassword from "./auth/ForgotPassword";
import SnackBar from "./common/SnackBar";

const theme = createTheme({}, ruRU);

const AdminMain = React.lazy(() => import("./admin/AdminMain"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(isAuth());
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <Router>
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route
                  exact
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />
                <Route
                  exact
                  path="/reset-password/:token"
                  element={<PasswordReset />}
                />
                <Route exact path="/register" element={<Register />} />
                <Route
                  exact
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/restricted"
                  element={<RestrictedAdminPage />}
                />
                <Route
                  path="/admin/*"
                  element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                      <AdminMain />
                    </Suspense>
                  }
                />
                <Route path="*" element={<UserMain />} />
              </Routes>
            </Router>
            <SnackBar />
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
