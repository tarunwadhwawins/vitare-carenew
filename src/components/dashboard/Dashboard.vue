<template>
<a-layout-content>
    <a-row>
        <MainHeader heading="Dashboard" buttonText=""></MainHeader>
        <a-col :span="24">
            <a-row :gutter="24">
                <Card customClass="one" :count="totalPatients.count" text="Total Patients"></Card>
                <Card customClass="two" :count="newPatients.count" text="New Patients"></Card>
                <Card customClass="three" :count="criticalPatients.count" text="Critical Patients"></Card>
                <Card customClass="four" :count="abnormalPatients.count" text="Abnormal Patients"></Card>
                <Card customClass="five" :count="activePatients.count" text="Active Patients"></Card>
                <Card customClass="six" :count="inactivePatients.count" text="Inactive Patients"></Card>
            </a-row>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <PatientsStats></PatientsStats>
        <VirtualWaitingRoom></VirtualWaitingRoom>
    </a-row>
    <a-row :gutter="24">
        <TotalPatientsChart></TotalPatientsChart>
        <AppointmentSummary></AppointmentSummary>
    </a-row>
</a-layout-content>
</template>
<script>
import MainHeader from "@/components/common/MainHeader";
import Card from "@/components/common/cards/Card";
import totalPatients from '@/data/total-patients.json';
import newPatients from '@/data/new-patients.json';
import criticalPatients from '@/data/critical-patients.json';
import abnormalPatients from '@/data/abnormal-patients.json';
import activePatients from '@/data/active-patients.json';
import inactivePatients from '@/data/inactive-patients.json';
import PatientsStats from "./PatientsStats";
import VirtualWaitingRoom from "./VirtualWaitingRoom";
import TotalPatientsChart from "./TotalPatientsChart";
import AppointmentSummary from "./AppointmentSummary";
import { computed,ref } from 'vue'
export default {
  name:'Dashboard',
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
      totalPatients,
      SpecializationsCount: [],
      newPatients,
      criticalPatients,
      abnormalPatients,
      activePatients,
      inactivePatients,
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
    // const count = ref(1);
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
      // router.push({
      //     path: '/'
      // })
    }
    

    
    return {
      logout
    };
  },
};
</script>
