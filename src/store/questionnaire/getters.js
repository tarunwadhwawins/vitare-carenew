import {computed} from "vue"

export const addQuestionnaire = (state)=>{
    return computed(()=>{
        return state.addQuestionnaire
    })
  }
  export const questionnaireList = (state)=>{
    return computed(()=>{
        return state.questionnaireList
    })
  }
  export const detailsQuestionnaire = (state)=>{
    return computed(()=>{
        return state.detailsQuestionnaire
    })
  }
