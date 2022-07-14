import {
	
	globalDateTimeFormat,
	dateAndTimeFormate
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
