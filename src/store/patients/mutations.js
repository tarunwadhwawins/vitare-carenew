
import {
  meridiemFormatFromTimestamp,
  dateOnlyFormat,
  dateFormat,
  dateTimeFormat,
  dobFormat,
  dobFormat2,
  // hourOnlyFormat,
  // timeFormatSimple
  convertResponse,
  convertData,
  convertChartResponse,
  timestampToDate,
  // createDynamicColumns,
  globalDateFormat,
  dateAndTimeFormate,
  dateOnlyFormatSImple,
  // fullDateTimeFormat,
} from '@/commonMethods/commonMethod';
// import moment from 'moment';

export const addDemographic = (state, data) => {
  data.contactTime = data.contactTimeId
  state.addDemographic = data
}
export const status = (state, data) => {
  state.status = data
}


export const patient = (state, data) => {
  state.column = [
    {
      title: "Flags",
      dataIndex: "flags",
      slots: {
        customRender: "flags",
      },
      width: '8%',
      
    },
    {
      title: "Flag Date",
      dataIndex: "flagTmeStamp",
      slots: {
        customRender: "flagTmeStamp",
      },
      width: '15%',
      sorter: true,
      
    },
    {
      title: "Name",
      dataIndex: "fullName",
      slots: {
        customRender: "fullName",
      },
      sorter: true,
      width: '16%',
    },
    {
      title: "Readings ",
      dataIndex: "patientVitals",
      
      slots: {
        customRender: "patientVitals",
      },
      children: [
        {
          title: "BP(mmHg)",
          dataIndex: "bp",
          key: "bp",
          width: '15%',
          align: 'right',
          sorter: true,
        },
        {
          title: "Spo2(%)",
          dataIndex: "spo2",
          key: "spo2",
          width: '13%',
          align: 'right',
          sorter: true,
        },
        {
          title: "Glucose(mg / dL)",
          dataIndex: "glucose",
          key: "glucose",
          width: '20%',
          align: 'right',
          sorter: true,
        },
        {
          title: "Weight(LBS)",
          dataIndex: "weight",
          key: "weight",
          sorter:true,
          width: '17%',
          align: 'right'
        },
      ],
    },
 
    {
      title: "Non Compliant",
      dataIndex: "nonCompliance",
      slots: {
        customRender: "compliance",
      },
      width: '15%',
      sorter:true,
    },
    {
      title: "Last Message Sent",
      dataIndex: "lastMessageSent",
      ellipsis: true,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      width: '12%',
    },
    {
      title: "Age ",
      dataIndex: "age",
      sorter: true,
      width: '10%',
      align: 'right'
    },
    {
      title: "Gender ",
      dataIndex: "genderName",
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      slots: {
        customRender: 'status'
      },
      width: '10%',
    },
    {
      title:"Action ",
      dataIndex: "actions",
      slots: {
        customRender: "action",
      },
      width: '10%',
    }
  ];
  state.patientMeta = data.meta.pagination;
  state.patientList = data.data
    .map(element => {
      // const flagTimeStamp = element.flagTmeStamp
      element.isActive= element.isActive=='Active' ? true : false,
      element.flags = element.flagColor,
        element.lastName = element.lastName ? element.lastName : '',
        element.firstName = element.name ? element.name : '',
        // element.flagTmeStamp = 'September 30, 2022 12:30 PM',
        element.flagTmeStamp = element.flagTmeStamp ? dateFormat(element.flagTmeStamp) : '',
        element.lastReadingDate = element.lastReadingDate ? element.lastReadingDate : '',
        element.weight = element.weight ? element.weight : '',

        element.bp = element.patientVitals.data.length > 0 ?element.patientVitals.data.map(vitalData => { if (vitalData.vitalField == 'Systolic') { return JSON.parse(vitalData.value) } if (vitalData.vitalField == 'Diastolic') { return '/' + JSON.parse(vitalData.value) } }):'',
        element.spo2 = element.patientVitals.data.length > 0 ?element.patientVitals.data.map(vitalData => { if (vitalData.vitalField == 'SPO2') { return JSON.parse(vitalData.value) } }):'',
        element.glucose = element.patientVitals.data.length  > 0? element.patientVitals.data.map(vitalData => {  if (vitalData.deviceType == 'Glucose') { return JSON.parse(vitalData.value) } }) : '',
        element.glucose = element.glucose !=''?element.glucose.filter(vitalData => {  if (typeof vitalData !== 'undefined') { return vitalData } }):'',
        element.glucose = element.glucose.length >0 ? element.glucose[element.glucose.length-1]:''
        /* if(flagTimeStamp != null && flagTimeStamp != "") {
          const flagTimeDate = dateOnlyFormatSImple(flagTimeStamp)
          const todayDate = moment().format('yyyy-MM-DD')
          if(todayDate == flagTimeDate && element.flagName == 'Critical') {
            const flagTimeDateTime = fullDateTimeFormat(flagTimeStamp)
            const todayDateTime = moment().format('HH')
            const addedHours = moment(flagTimeDateTime).add(2, 'hours').format('HH')
            if(todayDateTime >= addedHours) {
              element.isBlackFlag = true
            }
            else {
              element.isBlackFlag = false
            }
          }
        } */
      return element
    })

}

