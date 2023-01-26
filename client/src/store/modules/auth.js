import authService from "../../services/auth";

const initialFormState = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
    invalidCreds: false,
  },
};

const initialState = {
  ...initialFormState,
  loading: false,
  token: localStorage.getItem("token") || "",
};

export default {
  namespaced: true,
  state: initialState,
  getters: {
    isLoggedIn(state) {
      console.log(state.token);
      return !!state.token;
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
      Object.assign(state, { errors });
    },
    setToken(state, token) {
      state.token = token;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    resetFormAndErrors(state) {
      Object.assign(state, initialFormState);
    },
  },
  actions: {
    async login({ state, commit }) {
      commit("setLoading", true);

      return await authService
        .login({ email: state.email, password: state.password })
        .then(({ data, status }) => {
          if (status === 400) {
            commit("setErrors", { ...state.errors, invalidCreds: true });
            return false;
          }

          commit("setToken", data.token);
          localStorage.setItem("token", data.token);
          commit("resetFormAndErrors");
          return true;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      commit("setToken", "");
      localStorage.removeItem("token");
    },
    validateForm({ state, commit }) {
      if (!state.email)
        commit("setErrors", {
          ...state.errors,
          email: "Email is required",
        });
      if (!state.password)
        commit("setErrors", {
          ...state.errors,
          password: "Password is required",
        });

      if (!!state.errors.email || !!state.errors.password) return false;
      return true;
    },
  },
};
