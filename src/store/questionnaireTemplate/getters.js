import { computed } from "vue";
export const questionnaireTemplateList = (state) => {
  return computed(() => {
    return state.questionnaireTemplateList
  })
}
export const addQuestionnaireTemplate = (state) => {
  return computed(() => {
    return state.addQuestionnaireTemplate
  })
}
export const detailsQuestionnaireTemplate = (state) => {
  return computed(() => {
    return state.detailsQuestionnaireTemplate
  })
}
export const questionnaireTemplateMeta = (state) => {
  return computed(() => {
    return state.questionnaireTemplateMeta
  })
}
export const templateDetailsList = (state) => {
  return computed(() => {
    return state.templateDetailsList
  })
}
