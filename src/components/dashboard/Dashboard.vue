<template>
  <a-layout-content>
    <a-row>
      <MainHeader heading="Dashboard" buttonText=""></MainHeader>
      <a-col :span="24" v-if="totalPatients">
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
    <!-- <a-row :gutter="24">
      <PatientsStats></PatientsStats>
      <VirtualWaitingRoom></VirtualWaitingRoom>
    </a-row> -->
    <a-row :gutter="24">
      <Appointment></Appointment>
      <VirtualWaitingRoom></VirtualWaitingRoom>
      <PatientsChart></PatientsChart>
      <a-col :sm="12" :xs="24">
        <a-card title="Care Coordinator Stats " class="common-card">
          <a-tabs v-model:activeKey="activeKey1">
            <a-tab-pane key="1" tab="Specialization " v-if="specialization">
              <SpecializationChart :data="[specialization.total,wellness.total]" :categories="[specialization.specialization,wellness.specialization]"></SpecializationChart>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Network " force-render>

              <NetworkChart></NetworkChart>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <CptChart></CptChart>
      <FinancialChart></FinancialChart>
    </a-row>
    
    <a-row :gutter="24" v-if="totalPatients">
      <TotalPatientsChart
        :chart="[totalPatients.count, newPatients.count, criticalPatients.count, abnormalPatients.count, activePatients.count, inactivePatients.count]"
        :lable="[totalPatients.text,newPatients.text,criticalPatients.text,abnormalPatients.text,activePatients.text,inactivePatients.text]">
      </TotalPatientsChart>
      <AppointmentSummary></AppointmentSummary>
    </a-row>
  </a-layout-content>
</template>
<script>
  import { ref, watchEffect, computed } from 'vue'
  import MainHeader from "@/components/common/MainHeader";
  import Card from "@/components/common/cards/Card";
  import Appointment from "./Appointment";
  import VirtualWaitingRoom from "./VirtualWaitingRoom";
  import TotalPatientsChart from "./TotalPatientsChart";
  import AppointmentSummary from "./AppointmentSummary";
  import FinancialChart from "./FinancialChart"
  import PatientsChart from "./PatientsChart"
  import SpecializationChart from "./care-coordinator/SpecializationChart"
  import NetworkChart from "./care-coordinator/NetworkChart"
  import CptChart from "./CptChart"
  import { useStore }  from "vuex"

  export default {

    components: {
      MainHeader,
      Card,
      Appointment,
      VirtualWaitingRoom,
      PatientsChart,
      SpecializationChart,
      NetworkChart,
      CptChart,
      TotalPatientsChart,
      AppointmentSummary,
      FinancialChart,
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
      const store = useStore()
      

      watchEffect(() => {
        store.dispatch("totalPatients")
        store.dispatch("newPatients")
        store.dispatch("abnormalPatients")
        store.dispatch("activePatients")
        store.dispatch("inactivePatients")
        store.dispatch("criticalPatients")
        store.dispatch("specialization",1)
        store.dispatch("specialization",2)
      })

      const totalPatients = computed(()=>{
        return store.state.dashBoard.tcount
      })
      const newPatients = computed(()=>{
        return store.state.dashBoard.ncount 
      })
      const criticalPatients = computed(()=>{
        return store.state.dashBoard.critcount
      })
      const abnormalPatients = computed(()=>{
        return store.state.dashBoard.abcount
      })
      const activePatients = computed(()=>{
        return store.state.dashBoard.activecount
      })
      const inactivePatients = computed(()=>{
        return store.state.dashBoard.inactivecount
      })
      const specialization = computed(()=>{

        return store.state.dashBoard.specialization
      })
      const wellness = computed(()=>{

return store.state.dashBoard.wellness
})

 
      
      return {
        totalPatients,
        newPatients,
        criticalPatients,
        abnormalPatients,
        activePatients,
        inactivePatients,
        specialization,
        wellness,
   

      };
    },
  };
</script>
