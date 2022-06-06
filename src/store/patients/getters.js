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
  export const referralList = (state)=>{
    return computed(()=>{
        return state.referralList
    })
  }
  export const addPatientReferals = (state)=>{
    return computed(()=>{
        return state.addPatientReferals
    })
  }
  export const emergencyContact = (state)=>{
    return computed(()=>{
        return state.emergencyContact
    })
  }
  export const referralDetail = (state)=>{
    return computed(()=>{
        return state.referralDetail
    })
  }
  export const patientFlags = (state) => {
    return computed(() => {
      return state.patientFlags
    })
  }
  export const grids = (state) => {
    return computed(() => {
      return state.grids
    })
  }

  
 

  
  
  
