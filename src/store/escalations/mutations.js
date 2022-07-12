import {
  dateOnlyFormat,
  globalDateFormat,
  dateAndTimeFormate
} from '@/commonMethods/commonMethod';


export const escalationCounterPlus = (state) => {
  state.escalationCounter++
}

export const escalationCounterMinus = (state) => {
  state.escalationCounter--
}

export const resetEscalationCounter = (state) => {
  state.escalationCounter = 0
}

export const escalation = (state, data) => {
	state.escalationMeta = data.meta ? data.meta.pagination : ''
	state.escalation = data.data.map((item) => {
		item.dueBy = dateAndTimeFormate(item.dueBy,globalDateFormat);
		return item;
	})
};


export const escalationStaus = (state, data) => {
	state.escalationStaus = data;
};

export const addBasicEscalation = (state, data) => {
  state.addBasicEscalation = data
  state.editEscalationStaff  = data.escalationStaff.data.map((item)=>{
    item.fullName = item.staffName,
    item.name = item.staffName,
    item.label = item.staffName,
    item.firstName = item.staffName,
    item.value = item.staffUdid
    return item
  })

  state.editEscalationPatient=[{
    value:data.patientId,
    label:data.patientName
  }]
}

export const updateBasicEscalation = (state, data) => {
  state.editEscalationStaff  = data.escalationStaff.data.map((item)=>{
    item.fullName = item.staffName,
    item.name = item.staffName,
    item.label = item.staffName,
    item.firstName = item.staffName,
    item.value = item.staffUdid
    return item
  })
  state.editEscalationPatient=[{
    value:data.patientId,
    label:data.patientName
  }]
}


// export const escalation = (state, data) => {
//   state.escalation = data
// }





export const esacalationFlagList = (state, data) => {
  state.esacalationFlagList = data.map((item) => {
		item.createdAt = dateAndTimeFormate(item.createdAt,globalDateFormat);
		return item;
	})
}

export const escalationNotesList = (state, data) => {
  state.escalationNotesList = data.map(note => {
    note.date = dateOnlyFormat(note.date);
    return note;
  });
}


export const esacalationCarePlansList = (state, data) => {
  state.esacalationCarePlansList = data.map(carePlan => {
    carePlan.startDate = dateOnlyFormat(carePlan.startDate)
    carePlan.endDate = dateOnlyFormat(carePlan.endDate)
    return carePlan
  })
}


export const escalationVitalList = (state, data) => {
  state.escalationVitalList = data.map((item) => {
		item.startTime = item.startTime?dateAndTimeFormate(item.startTime,globalDateFormat):'';
    item.endTime = item.endTime?dateAndTimeFormate(item.endTime,globalDateFormat):'';
		return item;
	})
}


export const singleEscalationRecord = (state, data) => {
  console.log('data',data)
  state.singleEscalationRecord = data

  state.singleEscalationDataArray = [{
    patientName :data.patientName,
    patientId :data.patientId,
    flagColor: data.flagColor,
    flagName: data.flagName,
    dueBy:data.dueBy?dateAndTimeFormate(data.dueBy,globalDateFormat):null,
    escalationType:data.escalationType,
    id:data.id
  }]

  state.escalationNots = data.escalationNotes.data.map((item)=>{
    console.log('==>',item.note.id)
    item.id = item.note.id
    item.date = item.note.date?dateAndTimeFormate(item.note.date,globalDateFormat):null,
    item.category = item.note.category
    item.type = item.note.type,
    item.addedBy = item.note.addedBy
    item.addedById = item.note.addedById
    item.color = item.note.color
    item.flag = item.note.flag
    item.note = item.note.note
    return item
  })

  state.escalationVitals = data.escalationVital.data.map((item)=>{
    item.takeTime = item.patientVital.takeTime?dateAndTimeFormate(item.patientVital.takeTime,globalDateFormat):null,
    item.vitalField = item.patientVital.vitalField
    item.deviceType = item.patientVital.deviceType,
    item.value = item.patientVital.value
    item.color = item.patientVital.color
    item.flagName = item.patientVital.flagName
    item.id = item.patientVital.udid
    return item
  })

  state.escalationCarePlan = data.escalationCarePlan.data.map((item)=>{
    item.startDate = item.carePlan.startDate?dateAndTimeFormate(item.carePlan.startDate,globalDateFormat):null,
    item.endDate = item.carePlan.endDate?dateAndTimeFormate(item.carePlan.endDate,globalDateFormat):null,
    item.deviceType = item.carePlan.deviceType
    item.vitalField = item.carePlan.vitalField
    item.frequency = item.carePlan.frequency
    item.highValue = item.carePlan.highValue
    item.lowValue = item.carePlan.lowValue
    item.note = item.carePlan.note
    item.id = item.carePlan.id
    return item
  })

  state.escalationFlags = data.escalationFlag.data.map((item)=>{
    item.createdAt = item.flag.createdAt?dateAndTimeFormate(item.flag.createdAt,globalDateFormat):null,
    item.name = item.flag.name
    item.color = item.flag.color
    item.id = item.flag.id
    return item
  })

  state.editEscalationDetails = {
    dueBy:data.dueBy?dateAndTimeFormate(data.dueBy,globalDateFormat):null,
    referenceId:data.patientId,
    entityType:data.entityType,
    escalationDescription:data.escalationDescription,
    flagId:data.flagId,
    escalationType:data.escalationType.data.map((item)=>{
      return item.escalationTypeId
    }),
    staffIds:data.escalationStaff.data.map((item)=>{
      return item.staffUdid
    }),
    
  }

  state.editSecondStepper = {
    notesId : state.escalationNots.map((item)=>{
      return item.id
     }),
   
     vitalId : data.escalationVital.data.map((item)=>{
       return item.id = item.patientVital.udid
       
     }),
   
     carePlan :data.escalationCarePlan.data.map((item)=>{
       return item.id = item.carePlan.id
       
     }),
   
     flagIds :data.escalationFlag.data.map((item)=>{
       return item.id = item.flag.id
       
     })
  }

  state.editEscalationPatient=[{
    value:data.patientId,
    label:data.patientName
  }]

  state.editEscalationStaff  = data.escalationStaff.data.map((item)=>{
    item.fullName = item.staffName,
    item.name = item.staffName,
    item.label = item.staffName,
    item.firstName = item.staffName,
    item.value = item.staffUdid
    return item
  })

  


}