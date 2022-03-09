import { createStore } from 'vuex'
import { dashBoard } from "./dashboard/index"
import  { communications } from "./communications/index"
import { patients } from "./patients/index"
import { common } from "./common/index"
import { counterCards } from "./counter-cards/index"
import { careCoordinator } from "./careCoordinator/index"
import { careCoordinatorSummary } from "./careCoordinatorSummary/index"
import { tasks } from "./tasks/index"
import { globalCodes } from "./globalCodes/index"
import { rolesAndPermissions } from "./rolesAndPermissions/index"
import { inventory } from "./inventory/index"
import { appointment } from "./appointment/index"
import { authentication } from "./authentication/index"
import { notes } from "./notes/index"
import { thresholds } from "./thresholds/index"
import { timeLogs } from "./timeLogs/index"
import { timeLogReport } from "./timeLogReport/index"
import { careTeam } from "./careTeam/index"
import { programs } from "./programs/index"
import { cptCodes } from "./cptCodes/index"
import { carePlan } from "./carePlan/index"
import {screenPermissions} from "./screenPermissions/index"
import {provider} from "./provider/index"
import { videoCall } from "./videoCall/index"
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    dashBoard,
    communications,
    patients,
    counterCards,
    common,
    careCoordinator,
    careCoordinatorSummary,
    tasks,
    globalCodes,
    rolesAndPermissions,
    inventory,
    appointment,
    authentication,
    notes,
    timeLogs,
    timeLogReport,
    thresholds,
    careTeam,
    programs,
    cptCodes,
    carePlan,
    videoCall,
    provider,
    screenPermissions
  },
  plugins: [ createPersistedState({
    reducer(state) {
   
    return {
      token: state.authentication.token
      }
    }
  })]
})
