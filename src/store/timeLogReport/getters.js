import {computed} from "vue"

export const timeLogReports = (state)=>{
    return computed(()=>{
        return state
    })
  }
  export const timeLogView = (state)=>{
    return computed(()=>{
        return state.timeLogView
    })
  }
  export const viuewTimeReportModal = (state)=>{
    return computed(()=>{
        return state.viuewTimeReportModal
    })
  }
