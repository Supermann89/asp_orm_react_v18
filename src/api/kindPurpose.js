import axios from "./axiosConfig";

const KindPurposeApi = {
  getAll: async () => {
    const response = await axios.get("/kind-purpose");
    let data = [];
    if (response) data = await response.data.data;
    return data;
  },
  getById: async (id) => {
    const response = await axios.get(`/kind-purpose/${id}`);

    const data = await response?.data;
    if (!data || response.status === 204) return {};
    else return data.data;
  },
  updateById: async (kindPurpose) => {
    const { id, name } = kindPurpose;
    const response = await axios.patch(`/kind-purpose/${id}`, {
      id,
      name,
    });

    const data = await response?.data;
    if (!data || response.status === 204) return {};
    else return data.data;
  },
  create: async (name) => {
    const response = await axios.post("/kind-purpose", {
      name,
    });
    let data = {};
    if (response) data = await response.data.data;
    return data;
  },
  delete: async (ids) => {
    const response = await axios.post(`/kind-purpose/delete`, {
      ids,
    });
    return response;
  },
};

export default KindPurposeApi;
