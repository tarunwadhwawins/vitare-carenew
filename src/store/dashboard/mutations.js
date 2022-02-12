
import { yaxis, dataLabels, plotOptions, annotations, dateFormat,chartTimeCount } from '../../commonMethods/commonMethod'
export const timelineSuccess = (state, count) => {

  state.timeLineButton = count;
}
export const todayAppointmentSuccess = (state, count) => {
  let i = 1;
  state.todayAppointmentState = count.map(el => {
    el.key = i
    el.date = dateFormat(el.date);
    i++

    return el

  })
}
export const failure = (state, error) => {
  state.errorMsg = error;
}
export const callStatusSuccess = (state, count) => {

  state.callStatus = {
    calloption: {
      annotations: annotations("In", 0, "#775DD0", 0, "#fff", "#775DD0"),
      chart: {
        type: "bar",
      },
      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
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
      yaxis: yaxis("Number of Count")
    },
    callseries: [
      {
        name: "Call Queue",
        data: count.map((item) => { return item.count }),
      },
    ],
  };
}


export const specializationSuccess = (state, count) => {
  state.specialization = {
    wellness: {
      annotations: annotations("Wellness", 0, "#ff0000", 0, "#fff", "#ff0000"),
      chart: {
        type: "bar",
      },
      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
      colors: ["#8e60ff", "#ffa800"],

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
      yaxis: yaxis("Specialization")
    },
    behavior: [
      {
        name: "Specialization",
        data: count.map((item) => { return item.total }),
      },
    ],
  };
}


export const networkSuccess = (state, count) => {
  state.network = {
    In: {
      annotations: annotations("In", 0, "#775DD0", 0, "#fff", "#775DD0"),

      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
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
      yaxis: yaxis("Network")
    },
    Out: [
      {
        name: "Network",
        data: count.map((item) => { return item.total }),
      },
    ],
  };
}

export const cptCodeSuccess = (state) => {
  state.cptCodeValue = {
    code: {
      annotations: annotations("In", 0, "#775DD0", 0, "#fff", "#775DD0"),
      chart: {
        type: "bar",
      },
      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
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
      yaxis: yaxis("Minutes")
    },
    value: [
      {
        name: "Minutes",
        data: [120, 80, 90, 30],
      },

    ],
  };
}
export const financialSuccess = (state) => {
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

  let format = ''
  let type = ''
  if (state.timeLineButton == 122) {
    type = "time"
    format = "hh"
  } else if (state.timeLineButton == 123) {
    type = "day"
    format = "dddd"
  } else if (state.timeLineButton == 124) {
    type = "day"
    format = "dd"  
  } else {
    type = "month"
    format = "MM"
  }
  let  categories = chartTimeCount(state.timeLineButton,count).map((item) => {
      return item.duration
    })  
   let data = chartTimeCount(state.timeLineButton,count).map((item) => {
      return item.total
    });
  state.totalPatientsChartValue = {
    chartOptions: {
      chart: {

        type: "area",
      },
      dataLabels: dataLabels(false),
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: type,
        categories: categories
      },
      yaxis: yaxis("Number of patients"),
      tooltip: {
        x: {
          format: format,
        },
      },
    },
    series: [
      {
        name: "New Patients",
        data: data,
      },
    ],
  };
}

export const appointmentChartSuccess = (state, count) => {
  let format = ''
  let type = ''
  if (state.timeLineButton == 122) {
    type = "time"
    format = "hh"
  } else if (state.timeLineButton == 123) {
    type = "day"
    format = "dddd"
  } else if (state.timeLineButton == 124) {
    type = "day"
    format = "dd"  
  } else {
    type = "month"
    format = "MM"
  }
  let  categories = chartTimeCount(state.timeLineButton,count).map((item) => {
      return item.duration
    })  
   let data = chartTimeCount(state.timeLineButton,count).map((item) => {
      return item.total
    });

  state.appointmentChartValue = {
    chartOptions: {
      chart: {
        type: "area",
      },
      dataLabels: dataLabels(false),
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: type,
        categories: categories,
      },
      yaxis: yaxis("Number of appointment"),
      tooltip: {
        x: {
          format: format,
        },
      },
    },
    series: [
      {
        name: "New Appointment",
        data: data,
      },
    ],
  };
}
export const dashboardPermissions = (state, auth) => {
   if (auth == 1) {

       state.permissions = [{
           id: 1,
           name: "Patients widgets"
       },

       {
           id: 2,
           name: "Today Appointment"
       },
       {
           id: 3,
           name: "Call Queue"
       },
       {
           id: 4,
           name: "Patients Stats"
       },
       {
           id: 5,
           name: "Care Coordinator"
       },
       {
           id: 6,
           name: "Cpt Code"
       },
       {
           id: 7,
           name: "Financial Stats"
       },
       {
           id: 8,
           name: "New Patients Chart"
       },
       {
           id: 9,
           name: "New Appointment Chart"
       }]
   }else if(auth == 2){
       state.permissions = [{
           id: 1,
           name: "Patients widgets"
       },

       {
           id: 2,
           name: "Today Appointment"
       },
       {
           id: 3,
           name: "Call Queue"
       },
       {
           id: 4,
           name: "Patients Stats"
       },
       {
           id: 5,
           name: "Care Coordinator"
       },
       {
           id: 8,
           name: "New Patients Chart"
       },
       {
           id: 9,
           name: "New Appointment Chart"
       }]
   }else if(auth == 3){
       state.permssions = [
       {
           id: 6,
           name: "Cpt Code"
       },
       {
           id: 7,
           name: "Financial Stats"
       },
       ]
   }else{
       state.permissions =[]
   }

}