import api from "../libs/axios";

export default {
  async login({ email, password }) {
    const res = await api.post("/admin/auth", { email, password });
    return { ...res.data };
  },
};
