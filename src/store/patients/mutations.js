export const globalCodes = (state, data) => {
     data.forEach(element => {
        if(element.name ==='Gender'){
            state.gender= element;
        }
        if(element.name ==='Task Priority') {
            state.taskPriority = element;
        }
        if(element.name ==='MessageCategory') {
            state.messageCategories = element;
        }
        if(element.name ==='Message Type') {
            state.messageType = element;
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
        if(element.name ==='Designations'){
            state.designations= element;
        }
        if(element.name ==='Device Type'){
            state.deviceType= element;
        }
        
     });
    state.globalCodes = data;
}



export const demographics = (state, data) => {
    state.demographics = data
 }
 
 export const conditions = (state, data) => {
     state.conditions = data
  }
 
 
  export const patientReferals = (state, data) => {
     state.patientReferals = data
  }
  export const patientPhysician = (state, data) => {
     state.patientPhysician = data
  }

  export const programList = (state, data) => {
    state.programList = data
 }

 export const counterPlus = (state) => {
    state.counter++
  }
 
  export const counterMinus = (state) => {
    state.counter--
  }

  export const addProgram = (state, data) => {
    state.addProgram = data
 }


 export const program = (state, data) => {
    state.program = data
 }
 

 export const addDevice = (state, data) => {
    state.addDevice = data
 }

 