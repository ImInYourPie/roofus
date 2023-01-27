import propertiesService from "../../services/properties.service";

export default {
  namespaced: true,
  state: {
    main: {},
    prev: {},
    next: {},
    loading: false,
  },
  mutations: {
    setMain(state, main) {
      state.main = main;
    },
    setPrev(state, prev) {
      state.prev = prev;
    },
    setNext(state, next) {
      state.next = next;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async getPropertyById({ commit }, { propertyId }) {
      commit("setLoading", true);

      return await propertiesService
        .fetchPropertyById({ propertyId })
        .then(({ data, status }) => {
          if (status === 404) return false;
          commit("setMain", data.property);
          commit("setPrev", data.meta.previous);
          commit("setNext", data.meta.next);
          return true;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
  },
};
