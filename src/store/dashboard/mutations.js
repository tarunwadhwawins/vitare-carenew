export const timelineSuccess = (state, count) => {

  state.button = 123;
}
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

// export const patientsStatsSuccess = (state, count) => {
  
//     state.patientsCondition ={
//       option1: {
//         annotations: {
//           points: [
//             {
//               x: "In",
//               seriesIndex: 0,
//               label: {
//                 borderColor: "#775DD0",
//                 offsetY: 0,
//                 style: {
//                   color: "#fff",
//                   background: "#775DD0",
//                 },
//               },
//             },
//           ],
//         },
//         chart: {
//           type: "bar",
//         },
//         plotOptions: {
//           bar: {
//             borderRadius: 10,
//             columnWidth: "20%",
//             barHeight: "100%",
//             distributed: true,
//             horizontal: false,
//             dataLabels: {
//               position: "bottom",
//             },
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         colors: count.map((item) => { return item.text=="Normal" || item.text=="High" || item.text=="Critical"  ? item.color :'' }),
//         stroke: {
//           width: 1,
//           colors: ["#fff"],
//         },

//         grid: {
//           row: {
//             colors: ["#fff", "#f2f2f2"],
//           },
//         },
//         xaxis: {
//           labels: {
//             rotate: -45,
//           },
//           categories: count.map((item) => { return item.text=="Normal" || item.text=="High" || item.text=="Critical" ? item.text :'' }),
//         },
//         yaxis: {
//           title: {
//             text: "Patients",
//           },
//         },
//       },
//       series1: [
//         {
//           name: "Patients",
//           data: count.map((item) => { return item.text=="Normal" || item.text=="High" || item.text=="Critical" ? item.total :'' }),
//         },
//       ],

//     };
// }

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
  
  let categories=''
  let format= ''
  let data = ''
  let type = ''
  if(count.value==122){
    type = "time"
     categories =[
      "08:00:00 AM",
      "10:00:00 AM",
      "12:00:00 AM",
      "2:00:00 PM",
      "4:00:00 PM",
      "6:00:00 PM",
      "8:00:00 PM",
    ]
     format = "hh"
     data =[31, 40, 28, 51, 42, 109, 100]
  }else if(count.value==123){
    type ="day"
     categories =[
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
      "Mon",
      "Tue",   
    ]
     format = "dddd"
     data =[31, 40, 28, 51, 42, 109, 100]
  }else if(count.value==124){
    type ="day"
 categories =[
      "Jan 01",
      "Jan 02",
      "Jan 03",
      "Jan 04",
      "Jan 05",
      "Jan 06",
      "Jan 07",
      "Jan 08",
      "Jan 09",
      "Jan 10",
      "Jan 11",
      "Jan 12",
      "Jan 13",
      "Jan 14",
      "Jan 15",
      "Jan 16",
      "Jan 17",
      "Jan 18",
      "Jan 19",
      "Jan 20",
      "Jan 21",
      "Jan 22",
      "Jan 23",
      "Jan 24",
      "Jan 25",
      

]
 format = "dd"
 data =[34, 40, 38, 51, 42, 109, 100,63,83,95,43,23,21,23,24,23,45,45,32,12,43,29,19,38,17,20]
  }else {
    type ="datetime"
     categories =[
      "Feb,2021",
      "Mar,2021",
      "Apr,2021",
      "May,2021",
      "Jun,2021",
      "JUl,2021",
      "Aug,2021",
      "Sep,2021",
      "Oct,2021",
      "Nov,2021",
      "Dec,2021",
      "Jan,2022",
    ]
     format = "MM,yyyy"
     data =[31, 40, 28, 51, 42, 109, 100, 35, 43, 83, 83, 45]
  }
  
  // const check =count.map((item) => { 
  //   return item.data.map((data) =>{ return data.month})})
  //   const month=['January','February','March','April','May','June','July','August','September','October','November','December']

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
        type: type,
        categories: categories
      },
      tooltip: {
        x: {
          format: format,
        },
      },
    },
    series: [
      {
        name: "Patients",
        data: data,
      },
    ],
  };
 // console.log("check",state.totalPatientsChartValue)
}

export const appointmentChartSuccess = (state, count) => {
  let categories=''
  let format= ''
  let data = ''
  let type = ''
  if(count.value==122){
    type = "time"
     categories =[
      "08:00:00 AM",
      "10:00:00 AM",
      "12:00:00 AM",
      "2:00:00 PM",
      "4:00:00 PM",
      "6:00:00 PM",
      "8:00:00 PM",
    ]
     format = "hh"
     data =[21, 29, 39, 21, 42, 10, 30]
  }else if(count.value==123){
    type ="day"
     categories =[
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
      "Mon",
      "Tue",  
    ]
     format = "d"
     data =[20, 10, 48, 61, 12, 20, 32]
  }else if(count.value==124){
    type ="day"
 categories =[
      "Jan 01",
      "Jan 02",
      "Jan 03",
      "Jan 04",
      "Jan 05",
      "Jan 06",
      "Jan 07",
      "Jan 08",
      "Jan 09",
      "Jan 10",
      "Jan 11",
      "Jan 12",
      "Jan 13",
      "Jan 14",
      "Jan 15",
      "Jan 16",
      "Jan 17",
      "Jan 18",
      "Jan 19",
      "Jan 20",
      "Jan 21",
      "Jan 22",
      "Jan 23",
      "Jan 24",
      "Jan 25",
]
 format = "MM'dd'"
 data =[40,20,58,61,82,10,130,83,83,95,43,23,21,23,24,23,45,45,32,12,43,29,19,34,20,100]
  }else {
    type ="date"
     categories =[
      "Feb,2021",
      "Mar,2021",
      "Apr,2021",
      "May,2021",
      "Jun,2021",
      "JUl,2021",
      "Aug,2021",
      "Sep,2021",
      "Oct,2021",
      "Nov,2021",
      "Dec,2021",
      "Jan,2022",
    ]
     format = "MM,yyyy"
     data =[100, 130, 20, 60, 70, 109, 100, 35, 93, 63, 53, 45]
  }
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
        type: type,
        categories: categories,
      },
      tooltip: {
        x: {
          format: format,
        },
      },
    },
    series: [
      {
        name: "Appointment",
        data: data,
      },
    ],
  };
}
