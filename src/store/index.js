import { createStore } from 'vuex'
import { dashBoard } from "./dashboard/index"
import  { communications } from "./communications/index"
import { patients } from "./patients/index"
import { common } from "./common/index"
import { counterCards } from "./counter-cards/index"
import { careCoordinator } from "./care-coordinator/index"
export default createStore({
modules: {
  dashBoard,
  communications,
  patients,
  counterCards,
  common,
  careCoordinator
  },
})
