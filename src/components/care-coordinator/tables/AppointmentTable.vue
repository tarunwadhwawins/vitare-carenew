<template>
  <a-table :columns="appointments.staffSummaryAppointmentCols" :data-source="appointments.staffSummaryAppointment" :pagination="false">
    <template #patientName="text">
      <router-link :to="linkTo">{{ text.text }}</router-link>
    </template>
    <template #appt="text">
      <router-link to="manage-care-coordinator">{{ text.text }}</router-link>
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
