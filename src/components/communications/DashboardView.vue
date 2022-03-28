<template>
  <a-row :gutter="24" >
   
    <!-- Top Cards -->
    <template v-for="count in communicationsCount" :key="count.id">
      <a-col :xl="6" :md="12"  :xs="24">
      <LongCard :backgroundColor="count.backgroundColor" :count="count.count" :text="count.text" :textColor="count.textColor"></LongCard>
      </a-col>
    </template>

    <!-- Charts -->
    <a-col :sm="12" :xs="24" v-if="callPlanned">
      <ApexChart :title="$t('communications.callPlanned')" type="bar" :height="283" :options="callPlanned.calloption" :series="callPlanned.callseries" linkTo="coordinator-summary" />
    </a-col>

    <a-col :sm="12" :xs="24" v-if="callStatus">
      <ApexChart :title="$t('global.callQueue')" type="bar" :height="283" :options="callStatus.calloption" :series="callStatus.callseries" linkTo="communications" />
    </a-col>
    
    <a-col :sm="12" :xs="24">
      <a-card :title="$t('communications.populateWaitingRoom')" class="common-card grapCardWrap" >
        <a-tabs v-model:activeKey="activeKey">
          <PopulateWaitingRoomTab v-if="newRequestsData" :key="key1" tab="New Requests" :column="newRequestsColumns" :data="newRequestsData" :linkTo="linkTo" :pagination="false" />
          <PopulateWaitingRoomTab v-if="futureAppointmentsData" :key="key2" tab="Future Appointments" :column="futureAppointmentsColumns" :data="futureAppointmentsData" :linkTo="linkTo" :pagination="false" />
        </a-tabs>
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24" v-if="communicationTypes">
      <ApexChart :title="$t('communications.communicationType')" type="area" :height="283" :options="communicationTypes.calloption" :series="communicationTypes.callseries" />
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
  import moment from 'moment'
  export default {
    components: {
      LongCard,
      ApexChart,
      PopulateWaitingRoomTab,
    },
    setup() {
      const store = useStore()
      //const dateTimeNow = moment(new Date()).format('YYYY-MM-DD')
      const linkTo = "patients-summary"
      const fromDate = ref(moment())
        const toDate = ref(moment())
      const newRequestsColumns = [
        {
          title: "Patient Name",
          dataIndex: "patient",
          slots: {
            customRender: "patient",
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
        store.dispatch("callPlanned",{
                fromDate: fromDate.value,
                toDate: toDate.value})
        store.dispatch("status", {
                fromDate: fromDate.value,
                toDate: toDate.value})
        store.dispatch("communicationTypes",{
                fromDate: fromDate.value,
                toDate: toDate.value})
        //store.dispatch("futureAppointments")
        store.dispatch("newRequests")
        store.dispatch("communicationsCount", {
                fromDate: fromDate.value,
                toDate: toDate.value})
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
      const communicationsCount = computed(() => {
        return store.state.communications.communicationsCount
      })
      const key1 = 1;
      const key2 = 2;
      
      return {
        activeKey: ref(key1),
        callPlanned,
        key1,
        key2,
        newRequestsColumns,
        newRequestsData,
        futureAppointmentsColumns,
        futureAppointmentsData,
        communicationsCount,
        communicationTypes,
        callStatus,
        linkTo
      };
    },
  };
</script>