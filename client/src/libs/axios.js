// api/index.js
import axios from "axios";

const instance = axios.create({
  baseURL: VITE_APP_API_URL,
});

export default {
  async get(path) {
    const { data } = await instance.get(path);
    return data;
  },
  async post(path, body, params) {
    const { data } = await instance.post(path, { params, body });
    return data;
  },
  async patch(path, body, params) {
    const { data } = await instance.patch(path, { params, body });
    return data;
  },
};
