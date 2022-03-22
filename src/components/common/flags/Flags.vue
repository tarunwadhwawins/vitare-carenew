<template>
  <a-tooltip placement="right">
    <template #title>{{ data.name }}</template>
    <span class="box" v-bind:style="{ backgroundColor: flag }" />
  </a-tooltip>
</template>

<script>
export default {
  props: {
    flag: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
  },
}
</script>