export const updateDemographic = (state, data) => {
  state.updateDemographic = data
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

export const resetCounter = (state) => {
  state.counter = 0
}


export const addPatientProgram = (state, data) => {
  state.addPatientProgram = data
}


export const programPatients = (state, data) => {
  state.programsPatient = []
  state.program = data.map(element => {

    const program = (element.program).split(" - ")[0]
    if (!state.programsPatient.includes(program)) {
      state.programsPatient.push(program);
    }
    
    element.status = element.status == 1 ? 'Active' : 'Inactive'
    element.onboardingScheduleDate = element.onboardingScheduleDate ? dateOnlyFormat(element.onboardingScheduleDate) : ""
    element.dischargeDate = element.dischargeDate ? dateOnlyFormat(element.dischargeDate) : ""
    return element;
  })
  state.columns = [
    {
      title: "Program Name",
      dataIndex: "program",
    },
    {
      title: "Onboarding scheduled date",
      dataIndex: "onboardingScheduleDate",
    },
    // {
    //   title: "Start Date",
    //   dataIndex: "start",
    // },
    // {
    //   title: "End Date",
    //   dataIndex: "end",
    // },
    {
      title: "Discharge Date",
      dataIndex: "dischargeDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "action",
      },
    },
  ];
}


export const addDevice = (state, data) => {
  state.addDevice = data
}

export const inventoryList = (state, data) => {
  // const devices = state.devices;
  // var list = [];
  // data.map(item => {
  //   list = []
  //   devices.map(device => {
  //     // if(item.modelNumber == device.modelNumber) {
  //       if(item.macAddress != device.macAddress) {
  //         list.push(item)
  //       }
  //     // }
  //     // else {
  //     //   list.push(item)
  //     // }
  //   })
  // })
  // state.inventoryList = list
  state.inventoryList = data
}




