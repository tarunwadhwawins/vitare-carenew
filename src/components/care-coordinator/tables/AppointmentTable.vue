<template>
  <a-table  rowKey="id" :columns="appointments.staffSummaryAppointmentCols" :data-source="appointments.staffSummaryAppointment" :pagination="false">
    <template #patient="{ record }">
      <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">{{ record.patient }}</router-link>
    </template> 
    <template #appt="text">
      <span >{{ text.text }}</span>
    </template>
     <template #action="">
        <a-tooltip placement="bottom" >
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
  </a-table>
</template>

<script>
import{useStore} from "vuex"
import{computed} from "vue"
import {DeleteOutlined,} from "@ant-design/icons-vue";
export default {
    comments:{
        DeleteOutlined
    },
    setup(){
        const store = useStore()
        const appointments = computed(()=>{
           return store.state.careCoordinatorSummary
        })
        return{
            appointments
        }
    }
};
</script>

<style>
</style>
