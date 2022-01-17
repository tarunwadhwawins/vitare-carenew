import { createStore } from 'vuex'
import  { storeData } from "./main-store/index"
import createPersistedState from "vuex-persistedstate";
//storeData modules store all action, getters, mutation, and states
export default createStore({
 modules: {
  storeData,
  },
  plugins: [ createPersistedState({
    reducer(state) {
    return {
      //single state store in localStorage
      token: state.storeData.token
      }
    }
  })]
})
