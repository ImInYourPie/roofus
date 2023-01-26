export default {
  state: {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  },
  mutations: {
    setEmail(state, email) {
      state.name = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setErrors(state, errors) {
      state.errors = { ...state.errors, errors };
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { data } = await axios.post("/login", { email, password });
        commit("setToken", data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
};
