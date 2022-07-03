import axios from "./axiosConfig";

const User = {
  getUserIfAuth: async () => {
    let user;
    let message = "";
    try {
      const response = await axios.post("/user/check-auth");
      const data = await response.data;

      user = data.user;
    } catch (error) {
      message = error.response?.data?.message || "";
    }

    return {
      user,
      message,
    };
  },
  login: async (email, password) => {
    let user;
    let message = "";
    const response = await axios
      .post(
        "/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    user = response?.data?.user;

    return {
      user: user,
      message: message,
    };
  },
  logout: async () => {
    try {
      await axios.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } finally {
      return true;
    }
  },
  signup: async (fio, email, password, passwordConfirm) => {
    let user;
    let message = "";
    try {
      const response = await axios.post("/user/signup", {
        fio,
        email,
        password,
        passwordConfirm,
      });
      user = await response.data;
    } catch (error) {
      message = error.response.data.message || "Ошибка авторизации";
    }

    return {
      user,
      message,
    };
  },
  changePassword: async (password, passwordConfirm, passwordCurrent) => {
    let message = "";

    await axios
      .patch(
        "/user/change-password",
        { password, passwordConfirm, passwordCurrent },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    return {
      message,
    };
  },
  forgotPassword: async (email) => {
    let message = "";

    await axios
      .post(
        "/user/forgot-password",
        { email },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    return {
      message,
    };
  },
  resetPassword: async (token, password, passwordConfirm) => {
    let user;
    let message = "";
    try {
      const response = await axios.patch(
        `/user/reset-password/${token}`,
        {
          password,
          passwordConfirm,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      user = await response.data.user;
    } catch (error) {
      message = error.response?.data?.message || "Ошибка";
    }
    return {
      user,
      message,
    };
  },
  getAll: async () => {
    const response = await axios.get("/user");
    const data = await response?.data?.data;
    return data || [];
  },
  getById: async (id) => {
    const response = await axios.get(`/user/${id}`);
    const data = await response?.data;
    if (!data || response.status === 204) return {};
    else return data.data;
  },
  updateById: async (updatedUser) => {
    let user;
    let message = "";

    const copyUser = {
      fio: updatedUser?.fio,
      email: updatedUser?.email,
      is_deleted: updatedUser?.is_deleted || 0,
      date_deleted: updatedUser?.date_deleted || null,
      roles: updatedUser?.roles,
    };

    const response = await axios
      .patch(`/user/${updatedUser.id}`, copyUser)
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    user = response?.data?.data;

    return {
      user: user || {},
      message: message,
    };
  },
  create: async (fio, email, roles = []) => {
    let user;
    let message = "";

    const response = await axios
      .post("/user", {
        fio: fio,
        email: email,
        roles: roles,
      })
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    user = response?.data?.data;

    return {
      user: user,
      message: message,
    };
  },
  delete: async (id) => {
    const response = await axios.post(`/user/delete`, {
      id,
    });
    return response;
  },
};

export default User;
