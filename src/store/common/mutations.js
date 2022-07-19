
export const globalCodes = (state, data) => {
    state.globalCodeCategories = data.filter((item)=>item.preDefined!=1);
    data.forEach(element => {
        if (element.name === 'Gender') {
            state.gender = element.globalCode;
        }
        if (element.name === 'Task Priority') {
            element.globalCode.map(item => {
                switch (item.name) {
                    case 'Medium':
                    item.color = '#ffa800'
                    item.style = 'background: #ffa800'
                    break;
                    case 'Normal':
                    item.color = '#008000'
                    item.style = 'background: #008000'
                    break;
                    case 'Urgent':
                    item.color = '#ff6061'
                    item.style = 'background: #ff6061'
                    break;
                    default:
                    break;
                }
                return item
            })
            state.taskPriority.splice(0,3, element.globalCode[1],element.globalCode[0],element.globalCode[2]);
        }
        if (element.name === 'Message Category') {
            state.messageCategories = element.globalCode;
        }
        if (element.name === 'Message Type') {
            state.messageType = element.globalCode;
            element.globalCode.map(item => {
                if(item.name == 'App Message') {
                    state.appMessage = item.id
                }
            })
        }
        // if (element.name === 'Language') {
        //     //Arrangd english(2) and spanish(12) default top language
        //     let defaultLang = []
        //     let temp = [2,12]
        //     defaultLang.splice(0,2, element.globalCode[2],element.globalCode[12]);
        //     let orderLang = element.globalCode.filter(function(value, index) {
        //         return temp.indexOf(index) == -1;
        //    })
        //    state.language = defaultLang.concat(orderLang)
           
        // }
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
        // if (element.name === 'Timeline') {
        //     state.timeline = element.globalCode.sort(function(a, b) { 
        //         return a.id - b.id 
        //       });
        // }
        if (element.name === 'Network') {
            state.network = element.globalCode;
        }
        if (element.name === 'Specialization') {
            state.specialization.splice(0,2, element.globalCode[1],element.globalCode[0])
        }
        if (element.name === 'Task Category') {
            // state.taskCategory = element.globalCode;
            state.taskCategory.splice(0,3, element.globalCode[2],element.globalCode[1],element.globalCode[3],element.globalCode[0],element.globalCode[5])
        }
        if (element.name === 'Task Status') {
            state.taskStatus.splice(0,3, element.globalCode[1],element.globalCode[2],element.globalCode[0])
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
            state.duration = element.globalCode.sort(function(a, b) { 
                return a.id - b.id 
              })
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
        if (element.name === 'Escalation Type') {
            state.escalationType = element.globalCode;
        }
        if (element.name === 'Task Type') {
            state.taskType = element.globalCode;
        }
        if (element.name === 'Place of Service') {
            state.placeOfService = element.globalCode;
        }

        if (element.name === 'CPTCode Status') {
            state.CPTCodeStatus = element.globalCode;
        }
        if (element.name === 'Removal Reason') {
            state.removalReason = element.globalCode;
        }
        if (element.name === 'Time Approval Status') {
            state.timeApprovalStatus = element.globalCode;
            element.globalCode.map(item => {
                if(item.name == 'Pending') {
                    state.pendingApprovalStatus = item.id
                }
            })
        }
        
    });

}


export const dateFilterTimeline = (state, data) => {
    state.timeline = data
}

export const successMsg = (state, data) => {
    state.successMsg = data
}

export const actionTrack = (state, data) => {
    state.actionTrack = data
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
export const loadingTableStatus = (state, data) => {
    state.loadingTableStatus = data
}


export const dropdownLoadingStatus = (state, data) => {
    state.dropdownLoadingStatus = data
}

export const dropdownListing = (state, data) => {
    state.dropdownListing = data
}

export const vitalFieldsList = (state, fields) => {
    state.vitalFieldsList = fields
}

export const vitalFieldsByDeviceId = (state, fields) => {
    state.vitalFieldsByDeviceId = fields.map(field => {
        field.fieldName = (field.field).toLowerCase()
        return field
    })
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

  
  export const getNotificationsList = (state, data) => {
    state.getNotificationsList = data
  }

  export const notificationList = (state, data) => {
    state.notificationList = data;
  }

  
  export const searchTable = (state, data) => {
    state.searchTable = data
  }
  export const orderTable = (state, data) => {
    state.orderTable = data
  }
  export const filter = (state, data) => {
    state.filter = data
  }
  export const dateFilter = (state, data) => {
    // console.log("check",data)
      if(data){
    state.dateFilter = data
      }else{
        state.dateFilter = {fromDate:'',toDate:''}
      }
  }
  export const toScroll = (state, data) => {
    state.toScroll = data
  }
  export const otherFilters = (state, date) => {
    state.otherFilters = date
  }
  
  export const apiCounter = (state, status) =>{
    if(status=="add"){
        state.apiCounter++
    }else if(status=="sub"){
        state.apiCounter--
    }else{
        state.apiCounter = 0
    }
    
  }
  
export const showStartTimer = (state, data) => {
    state.showStartTimer = data
}
export const showPauseTimer = (state, data) => {
    state.showPauseTimer = data
}
export const showResumeTimer = (state, data) => {
    state.showResumeTimer = data
}

export const loadingTimelineStatus = (state, data) => {
  state.loadingTimelineStatus = data
}