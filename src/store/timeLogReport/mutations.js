import { secondsToTime,dateAndTimeFormate } from '../../commonMethods/commonMethod';


export const timeLogReportList = async (state, data) => {
  state.timeLogeMeta = data.meta.pagination
  state.timeLogReportColumns = [
    {
      title: "Care Coodinator",
      dataIndex: "performedBy",
      sorter: true,
      slots: {
        customRender: "staff",
      },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      sorter: true,
      slots: {
        customRender: "patient",
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter:true
    },
    {
      title: "Time (MM:SS)",
      dataIndex: "timeAmount",
      sorter:true
    },
    {
      title: "CPT Codes ",
      dataIndex: "cptCode",
    },
    
    {
      title: "Notes ", 
      dataIndex: "note",
    },
    
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "actions",
      },
    },
  ];
  state.timeLogReportList = data.data.map(item => {
    item.timeAmount = secondsToTime(item.timeAmount)
    item.date = dateAndTimeFormate(item.date,'MMM DD, yyyy')
    return item
  })
    
}
export const timeLogView = async (state, data) => {

  state.viuewTimeReportModal = [ 
    {
      title: "Change By",
      dataIndex: "createdBy",
    },  
    {
    title: "Time (MM:SS)",
    dataIndex: "timeAmount",
    
  },
  {
    title: "Notes ", 
    dataIndex: "note",
  },]
  state.timeLogView = data.map(item => {
    item.timeAmount = secondsToTime(item.timeAmount)
    return item
  })
    
}
export const reportExport = (state, data) => {
  state.reportExport = data
}
export const editAuditTimeLog = async (state, data) => {
  state.editAuditTimeLog = data
    // data.staff = data.staffId,
    // data.patient = data.patientId
    data.timeAmount = secondsToTime(data.timeAmount)
    return data
}

export const auditTimePermissions = (state, auth) => {
  if (auth == 1) {

    state.auditTimePermissions = [{
      id: 1,
      name: "List Table"
    },
    {
      id: 2,
      name: "Table Action"
    }
  ]
  } else if (auth == 2) {
    state.auditTimePermissions = [{
      id: 1,
      name: "List Table"
    },
    
    ]
  }else{
    state.auditTimePermissions =[]
  }

}
export const auditTimeLogFilterDates = (state, date) => {
state.auditTimeLogFilterDates = date
}