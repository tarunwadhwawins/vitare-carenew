import {computed} from "vue"

export const taskRecords = (state)=>{
    return computed(()=>{
        return state
    })
  }
  export const tasksList = (state)=>{
    return computed(()=>{
        return state.tasksList
    })
  }