<template>
  <a-table :columns="columns" :data-source="data" :pagination="false" >
    <template #value="text">
      <span class="dangerValue">{{ text.text }}</span>
    </template>
  </a-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array
    },
    data: {
      type: Array
    },
  }
}
</script>