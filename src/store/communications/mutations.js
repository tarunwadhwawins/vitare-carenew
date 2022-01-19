export const callPerStaffSuccess = (state, count) => {
  state.callPerStaffName={
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
  };count.map((item) => {return item.staff})
  state.callPerStaffCount =[
    {
      name: "Value",
      data:  count.map((item) => {return item.count }),
    },
  ];
  //console.log(state.callPerStaffName)
}

export const communicationTypesSuccess = (state, count) => {
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
        // width: [5, 7, 5, 8],
        curve: "straight",
        // dashArray: [0, 8, 5, 6],
      },
      xaxis: {
        categories: ["10", "12", "2", "4", "6", "8"],
      },
      tooltip: {
        x: {
          // format: "dd/MM/yy HH:mm",/
        },
      },
    },
    callseries: [
      {
        name: count.map((item) => { return item.text }),
        data: count.map((item) => { return item.count }),
      },
      /* {
        name: "SMS",
        data: [15, 16, 18, 15, 14, 17, 18],
      },
      {
        name: "Reminder",
        data: [12, 14, 15, 13, 12, 15, 14],
      },
      {
        name: "Call",
        data: [11, 10, 11, 9, 10, 9, 11],
      },
      {
        name: "Email",
        data: [8, 7, 6, 8, 7, 8, 6],
      }, */
    ],
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

export const futureAppointmentsSuccess = async (state, futureAppointments) => {
  state.futureAppointments = futureAppointments;
}
export const newRequestsSuccess = async (state, newRequests) => {
  state.newRequests = newRequests;
}