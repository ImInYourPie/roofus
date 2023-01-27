import openhousesService from "../../services/openhouses.service";

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    loading: false,
    openForm: false,
    isNew: false,
    saving: false,
    form: {
      visitors: [],
      visitorAmount: 1,
      startDate: new Date().toLocaleDateString(),
    },
    errors: {
      visitors: "",
      visitorAmount: "",
      startDate: "",
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
    async getOpenhouses({ commit }) {
      return await openhousesService.fetchOpenhouses().then(({ data }) => {
        commit("setItems", data.openhouses);
        commit("setCount", data.count);
      });
    },
    async saveNewEntry({ state, commit }) {
      return await openhousesService
        .newOpenhouse(state.form)
        .then(({ data, status }) => {
          if (status !== 200) {
            commit("setErrors", {
              ...state.errors,
              generic: "Something went wrong",
            });

            return false;
          }

          commit("setOpenForm", false);
          commit("setErrors", {
            visitors: "",
            visitorAmount: "",
            startDate: "",
            generic: "",
          });
          commit("setItems", [data.openhouse, ...state.items]);

          return true;
        });
    },
    async saveExistingEntry({ state, commit }) {
      return await openhousesService
        .editOpenhouse({
          openhouseId: state.form.id,
          visitors: state.form.visitors,
          visitorAmount: state.form.visitorAmount,
          property:
            typeof state.form.property === "object"
              ? state.form.property.id
              : state.form.property,
          startDate: state.form.startDate,
        })
        .then(({ data, status }) => {
          if (status !== 200) {
            commit("setErrors", {
              ...state.errors,
              generic: "Something went wrong",
            });

            return false;
          }

          commit("setOpenForm", false);
          commit("setErrors", {
            visitors: "",
            visitorAmount: "",
            startDate: "",
            generic: "",
          });
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