export const devices = (state, data) => {

  state.devices = data.map(element => {
    element.status = element.status == 1 ? true : false
    return element;
  })

  state.devicesColumns = [
    {
      title: "Device Type",
      dataIndex: "deviceType",
    },
    {
      title: "Model No",
      dataIndex: "modelNumber",
    },
    {
      title: "MAC Address",
      dataIndex: "macAddress",
    },
    {
      title: "Serial No",
      dataIndex: "serialNumber",
    },
    {
      title: "Active/Inactive",
      dataIndex: "active",
      slots: {
        customRender: "active",
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      slots: {
        customRender: "action",
      },
    },
  ];

}


export const parameterFields = (state, data) => {
  state.parameterFields = data.map((item) => { if (item != null) return item })
}

export const changeStatus = (state, data) => {
  state.changeStatus = data
}




export const addClinicalHistory = (state, data) => {
  state.addClinicalHistory = data
}

export const clinicalHistoryList = (state, data) => {
  state.clinicalHistoryList = data
  state.clinicalHistoryListColumns = [
    {
      title: "History",
      dataIndex: "history",
      className: "medicalHistory",
      slots: {
        customRender: "history",
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      className: "medicalHistoryAction",
      slots: {
        customRender: "action",
      },
    },
  ];
}


export const addClinicalMedicat = (state, data) => {
  state.addClinicalMedicat = data
}



export const clinicalMedicatList = (state, data) => {
  state.clinicalMedicatList = data.map(element => {
    element.startDate = dateOnlyFormat(element.startDate),
      element.endDate = dateOnlyFormat(element.endDate)
    return element;
  })
  state.clinicalMedicatListColumns = [
    {
      title: "Medication List",
      dataIndex: "medicine",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "action",
      },
    },
  ];
}


export const addInsurance = (state, data) => {
  state.addInsurance = data
}

export const updateInsurance = (state, data) => {
  state.updateInsurance = data
}

export const patientInsurance = (state, insurances) => {
  let insuranceData = {
    insuranceNumber: [],
    insuranceName: [],
    expirationDate: [],
    insuranceType: [],
  };
  insurances.map(insurance => {
    insuranceData.expirationDate.push(insurance.expirationDate)
    insuranceData.insuranceName.push(insurance.insuranceNameId)
    insuranceData.insuranceNumber.push(insurance.insuranceNumber)
    insuranceData.insuranceType.push(insurance.insuranceTypeId)
  })
  state.patientInsurance = insuranceData
}


export const addDocument = (state, data) => {
  state.addDocument = data
}

export const documents = (state, data) => {
  state.documents = data
  // console.log("check",data)
  state.documentColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Document",
      dataIndex: "document",
      slots: {
        customRender: "document",
      },
    },
    {
      title: "	Type",
      dataIndex: "type",
    },
    {
      title: "	Tags",
      dataIndex: "tags",
      slots: {
        customRender: "tags",
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "action",
      },
    },
  ];
}

export const uploadFile = (state, data) => {
  state.uploadFile = data
}

// function formatPhoneNumber(phoneNumberString) {
//   var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
//   var match = cleaned.match(/^(\d{3})?[s]?(\d{3})(\d{4})$/);
//   if (match) {
//     return '(' + match[1] + ') ' + match[2] + '-' + match[3];
//   }
//   return null;
// }

export const patientDetails = (state, patient) => {
  patient.email = patient.user.data ? patient.user.data.email : null;
  patient.phoneNumber = patient.user.data.phoneNumber ? patient.user.data.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : null;
  patient.country = patient.countryId ? patient.countryId : null;
  patient.state = patient.stateId ? patient.stateId : null;
  patient.language = patient.languageId ? patient.languageId : null;
  patient.gender = patient.genderId ? patient.genderId : null;
  patient.contactTime = patient.contactTimeId.length > 0 ? patient.contactTimeId : [];
  patient.contactType = patient.contactType.length > 0 ? patient.contactType : [];
  patient.otherLanguage = patient.otherLanguage.length > 0 ? patient.otherLanguage : [];
  patient.patientDob = patient.dob ? dobFormat(patient.dob) : null;

  state.patientDetails = patient
  state.patientDetails['phoneNumber'] = patient.user.data.patient.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
  state.patientDetails['phoneNumber'] = patient.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
}

export const responsiblePerson = (state, data) => {
  const responsiblePerson = data.map(item => {
    item.gender = item.genderId;
    item.relation = item.relationId;
    item.self = item.self ? true : false;
    item.phoneNumber = data[0].phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    return item
  })

  state.responsiblePerson = responsiblePerson[0]
}

export const emergencyContact = (state, data) => {
  if(data.length>0){
    data[0].contactType = data[0].contactType.length > 0 ? data[0].contactType : [];
  data[0].contactTime = data[0].contactTimeId.length > 0 ? data[0].contactTimeId : [];
  data[0].gender = data[0].genderId;
  data[0].sameAsPrimary = data[0].sameAsPrimary ? true : false;
  state.emergencyContact = data[0]
  }else{
    state.emergencyContact = data
  }
  
}

export const patientTimelineSuccess = (state, timeline) => {
  state.patientTimeline = timeline.data
  state.patientTimelineMeta = timeline.meta.pagination
}

export const patientVitalsTimeline = (state, timeline) => {
  state.patientVitalsTimeline = timeline
}

export const bloodOxygenTimeline = (state, timeline) => {
  state.bloodOxygenTimeline = timeline
}

export const bloodGlucoseTimeline = (state, timeline) => {
  state.bloodGlucoseTimeline = timeline
}

