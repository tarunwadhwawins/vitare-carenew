<template>
  <a-card v-if="title" :title="title" class="common-card">
    <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler(linkTo)">
    </apexchart>
  </a-card>
  <apexchart v-else :type="type" :height="height" :options="options" :series="series" @click="clickHandler(linkTo)">
  </apexchart>
</template>

<script>
  import { useRouter } from "vue-router";
  // import { reactive } from "vue"  
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