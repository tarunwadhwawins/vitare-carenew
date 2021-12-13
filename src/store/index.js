import { createStore } from 'vuex'
import { auth } from "./auth/index";
import { careCoordinator } from "./care-coordinator/index";
import { dashBoard } from "./dashboard/index";
//import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    auth,
    careCoordinator,
    dashBoard
  },
  
})
