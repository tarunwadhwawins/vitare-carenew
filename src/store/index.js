import { createStore } from 'vuex'
// import  { storeData } from "./main-store/index"
import * as actions from "../store/actions/index"
import * as state from "../store/state/index";
import * as getters from '../store/getters/index';
import * as mutations from "../store/mutations/index"; 
// import createPersistedState from "vuex-persistedstate";
// import  { storeData } from "./main-store/index"
//import createPersistedState from "vuex-persistedstate";
//storeData modules store all action, getters, mutation, and states
const storeData ={
  actions,
  state,
  getters,
  mutations,
}
export default createStore({
 modules: {
  storeData,
  },
  // plugins: [ createPersistedState({
    reducer(state) {
    return {
      //single state store in localStorage
      token: state.storeData.token
      }
    }
  // })]
})
