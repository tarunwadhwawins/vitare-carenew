<template>
  <apexchart
    :type="type"
    :height="height"
    :options="options"
    :series="series"
    @click="clickHandler(linkTo)"
  ></apexchart>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    linkTo: {
      type: String,
      required: true
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