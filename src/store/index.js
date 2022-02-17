import { createStore } from 'vuex'
import { dashBoard } from "./dashboard/index"
import  { communications } from "./communications/index"
import { patients } from "./patients/index"
import { common } from "./common/index"
import { counterCards } from "./counter-cards/index"
import { careCoordinator } from "./careCoordinator/index"
import { tasks } from "./tasks/index"
import { globalCodes } from "./globalCodes/index"
import { rolesAndPermissions } from "./rolesAndPermissions/index"
import { inventory } from "./inventory/index"
import { appointment } from "./appointment/index"
import { authentication } from "./authentication/index"
import { notes } from "./notes/index"
import { thresholds } from "./thresholds/index"
import { timeLogs } from "./timeLogs/index"

import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    dashBoard,
    communications,
    patients,
    counterCards,
    common,
    careCoordinator,
    tasks,
    globalCodes,
    rolesAndPermissions,
    inventory,
    appointment,
    authentication,
    notes,
    timeLogs,
    thresholds,
  },
  plugins: [ createPersistedState({
    reducer(state) {
     
    return {
      token: state.authentication.token
      }
    }
  })]
})
