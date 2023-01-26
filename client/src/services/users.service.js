import api from "../libs/axios";

export default {
  async fetchUsers() {
    const res = await api.get("/user");
    return { ...res.data };
  },
};
