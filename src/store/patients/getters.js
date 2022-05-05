import {computed} from "vue"

export const patientsRecord = (state)=>{
    return computed(()=>{
        return state
    })
  }
  export const timeLineType = (state)=>{
    return computed(()=>{
        return state.timeLineType
    })
  }
  export const errorMsg = (state)=>{
    return computed(()=>{
        return state.errorMsg
    })
  }