export const bloodPressureTimeline = (state, timeline) => {
  state.bloodPressureTimeline = timeline
}

export const addCondition = (state, data) => {
  state.addCondition = data
}

export const addPatientReferals = (state, data) => {
  state.addPatientReferals = data

  state.editPatientReferral = [{
    value:data.id,
    label:data.name
  }]
}

export const addPatientPhysician = (state, data) => {
  state.addPatientPhysician = data
}

export const patientDocumentsSuccess = (state, documents) => {
  state.patientDocuments = documents.map(data => {
    data.createdAt = meridiemFormatFromTimestamp(data.createdAt);
    return data;
  })
}

export const patientConditions = (state, conditions) => {
  state.patientConditions = conditions.map(condition => {
    condition.condition = condition.conditionCode+'-'+condition.conditionDescription
    condition.startDate = condition.startDate ? dateOnlyFormat(condition.startDate) : ""
    condition.endDate = condition.endDate ? dateOnlyFormat(condition.endDate) : ""
    return condition;
  })
  // state.patientConditions = conditions
  state.conditionsList = conditions
  state.latestCondition = conditions[0]
}

export const isConditionEdit = (state, data) => {
  state.isConditionEdit = data
}

export const conditionDetails = (state, condition) => { 
  condition.condition = condition.conditionId
  condition.startDate = condition.startDate ? dateOnlyFormatSImple(condition.startDate) : ""
  condition.endDate = condition.endDate ? dateOnlyFormatSImple(condition.endDate) : ""
  state.conditionDetails = condition

  state.editConditionDetails=[{
    value:condition.conditionId,
    label:condition.conditionCode+' - '+condition.conditionDescription
  }]
}

export const patientReferralSource = (state, referralSource) => {
  if (referralSource) {
    referralSource.referralDesignation = referralSource.referralDesignationId;
    state.patientReferralSource = referralSource;
  }
}

export const patientPrimaryPhysician = (state, primaryPhysician) => {
  primaryPhysician.staff = primaryPhysician.staffId
  state.patientPrimaryPhysician = primaryPhysician
}

export const isEditPatient = (state, data) => {
  state.isEditPatient = data
}

export const deleteDocument = (state, data) => {
  state.deleteDocument = data
}
export const latestDocumentSuccess = (state, data) => {
  if (data && data.length > 0) {
    state.latestDocument = data
  }
  else {
    state.latestDocument = null
  }
}

export const latestDeviceSuccess = (state, data) => {
  if (data && data.length > 0) {
    state.latestDevice = data
  }
  else {
    state.latestDevice = null
  }
}

export const latestVital = (state, data) => {
  if (data && data.length > 0) {
    data[0].takeTime = dateTimeFormat(data[0].takeTime)
    state.latestVital = data[0]
  }
  else {
    state.latestVital = null
  }
}

export const errorMsg = (state, data) => {
  state.errorMsg = data
}

export const referralErrorMsg = (state, data) => {
  state.referralErrorMsg = data
}

export const physicianErrorMsg = (state, data) => {
  state.physicianErrorMsg = data
}

export const emergencyErrorMsg = (state, data) => {
  state.emergencyErrorMsg = data
}

export const closeModal = (state, data) => {
  state.closeModal = data
}






export const patientSearchWithBitrix = (state, data) => {
  // state.patientSearchWithBitrix = data.filter(item=>item.CONTACT_ID),
  state.patientSearchWithBitrix = data,
    state.patientSearchWithBitrixCols = [
      {
        title: "Title",
        dataIndex: "TITLE",
      },
      {
        title: "Type",
        dataIndex: "TYPE_ID",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "action",
        },
      },
    ];
}



export const getBitrixFieldsName = (state, data) => {
  state.getBitrixFieldsName = data
}


export const bitrixFormCheck = (state, data) => {
  state.bitrixFormCheck = data
}


