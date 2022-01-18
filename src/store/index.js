import { createStore } from 'vuex'
// import createPersistedState from "vuex-persistedstate";
import { patients } from "./patients/index"

export default createStore({
 modules: {
  patients,
  },
  // plugins: [ createPersistedState({
    // reducer(state) {
    // return {
    //   //single state store in localStorage
    //   token: state.storeData.token
    //   }
    // }
  // })]
})
