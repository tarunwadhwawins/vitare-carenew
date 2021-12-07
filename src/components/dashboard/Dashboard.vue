<template>
  <a-layout-content>
    <a-row>
      <MainHeader heading="Dashboard" buttonText=""></MainHeader>
      <a-col :span="24">
        <a-row :gutter="24">
          <Card customClass="one" :count="totalPatients ? totalPatients :''"></Card>
          <Card customClass="two" :count="newPatients ? newPatients : ''"></Card>
          <Card customClass="three" :count="criticalPatients ? criticalPatients : ''"></Card>
          <Card customClass="four" :count="abnormalPatients ? abnormalPatients : ''"></Card>
          <Card customClass="five" :count="activePatients ? activePatients : ''"></Card>
          <Card customClass="six" :count="inactivePatients ? inactivePatients : ''"></Card>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <PatientsStats></PatientsStats>
      <VirtualWaitingRoom></VirtualWaitingRoom>
    </a-row>
    <a-row :gutter="24" v-if="totalPatients">
      <TotalPatientsChart :chart="[totalPatients.count, newPatients.count, criticalPatients.count, abnormalPatients.count, activePatients.count, inactivePatients.count]" :lable="[totalPatients.text,newPatients.text,criticalPatients.text,abnormalPatients.text,activePatients.text,inactivePatients.text]"></TotalPatientsChart>
      <AppointmentSummary></AppointmentSummary>
    </a-row>
  </a-layout-content>
</template>
<script>
  import { ref, watchEffect } from 'vue'
  import MainHeader from "@/components/common/MainHeader";
  import Card from "@/components/common/cards/Card";
  import PatientsStats from "./PatientsStats";
  import VirtualWaitingRoom from "./VirtualWaitingRoom";
  import TotalPatientsChart from "./TotalPatientsChart";
  import AppointmentSummary from "./AppointmentSummary";
  import store from "@/store/index"
  export default {
    components: {
      MainHeader,
      Card,
      PatientsStats,
      VirtualWaitingRoom,
      TotalPatientsChart,
      AppointmentSummary,
    },
    data: function () {
      return {
        SpecializationsCount: [],
        chartOptions: {
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
        },
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: "series2",
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ],
      };
    },
    setup() {
      const totalPatients = ref()
      const newPatients = ref()
      const criticalPatients = ref()
      const abnormalPatients = ref()
      const activePatients = ref()
      const inactivePatients = ref()

      watchEffect( () =>  {
           store.dispatch("totalPatients").then((res) => {
          totalPatients.value = res.data;
        })
        store.dispatch("newPatients").then((res) => {
          console.log(res.data)
          newPatients.value = res.data;
        })
        store.dispatch("abnormalPatients").then((res) => {
          abnormalPatients.value = res.data;
        })
        store.dispatch("activePatients").then((res) => {
          activePatients.value = res.data;
        })
        store.dispatch("inactivePatients").then((res) => {
          inactivePatients.value = res.data;
        })
        store.dispatch("criticalPatients").then((res) => {
          criticalPatients.value = res.data;
        })
      })


      function logout() {
        localStorage.removeItem("auth");
        localStorage.clear();
      }
      return {
        logout,
        totalPatients,
        newPatients,
        criticalPatients,
        abnormalPatients,
        activePatients,
        inactivePatients,

      };
    },
  };
</script>