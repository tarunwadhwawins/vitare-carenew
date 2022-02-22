import { computed } from "vue";
import state from "./state"
export function vitalDataGetters(){
    computed(()=> {
    return state.vitalData
  })
}