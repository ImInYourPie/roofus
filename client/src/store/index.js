import { createStore } from "vuex";

import properties from "./modules/properties";
import openhouses from "./modules/openhouses";
import login from "./modules/login";

const store = createStore({
  modules: {
    properties,
    openhouses,
    login,
  },
});

export default store;
