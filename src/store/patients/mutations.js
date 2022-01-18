export const globalCodes = (state, data) => {
     data.forEach(element => {
        if(element.name ==='Gender'){
            state.gender= element;
        }
        if(element.name ==='Language'){
            state.language= element;
        }
        if(element.name ==='Country'){
            state.country= element;
        }
        if(element.name ==='States'){
            state.state= element;
        }
        if(element.name ==='Contact Type'){
            state.pmOfcontact= element;
        }
        if(element.name ==='Contact Time'){
            state.ptOfDayContact= element;
        }
        if(element.name ==='Relationship'){
            state.relation= element;
        }
        if(element.name ==='Health Conditions'){
            state.healthCondition= element;
        }
        
     });
    state.globalCodes = data;
}



export const demographics = (state, data) => {
    state.demographics = data
    state.counter = state.counter+1
 }
 
 export const conditions = (state, data) => {
     state.conditions = data
  }
 
 
  export const patientReferals = (state, data) => {
     state.patientReferals = data
  }
  export const patientPhysician = (state, data) => {
     state.patientPhysician = data
     state.counter = state.counter+1
  }
 
  export const counterMinus = (state, data) => {
    state.counter = state.counter-1
  }
 