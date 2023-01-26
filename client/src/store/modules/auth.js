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
    resetFormAndErrors(state) {
      Object.assign(state, initialFormState);
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      commit("setLoading", true);

      authService
        .login({ email, password })
        .then(({ data }) => {
          if (data.status === 404) {
            commit("setErrors", { ...state.errors, invalidCreds: true });
            return;
          }

          commit("setToken", data.token);
          localStorage.setItem("token", data.token);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      commit("setToken", "");
      localStorage.removeItem("token");
    },
    validateInputs({ state, commit }, { email, password }) {
      if (!email)
        commit("setErrors", { ...state.errors, email: "Email is required" });
      if (!password)
        commit("setErrors", {
          ...state.errors,
          password: "Password is required",
        });

      if (!!state.errors.email || !!state.errors.password) return false;
      return true;
    },
  },
};