export const fetchFromBitrix = (state, data) => {
  // console.log('data',data)
  // let email = arrayToObjact(data.EMAIL)
  // let phone = arrayToObjact(data.PHONE)
  state.fetchFromBitrixStatus = true
  state.fetchFromBitrix = {
    id:'',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
    gender: "",
    language: "",
    otherLanguage: [],
    nickName: "",
    weight: "",
    height: "",
    contactType: [],
    contactTime: "",
    medicalRecordNumber: "",
    country: 19,
    state: "",
    city: "",
    zipCode: "",
    appartment: "",
    address: "",
    fullName: "",
    familyEmail: "",
    familyPhoneNumber: "",
    familyContactType: [],
    familyContactTime: "",
    familyGender: "",
    relation: "",
    emergencyFullName: "",
    emergencyEmail: "",
    emergencyPhoneNumber: "",
    emergencyContactType: [],
    emergencyContactTime: "",
    emergencyGender: "",
    sameAsPrimary: false,
    isPrimary: true,
    responsiblePersonId: '',
    emergencyId: '',
  }

  state.fetchFromBitrixInsurance = {
    insuranceNumber:[],
    insuranceName:[]
  }
  state.getBitrixFieldsName.map(item => {
    if (item.patientId == "bitrix") {
      state.fetchFromBitrix.id = data[item.bitrixId]
    }
    if (item.patientId == "firstName") {
      state.fetchFromBitrix.firstName = data[item.bitrixId]
    }
    if (item.patientId == "lastName") {
      state.fetchFromBitrix.lastName = data[item.bitrixId]
    }
    if (item.patientId == "dob") {
      state.fetchFromBitrix.dob = data[item.bitrixId] ? dobFormat2(data[item.bitrixId]) : ''
    }
    if (item.patientId == "email") {
      state.fetchFromBitrix.email = data[item.bitrixId]
    }
    if (item.patientId == "phoneNumber") {
      state.fetchFromBitrix.phoneNumber = data[item.bitrixId]
    }
    if (item.patientId == "gender") {
      state.fetchFromBitrix.gender = data[item.bitrixId]
    }
    if (item.patientId == "language") {
      state.fetchFromBitrix.language = data[item.bitrixId]
    }
    if (item.patientId == "otherLanguage") {
      state.fetchFromBitrix.otherLanguage = data[item.bitrixId]
    }
    if (item.patientId == "nickName") {
      state.fetchFromBitrix.nickName = data[item.bitrixId]
    }
    if (item.patientId == "weight") {
      state.fetchFromBitrix.weight = data[item.bitrixId]
    }
    if (item.patientId == "height") {
      state.fetchFromBitrix.height = data[item.bitrixId]
    }
    if (item.patientId == "contactType") {
      state.fetchFromBitrix.contactType = data[item.bitrixId]
    }
    if (item.patientId == "contactTime") {
      state.fetchFromBitrix.contactTime = data[item.bitrixId]
    }
    if (item.patientId == "medicalRecordNumber") {
      state.fetchFromBitrix.medicalRecordNumber = data[item.bitrixId]
    }
    if (item.patientId == "country") {
      state.fetchFromBitrix.country = data[item.bitrixId]
    }
    if (item.patientId == "state") {
      state.fetchFromBitrix.state = data[item.bitrixId]
    }
    if (item.patientId == "city") {
      state.fetchFromBitrix.city = data[item.bitrixId]
    }
    if (item.patientId == "zipCode") {
      state.fetchFromBitrix.zipCode = data[item.bitrixId]
    }
    if (item.patientId == "appartment") {
      state.fetchFromBitrix.appartment = data[item.bitrixId]
    }
    if (item.patientId == "address") {
      state.fetchFromBitrix.address = data[item.bitrixId]
    }
    if (item.patientId == "fullName") {
      state.fetchFromBitrix.fullName = data[item.bitrixId]
    }
    if (item.patientId == "familyEmail") {
      state.fetchFromBitrix.familyEmail = data[item.bitrixId]
    }
    if (item.patientId == "familyPhoneNumber") {
      state.fetchFromBitrix.familyPhoneNumber = data[item.bitrixId]
    }
    if (item.patientId == "familyContactType") {
      state.fetchFromBitrix.familyContactType = data[item.bitrixId]
    }
    if (item.patientId == "familyContactTime") {
      state.fetchFromBitrix.familyContactTime = data[item.bitrixId]
    }
    if (item.patientId == "familyGender") {
      state.fetchFromBitrix.familyGender = data[item.bitrixId]
    }

    if (item.patientId == "relation") {
      state.fetchFromBitrix.relation = data[item.bitrixId]
    }
    if (item.patientId == "emergencyFullName") {
      state.fetchFromBitrix.emergencyFullName = data[item.bitrixId]
    }
    if (item.patientId == "emergencyEmail") {
      state.fetchFromBitrix.emergencyEmail = data[item.bitrixId]
    }
    if (item.patientId == "emergencyPhoneNumber") {
      state.fetchFromBitrix.emergencyPhoneNumber = data[item.bitrixId]
    }
    if (item.patientId == "emergencyContactType") {
      state.fetchFromBitrix.emergencyContactType = data[item.bitrixId]
    }
    if (item.patientId == "emergencyContactTime") {
      state.fetchFromBitrix.emergencyContactTime = data[item.bitrixId]
    }
    if (item.patientId == "emergencyGender") {
      state.fetchFromBitrix.emergencyGender = data[item.bitrixId]
    }
    if (item.patientId == "sameAsPrimary") {
      state.fetchFromBitrix.sameAsPrimary = data[item.bitrixId]
    }
    if (item.patientId == "isPrimary") {
      state.fetchFromBitrix.isPrimary = data[item.bitrixId]
    }
    if (item.patientId == "responsiblePersonId") {
      state.fetchFromBitrix.responsiblePersonId = data[item.bitrixId]
    }
    if (item.patientId == "emergencyId") {
      state.fetchFromBitrix.emergencyId = data[item.bitrixId]
    }


    if (item.patientId == "insuranceNumber") {
      state.fetchFromBitrixInsurance.insuranceNumber.push(data[item.bitrixId])
    }
    if (item.patientId == "insuranceName") {
      state.fetchFromBitrixInsurance.insuranceName.push(data[item.bitrixId])
    }
    if (item.patientId == "secondaryInsuranceNumber") {
      state.fetchFromBitrixInsurance.insuranceNumber.push(data[item.bitrixId])
    }
    if (item.patientId == "secondaryInsuranceName") {
      state.fetchFromBitrixInsurance.insuranceName.push(data[item.bitrixId])
    }
  })
}

