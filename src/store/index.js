import { createStore } from 'vuex'
import { auth } from "./auth.module";
import { careCoordinator } from "./care-coordinator.module";
import { dashBoard } from "./dashboard.module";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    careCoordinator,
    dashBoard
  }
})
