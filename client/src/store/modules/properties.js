import propertiesService from "../../services/properties.service";

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    loading: false,
    openForm: false,
    isNew: false,
    form: {
      adress: "",
    },
    errors: {
      adress: "",
      generic: "",
    },
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setCount(state, count) {
      state.count = count;
    },
    setOpenForm(state, open) {
      state.openForm = open;
    },
    setIsNew(state, isNew) {
      state.isNew = isNew;
    },
    setForm(state, form) {
      state.form = { ...form };
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
  },
  actions: {
    async getProperties({ commit }) {
      return await propertiesService.fetchProperties().then(({ data }) => {
        commit("setItems", data.properties);
        commit("setCount", data.count);
      });
    },
    async saveNewEntry({ state, commit, dispatch }) {
      return await propertiesService
        .newProperty({ adress: state.form.adress })
        .then(({ data, status }) => {
          if (status !== 200) {
            commit("setErrors", {
              ...state.errors,
              generic: "Something went wrong",
            });

            return false;
          }

          commit("setOpenForm", false);
          commit("setErrors", { adress: "", generic: "" });
          commit("setItems", [data.property, ...state.items]);
          commit("setCount", ++state.count);

          return true;
        });
    },
    async saveExistingEntry({ state, commit }) {
      return await propertiesService
        .editProperty({ propertyId: state.form.id, adress: state.form.adress })
        .then(({ data, status }) => {
          if (status !== 200) {
            commit("setErrors", {
              ...state.errors,
              generic: "Something went wrong",
            });

            return false;
          }

          commit("setOpenForm", false);
          commit("setErrors", { adress: "", generic: "" });
          const entity = state.items.find((item) => item.id === state.form.id);
          Object.assign(entity, data.property);
          commit("setItems", [...state.items]);

          return true;
        });
    },
    validateForm({ state, commit }) {
      if (!state.form.adress)
        commit("setErrors", {
          ...state.errors,
          adress: "Adress is required",
        });

      if (!!state.errors.adress) return false;
      return true;
    },
  },
};
