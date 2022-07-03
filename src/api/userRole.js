import axios from "./axiosConfig";

const UserRoleApi = {
  getAll: async () => {
    const response = await axios.get("/user-role");
    let data = [];
    if (response) data = await response.data.data;
    return data;
  },
  getById: async (id) => {
    const response = await axios.get(`/user-role/${id}`);

    const data = await response?.data;
    if (!data || response.status === 204) return {};
    else return data.data;
  },
  updateById: async (userRole) => {
    const { id, name } = userRole;
    let data;
    let message = "";

    const response = await axios
      .patch(`/user-role/${id}`, {
        id,
        name,
      })
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    data = response?.data?.data || {};

    return {
      userRole: data,
      message: message,
    };
  },
  create: async (name) => {
    let data;
    let message = "";

    const response = await axios
      .post("/user-role", {
        name,
      })
      .catch((error) => {
        message = error.response?.data?.message || error.message;
      });

    data = response?.data?.data || {};

    return {
      userRole: data,
      message: message,
    };
  },
  delete: async (ids) => {
    const response = await axios.post(`/user-role/delete`, {
      ids,
    });
    return response;
  },
  checkReference: async (ids) => {
    const response = await axios.post(`/user-role/check-reference`, {
      ids,
    });
    return response;
  },
};

export default UserRoleApi;
