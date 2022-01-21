<template>
  <a-row :gutter="24" >
   
    <!-- Cards -->
    <LongCard customClass="blueBg" :count="10" :text="$t('global.yesterday')">
    </LongCard>
    <LongCard customClass="two" :count="10" :text="$t('global.today')"></LongCard>
    <LongCard customClass="skyBlue" :count="10" :text="$t('global.tomorrow')"></LongCard>
    <LongCard customClass="four" :count="10" :text="$t('global.week')"></LongCard>

    <!-- Charts -->
    <a-col :sm="12" :xs="24" v-if="callPlanned">
      <ApexChart :title="$t('communications.callPlanned')" type="bar" height="350" :options="callPlanned.calloption" :series="callPlanned.callseries" linkTo="corrdinator-summary" />
    </a-col>

    <a-col :sm="12" :xs="24" v-if="callStatus">
      <ApexChart :title="$t('global.callQueue')" type="bar" height="350" :options="callStatus.calloption" :series="callStatus.callseries" linkTo="communications" />
    </a-col>
    
    <a-col :sm="12" :xs="24">
      <a-card :title="$t('communications.populateWaitingRoom')" class="common-card">
        <a-tabs v-model:activeKey="activeKey">
          <PopulateWaitingRoomTab v-if="newRequestsData" key="1" tab="New Requests" :column="newRequestsColumns" :data="newRequestsData" linkTo="patients-summary" />
          <PopulateWaitingRoomTab v-if="futureAppointmentsData" key="2" tab="Future Appointments" :column="futureAppointmentsColumns"
            :data="futureAppointmentsData" linkTo="patients-summary" />
        </a-tabs>
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24" v-if="communicationTypes">
      <ApexChart :title="$t('communications.communicationType')" type="area" :height="245" :options="communicationTypes.calloption" :series="communicationTypes.callseries" />
    </a-col>
    
    <template #action>
      <a-button class="btn blueBtn">Start</a-button>
    </template>

  </a-row>
</template>

<script>
  import LongCard from "@/components/common/cards/LongCard";
  import ApexChart from "@/components/common/charts/ApexChart";
  import PopulateWaitingRoomTab from "@/components/communications/tabs/PopulateWaitingRoomTab";
  import { ref, watchEffect, computed } from 'vue'
  import { useStore } from "vuex"
  export default {
    components: {
      LongCard,
      ApexChart,
      PopulateWaitingRoomTab,
    },
    setup() {
      const store = useStore()

      const newRequestsColumns = [
        {
          title: "Patient Name",
          dataIndex: "patient",
          slots: {
            customRender: "patientName",
          },
        },
        {
          title: "Appointment Type",
          dataIndex: "appointmentType",
        },
        {
          title: "Time",
          dataIndex: "startTime",
        },
        {
          title: "Action",
          dataIndex: "action",
          slots: {
            customRender: "action",
          },
        },
      ];
      const futureAppointmentsColumns = [
        {
          title: "Patient Name",
          dataIndex: "patient",
          slots: {
            customRender: "patientName",
          },
        },
        {
          title: "Appointment Type",
          dataIndex: "appointmentType",
        },
        {
          title: "Time",
          dataIndex: "startTime",
        },
      ];
      
      watchEffect(() => {
        store.dispatch("callPlanned")
        store.dispatch("callStatus")
        store.dispatch("communicationTypes")
        store.dispatch("futureAppointments")
        store.dispatch("newRequests")
      })
      
      const callPlanned = computed(() => {
        return store.state.communications.callPlanned
      })
      const callStatus = computed(() => {
        return store.state.dashBoard.callStatus
      })
      const communicationTypes = computed(() => {
        return store.state.communications.communicationTypes
      })
      const newRequestsData = computed(() => {
        return store.state.communications.newRequests
      })
      const futureAppointmentsData = computed(() => {
        return store.state.communications.futureAppointments
      })
      console.log('newRequestsData', newRequestsData);
      console.log('futureAppointmentsData', futureAppointmentsData);

      return {
        activeKey: ref("1"),
        callPlanned,
        newRequestsColumns,
        newRequestsData,
        futureAppointmentsColumns,
        futureAppointmentsData,
        communicationTypes,
        callStatus,
      };
    },
  };
</script>