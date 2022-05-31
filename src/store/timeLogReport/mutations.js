import { secondsToTime,dateAndTimeFormate } from '../../commonMethods/commonMethod';

export const timelineReport = (state, data) => {

  state.timelineReport = data
}
export const timeLogReportList = async (state, data) => {
  state.timeLogeMeta = data.meta.pagination
  state.timeLogReportColumns = [
    {
      title: "Care Coordinator",
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
      sorter:true,
      align: 'right'
    },
    {
      title: "Category", 
      dataIndex: "category",
      ellipsis: true,
    },

    {
      title: "CPT Codes ",
      dataIndex: "cptCode",
    },
    {
      title: "Amount ",
      dataIndex: "billingAmount",
      align: 'right'
    },
    {
      title: "Flag",
      dataIndex: "flagColor",
      slots: {
        customRender: "flags",
      },
    },
    
    {
      title: "Notes", 
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
    item.billingAmount = item.billingAmount ?'$ ' + item.billingAmount :''
    item.date = dateAndTimeFormate(item.date,'MMM DD, yyyy')
    return item
  })
    
}
export const timeLogView = async (state, data) => {
  //state.auditMetaLog= data.meta.pagination
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
  state.timeLogView = data.data.map(item => {
    item.timeAmount = secondsToTime(item.timeAmount)
    return item
  })
 
    
}
export const reportExport = (state, data) => {
  state.reportExport = data
}
export const editAuditTimeLog = async (state, data) => {
  data.flag = data.flagId
  data.timeAmount = secondsToTime(data.timeAmount)
  state.editAuditTimeLog = data
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