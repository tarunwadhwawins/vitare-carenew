
export const globalCodes = (state, data) => {
    state.globalCodeCategories = data;
    data.forEach(element => {
        if (element.name === 'Gender') {
            state.gender = element;
        }
        if (element.name === 'Task Priority') {
            state.taskPriority = element;
        }
        if (element.name === 'MessageCategory') {
            state.messageCategories = element;
        }
        if (element.name === 'Message Type') {
            state.messageType = element;
        }
        if (element.name === 'Language') {
            state.language = element;
        }
        if (element.name === 'Country') {
            state.country = element;
        }
        if (element.name === 'States') {
            state.state = element;
        }
        if (element.name === 'Contact Type') {
            state.pmOfcontact = element;
        }
        if (element.name === 'Contact Time') {
            state.ptOfDayContact = element;
        }
        if (element.name === 'Relationship') {
            state.relation = element;
        }
        if (element.name === 'Patient Diseases') {
            state.healthCondition = element;
        }
        if (element.name === 'Designations') {
            state.designations = element;
        }
        if (element.name === 'Device Type') {
            state.deviceType = element;
        }
        if (element.name === 'Timeline') {
            state.timeline = element;
        }
        if (element.name === 'Network') {
            state.network = element;
        }
        if (element.name === 'Specialization') {
            state.specialization = element;
        }
        if (element.name === 'Task Category') {
            state.taskCategory = element;
        }
        if (element.name === 'Task Status') {
            state.taskStatus = element;
        }

        if (element.name === 'Insurance Name') {
            state.insuranceName = element;
        }
        if (element.name === 'Insurance Type') {
            state.insuranceType = element;
        }
        if (element.name === 'Document Tags') {
            state.documentTags = element;
        }
        if (element.name === 'Document Types') {
            state.documentTypes = element;
        }
        if (element.name === 'Duration') {
            state.duration = element;
        }
        if (element.name === 'Appointment Type') {
            state.typeOfVisit = element;
        }
        if (element.name === 'Note Types') {
            state.noteTypes = element;
        }
        if (element.name === 'Note Category') {
            state.noteCategories = element;
        }
        if (element.name === 'Patient Time Logs Category') {
            state.timeLogCategories = element;
        }
        if (element.name === 'Program types') {
            state.programCategories = element;
        }
        if (element.name === 'Frequency Type') {
            state.frequencyTypes = element.globalCode;
        }
        if (element.name === 'Modules') {
            state.modules = element;
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


