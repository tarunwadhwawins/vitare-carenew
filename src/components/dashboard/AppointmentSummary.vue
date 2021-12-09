<template>
  <a-col :sm="12" :xs="24">
    <a-card title="Appointment Summary" class="common-card">
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </a-card>
  </a-col>
</template>
<script>
  export default {
    props: ["categories", "data"],
    setup(props) {
      return {
        chartOptions: {
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'category',
            categories: props.categories
          },
        },
        series: [
          {
            name: 'Appointment Summary',
            data: props.data,
            color: '#FA4443',
          },
        ],
      }
    },
  };
</script>