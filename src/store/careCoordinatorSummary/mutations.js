import{meridiemFormatFromTimestamp,dateOnlyFormat} from "../../commonMethods/commonMethod"

export const staffSummary= async (state, data) => {
    state.staffSummary = data;
}

export const staffSummaryAppointment= async (state, data) => {
    state.staffSummaryAppointment = data.map(item=>{
      item.date = dateOnlyFormat(item.date)+' '+meridiemFormatFromTimestamp(item.time)
      return item
    });
    state.staffSummaryAppointmentCols =[
        {
          title: "Patient Name",
          dataIndex: "patient",
          slots: {
            customRender: "patientName",
          },
        },
        {
          title: "Date Time ",
          dataIndex: "date",
        },
        {
          title: "	Appointment Type",
          dataIndex: "appointmentType",
          slots: {
            customRender: "appt",
          },
        },
        // {
        //     title: "Actions",
        //     dataIndex: "actions",
        //     slots: {
        //         customRender: "action",
        //     },
        //   },
      ];
}


export const staffSummaryPatient= async (state, data) => {
    state.staffSummaryPatient = data.map(element => {
        element.flags=element.patientFlags.data[0]?element.patientFlags.data[0].flags.data.color:'',
        element.lastName=element.lastName?element.lastName :'',
        element.firstName=element.name?element.name+' '+element.lastName :'' ,
        element.lastReadingDate=element.lastReadingDate?element.lastReadingDate:'',
        element.weight=element.weight?element.weight:'',
        element.bp = element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='Systolic'){return JSON.parse(vitalData.value)}if(vitalData.vitalField=='Diastolic'){return '/'+JSON.parse(vitalData.value)}}),
        element.spo2 = element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='SPO2'){return JSON.parse(vitalData.value)}}),
        element.glucose = element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='Random Blood Sugar'){return JSON.parse(vitalData.value)}}),
        element.dob = Math.floor((new Date() - new Date(element.dob).getTime()) / 3.15576e+10)>0?Math.floor((new Date() - new Date(element.dob).getTime()) / 3.15576e+10):1
        return element
 })
    state.staffSummaryPatientCols = [
        {
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
            customRender: "name",
          },
        },
        {
          title: "Age",
          dataIndex: "dob",
          sorter: {
            compare: (a, b) => a.age - b.age,
            multiple: 3,
          },
        },
        {
          title: "Sex",
          dataIndex: "gender",
          sorter: {
            compare: (a, b) => a.sex - b.sex,
            multiple: 2,
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
        // {
        //     title: "Actions",
        //     dataIndex: "actions",
        //     slots: {
        //         customRender: "action",
        //     },
        //   },
      ];
}