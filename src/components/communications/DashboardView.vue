<template>
  <a-row :gutter="24" >
   
    <!-- Cards -->
    <LongCard customClass="blueBg" :count="10" :text="$t('global.yesterday')">
    </LongCard>
    <LongCard customClass="two" :count="10" :text="$t('global.today')"></LongCard>
    <LongCard customClass="skyBlue" :count="10" :text="$t('global.tomorrow')"></LongCard>
    <LongCard customClass="four" :count="10" :text="$t('global.week')"></LongCard>

    <!-- Charts -->
    <a-col :sm="12" :xs="24" v-if="callPlannedOptions">
      <a-card :title="$t('communications.callPlanned')" class="common-card">
        <ApexChart type="bar" :height="350" :options="callPlannedOptions" :series="callPlannedSeries"
          linkTo="corrdinator-summary" />
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24" v-if="callStatus">
      <ApexChart :title="$t('global.callQueue')" type="bar" height="350" :options="callStatus.calloption"
        :series="callStatus.callseries" linkTo="communications" />
    </a-col>

    <a-col :sm="12" :xs="24" v-if="newRequestsData || futureAppointmentsData">
      <a-card :title="$t('communications.populateWaitingRoom')" class="common-card">
        <a-tabs v-model:activeKey="activeKey">
          <PopulateWaitingRoomTab :key="1" tab="New Requests" :column="newRequestsColumns" :data="newRequestsData"
            linkTo="patients-summary" />
          <PopulateWaitingRoomTab :key="2" tab="Future Appointments" :column="futureAppointmentsColumns"
            :data="futureAppointmentsData" linkTo="patients-summary" />
        </a-tabs>
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24" v-if="communicationTypes">
      <a-card :title="$t('communications.communicationType')" class="common-card">
        <ApexChart type="area" :height="245" :options="communicationTypes.calloption" :series="communicationTypes.callseries" />
      </a-card>
    </a-col>

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
      
      watchEffect(() => {
        store.dispatch("callPerStaff")
        store.dispatch("callStatus")
        store.dispatch("communicationTypes")
        store.dispatch("futureAppointments")
        store.dispatch("newRequests")
      })
      
      const callPlannedOptions = computed(() => {
        return store.state.communications.callPerStaffName
      })
      const callPlannedSeries = computed(() => {
        return store.state.communications.callPerStaffCount
      })
      const callStatus = computed(() => {
        return store.state.dashBoard.callStatus
      })
      const communicationTypes = computed(() => {
        return store.state.communications.communicationTypes
      })
      /* const newRequestsData = computed(() => {
        return store.state.communications.newRequests
      })
      const futureAppointmentsData = computed(() => {
        return store.state.communications.futureAppointments
      }) */
      console.log('communicationTypes', communicationTypes)

      /* const newRequestsColumns = [
        {
          dataIndex: "id",
          key: "key",
        },
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
          dataIndex: "id",
          key: "key",
        },
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
      ]; */

      return {
        callPlannedOptions,
        callPlannedSeries,
        /* newRequestsColumns,
        newRequestsData,
        futureAppointmentsColumns,
        futureAppointmentsData, */
        communicationTypes,
        callStatus,
      };
    },
  };
</script>