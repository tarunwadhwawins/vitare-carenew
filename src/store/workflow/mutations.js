import { dateAndTimeFormate,globalDateFormat} from '@/commonMethods/commonMethod';

export const counterPlus = (state) => {
	state.counter++;
};

export const counterMinus = (state) => {
	state.counter--;
};

export const resetCounter = (state) => {
	state.counter = 0;
};

export const eventType = (state, data) => {
    state.eventType = data.map(item=>{
        item.name = item.title 
        return item
    })
 }

 export const addWorkFlow = (state, data) => {
    state.addWorkFlow = data
 }

 
 export const workflowList = (state, data) => {
    state.workflowList = data.map(item =>{
        item.configureWorkflow = 'configuration'
        item.startDate = dateAndTimeFormate(item.startDate,globalDateFormat)
        item.endDate = dateAndTimeFormate(item.endDate,globalDateFormat)
        return item
    })
 }

 export const workflowColumn = (state, data) => {
    state.workflowColumn = data
 }

 export const workflowCriteria = (state, data) => {
    state.workflowCriteria = data
 }

 
 export const editWorkflow = (state, data) => {
    state.editWorkflow = data;
    state.editWorkflow['startDate'] = dateAndTimeFormate(data.startDate,globalDateFormat)
    state.editWorkflow['endDate'] = dateAndTimeFormate(data.endDate,globalDateFormat)
 }


 
 export const addWorkflowCriteria = (state, data) => {
    state.addWorkflowCriteria = data
 }
 
 export const editWorkflowCriteria = (state, data) => {
    if(Object.keys(data).length != 0){
        state.editWorkflowCriteria = data;
        let field = []
        let operator = []
        let value = []
        JSON.parse(data.criteria).map(item=>{
            field.push(item.field);
            operator.push(item.operator);
            value.push(item.value);
        })
        let finalField = [];
        finalField['field']=field;
        finalField['operator']=operator;
        finalField['value']=value;
        state.editWorkflowCriteria['criteria']=finalField
    }

 }

 export const addGroupAction = (state, data) => {
    state.addGroupAction = data
 }

 export const groupActionList = (state, data) => {
    state.groupActionList = data.map(item=>{
        item.numberOfActions = 0
        return item
    })
 }

 
 export const editGroupAction = (state, data) => {
    state.editGroupAction = data
 }