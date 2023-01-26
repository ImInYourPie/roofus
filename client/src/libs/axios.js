// api/index.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: () => true,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default {
  async get(path) {
    const data = await instance.get(path);
    return data;
  },
  async post(path, body, params) {
    const data = await instance.post(path, body, params);
    return data;
  },
  async patch(path, body, params) {
    const data = await instance.patch(path, body, params);
    return data;
  },
};
