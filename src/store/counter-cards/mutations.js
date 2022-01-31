export const counterCardSuccess = (state, count) => {
    state.grid = {
        xlGrid: parseInt(24 / count.length),
        smGrid: parseInt(24 / parseInt(count.length / 2))
    }
    state.totalPatientcount = count
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
          colors: count.map((item) => { return item.text=="Normal" || item.text=="High" || item.text=="Critical"  ? item.color :'' }),
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
            categories: count.map((item) => { return item.text=="Normal" || item.text=="High" || item.text=="Critical" ? item.text :'' }),
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
            data: count.map((item) => { return item.text=="Normal" || item.text=="High" || item.text=="Critical" ? item.total :'' }),
          },
        ],
  
      };
}
export const failure = (state, error) => {
    state.errorMsg = error;
}
// export const newPatientsSuccess = (state, count) => {
//     state.newPatientcount = count
// }

// export const abnormalPatientsSuccess = (state, count) => {
//     state.abnormalPaitientcount = count
// }

// export const activePatientsSuccess = (state, count) => {
//     state.activePaitientcount = count
// }

// export const inactivePatientsSuccess = (state, count) => {
//     state.inActivePaitientcount = count
// }

// export const criticalPatientsSuccess = (state, count) => {
//     state.criticalPaitientcount = count
// }
