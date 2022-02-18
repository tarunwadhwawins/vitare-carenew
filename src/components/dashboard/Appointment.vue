<template>
  <a-col :sm="12" :xs="24">
    <a-card :title="title" class="common-card">
      <a-table :columns="column" :data-source="data" :pagination="false">
        <!-- <template #patientName="text">
          <router-link :to="linkTo">{{
            text.text
            }}</router-link>
        </template> -->
        <template #patientName="{text, record}">
          <router-link :to="'/patients-summary/'+record.patient_id">{{ text }}</router-link>
      </template>
        <template #staff="{record}">
          <router-link to="'/coordinator-summary'+record.staff_id">{{
          record.staff
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
     


      return {

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