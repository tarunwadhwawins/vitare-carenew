import { createStore } from 'vuex'
import { dashBoard } from "./dashboard/index"
import  { communications } from "./communications/index"
import { patients } from "./patients/index"
export default createStore({
 modules: {
  dashBoard,
  communications,
  patients
  },
  // plugins: [ createPersistedState({
  //   reducer(state) {
  //   return {
  //     //single state store in localStorage
  //     token: state.storeData.token
  //     }
  //   }
  // })]
})
