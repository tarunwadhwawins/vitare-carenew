<template>
  <a-col :span="12">
    <a-card title="Total Patients Chart" class="common-card">
      <apexchart
        width="500"
        type="pie"
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
      series: [12.7, 7.6, 22.3, 27.9, 20.8, 8.6],
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        colors: ['#775DD0', '#03A9F4', '#FF9800', '#FD6A6A', '#008FFB', "#9fffff"],
        labels: ["Total Patients", "New Patients", "Critical Patients", "Abnormal Patients", "Active Patients", "Inactive Patients"],
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: false
        }
      },
    }
  },
};
</script>