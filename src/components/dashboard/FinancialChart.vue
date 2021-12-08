<template>
    <a-col :sm="12" :xs="24">
        <a-card title="Financial Stats" class="common-card">
          <!-- <div class="list-group">
            <div class="list-group-item">
              <div class="name">Billed</div>
              <div class="value">4567 $</div>
            </div>
          </div> -->
          <apexchart
            type="pie"
            height="350"
            :options="billed"
            :series="due"
          ></apexchart>
        </a-card>
      </a-col>
</template>
<script>
   export default {
    setup(){
    return {
        due: [4567, 1000],
      billed: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Billed", "Due"],
        colors: ["#267dff", "#E30D2A"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
}
   } 
</script>
