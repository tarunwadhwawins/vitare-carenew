<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
          <Sidebar/>
        </a-layout-sider>
        <a-layout-content>
          <a-row class="mb-24">
            <MainHeader heading="Dashboard" buttonText=""></MainHeader>
            <a-col :span="24">
              <a-row :gutter="24">
                <Card customClass="bg-white one" :count="totalPatients.count" text="Total Patients"></Card>
                <Card customClass="bg-purple" :count="newPatients.count" text="New Patients"></Card>
                <Card customClass="bg-pink" :count="criticalPatients.count" text="Critical Patients"></Card>
                <Card customClass="bg-yellow" :count="abnormalPatients.count" text="Abnormal Patients"></Card>
                <Card customClass="bg-sky" :count="activePatients.count" text="Active Patients"></Card>
                <Card customClass="bg-blue" :count="inactivePatients.count" text="Inactive Patients"></Card>
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
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
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

export default {
  components: {
    Header,
    Sidebar,
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
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
    }
  },
  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }
    return {
      logout
    };
  },
  created() {
  }
};
</script>
