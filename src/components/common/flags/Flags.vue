<template>
  <span class="box" v-bind:style="{ backgroundColor: flag }" />
</template>

<script>
export default {
  props: {
    flag: {
      type: String,
      required: true
    },
  },
}
</script>