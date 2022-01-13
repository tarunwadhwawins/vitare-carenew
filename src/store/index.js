import { createStore } from 'vuex'
import { auth } from "./auth/index";
import { careCoordinator } from "./care-coordinator/index";
import { dashBoard } from "./dashboard/index";
import { counterCards } from "./counter-cards/index";
import { patients } from "./patients/index"
export default createStore({
  modules: {
    auth,
    careCoordinator,
    dashBoard,
    counterCards,
    patients
  }
})