export const patientFlags = (state, count) => {
  const data = count.flags
  state.grids = {
    xlGrid: parseInt(24 / data.length),
    smGrid: parseInt(24 / parseInt(data.length / 2))
  }
	state.patientFlags = count.data
}

export const patientVitals = (state, vitals) => {
  var timeArray = [];
  var vitalFieldsArray = [];
  var vitalsArray = [];
  if (vitals && (vitals.length > 0 || vitals != null)) {
    vitals.map(vital => {
      vitalsArray.push({
        id: vital.id,
        takeTime: vital.takeTime,
        vitalField: vital.vitalField,
        deviceType: vital.deviceType,
        value: vital.value,
        color: vital.color,
      })
      if (!timeArray.includes(vital.takeTime)) {
        timeArray.push(vital.takeTime);
      }
      if (!vitalFieldsArray.includes(vital.vitalField)) {
        vitalFieldsArray.push(vital.vitalField);
      }
    })
    const convertedResponse = convertResponse(timeArray, vitalsArray)
    const patientVitals = convertData(convertedResponse)
    const patientGraphData = convertChartResponse(vitalFieldsArray, vitalsArray)
    // console.log('vitals.length', patientGraphData)

    vitalsArray.forEach(vital => {
      switch (vital.deviceType) {
        case 'Blood Pressure':
          state.bloodPressure = patientVitals.length > 0 ? patientVitals : null;
          state.bloodPressureGraph = patientGraphData;
          break;
        case 'Oximeter':
          state.bloodOxygen = patientVitals.length > 0 ? patientVitals : null;
          state.bloodOxygenGraph = patientGraphData;
          break;
        case 'Glucose':
          state.bloodGlucose = patientVitals.length > 0 ? patientVitals : null;
          state.bloodGlucoseGraph = patientGraphData;
          break;
        default:
          break;
      }
    });

    // const dynamicColumns = createDynamicColumns(vitalsArray)
    // if(dynamicColumns.tableName === 'Blood Pressure') {
    //   state.bloodPressureColumns = dynamicColumns;
    // }
    // else {
    state.bloodPressureColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
        slots: {
          customRender: "takeTime",
        },
      },
      {
        title: "Systolic",
        dataIndex: "blood_pressure_systolic",
        key: "blood_pressure_systolic",
        slots: {
          customRender: "blood_pressure_systolic",
        },
      },
      {
        title: "Diastolic",
        dataIndex: "blood_pressure_diastolic",
        key: "blood_pressure_diastolic",
        slots: {
          customRender: "blood_pressure_diastolic",
        },
      },
      {
        title: "BPM",
        dataIndex: "blood_pressure_bpm",
        key: "blood_pressure_bpm",
        slots: {
          customRender: "blood_pressure_bpm",
        },
      },
    ];
    // }
    // if(dynamicColumns.tableName === 'Oximeter') {
    //   state.bloodOxygenColumns = dynamicColumns;
    // }
    // else {
    state.bloodOxygenColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
        slots: {
          customRender: "takeTime",
        },
      },
      {
        title: "SPO2",
        dataIndex: "oximeter_spo2",
        key: "oximeter_spo2",
        slots: {
          customRender: "oximeter_spo2",
        },
      },
      {
        title: "BPM",
        dataIndex: "oximeter_bpm",
        key: "oximeter_bpm",
        slots: {
          customRender: "oximeter_bpm",
        },
      },
    ];
    // }
    // if(dynamicColumns.tableName === 'Glucose') {
    //   state.bloodGlucoseColumns = dynamicColumns;
    // }
    // else {
    state.bloodGlucoseColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
        slots: {
          customRender: "takeTime",
        },
      },
      {
        title: "Random Blood Sugar",
        dataIndex: "glucose_random_blood_sugar",
        key: "glucose_random_blood_sugar",
        slots: {
          customRender: "glucose_random_blood_sugar",
        },
      },
      {
        title: "Fasting Blood Sugar",
        dataIndex: "glucose_fasting_blood_sugar",
        key: "glucose_fasting_blood_sugar",
        slots: {
          customRender: "glucose_fasting_blood_sugar",
        },
      },
      {
        title: "Fasting",
        dataIndex: "glucose_fasting",
        key: "glucose_fasting",
        slots: {
          customRender: "glucose_fasting",
        },
      },
      {
        title: "Pre Meal",
        dataIndex: "glucose_pre_meal",
        key: "glucose_pre_meal",
        slots: {
          customRender: "glucose_pre_meal",
        },
      },
      {
        title: "Post Meal",
        dataIndex: "glucose_post_meal",
        key: "glucose_post_meal",
        slots: {
          customRender: "glucose_post_meal",
        },
      },
      {
        title: "Before Sleep",
        dataIndex: "glucose_before_sleep",
        key: "glucose_before_sleep",
        slots: {
          customRender: "glucose_before_sleep",
        },
      },
      {
        title: "General",
        dataIndex: "glucose_general",
        key: "glucose_general",
        slots: {
          customRender: "glucose_general",
        },
      },
    ];
    // }
  }
  else {
    state.bloodPressure = null;
    state.bloodPressureGraph = null;
    state.bloodOxygen = null;
    state.bloodOxygenGraph = null;
    state.bloodGlucose = null;
    state.bloodGlucoseGraph = null;
    // state.bloodPressureColumns = null;
    // state.bloodOxygenColumns = null;
    // state.bloodGlucoseColumns = null;
  }
}



