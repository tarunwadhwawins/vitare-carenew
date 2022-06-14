import {computed} from "vue"

export const cptCodesMeta = (state)=>{
    return computed(()=>{
        return state.cptCodesMeta
    })
  }

  
  export const cptCodes = (state)=>{
    return computed(()=>{
        return state.cptCodes
    })
  }

  export const cptCodeFilterDates = (state)=>{
    return computed(()=>{
        return state.cptCodeFilterDates
    })
  }

  