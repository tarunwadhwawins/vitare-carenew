import { dateFormat } from '../../commonMethods/commonMethod';
import { yaxis, dataLabels, plotOptions, annotations } from '../../commonMethods/commonMethod'
import moment from 'moment';
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
        name: "Value",
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

  let categories = ''
  let format = ''
  let data = ''
  let type = ''
  if (state.timeLineButton == 122) {
    const time=['08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM','08:00 PM']
    let days = [];
    let today = moment();
   
    today.subtract(8, 'days')
    time.forEach((item,i)=>{
      //console.log("item",item)
      let day = today.add(1, 'days');
      let obj = count.find(o => o.duration === item);
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": item,
          "total": 0,
        };
        days.push(value_obj);
      } else {
        days.push(obj);
      }
    })

    count = days;
    
    type = "time"
    categories = count.map((item) => {
      return item.duration
    })

    format = "hh"
    data = count.map((item) => {
      return item.total
    })

  } else if (state.timeLineButton == 123) {
    let days = [];
    let today = moment();
    today.subtract(7, 'days')
    for (var i = 0; i < 7; i++) {
      var day = today.add(1, 'days');
      let obj = count.find(o => o.duration === day.format('dddd'));
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": day.format('dddd'),
          "total": 0,
        };
        days.push(value_obj);
      } else {
        days.push(obj);
      }
    }
    count = days;
    type = "day"

    categories = count.map((item) => {
      return item.duration
    })

    format = "dddd"
    data = count.map((item) => {
      return item.total
    })
  } else if (state.timeLineButton == 124) {
    
    let date = [];
    let today = moment();
    today.subtract(30, 'days')
    for (let i = 0; i < 30; i++) {
      let day = today.add(1, 'days');
      let obj = count.find(o => o.duration === day.format('MMM DD,yyyy'));
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": day.format('MMM DD,yyyy'),
          "total": 0,
        };
        date.push(value_obj);
      } else {
        date.push(obj);
      }
    }
    count = date;
    type = "day"
    categories =
      count.map((item) => {
        return item.duration
      })

    format = "dd"
    data = count.map((item) => {
      return item.total
    })
  } else {
    const month=['February','March','April','May','June','July','August','September','October','November','December','January']
    let days = [];
    month.forEach((item,i)=>{
      let obj = count.find(o => o.duration === item);
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": item,
          "total": 0,
        };
        days.push(value_obj);
      } else {
        days.push(obj);
      }
    })
    count = days;
    type = "datetime"
    categories = count.map((item) => {
      return item.duration
    })
    format = "MM,yyyy"
    data = count.map((item) => {
      return item.total
    })
  } 

  // const check =count.map((item) => { 
  //   return item.data.map((data) =>{ return data.month})})
  //   const month=['January','February','March','April','May','June','July','August','September','October','November','December']

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
        name: "Patients",
        data: data,
      },
    ],
  };
  // console.log("check",state.totalPatientsChartValue)
}

export const appointmentChartSuccess = (state, count) => {

  
  let categories = ''
  let format = ''
  let data = ''
  let type = ''
  if (state.timeLineButton == 122) {
    const time=['08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM','08:00 PM']
    let days = [];
    let today = moment();
   
    today.subtract(8, 'days')
    time.forEach((item,i)=>{
      //console.log("item",item)
      let day = today.add(1, 'days');
      let obj = count.find(o => o.duration === item);
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": item,
          "total": 0,
        };
        days.push(value_obj);
      } else {
        days.push(obj);
      }
    })

    count = days;
    
    type = "time"
    categories = count.map((item) => {
      return item.duration
    })

    format = "hh"
    data = count.map((item) => {
      return item.total
    })

  } else if (state.timeLineButton == 123) {
    let days = [];
    let today = moment();
    today.subtract(7, 'days')
    for (var i = 0; i < 7; i++) {
      var day = today.add(1, 'days');
      let obj = count.find(o => o.duration === day.format('dddd'));
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": day.format('dddd'),
          "total": 0,
        };
        days.push(value_obj);
      } else {
        days.push(obj);
      }
    }
    count = days;
    type = "day"

    categories = count.map((item) => {
      return item.duration
    })

    format = "dddd"
    data = count.map((item) => {
      return item.total
    })
  } else if (state.timeLineButton == 124) {
    
    let date = [];
    let today = moment();
    today.subtract(30, 'days')
    for (let i = 0; i < 30; i++) {
      let day = today.add(1, 'days');
      let obj = count.find(o => o.duration === day.format('MMM DD,yyyy'));
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": day.format('MMM DD,yyyy'),
          "total": 0,
        };
        date.push(value_obj);
      } else {
        date.push(obj);
      }
    }
    count = date;
    type = "day"
    categories =
      count.map((item) => {
        return item.duration
      })

    format = "dd"
    data = count.map((item) => {
      return item.total
    })
  } else {
    const month=['February','March','April','May','June','July','August','September','October','November','December','January']
    let days = [];
    month.forEach((item,i)=>{
      let obj = count.find(o => o.duration === item);
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": item,
          "total": 0,
        };
        days.push(value_obj);
      } else {
        days.push(obj);
      }
    })
    count = days;
    type = "datetime"
    categories = count.map((item) => {
      return item.duration
    })
    format = "MM,yyyy"
    data = count.map((item) => {
      return item.total
    })
  }
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
        name: "Appointment",
        data: data,
      },
    ],
  };
}
