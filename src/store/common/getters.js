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
  export const dropdownLoadingStatus = (state)=>{
    return computed(()=>{
        return state.dropdownLoadingStatus
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
  export const orderTable = (state)=>{
    return computed(()=>{
        return state.orderTable
    })
  }

  export const notificationCount = (state)=>{
    return computed(()=>{
        return state.notificationList
    })
  }
  export const filter = (state)=>{
    return computed(()=>{
        return state.filter
    })
  }
  export const dateFilter = (state)=>{
    return computed(()=>{
        return state.dateFilter
    })
  }
  export const otherFilters = (state)=>{
    return computed(()=>{
        return state.otherFilters
    })
  }
  export const escalationType = (state)=>{
    return computed(()=>{
        return state.escalationType
    })
  }