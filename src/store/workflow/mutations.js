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
        item.settings = 'settings'
        item.startDate = dateAndTimeFormate(item.startDate,globalDateFormat)
        item.endDate = item.endDate==0?null:dateAndTimeFormate(item.endDate,globalDateFormat)
        return item
    })
 }

 export const workflowColumn = (state, data) => {
    state.workflowColumn = data.map(item=>{
       item.name = item.title
       return item
    })
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
        let fieldId = []
        let operator = []
        let value = []
        JSON.parse(JSON.parse(JSON.stringify(data.criteria))).map(item=>{
            field.push(item.field);
            fieldId.push(item.fieldId)
            operator.push(item.operator);
            value.push(item.value);
        })
        let finalField = [];
        finalField['field']=field;
        finalField['fieldId']=fieldId;
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
        item.settings = 'settings'
        return item
    })
 }

 export const editGroupAction = (state, data) => {
    state.editGroupAction = data
 }

 
 export const actionsOffset = (state, data) => {
   state.actionsOffset = data.map(item=>{
      item.name = item.title
      return item
   })
}


export const actionsField = (state, data) => {
   state.actionsField = data
}


export const actionsList = (state, data) => {
   state.actionsList = data
}

export const eventAction = (state, data) => {
   state.eventAction = data
}


export const editActions = (state, data) => {
   console.log('editActionsMut',data);
   state.editActions = {
      id:data.id,
      workFlowActionId: data.workFlowActionId,
      executionOffsetDays: data.executionOffsetDays,
      workFlowEventOffsetFieldId: data.workFlowEventOffsetFieldId,
      executionOffsetType: data.executionOffsetType,
      actionsField: data.actionsField.length>0?data.actionsField.map(item=>{
         item.fieldValue
         return isNaN(item.fieldValue)?item.fieldValue:dateAndTimeFormate(parseInt(item.fieldValue),globalDateFormat)
      }):''
   }
}