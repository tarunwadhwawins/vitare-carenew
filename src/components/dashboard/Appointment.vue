<template>
  <a-col :sm="12" :xs="24">
    <a-card :title="title" class="common-card">
      <a-table :columns="column" :data-source="data" :pagination="false">
        <template #patientName="text">
          <router-link to="patients-summary">{{
            text.text
            }}</router-link>
        </template>
        <template #staff="text">
          <router-link to="corrdinator-summary">{{
            text.text
            }}</router-link>
        </template>
      </a-table>
    </a-card>
  </a-col>
</template>
<script>
  import { reactive } from "vue"

  export default {
    props: ["appointment", "columns", "title"],
    setup(props) {
      const data = reactive(props.appointment)
      const column = reactive(props.columns)


      return {
        data,
        column,

      }
    }
  }
</script>