export const questionnaireSection = async (state, data) => {
	state.questionnaireSection = data.data;
	state.questionnaireSectionMeta = data.meta.pagination;
};
export const questionnaireTemplateSection = async (state, data) => {
	state.questionnaireTemplateSection = data;
};
// export const detailsQuestionnaireTemplate = async (state, data) => {
// 	let tags = [];

// 	data.tags.map((record) => {
// 		tags.push(record.tag);
// 	});
// 	data.tags = tags;
// 	state.detailsQuestionnaireTemplate = data;
// };
export const sectionDetailsList = async (state, data) => {
	state.sectionDetailsList = data;
};

