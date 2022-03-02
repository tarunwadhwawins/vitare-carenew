<template>
  <a-table rowKey="id" :columns="columns" height="210" :data-source="data" :pagination="false" >
    <template #takeTime="{record}">
      <span>{{ record.takeTime }}</span>
    </template>
    <template #value="{record}">
      <span v-for="item in record.data" :key="item.id" :class="className">
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{ item.vitalField }}</span>
          </template>
          <span>{{ item.value }}</span>
        </a-tooltip>
      </span>
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
    className: {
      type: String
    },
  }
}
</script>

<style scoped>
  .dangerValue { margin: 0px 3px; }
</style>