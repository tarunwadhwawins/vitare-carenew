import { createStore } from 'vuex'
import { auth } from "./auth/index";
import { careCoordinator } from "./care-coordinator.module";
import { dashBoard } from "./dashboard/index";

export default createStore({
  modules: {
    auth,
    careCoordinator,
    dashBoard
  }
})
