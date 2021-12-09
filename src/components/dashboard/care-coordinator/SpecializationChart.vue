<template>
  <div>
    <apexchart type="bar" height="350" :options="wellness" :series="behavior"></apexchart>
  </div>
</template>

<script>
  export default {
    props: ["categories","data"],
  
    setup(props){
      console.log(props.categories)
      return {
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
            categories: ["Wellness", "Behavior"],
            tickPlacement: "on",
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
          data: [1, 2],
        },
      ],
      }
    }
  };
</script>