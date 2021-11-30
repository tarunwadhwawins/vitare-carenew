<template>
  <a-col :span="12">
    <a-card title="Appointment Summary" class="common-card">
      <apexchart
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </a-card>
  </a-col>
</template>
<script>
export default {
  data: function() {
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
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
        },
      },
      series: [
        {
          name: 'Appointment Summary',
          data: [31, 40, 28, 51, 42, 109, 100],
          color: '#FA4443',
        },
      ],
    }
  },
};
</script>