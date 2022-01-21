<template>
  <!-- <a-menu> -->
    <a-menu-item v-for="data in filterCount" :key="data.key">
      <a :href="data.link">{{ data.text }}</a>
    </a-menu-item>
  <!-- </a-menu> -->
</template>

<script>
export default {
  props: {
    filterCount: {
      type: Array
    },
  },
  setup() {
    return {

    }
  }
}
</script>