export const addQuestionnaire = async (state, data) => {
  state.addQuestionnaire = data
}
export const questionnaireList = async (state, data) => {
  state.questionnaireList = data.data
}
//search question list from common store
export const question = async (state, data) => {
  state.questionnaireList = data.data
}
export const detailsQuestionnaire = async (state, data) => {
  state.detailsQuestionnaire = data
}