export const addCriticalNote = (state, data) => {
  state.addCriticalNote = data
  state.closeModal = true
}

export const patientCriticalNotes = (state, data) => {
  state.patientCriticalNotes = data
}

export const criticalNotesList = (state, data) => {
  state.criticalNotesList = data
}

export const latestCriticalNote = (state, data) => {
  state.latestCriticalNote = data[0]
}

export const familyMembersList = (state, responsiblePersons) => {
  state.familyMembersList = responsiblePersons.map(member => {
    member.isPrimary = member.isPrimary ? 'Yes' : 'No'
    member.contactType = member.contactType ? JSON.parse(member.contactType) : []
    member.contactTime = member.contactTimeId ? JSON.parse(member.contactTimeId) : []
    return member
  })
}

export const familyMemberDetails = (state, responsiblePerson) => {
  if(responsiblePerson) {
    responsiblePerson.familyEmail = responsiblePerson.email
    responsiblePerson.familyPhoneNumber = responsiblePerson.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    responsiblePerson.familyContactType = responsiblePerson.contactType ? JSON.parse(responsiblePerson.contactType) : []
    responsiblePerson.familyContactTime = responsiblePerson.contactTimeId ? JSON.parse(responsiblePerson.contactTimeId) : []
    responsiblePerson.familyGender = responsiblePerson.genderId
    responsiblePerson.relation = responsiblePerson.relationId
    responsiblePerson.isPrimary = responsiblePerson.isPrimary ? true : false
  }
  state.familyMemberDetails = responsiblePerson
}

