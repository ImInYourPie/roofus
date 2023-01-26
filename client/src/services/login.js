import api from "@/api";

export default {
  async login({ email, password }) {
    const res = await api.post("/admin/auth", { email, password });
    return res;
  },
};
