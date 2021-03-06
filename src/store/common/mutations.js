
export const globalCodes = (state, data) => {
    state.globalCodeCategories = data;
    data.forEach(element => {
        if (element.name === 'Gender') {
            state.gender = element.globalCode;
        }
        if (element.name === 'Task Priority') {
            state.taskPriority = element.globalCode;
        }
        if (element.name === 'MessageCategory') {
            state.messageCategories = element.globalCode;
        }
        if (element.name === 'Message Type') {
            state.messageType = element.globalCode;
        }
        if (element.name === 'Language') {
            state.language = element.globalCode;
        }
        if (element.name === 'Country') {
            state.country = element.globalCode;
        }
        if (element.name === 'States') {
            state.state = element.globalCode
        }
        if (element.name === 'Contact Type') {
            state.pmOfcontact = element.globalCode;
        }
        if (element.name === 'Contact Time') {
            state.ptOfDayContact = element.globalCode;
        }
        if (element.name === 'Relationship') {
            state.relation = element.globalCode;
        }
        if (element.name === 'Patient Diseases') {
            state.healthCondition = element.globalCode;
        }
        if (element.name === 'Designations') {
            state.designations = element.globalCode;
        }
        if (element.name === 'Device Type') {
            state.deviceType = element.globalCode;
        }
        if (element.name === 'Timeline') {
            state.timeline = element.globalCode;
        }
        if (element.name === 'Network') {
            state.network = element.globalCode;
        }
        if (element.name === 'Specialization') {
            state.specialization = element.globalCode;
        }
        if (element.name === 'Task Category') {
            state.taskCategory = element.globalCode;
        }
        if (element.name === 'Task Status') {
            state.taskStatus = element.globalCode;
        }

        if (element.name === 'Insurance Name') {
            state.insuranceName = element.globalCode;
        }
        if (element.name === 'Insurance Type') {
            state.insuranceType = element.globalCode;
        }
        if (element.name === 'Document Tags') {
            state.documentTags = element.globalCode;
        }
        if (element.name === 'Document Types') {
            state.documentTypes = element.globalCode;
        }
        if (element.name === 'Duration') {
            state.duration = element.globalCode;
        }
        if (element.name === 'Appointment Type') {
            state.typeOfVisit = element.globalCode;
        }
        if (element.name === 'Note Types') {
            state.noteTypes = element.globalCode;
        }
        if (element.name === 'Note Category') {
            state.noteCategories = element.globalCode;
        }
        if (element.name === 'Patient Time Logs Category') {
            state.timeLogCategories = element.globalCode;
        }
        if (element.name === 'Program types') {
            state.programCategories = element.globalCode;
        }
        if (element.name === 'Frequency Type') {
            state.frequencyTypes = element.globalCode;
        }
        if (element.name === 'Modules') {
            state.modules = element.globalCode;
        }
        
    });

}

export const successMsg = (state, data) => {
    state.successMsg = data
}

export const staffListSuccess = (state, data) => {
    
    const staffList = []
    data.map(item => {
        if(item.id != '') {
            staffList.push(item);
        }
    });
    state.staffList = staffList;
}

export const loadingStatus = (state, data) => {
    state.loadingStatus = data
}


export const dropdownLoadingStatus = (state, data) => {
    state.dropdownLoadingStatus = data
}

export const vitalFieldsList = (state, fields) => {
    state.vitalFieldsList = fields
}

export const vitalFieldsByDeviceId = (state, fields) => {
    state.vitalFieldsByDeviceId = fields
}

export const allPatientsList = (state, fields) => {
  
    state.allPatientsList = fields
}

export const allStaffList = (state, fields) => {
    state.allStaffList = fields
}

export const activeCptCodes = (state, fields) => {
    state.activeCptCodes = fields
}

//checking fields input for modal popup messages
export const checkChangeInput = (state, data) => {
    state.checkChangeInput = data
  }

  export const getNotifications = (state, data) => {
    state.getNotifications = data
  }

  export const notificationList = (state, data) => {
    state.notificationList = data;
  }

  
  export const searchTable = (state, data) => {
    state.searchTable = data
  }
  