export const physiciansList = (state, physicians) => {
  state.physiciansList = physicians
}

export const physicianDetails = (state, physician) => {
  physician.designation = physician.designationId
  state.physicianDetails = physician
}

export const emergencyContactsList = (state, emergencyContacts) => {
  state.emergencyContactsList = emergencyContacts.map(contact => {
    contact.isPrimary = contact.isPrimary ? 'Yes' : 'No'
    contact.email = contact.emergencyEmail
    contact.phoneNumber = contact.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    contact.contactType = contact.contactType ? JSON.parse(contact.contactType) : []
    contact.contactTime = contact.contactTimeId ? JSON.parse(contact.contactTimeId) : []
    return contact
  })
}

export const emergencyContactDetails = (state, emergencyContact) => {
  emergencyContact.isPrimary = emergencyContact.isPrimary ? 'Yes' : 'No'
  emergencyContact.gender = emergencyContact.genderId
  emergencyContact.email = emergencyContact.emergencyEmail
  emergencyContact.phoneNumber = emergencyContact.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
  emergencyContact.contactType = emergencyContact.contactType ? JSON.parse(emergencyContact.contactType) : []
  emergencyContact.contactTime = emergencyContact.contactTimeId ? JSON.parse(emergencyContact.contactTimeId) : []
  state.emergencyContactDetails = emergencyContact
}

export const timeLineType = (state, data) => {
  state.timeLineType = data
}

export const programDetails = (state, data) => {
  const format = 'YYYY-MM-DD';
  data.program = data.programId
  data.onboardingScheduleDate = data.onboardingScheduleDate ? timestampToDate(data.onboardingScheduleDate, format) : ""
  data.dischargeDate = data.dischargeDate ? timestampToDate(data.dischargeDate, format) : ""
  state.programDetails = data
}

export const medicalHistoryDetails = (state, data) => {
  state.medicalHistoryDetails = data
}

export const medicationDetails = (state, data) => {
  const format = 'YYYY-MM-DD';
  data.startDate = timestampToDate(data.startDate, format)
  data.endDate = timestampToDate(data.endDate, format)
  state.medicationDetails = data
}

export const documentDetails = (state, data) => {
  const tags = []
  data.tag.map(tag => {
    tags.push(tag.tagId)
  })
  data.tags = tags
  data.document = data.path
  data.type = data.typeId
  // data.documentPath = data.path.split('/')[5]
  state.documentDetails = data
}

export const isPicuteLoading = (state, data) => {
  state.isPicuteLoading = data
}


export const patientVitalList = (state, data) => {
  state.patientVitalList = data.map((item) => {
		item.startTime = item.startTime?dateAndTimeFormate(item.startTime,globalDateFormat):'';
    item.endTime = item.endTime?dateAndTimeFormate(item.endTime,globalDateFormat):'';
		return item;
	})
}

export const referralList = (state, data) => {
  state.referralList = data
}
export const referralDetail = (state, data) => {
  state.referralDetail = data
}

export const startOn = (state, data) => {
  state.startOn = data
}

export const criticalNoteDetails = (state, data) => {
  state.criticalNoteDetails = data
}

export const healthConditions = (state, data) => {
  state.healthConditions = data.map(item => {
    item.name = item.code+' - '+item.description
    return item
  })
}

export const showPatientDetailsModal = (state) => {
  state.visiblePatientDetailsModal = true
}

export const closePatientDetailsModal = (state) => {
  state.visiblePatientDetailsModal = false
}

export const patientUdid = (state,data) => {
  state.patientUdid = data
}
