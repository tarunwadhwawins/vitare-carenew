
import { yaxis, dataLabels, plotOptions, annotations } from '../../commonMethods/commonMethod'



export const cptCodeSuccess = (state,data) => {

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
        categories: data.map((item)=>{return item.text}),
      },
      yaxis: yaxis("Amount")
    },
    value: [
      {
        name: "Amount",
        data: data.map((item)=>{return item.total}),
      },

    ],
  };
}
export const financialSuccess = (state,data) => {

  state.financialValue = {
    due: [data.Due!=null ? Math.round(data.Due): 0,data.Billed!=null ? Math.round(data.Billed):0],
    billed: {
      chart: {
        type: "pie",
        height:"400px"
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
