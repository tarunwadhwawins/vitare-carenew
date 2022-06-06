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
            customRender: "patient",
          },
        },
        {
          title: "Date & Time ",
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
  state.staffSummaryMeta = data.meta.pagination;
    state.staffSummaryPatient = data.data.map(element => {
     
        element.flags = element.flagColor?element.flagColor:'',
        element.lastName=element.lastName?element.lastName :'',
        element.firstName=element.name?element.name+' '+element.lastName :'' 
        element.lastReadingDate=element.lastReadingDate?element.lastReadingDate:''
        element.weight=element.weight?element.weight:''
        element.bp = element.patientVitals.length>0?element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='Systolic'){return JSON.parse(vitalData.value)}if(vitalData.vitalField=='Diastolic'){return '/'+JSON.parse(vitalData.value)}}):''
        element.spo2 = element.patientVitals.length>0?element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='SPO2'){return JSON.parse(vitalData.value)}}):'',
        element.glucose = element.patientVitals.length>0?element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='Random Blood Sugar'){return JSON.parse(vitalData.value)}}):'',
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
          dataIndex: "fullName",
          width: '15%',
          sorter:true,
          slots: {
            customRender: "fullName",
          },
        },
        {
          title: "Age",
          dataIndex: "age",
          width: '8%',
          align: 'right',
          sorter: true,
        },
        {
          title: "Gender",
          dataIndex: "genderName",
          sorter: true,
        },
        {
          title: "Last Reading Date",
          dataIndex: "lastReadingDate",
          
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