import {computed} from "vue"

export const communicationRecord = (state)=>{
    return computed(()=>{
        return state
    })
  }
  export const communicationsView = (state)=>{
    return computed(()=>{
        return state.communicationsView
    })
  }