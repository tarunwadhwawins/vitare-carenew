<template>
  <a-table rowKey="id" :columns="columns" height="210" :data-source="data" :pagination="false" >
    <!-- <template #value="{record}">
      <span class="dangerValue">{{ record.value }}</span>
    </template> -->
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