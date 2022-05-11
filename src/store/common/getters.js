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
  export const questionnaireTemplateType = (state)=>{
    return computed(()=>{
        return state.questionnaireTemplateType
    })
  }
  export const questionDataType = (state)=>{
    return computed(()=>{
        return state.questionDataType
    })
  }
  export const staffLevels = (state)=>{
    return computed(()=>{
      return state.staffLevels
    })
  }
