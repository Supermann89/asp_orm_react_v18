import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REFRESH,
  LOGOUT,
  SNACKBAR_SHOW,
} from "../actions/types";

const interceptors = (store) => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },

    (err) => {
      const originalRequest = err.config;

      if (
        err.response?.status === 401 &&
        err.response?.data?.message === "AccessTokenExpired" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; //prevent race condition

        return axios
          .post(
            "/user/refresh-token",
            {},
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              if (originalRequest?.url === "/user/check-auth") {
                return res;
              }

              store.dispatch({
                type: LOGIN_REFRESH,
                payload: res.data,
              });

              return axios(originalRequest);
            }
          })
          .catch((err) => {
            store.dispatch({
              type: LOGOUT,
            });

            return Promise.reject(err);
          });
      }

      if (
        err.response?.status === 401 &&
        err.response?.data?.message === "RefreshTokenExpired"
      ) {
        store.dispatch({
          type: LOGOUT,
        });

        return Promise.reject(new Error("Сессия устарела"));
      }

      if (
        err.response?.status === 403 &&
        err.response?.data?.message === "adminRestriction"
      ) {
        store.dispatch({
          type: SNACKBAR_SHOW,
          payload: {
            message: "Необходимы права администратора!",
            severity: "error",
          },
        });

        return; //Promise.reject(new Error("Необходимы права администратора!"));
      }

      if (originalRequest?.url === "/user/check-auth") {
        let message = "Ошибка соединения с сервером";
        if (
          err.response?.status === 401 &&
          err.response?.data?.message === "Unauthorized"
        )
          message = "";

        store.dispatch({
          type: LOGIN_FAIL,
          payload: { message: message },
        });
      }

      return Promise.reject(err);
    }
  );
};

export default interceptors;

/*
store.dispatch({
        type: SNACKBAR_SHOW,
        payload: {
          severity: "error",
          message: "Произошла непридвиденная ошибка!",
        },
      });
 */
