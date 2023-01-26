import { createStore } from "vuex";

import properties from "./modules/properties";
import openhouses from "./modules/openhouses";
import auth from "./modules/auth";

const store = createStore({
  modules: {
    properties,
    openhouses,
    auth,
  },
});

export default store;
