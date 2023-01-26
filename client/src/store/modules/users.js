import usersService from "../../services/users.service";

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    loading: true,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setCount(state, count) {
      state.count = count;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async getUsers({ commit }) {
      return await usersService
        .fetchUsers()
        .then(({ data }) => {
          commit("setItems", data.users);
          commit("setCount", data.count);
        })
        .finally(() => commit("setLoading", false));
    },
  },
};
