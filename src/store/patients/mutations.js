
export const addDemographic = (state, data) => {
    state.addDemographic = data
 }
 export const status = (state, data) => {
    state.status = data
 }
 

 export const patients = (state, data) => {
    // state.patientList = data;
     data.forEach(element => {
         state.patientList.push({
            flags:element.patientFlags.data[0]?element.patientFlags.data[0].flags.data.color:'',
            firstName:element.firstName?element.firstName:'',
            lastReadingDate:element.lastReadingDate?element.lastReadingDate:'',
            weight:element.weight?element.weight:'',
            //  reading: "",
            //  compliance: "",
            //  message: "",
            //  readingvalues: "",
            //  sp02: "",
            //  bp: "",
            //  glucose: "",
            //  active:'',
            })
     });
    
    state.column= [{
        title: "Flags",
        dataIndex: "flags",
        slots: {
            customRender: "flags",
        },
    },
    {
        title: "Name",
        dataIndex: "firstName",
        slots: {
            customRender: "firstName",
        },
        sorter: {
            compare: (a, b) => a.reading - b.reading,
            multiple: 1,
        },
    },
    
    {
        title: "Last Reading Date",
        dataIndex: "lastReadingDate",
        sorter: {
            compare: (a, b) => a.reading - b.reading,
            multiple: 1,
        },
    },
   
    {
        title: "Last Reading Values",
        dataIndex: "readingvalues",
        sorter: {
            compare: (a, b) => a.readingvalues - b.readingvalues,
            multiple: 1,
        },
        slots: {
            customRender: "lastReadingValues",
        },
        children: [{
                title: "BP",
                dataIndex: "bp",
                key: "bp",
            },
            {
                title: "Sp02",
                dataIndex: "sp02",
                key: "sp02",
            },
            {
                title: "Glucose",
                dataIndex: "glucose",
                key: "glucose",
            },
            {
                title: "Weight",
                dataIndex: "weight",
                key: "weight",
            },
        ],
    },
    {
        title: "Non Compliance",
        dataIndex: "compliance",
        sorter: {
            compare: (a, b) => a.reading - b.reading,
            multiple: 1,
        },
        filters: [{
                text: "Flag",
                value: "flag",
            },
            {
                text: "Name",
                value: "name",
            },
            {
                text: "Last Reading Date",
                value: "readdate",
            },
            {
                text: "Last Reading Value",
                value: "readvalue",
            },
            {
                text: "Non Compliance ",
                value: "noncompliance",
            },
            {
                text: "Last Message Seen",
                value: "messagseen",
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
        title: "Non Compliance",
        dataIndex: "compliance",
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
        dataIndex: "message",
        sorter: {
            compare: (a, b) => a.message - b.message,
            multiple: 1,
        },
        filters: [{
                text: "Flag",
                value: "flag",
            },
            {
                text: "Name",
                value: "name",
            },
            {
                text: "Last Reading Date",
                value: "readdate",
            },
            {
                text: "Last Reading Value",
                value: "readvalue",
            },
            {
                text: "Non Compliance ",
                value: "noncompliance",
            },
            {
                text: "Last Message Seen",
                value: "messagseen",
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
];
 }
 
 export const addCondition = (state, data) => {
     state.addCondition = data
  }
  export const updateCondition = (state, data) => {
    state.updateCondition = data
 }
  
  export const addPatientReferals = (state, data) => {
     state.addPatientReferals = data
  }

  export const updatePatientReferals = (state, data) => {
    state.updatePatientReferals = data
 }

  
  export const addPatientPhysician = (state, data) => {
     state.addPatientPhysician = data
  }

  export const updatePatientPhysician = (state, data) => {
    state.updatePatientPhysician = data
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

  export const addProgram = (state, data) => {
    state.addProgram = data
 }


 export const program = (state, data) => {
    state.program = data
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
  state.inventoryList = data
}
 

 

 export const devices = (state, data) => {
    state.devices = data
    state.devicesColumns =[
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
    state.parameterFields = data.map((item)=>{if(item!=null) return item})
 }


 
 
 export const addClinicalHistory = (state, data) => {
    state.addClinicalHistory = data
 }

 export const clinicalHistoryList = (state, data) => {
    state.clinicalHistoryList = data
    state.clinicalHistoryListColumns =  [
        {
          title: "History",
          dataIndex: "history",
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

 
 export const addClinicalMedicat = (state, data) => {
    state.addClinicalMedicat = data
 }

 

 export const clinicalMedicatList = (state, data) => {
    state.clinicalMedicatList = data
    state.clinicalMedicatListColumns=[
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
 


 export const addDocument = (state, data) => {
    state.addDocument = data
 }

 export const documents = (state, data) => {
    state.documents = data
    state.documentColumns=[
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Document",
          dataIndex: "document",
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

  export const errorMsg = (state, data) => {
    state.errorMsg = data
 }