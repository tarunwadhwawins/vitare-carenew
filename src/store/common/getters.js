import { computed } from "vue"

export const commonRecords = (state) => {
  return computed(() => {
    return state
  })
}

export const loadingStatus = (state)=>{
    return computed(()=>{
        return state.loadingStatus
    })
  }
  export const timeline = (state)=>{
    return computed(()=>{
        return state.timeline
    })
  }
  export const timeLogCategories = (state)=>{
    return computed(()=>{
        return state.timeLogCategories
    })
  }
  export const activeCptCodes = (state)=>{
    return computed(()=>{
        return state.activeCptCodes
    })
  }
  export const searchTable = (state)=>{
    return computed(()=>{
        return state.searchTable
    })
  }