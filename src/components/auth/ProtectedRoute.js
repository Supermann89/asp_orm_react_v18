// A wrapper for <Route> that redirects to the login

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoggedIn = false, isAdmin = false } = useSelector(({ auth }) => {
    return {
      isLoggedIn: auth.isLoggedIn,
      isAdmin: (auth.user?.roles || []).includes(1),
    };
  });
  const location = useLocation();

  return (
        isLoggedIn ? (
          isAdmin ? (
            children
          ) : (
            <>
              <Navigate
                  to={{
                  pathname: "/restricted",
                  state: { from: location },
                }}
              />
            </>
          )
        ) : (
            <>
              <Navigate
                  to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            </>
        )
  );
};

export default ProtectedRoute;
