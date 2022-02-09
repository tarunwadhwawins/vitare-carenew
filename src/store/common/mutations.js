
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
    });

}

export const successMsg = (state, data) => {
    state.successMsg = data
}

//  export const errorMsg = (state, data) => {
//     state.errorMsg = data
//  }


export const loadingStatus = (state, data) => {
    state.loadingStatus = data
}

export const permssions = (state, auth) => {
   console.log(auth)
    if (auth == "SuperAdmin") {

        state.permssions = [{
            id: 1,
            name: "Patients widgets"
        },

        {
            id: 2,
            name: "Today Appointment"
        },
        {
            id: 3,
            name: "Call Queue"
        },
        {
            id: 4,
            name: "Patients Stats"
        },
        {
            id: 5,
            name: "Care Coordinator"
        },
        {
            id: 6,
            name: "Cpt Code"
        },
        {
            id: 7,
            name: "Financial Stats"
        },
        {
            id: 8,
            name: "New Patients Chart"
        },
        {
            id: 9,
            name: "New Appointment Chart"
        }]
    }else if(auth == "Staff"){
        state.permssions = [{
            id: 1,
            name: "Patients widgets"
        },

        {
            id: 2,
            name: "Today Appointment"
        },
        {
            id: 3,
            name: "Call Queue"
        },
        {
            id: 4,
            name: "Patients Stats"
        },
        {
            id: 5,
            name: "Care Coordinator"
        },
        {
            id: 8,
            name: "New Patients Chart"
        },
        {
            id: 9,
            name: "New Appointment Chart"
        }]
    }else if(auth == "Accountent"){
        state.permssions = [
        {
            id: 6,
            name: "Cpt Code"
        },
        {
            id: 7,
            name: "Financial Stats"
        },
        ]
    }else{
        state.permssions =[]
    }

}



