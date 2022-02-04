<template>
  <a-col :sm="12" :xs="24">
    <a-card :title="title" class="common-card">
      <a-table :columns="column" :data-source="data" :pagination="false">
        <template #patientName="text">
          <router-link :to="linkTo">{{
            text.text
            }}</router-link>
        </template>
        <template #staff="text">
          <router-link to="coordinator-summary">{{
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
    props: {
      appointment:{
        type:Array,
      }, 
        columns:{
        type:Array,
      }, 
      title:{
      type:String,
      required: true
    }},
    setup(props) {
      const data = reactive(props.appointment)
      const column = reactive(props.columns)
      const linkTo = "patients-summary"


      return {
        linkTo,
        data,
        column,

      }
    }
  }
</script>
<style>
  .common-card {
    min-height: 335px !important;
  }
</style>