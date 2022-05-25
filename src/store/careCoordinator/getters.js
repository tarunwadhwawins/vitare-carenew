import {computed} from "vue"

export const staffRecord = (state)=>{
    return computed(()=>{
        return state
    })
  }
  
  export const escalationMeta = (state)=>{
    return computed(()=>{
        return state.escalationMeta
    })
  }

  
  export const escalation = (state)=>{
    return computed(()=>{
        return state.escalation
    })
  }