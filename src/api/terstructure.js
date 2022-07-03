import axios from "./axiosConfig";

const TerstructureApi = {
  getAll: async () => {
    const response = await axios.get("/terstructure");
    let data = [];
    if (response) data = await response.data.data;
    return data;
  },
  getById: async (id) => {
    const response = await axios.get(`/terstructure/${id}`);

    const data = await response?.data;
    if (!data || response.status === 204) return {};
    else return data.data;
  },
  updateById: async (terstructure) => {
    const { id, name, id_parent, code } = terstructure;
    const response = await axios.patch(`/terstructure/${id}`, {
      id,
      id_parent,
      name,
      code,
    });

    const data = await response?.data;
    if (!data || response.status === 204) return {};
    else return data.data;
  },
  create: async (terstructure) => {
    const response = await axios.post("/terstructure", terstructure);
    let data = {};
    if (response) data = await response.data.data;
    return data;
  },
};

export default TerstructureApi;
