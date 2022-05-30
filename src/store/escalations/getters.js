import {computed} from "vue"
export const singleEscalationDataArray = (state)=>{
    return computed(()=>{
        return state.singleEscalationDataArray
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