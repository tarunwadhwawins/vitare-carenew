<template>
  <a-col :sm="12" :xs="24">
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
  props: ['chart','lable'],
  data: function() {
    return {
      series: this.chart,
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        colors: ['#775DD0', '#03A9F4', '#FF9800', '#FD6A6A', '#008FFB', "#9fffff"],
        labels: this.lable,
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