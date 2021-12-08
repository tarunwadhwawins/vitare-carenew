<template>
  <a-col :sm="12" :xs="24">
    <a-card title="CPT Code Billing Summary" class="common-card">
      <apexchart type="bar" height="350" :options="code" :series="value"></apexchart>
    </a-card>
  </a-col>
</template>

<script>
  export default {

    setup(){
      return {
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
            categories: ["99453", "99454", "99457", "99458 "],
            tickPlacement: "on",
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
      }
    }
  };
</script>