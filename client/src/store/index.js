import { createStore } from "vuex";

import properties from "./modules/properties";
import openhouses from "./modules/openhouses";
import auth from "./modules/auth";
import users from "./modules/users";

const store = createStore({
  modules: {
    properties,
    openhouses,
    auth,
    users,
  },
});

export default store;
