import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuAppBar from "./MenuAppBar";
import NotFound from "../common/NotFound";
import pages from "../common/pages";
import ProtectedRoute from "../auth/ProtectedRoute";

const AdminMain = () => {
  return (
    <>
      <MenuAppBar />
      <Routes>
        {pages.childRoutes.map((page) => (
          <Route
            key={page.path}
            exact={page.exact}
            path={page.path}
            element={<ProtectedRoute>{page.component}</ProtectedRoute>}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AdminMain;
