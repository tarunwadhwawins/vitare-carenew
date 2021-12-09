<template>
  <div>
    <apexchart type="bar" height="350" :options="In" :series="Out"></apexchart>
  </div>
</template>

<script>
  export default {
    props: ["categories", "data"],
    setup(props) {
      return {
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
            categories: props.categories,
            tickPlacement: "on",
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
            data: props.data,
          },
        ],
      }
    }
  };
</script>