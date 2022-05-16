<template>
  <a-card v-if="title" :title="title" class="common-card">
    <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler4">
    </apexchart>
  </a-card>
  <apexchart v-else :type="type" :height="height" :options="options" :series="series" @click="clickHandler4">
  </apexchart>
</template>

<script>
  export default {
    props: {
      linkTo: {
        type: String,
      },
      title: {
        type: String,
      },
      type: {
        type: String,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      options: {
        type: Object,
        required: true
      },
      series: {
        type: Array,
        required: true
      },
    },

    setup() {
      function clickHandler4(event, chartContext, config) {
    console.log(event, chartContext, config)
      // emit('listView',false)
      //provide("listView", false);
      //router.push({ path: "communications" });
    }
      return {
        clickHandler4
      }
    },
  }
</script>