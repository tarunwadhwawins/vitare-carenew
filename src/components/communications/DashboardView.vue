<template>
  <a-row :gutter="24">
{{ callPerStaffCount.callPerStaffCount }}
    <!-- Cards -->
    <LongCard customClass="blueBg" :count="callPerStaffCount.callPerStaffCount" :text="$t('global.yesterday')">
    </LongCard>
    <LongCard customClass="two" :count="10" :text="$t('global.today')"></LongCard>
    <LongCard customClass="skyBlue" :count="10" :text="$t('global.tomorrow')"></LongCard>
    <LongCard customClass="four" :count="10" :text="$t('global.week')"></LongCard>

    <!-- Charts -->
    <a-col :sm="12" :xs="24">

      <a-card :title="$t('communications.callPlanned')" class="common-card">
        <ApexChart type="bar" :height="350" :options="callPlannedOptions" :series="callPlannedSeries"
          linkTo="corrdinator-summary" />
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24">
      <a-card :title="$t('global.callQueue')" class="common-card">
        <ApexChart type="bar" :height="350" :options="callQueOptions" :series="callQueSeries" />
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24">
      <a-card :title="$t('communications.populateWaitingRoom')" class="common-card">
        <a-tabs v-model:activeKey="activeKey">
          <PopulateWaitingRoomTab :key="1" tab="New Requests" :column="newRequestsColumns" :data="newRequestsData"
            linkTo="patients-summary" />
          <PopulateWaitingRoomTab :key="2" tab="Future Appointments" :column="futureAppointmentsColumns"
            :data="futureAppointmentsData" linkTo="patients-summary" />
        </a-tabs>
      </a-card>
    </a-col>

    <a-col :sm="12" :xs="24">
      <a-card :title="$t('communications.communicationType')" class="common-card">
        <ApexChart type="area" :height="245" :options="communicationTypeOptions" :series="communicationTypeSeries" />
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

      })
      const callPerStaffCount = computed(() => {
        return store.state.storeData
      })
      // const callPerStaffName  = computed(() => { 
      //   return store.state.storeData.callPerStaffName
      // })
      //console.log(callPerStaffCount.value.callPerStaffCount)

      const callPlannedOptions = {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#269b8f", "#269b8f", "#121258", "#218421"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },

        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: callPerStaffCount.value.callPerStaffName,
        },
        yaxis: {
          title: {
            text: "Number of Calls",
          },
        },
      };
      const callPlannedSeries = [
        {
          name: "Value",
          data: callPerStaffCount.value.callPerStaffCount,
        },
      ];

      const callQueOptions = {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#121258", "#218421", "#ffb526"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },

        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["Going On", "Completed", "In Queue"],
        },
        yaxis: {
          title: {
            text: "Number of Calls",
          },
        },
      };
      const callQueSeries = [
        {
          name: "Value",
          data: [12, 8, 6],
        },
      ];

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
          dataIndex: "appt",
        },
        {
          title: "Time",
          dataIndex: "time",
        },
        {
          title: "Action ",
          dataIndex: "action",
          slots: {
            customRender: "action",
          },
        },
      ];
      const newRequestsData = [
        {
          key: "1",
          patient: "Steve Smith",
          appt: "Wellness",
          time: "01:30 PM",
        },
        {
          key: "2",
          patient: "Jane Doe",
          appt: "Clinical",
          time: "11:30 AM",
        },
        {
          key: "3",
          patient: "Joseph Spouse",
          appt: "Wellness",
          time: "02:30 PM",
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
          dataIndex: "appt",
        },
        {
          title: "Time",
          dataIndex: "time",
        },
      ];
      const futureAppointmentsData = [
        {
          key: "1",
          patient: "Robert",
          appt: "Wellness",
          time: "02:30 PM",
        },
        {
          key: "2",
          patient: "Steve",
          appt: "Clinical",
          time: "10:30 AM",
        },
        {
          key: "3",
          patient: "Jane",
          appt: "Wellness",
          time: "03:30 PM",
        },
        {
          key: "4",
          patient: "Joseph",
          appt: "Clinical",
          time: "04:15 PM",
        },
      ];

      const communicationTypeOptions = {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          // width: [5, 7, 5, 8],
          curve: "straight",
          // dashArray: [0, 8, 5, 6],
        },
        xaxis: {
          categories: ["10", "12", "2", "4", "6", "8"],
        },
        tooltip: {
          x: {
            // format: "dd/MM/yy HH:mm",/
          },
        },
      };
      const communicationTypeSeries = [
        {
          name: "SMS",
          data: [15, 16, 18, 15, 14, 17, 18],
        },
        {
          name: "Reminder",
          data: [12, 14, 15, 13, 12, 15, 14],
        },
        {
          name: "Call",
          data: [11, 10, 11, 9, 10, 9, 11],
        },
        {
          name: "Email",
          data: [8, 7, 6, 8, 7, 8, 6],
        },
      ];

      return {
        callPlannedOptions,
        callPlannedSeries,
        callQueOptions,
        callQueSeries,
        newRequestsColumns,
        newRequestsData,
        futureAppointmentsColumns,
        futureAppointmentsData,
        communicationTypeOptions,
        communicationTypeSeries,
        callPerStaffCount,
        //callPerStaffName
      };
    },
  };
</script>