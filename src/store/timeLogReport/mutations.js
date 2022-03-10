import { secondsToTime } from '../../commonMethods/commonMethod';


export const timeLogReportList = async (state, data) => {
  state.timeLogeMeta = data.meta.pagination
  state.timeLogReportList = data.data.map(item => {
    item.timeAmount = secondsToTime(item.timeAmount)
    return item
  }),
    state.timeLogReportColumns = [
      {
        title: "Staff",
        dataIndex: "performedBy",
        sorter: {
          compare: (a, b) => a.template - b.template,
          multiple: 3,
        },
        slots: {
          customRender: "staff",
        },
      },
      {
        title: "Patient",
        dataIndex: "patient",
        sorter: {
          compare: (a, b) => a.template - b.template,
          multiple: 3,
        },
        slots: {
          customRender: "patient",
        },
      },
      {
        title: "Time (MM:SS)",
        dataIndex: "timeAmount",
        sorter: {
          compare: (a, b) => a.template - b.template,
          multiple: 3,
        },
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