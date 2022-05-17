<template>
  <a-card v-if="title" :title="title" class="common-card">
    <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler4">
    </apexchart>
  </a-card>
  <apexchart v-else :type="type" :height="height" :options="options" :series="series" @click="clickHandler4">
  </apexchart>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
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

    setup(props) {
      const router = useRouter()
      const store  = useStore()
      function clickHandler4(event, chartContext, config) {
    console.log(event, chartContext, config.globals.labels[config.dataPointIndex],config)
    
      // emit('listView',false)
      //provide("listView", false);
      if(props.type=="bar" && config.globals.labels[config.dataPointIndex]!=undefined){
store.commit("filter",config.globals.labels[config.dataPointIndex])
      router.push({ path: props.linkTo });
      }
    }
      return {
        clickHandler4
      }
    },
  }
</script>