<template>
  <a-layout-content>
    <a-row>
      <MainHeader heading="Dashboard" buttonText="" :visibility="false"></MainHeader>
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
    <a-row :gutter="24" v-if="totalPatients">
      <Appointment :todayappointment="todayappointment"></Appointment>
      <VirtualWaitingRoom :newappointment="newappointment" :future="futureappointment"></VirtualWaitingRoom>
      <PatientsChart :data="[newPatients.count,abnormalPatients.count,criticalPatients.count]"
        :categories="[newPatients.text,abnormalPatients.text, criticalPatients.text]"></PatientsChart>
      <a-col :sm="12" :xs="24">
        <a-card title="Care Coordinator Stats " class="common-card">
          <a-tabs v-model:activeKey="activeKey1">
            <a-tab-pane key="1" tab="Specialization " v-if="specialization">
              <SpecializationChart :data="[specialization.total,wellness.total]"
                :categories="[specialization.specialization,wellness.specialization]"></SpecializationChart>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Network " force-render v-if="totalPatients">

              <NetworkChart :categories="[networkin.network,networkout.network]"
                :data="[networkin.total,networkout.total]"></NetworkChart>
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
      <AppointmentSummary :data="appointmentcount.map((item) =>  item.total )"
        :categories="appointmentcount.map((item) =>  item.month )"></AppointmentSummary>
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
  import { useStore } from "vuex"

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

    setup() {
      const store = useStore()
   

      watchEffect(() => {
        store.dispatch("todayappointment")
        store.dispatch("newPatients")
        store.dispatch("abnormalPatients")
        store.dispatch("activePatients")
        store.dispatch("inactivePatients")
        store.dispatch("criticalPatients")
        store.dispatch("specialization", 1)
        store.dispatch("specialization", 2)
        store.dispatch("network", 1)
        store.dispatch("network", 2)
        store.dispatch("appointmentcount")
        store.dispatch("appointment", 1)
        store.dispatch("appointment", 2)   
        store.dispatch("totalPatients")
      })

      const totalPatients = computed(() => {
        return store.state.dashBoard.tcount
      })
      const newPatients = computed(() => {
        return store.state.dashBoard.ncount
      })
      const criticalPatients = computed(() => {
        return store.state.dashBoard.critcount
      })
      const abnormalPatients = computed(() => {
        return store.state.dashBoard.abcount
      })
      const activePatients = computed(() => {
        return store.state.dashBoard.activecount
      })
      const inactivePatients = computed(() => {
        return store.state.dashBoard.inactivecount
      })
      const specialization = computed(() => {

        return store.state.dashBoard.specialization
      })
      const networkin = computed(() => {

        return store.state.dashBoard.networkin
      })
      const networkout = computed(() => {

        return store.state.dashBoard.networkout
      })
      const wellness = computed(() => {

        return store.state.dashBoard.wellness
      })
      const appointmentcount = computed(() => {

        return store.state.dashBoard.appointmentcount
      })
      const futureappointment = computed(() => {

        return store.state.dashBoard.futureappointment
      })
      const todayappointment = computed(() => {

        return store.state.dashBoard.todayappointment
      })
      const newappointment = computed(() => {

        return store.state.dashBoard.newappointment
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
        networkin,
        networkout,
        appointmentcount,
        futureappointment,
        newappointment,
        todayappointment,

      };
    },
  };
</script>
