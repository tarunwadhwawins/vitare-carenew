import {
	
	globalDateTimeFormat,
	dateAndTimeFormate,
	
  } from '@/commonMethods/commonMethod';
export const questionnaire = async (state, data) => {
	state.questionnaireTemplateList = data.data;
	state.questionnaireTemplateMeta = data.meta.pagination;
};
export const addQuestionnaireTemplate = async (state, data) => {
	state.addQuestionnaireTemplate = data;
};
export const detailsQuestionnaireTemplate = async (state, data) => {
	let tags = [];

	data.tags.map((record) => {
		tags.push(record.tag);
	});
	data.tags = tags;
	state.detailsQuestionnaireTemplate = data;
};
export const templateDetailsList = async (state, data) => {

	state.templateDetailsList = data;
};
export const scoreCount = async (state, data) => {
	state.scoreCount = data;
};
export const questionnaireResponse = async (state, data) => {
	state.questionnaireResponse = data.data.map((item) => {
		item.createdAt = dateAndTimeFormate(item.createdAt,globalDateTimeFormat);
		return item;
	});
};
export const questionnaireResponseDetails = async (state, data) => {
	state.questionnaireResponseDetails = data.data 
	state.questionnaireResponseDetails.createdAt = dateAndTimeFormate(data.data.createdAt,globalDateTimeFormat);
	if(data.data){
		state.questionnaireResponseDetails.clientQuestionResponse = state.questionnaireResponseDetails.clientQuestionResponse.reduce((acc, d) => {
			if (Object.keys(acc).includes(d.sectionName)) return acc;
		
			acc[d.sectionName] = state.questionnaireResponseDetails.clientQuestionResponse.filter(g => g.sectionName === d.sectionName); 
			return acc;
		}, {})
	}

	
};
