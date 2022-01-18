import { createStore } from 'vuex'
import { dashBoard } from "./dashboard/index"
import { counterCards } from "./counter-cards/index"
export default createStore({
 modules: {
  dashBoard,
  counterCards
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
