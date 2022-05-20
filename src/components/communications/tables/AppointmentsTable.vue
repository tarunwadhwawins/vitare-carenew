<template>
  <a-row :gutter="24">
    <a-col :sm="24" :xs="24">
      <div class="documentsTab">
      <a-button @click="showAddAppointmentModal();actionTrack(paramsId,294,'patient')" type="primary">{{ "Add Appointment" }}</a-button>
      <a-table rowKey="id" :columns="appointmentColumns" :data-source="patientAppointmentsList" :pagination="false">
        <template #flag="{ record }">
          <Flags :flag="record.flagColor" />
          <AddAppointmentModal v-model:visible="addAppointmentVisible" :patientId="patientUdid" :patientName="record.patient" @closeModal="closeModal" :isChat="true" />
        </template>
      </a-table>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import {
  actionTrack,
} from '@/commonMethods/commonMethod';
import {
  computed,
  ref,
  watchEffect,
  defineAsyncComponent
} from 'vue-demi';
import { useStore } from 'vuex';
import Flags from "@/components/common/flags/Flags";

export default {
  components: {
    Flags,
    AddAppointmentModal: defineAsyncComponent(()=>import("@/components/modals/AddAppointment")),
  },
  props: {
    patientUdid: {
      type: Number
    },
  },
  setup(props) {
    const store = useStore()
    const addAppointmentVisible = ref(false)
    
    const showAddAppointmentModal = () => {
      addAppointmentVisible.value = true;
    };
    
    const appointmentColumns = [
      {
        title: "Type",
        dataIndex: "appointmentType",
        key: "appointmentType",
      },
      {
        title: "Care Coodinator",
        dataIndex: "staff",
        key: "staff",
      },
      // {
      //   title: "Patient",
      //   dataIndex: "patient",
      //   key: "patient",
      // },
      // {
      //   title: "Date",
      //   dataIndex: "date",
      //   key: "date",
      // },
      // {
      //   title: "Start Time",
      //   dataIndex: "time",
      //   key: "time",
      // },
      {
        title: "Time",
        dataIndex: "dateTime",
        className: "appointment-dateTime",
        key: "dateTime",
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        ellipsis: true,
      },
      {
        title: "Flags",
        dataIndex: "flag",
        className: "appointment-flags",
        key: "flag",
        slots: {
          customRender: "flag",
        },
      },
    ];

    watchEffect(() => {
      store.dispatch('patientAppointmentsList', props.patientUdid)
    })

    const patientAppointmentsList = computed(() => {
      return store.state.appointment.patientAppointmentsList
    })

    const closeModal = () => {
      addAppointmentVisible.value = false
    }

    console.log('patientAppointmentsList', patientAppointmentsList.value)

    return {
      showAddAppointmentModal,
      addAppointmentVisible,
      appointmentColumns,
      patientAppointmentsList,
      closeModal,
      actionTrack,
    }
  }
}
</script>

<style>
th.appointment-dateTime, td.appointment-dateTime {
  width: 160px !important;
}
th.appointment-flags, td.appointment-flags {
  width: 80px !important;
}
</style>