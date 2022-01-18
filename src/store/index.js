import { createStore } from 'vuex'
//import  { storeData } from "./main-store/index"
import  { careCoordinator } from "./care-coordinator/index"
import  { communications } from "./communications/index"
//import createPersistedState from "vuex-persistedstate";
//storeData modules store all action, getters, mutation, and states
export default createStore({
 modules: {
  //storeData
  careCoordinator,
  communications,
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
