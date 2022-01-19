export const todayAppointmentSuccess = (state, count) => {
    state.todayAppointmentState = count;
}
export const failure = (state, error) => {
    state.errorMsg = error;
}
export const callStatusSuccess = (state, count) => {
    
    state.callStatus = {
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
            colors: ["#121258", "#218421", "#ffb526"],
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
              categories: count.map((item) => { return item.text }),
            },
            yaxis: {
              title: {
                text: "Number of Count",
              },
            },
          },
        callseries: [
          {
            name: "Value",
            data: count.map((item) => { return item.count }),
          },
        ],
    };
}

export const patientsStatsSuccess = (state, count) => {
    state.patientsCondition ={
      option1: {
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
        colors: ["#267dff", "#00897b", "#E30D2A"],
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
          categories: count.map((item) => { return item.text }),
        },
        yaxis: {
          title: {
            text: "Patients",
          },
        },
      },
      series1: [
        {
          name: "Patients",
          data: count.map((item) => { return item.count }),
        },
      ],

    };
}

export const specializationSuccess = (state, count) => {
    state.specialization = {
      wellness: {
        annotations: {
          points: [
            {
              x: "Wellness",
              seriesIndex: 0,
              label: {
                borderColor: "#ff0000",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#ff0000",
                },
                // text: "Bananas are good",
              },
            },
          ],
        },
        chart: {
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
        colors: ["#8e60ff", "#ffa800"],
        dataLabels: {
          enabled: false,
        },
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
          categories: count.map((item) => { return item.text }),
        },
        yaxis: {
          title: {
            text: "Specialization",
          },
        },
      },
      behavior: [
        {
          name: "Specialization",
          data: count.map((item) => { return item.count }),
        },
      ],
    };
}


export const networkSuccess = (state, count) => {
    state.network = {
      In: {
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
                // text: "Bananas are good",
              },
            },
          ],
        },
        chart: {
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
        colors: ["#267dff", "#0fb5c2"],
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
          categories: count.map((item) => { return item.text }),
        },
        yaxis: {
          title: {
            text: "Network",
          },
        },
      },
      Out: [
        {
          name: "Network",
          data: count.map((item) => { return item.count }),
        },
      ],
    };
}

export const cptCodeSuccess = (state, count) => {
  state.cptCodeValue = {
    code: {
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
      colors: ["#3b72c5", "#ffb526", "#419541", "#343470"],
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
        categories: ["99453", "99454", "99457", "99458 "],
      },
      yaxis: {
        title: {
          text: "Minutes",
        },
      },
    },
    value: [
      {
        name: "Minutes",
        data: [120, 80, 90, 30],
      },
    ],
  };
}
export const financialSuccess = (state, count) => {
  state.financialValue = {
    due: [4567, 1000],
        billed: {
          chart: {
            type: "pie",
          },
          labels: ["Billed", "Due"],
          colors: ["#267dff", "#E30D2A"],
          responsive: [
            {
              breakpoint: 480,
              options: {
               
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
  };
}
export const totalPatientsChartSuccess = (state, count) => {
  const check =count.map((item) => { 
    return item.data.map((data) =>{ return data.month})})
    const month=['January','February',]
  state.totalPatientsChartValue = {
    chartOptions: {
      chart: {
       
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories:  [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
       
      },
    },
    series:  [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
  };
}

export const appointmentChartSuccess = (state, count) => {
  state.appointmentChartValue = {
    chartOptions: {
      chart: {
      
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
  };
}
