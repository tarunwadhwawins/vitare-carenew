
import {
  meridiemFormatFromTimestamp,
  dateOnlyFormat,
  dateTimeFormat,
  dobFormat,
  dobFormat2,
  // timeFormatSimple
  convertResponse,
  convertData,
  convertChartResponse,
  // createDynamicColumns,
} from '../../commonMethods/commonMethod';
const VUE_APP_ROOT_API = process.env.VUE_APP_ROOT_API

export const addDemographic = (state, data) => {
  state.addDemographic = data
}
export const status = (state, data) => {
  state.status = data
}


export const patient = (state, data) => {
  state.column = [{
    title: "Flags",
    dataIndex: "flags",
    slots: {
      customRender: "flags",
    },
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    slots: {
      customRender: "lastName",
    },
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    slots: {
      customRender: "firstName",
    },
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },

  // {
  //     title: "Date of Readings ",
  //     dataIndex: "lastReadingDate",
  //     sorter: {
  //         compare: (a, b) => a.reading - b.reading,
  //         multiple: 1,
  //     },
  // },

  {
    title: "Readings ",
    dataIndex: "patientVitals",
    sorter: {
      compare: (a, b) => a.readingvalues - b.readingvalues,
      multiple: 1,
    },
    slots: {
      customRender: "patientVitals",
    },
    children: [{
      title: "BP (mmHg)",
      dataIndex: "bp",
      key: "bp",
    },
    {
      title: "Spo2(%)",
      dataIndex: "spo2",
      key: "spo2",
    },
    {
      title: "Glucose (mg / dL)",
      dataIndex: "glucose",
      key: "glucose",
    },
    {
      title: "Weight (LBS)",
      dataIndex: "weight",
      key: "weight",
    },
    ],
  },
  // {
  //     title: "Non Compliant",
  //     dataIndex: "compliance",
  //     sorter: {
  //         compare: (a, b) => a.reading - b.reading,
  //         multiple: 1,
  //     },
  //     filters: [{
  //             text: "Flag",
  //             value: "flag",
  //         },
  //         {
  //             text: "Name",
  //             value: "name",
  //         },
  //         {
  //             text: "Last Reading Date",
  //             value: "readdate",
  //         },
  //         {
  //             text: "Last Reading Value",
  //             value: "readvalue",
  //         },
  //         {
  //             text: "Non Compliance ",
  //             value: "noncompliance",
  //         },
  //         {
  //             text: "Last Message Seen",
  //             value: "messagseen",
  //         },
  //     ],
  //     onFilter: (value, record) => record.name.indexOf(value) === 0,
  // },
  {
    title: "Non Compliant",
    dataIndex: "nonCompliance",
    sorter: {
      compare: (a, b) => a.compliance - b.compliance,
      multiple: 1,
    },
    slots: {
      customRender: "compliance",
    },
  },
  {
    title: "Last Message Sent",
    dataIndex: "lastMessageSent",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 1,
    },
    ellipsis: true,
    // filters: [{
    //         text: "Flag",
    //         value: "flag",
    //     },
    //     {
    //         text: "Name",
    //         value: "name",
    //     },
    //     {
    //         text: "Last Reading Date",
    //         value: "readdate",
    //     },
    //     {
    //         text: "Last Reading Value",
    //         value: "readvalue",
    //     },
    //     {
    //         text: "Non Compliance ",
    //         value: "noncompliance",
    //     },
    //     {
    //         text: "Last Message Seen",
    //         value: "messagseen",
    //     },
    // ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Age ",
    dataIndex: "dob",
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },
  {
    title: "Sex ",
    dataIndex: "gender",
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  }
  ];
  state.patientMeta = data.meta.pagination;
  state.patientList = data.data
    .map(element => {
      element.flags = element.patientFlags.data[0] ? element.patientFlags.data[0].flags.data.color : '',
        element.lastName = element.lastName ? element.lastName : '',
        element.firstName = element.name ? element.name : '',
        element.lastReadingDate = element.lastReadingDate ? element.lastReadingDate : '',
        element.weight = element.weight ? element.weight : '',
        element.bp = element.patientVitals.data.map(vitalData => { if (vitalData.vitalField == 'Systolic') { return JSON.parse(vitalData.value) } if (vitalData.vitalField == 'Diastolic') { return '/' + JSON.parse(vitalData.value) } }),
        element.spo2 = element.patientVitals.data.map(vitalData => { if (vitalData.vitalField == 'SPO2') { return JSON.parse(vitalData.value) } }),
        element.glucose = element.patientVitals.data.map(vitalData => { if (vitalData.vitalField == 'Random Blood Sugar') { return JSON.parse(vitalData.value) } }),
        element.dob = Math.floor((new Date() - new Date(element.dob).getTime()) / 3.15576e+10) > 0 ? Math.floor((new Date() - new Date(element.dob).getTime()) / 3.15576e+10) : 1
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
  state.program = data.map(element => {
    element.onboardingScheduleDate = dateOnlyFormat(element.onboardingScheduleDate),
      element.dischargeDate = dateOnlyFormat(element.dischargeDate)
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
  // console.log('deviceData 2', devices)
  // var list = [];
  // data.map(item => {
  //   list = []
  //   devices.map(device => {
  //     // if(item.modelNumber == device.modelNumber) {
  //       if(item.macAddress != device.macAddress) {
  //         console.log('deviceData 3', item)
  //         list.push(item)
  //       }
  //     // }
  //     // else {
  //     //   console.log('deviceData 4', item)
  //     //   list.push(item)
  //     // }
  //   })
  // })
  // console.log('deviceData 5', list)
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
      title: "Serial No",
      dataIndex: "serialNumber",
    },
    {
      title: "MAC Address",
      dataIndex: "macAddress",
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
  state.documents = data.map(item => {
    item.document = VUE_APP_ROOT_API + item.document
    return item
  })
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

export const patientDetailsSuccess = (state, patient) => {
  
  patient.email = patient.user.data.email ? patient.user.data.email : null;
  patient.country = patient.countryId ? patient.countryId : null;
  patient.state = patient.stateId ? patient.stateId : null;
  patient.language = patient.languageId ? patient.languageId : null;
  patient.gender = patient.genderId ? patient.genderId : null;
  patient.contactTime = patient.contactTimeId.length > 0 ? JSON.parse(patient.contactTimeId) : [];
  patient.contactType = patient.contactType.length > 0 ? JSON.parse(patient.contactType) : [];
  patient.otherLanguage = patient.otherLanguage.length > 0 ? JSON.parse(patient.otherLanguage) : [];
  patient.dob = patient.dob ? dobFormat(patient.dob) : null;
  
  if(patient.patientFamilyMember && patient.patientFamilyMember.data) {
    patient.fullName = patient.patientFamilyMember.data.fullName ? patient.patientFamilyMember.data.fullName : null;
    patient.familyEmail = patient.patientFamilyMember.data.email ? patient.patientFamilyMember.data.email : null;
    patient.familyPhoneNumber = patient.patientFamilyMember.data.phoneNumber ? patient.patientFamilyMember.data.phoneNumber : null;
    patient.familyContactType = patient.patientFamilyMember.data.contactType.length > 0 ? JSON.parse(patient.patientFamilyMember.data.contactType) : [];
    patient.familyContactTime = patient.patientFamilyMember.data.contactTimeId.length > 0 ? JSON.parse(patient.patientFamilyMember.data.contactTimeId) : [];
    patient.familyGender = patient.patientFamilyMember.data.genderId;
    patient.relation = patient.patientFamilyMember.data.relationId;
  }
  else {
    patient.fullName = null;
    patient.familyEmail = null;
    patient.familyPhoneNumber = null;
    patient.familyContactType = [];
    patient.familyContactTime = [];
    patient.familyGender = null;
    patient.relation = null;
  }
  
  if(patient.emergencyContact && patient.emergencyContact.data) {
    patient.emergencyFullName = patient.emergencyContact.data.fullName ? patient.emergencyContact.data.fullName : null;
    patient.emergencyEmail = patient.emergencyContact.data.email ? patient.emergencyContact.data.email : null;
    patient.emergencyPhoneNumber = patient.emergencyContact.data.phoneNumber ? patient.emergencyContact.data.phoneNumber : null;
    patient.emergencyContactType = patient.emergencyContact.data.contactType.length > 0 ? JSON.parse(patient.emergencyContact.data.contactType) : [];
    patient.emergencyContactTime = patient.emergencyContact.data.contactTimeId.length > 0 ? JSON.parse(patient.emergencyContact.data.contactTimeId) : [];
    patient.isPrimary = patient.patientFamilyMember.data.fullName == patient.emergencyContact.data.fullName ? true : false;
    patient.emergencyGender = patient.emergencyContact.data.genderId;
  }
  else {
    patient.emergencyFullName = null;
    patient.emergencyEmail = null;
    patient.emergencyPhoneNumber = null;
    patient.emergencyContactType = [];
    patient.emergencyContactTime = [];
    patient.isPrimary = null;
    patient.emergencyGender = null;
  }
  console.log('In Console patient', patient)
  state.patientDetails = patient
}

export const patientTimelineSuccess = (state, timeline) => {
  state.patientTimeline = timeline.map(data => {
    data.createdAt = meridiemFormatFromTimestamp(data.createdAt);
    return data;
  })
}

export const patientDocumentsSuccess = (state, documents) => {
  state.patientDocuments = documents.map(data => {
    data.document = VUE_APP_ROOT_API + data.document
    data.createdAt = meridiemFormatFromTimestamp(data.createdAt);
    return data;
  })
}

export const patientConditions = (state, conditions) => {
  state.patientConditions = conditions.map(condition => {
    condition = condition.conditionId
    return condition;
  })
}

export const patientReferralSource = (state, referralSource) => {
  if (referralSource) {
    referralSource.referralDesignation = referralSource.referralDesignationId;
  }
  state.patientReferralSource = referralSource;
}

export const patientPrimaryPhysician = (state, primaryPhysician) => {
  if (primaryPhysician) {
    primaryPhysician.sameAsAbove = primaryPhysician.sameAsReferal;
    primaryPhysician.designation = primaryPhysician.designationId;
  }
  state.patientPrimaryPhysician = primaryPhysician;
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


export const fetchFromBitrix = (state, data) => {
  // let email = arrayToObjact(data.EMAIL)
  // let phone = arrayToObjact(data.PHONE)
  state.fetchFromBitrixStatus = true
  state.fetchFromBitrix = {
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
    familyMemberId: '',
    emergencyId: '',
  }
  state.getBitrixFieldsName.map(item => {
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
    if (item.patientId == "familyMemberId") {
      state.fetchFromBitrix.familyMemberId = data[item.bitrixId]
    }
    if (item.patientId == "emergencyId") {
      state.fetchFromBitrix.emergencyId = data[item.bitrixId]
    }
  })
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

    vitalsArray.forEach(vital => {
      switch (vital.deviceType) {
        case 'Blood Pressure':
          state.bloodPressure = patientVitals;
          state.bloodPressureGraph = patientGraphData;
          break;
        case 'Oximeter':
          state.bloodOxygen = patientVitals;
          state.bloodOxygenGraph = patientGraphData;
          break;
        case 'Glucose':
          state.bloodGlucose = patientVitals;
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
        dataIndex: "oxymeter_spo2",
        key: "oxymeter_spo2",
        slots: {
          customRender: "oxymeter_spo2",
        },
      },
      {
        title: "BPM",
        dataIndex: "oxymeter_bpm",
        key: "oxymeter_bpm",
        slots: {
          customRender: "oxymeter_bpm",
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
    ];
    // }
    // console.log('state.bloodPressureColumns', state.bloodPressureColumns)
    // console.log('state.bloodOxygenColumns', state.bloodOxygenColumns)
    // console.log('state.bloodGlucoseColumns', state.bloodGlucoseColumns)
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

export const familyMembersList = (state, familyMembers) => {
  state.familyMembersList = familyMembers.map(member => {
    member.isPrimary = member.isPrimary ? 'Yes' : 'No'
    member.contactType = member.contactType ? JSON.parse(member.contactType) : []
    member.contactTime = member.contactTimeId ? JSON.parse(member.contactTimeId) : []
    return member
  })
}

export const familyMemberDetails = (state, familyMember) => {
  if(familyMember) {
    familyMember.familyEmail = familyMember.email
    familyMember.familyPhoneNumber = familyMember.phoneNumber
    familyMember.familyContactType = familyMember.contactType ? JSON.parse(familyMember.contactType) : []
    familyMember.familyContactTime = familyMember.contactTimeId ? JSON.parse(familyMember.contactTimeId) : []
    familyMember.familyGender = familyMember.genderId
    familyMember.relation = familyMember.relationId
    familyMember.isPrimary = familyMember.isPrimary ? true : false
  }
  state.familyMemberDetails = familyMember
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
    contact.contactType = contact.contactType ? JSON.parse(contact.contactType) : []
    contact.contactTime = contact.contactTimeId ? JSON.parse(contact.contactTimeId) : []
    return contact
  })
}

export const emergencyContactDetails = (state, emergencyContact) => {
  emergencyContact.isPrimary = emergencyContact.isPrimary ? 'Yes' : 'No'
  emergencyContact.gender = emergencyContact.genderId
  emergencyContact.email = emergencyContact.emergencyEmail
  emergencyContact.contactType = emergencyContact.contactType ? JSON.parse(emergencyContact.contactType) : []
  emergencyContact.contactTime = emergencyContact.contactTimeId ? JSON.parse(emergencyContact.contactTimeId) : []
  state.emergencyContactDetails = emergencyContact
}
