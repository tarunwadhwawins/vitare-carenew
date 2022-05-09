export const questionnaire = async (state, data) => {
 state.questionnaireTemplateList =data.data
 state.questionnaireTemplateMeta= data.meta.pagination
}
export const addQuestionnaireTemplate = async (state, data) => {
  state.addQuestionnaireTemplate =data
 }
 export const detailsQuestionnaireTemplate = async (state, data) => {
  state.detailsQuestionnaireTemplate =data
 }
 export const templateDetailsList = async (state, data) => {
  state.templateDetailsList =data
 }
 