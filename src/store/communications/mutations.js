
export const callPlannedSuccess = (state, count) => {
  state.callPlanned = {
    calloption: {
      annotations: {
        points: [
          {
            x: "In",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "20%",
          barHeight: "100%",
          distributed: true,
          horizontal: false,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
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
        categories: count.map((item) => {return item.staff}),
      },
      yaxis: {
        title: {
          text: "Number of Calls",
        },
      },
    },
    callseries: [
      {
        name: "Value",
        data:  count.map((item) => {return item.count }),
      },
    ]
  }
}

export const communicationTypesSuccess = (state, response) => {
  if(response.length == 0) {
    var timeList = [];
    var callSeries = [];
  }
  else {
    var array_list = [];
    var array_list_final = [];
    response.forEach(function(value) {
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
  
    const communicationType = array_list_final
    callSeries = communicationType.map((item) => {
      return {
        name: item.text, data: item.data.map((data) => {
          return data.time, data.count
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        categories: timeList,
      },
    },
    callseries: callSeries,
  }
}

export const communicationsSuccess = async (state, communications) => {
  /* let data = [];
  data = state.communicationsList;
  state.communicationsList = data ? data.push(...communications) : communications; */
  state.communicationsList = communications;
}
export const addCommunicationSuccess = async (state, addCommunication) => {
  state.addCommunication = addCommunication;
}
export const patientsListSuccess = async (state, patients) => {
  state.patientsList = patients;
}
export const staffListSuccess = async (state, patients) => {
  state.staffList = patients;
}
export const patientDetailsSuccess = async (state, patient) => {
  state.patientDetails = patient;
}

export const futureAppointmentsSuccess = async (state, futureAppointments) => {
  state.futureAppointments = futureAppointments;
}
export const newRequestsSuccess = async (state, newRequests) => {
  state.newRequests = newRequests;
}
export const communicationsCountSuccess = async (state, count) => {
  state.communicationsCount = count;
}
export const searchCommunicationsSuccess = async (state, result) => {
  state.communicationsList = result;
}