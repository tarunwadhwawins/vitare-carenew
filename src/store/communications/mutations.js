
  import moment from 'moment'
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
  const communicationType = [response]
  const timeList = [];
  const callSeries = communicationType.map((item) => {
    return { name: item.text, data: item.data.map((data) => {
      if (timeList.indexOf(data.time) === -1) {
        timeList.push(new Date(data.time).toLocaleString())
      }
      return data.count
    })}
  })
  
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