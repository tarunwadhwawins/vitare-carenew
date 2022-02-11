import { yaxis, dataLabels, plotOptions, annotations, dateFormat, timeOnly, meridiemFormat } from '../../commonMethods/commonMethod'
export const callPlannedSuccess = (state, count) => {
  state.callPlanned = {
    calloption: {
      annotations: annotations("In",0,"#775DD0",0,"#fff","#775DD0"),
      chart: {
        type: "bar",
      },
      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
      colors: ["#269b8f", "#269b8f", "#121258", "#218421"],
      
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: count.map((item) => { return item.staff }),
      },
      yaxis: yaxis("Number of Calls"),
    },
    callseries: [
      {
        name: "Calls Planned",
        data:  count.map((item) => {return item.count }),
      },
    ]
  }
}

export const communicationTypesSuccess = (state, response) => {
  var timesArray = [];
  /* const res = response.map(data => {
    data.time = timeOnly(data.time);
    return data
  }) */
  const record = response.sort(function(a, b) {
    return a.time - b.time
  })
  record.forEach(element => {
    if (!timesArray.includes(element.time)) {
      timesArray.push(element.time)
    }
  });
  var timeList = [];
  var callSeries = [];
  if(record.length > 0) {
    var array_list = [];
    var array_list_final = [];
    record.forEach(function(value) {
      if(typeof array_list[value.text] === 'undefined') {
        array_list[value.text] = [];
      }
      array_list[value.text].push(value);
    });
    for (const key in array_list) {
      var array_value = [];
      array_value['text']=key;
      array_value['data']=array_list[key];
      array_list_final.push(array_value);
    }
    for (const key in array_list_final) {
      for (const key_next in array_list_final) {
        if(key != key_next){
          for (const key_data in array_list_final[key].data){
            let obj = array_list_final[key_next].data.find(o => o.time === array_list_final[key].data[key_data].time);
            if(typeof obj === 'undefined'){
              let value_obj = {
                "text":array_list_final[key_next].data[0].text,
                "count":0,
                "time":array_list_final[key].data[key_data].time,
              };
              array_list_final[key_next].data.push(value_obj);
            }
          }
          array_list_final[key_next].data = array_list_final[key_next].data.sort(function(a, b) {
            return a.time - b.time;
          });
        }
      }
    }
    const communicationType = array_list_final
    callSeries = communicationType.map((item) => {
      return {
        name: item.text, data: item.data.map((data) => {
          timeList.push(timeOnly(data.time))
          return data.count
        })
      }
    })
  }
  
  state.communicationTypes = {
    calloption: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: dataLabels(false),
      stroke: {
        curve: "straight",
      },
      xaxis: {
        categories: timesArray,
      },
      yaxis: yaxis(''),
    },
    callseries: callSeries,
  }
}

export const communicationsSuccess = async (state, communications) => {
  /* let data = [];
  data = state.communicationsList;
  state.communicationsList = data ? data.push(...communications) : communications; */
  state.communicationsList = communications.map(communication => {
    communication.createdAt = dateFormat(communication.createdAt);
    return communication
  })
}
export const addCommunicationSuccess = async (state, addCommunication) => {
  state.addCommunication = addCommunication;
}
export const patientsListSuccess = async (state, patients) => {
  state.patientsList = patients;
}

export const patientDetailsSuccess = async (state, patient) => {
  state.patientDetails = patient;
}

export const futureAppointmentsSuccess = async (state, futureAppointments) => {
  state.futureAppointments = futureAppointments.map(appointment => {
    appointment.startTime = meridiemFormat(appointment.startTime);
    return appointment
  });
}
export const newRequestsSuccess = async (state, newRequests) => {
  state.newRequests = newRequests.map(appointment => {
    appointment.startTime = meridiemFormat(appointment.startTime);
    return appointment
  });
}
export const communicationsCountSuccess = async (state, count) => {
  state.communicationsCount = count;
}
export const searchCommunicationsSuccess = async (state, result) => {
  state.communicationsList = result;
}