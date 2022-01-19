<template>
  <a-card :title="title" class="common-card" v-if="title">
    <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler(linkTo)">
    </apexchart>
  </a-card>

  <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler(linkTo)" v-else>
  </apexchart>
</template>

<script>
  import { useRouter } from "vue-router";
  import { reactive } from "vue"  
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
      const router = useRouter();
      function clickHandler(linkTo) {
        router.push({ path: linkTo });
      }

      return {
        clickHandler
      }
    },
  }
</script>