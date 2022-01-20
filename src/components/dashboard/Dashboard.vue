<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                {{$t('global.dashboard')}}
                <div class="filter">
                  <button class="btn active">
                    <span class="btn-content">{{$t('global.day')}}</span>
                  </button>
                  <button class="btn">
                    <span class="btn-content">{{$t('global.week')}}</span>
                  </button>
                  <button class="btn">
                    <span class="btn-content">{{$t('global.month')}}</span>
                  </button>
                </div>
              </h2>
            </a-col>
            <a-col :span="24">

              <a-row :gutter="24" v-if="xlGrid">
              
                <Card v-for="item in totalPatients" :key="item.count"  :count="item.count" :text='item.text' link="manage-patients" :xl="xlGrid" :color="item.color" :textColor="item.textColor" :draggable="true">
                </Card>
              
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="24">

            <Appointement v-if="data4" :appointment="data4" :columns="columns4"
              :title="$t('dashboard.todayAppointment')">
            </Appointement>
            <a-col :sm="12" :xs="24" v-if="callStatus">
              <ApexChart :title="$t('global.callQueue')" type="bar" :height="250" :options="callStatus.calloption"
                :series="callStatus.callseries" linkTo="communications" />
            </a-col>
            <a-col :sm="12" :xs="24" v-if="patientsCondition">

              <ApexChart title="Patients Stats"  type="bar" :height="412"
                :options="patientsCondition.option1" :series="patientsCondition.series1" linkTo="manage-patients">
              </ApexChart>

            </a-col>
           
            <a-col :sm="12" :xs="24" >
              <a-card :title="$t('dashboard.careCoordinatorStats') " class="common-card">
                <a-tabs default-active-key="activeKey1">
                  <a-tab-pane key="1" tab="Specialization" v-if="specialization">
                    <ApexChart type="bar"  :height="350" :options="specialization.wellness"
                      :series="specialization.behavior" linkTo="manage-care-coordinator"></ApexChart>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Network " force-render v-if="network">
                    <ApexChart type="bar"  :height="350" v-if="network" :options="network.In" :series="network.Out"
                      linkTo="manage-care-coordinator">
                    </ApexChart>
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-col>
          </a-row>
          <a-row :gutter="24" >
            <a-col :sm="12" :xs="24" v-if="cptCodeValue">

              <ApexChart  :title="$t('dashboard.cPTCodeBillingSummary')" type="bar" :height="350"
                :options="cptCodeValue.code" :series="cptCodeValue.value" linkTo="cpt-codes"></ApexChart>

            </a-col>
            <a-col :sm="12" :xs="24" v-if="financialValue">

              <!-- <div class="list-group">
                  <div class="list-group-item">
                    <div class="name">Billed</div>
                    <div class="value">4567 $</div>
                  </div>
                </div> -->
              <ApexChart :title="$t('dashboard.financialStats')"  type="pie" :height="362"
                :options="financialValue.billed" :series="financialValue.due" linkTo="time-tracking-report"></ApexChart>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :sm="12" :xs="24" v-if="totalPatientsChartValue">

              <ApexChart  :title="$t('dashboard.totalPatientsChart')" type="area"
                :height="350" :options="totalPatientsChartValue.chartOptions" :series="totalPatientsChartValue.series"
                linkTo="manage-patients"></ApexChart>

            </a-col>
            <a-col :sm="12" :xs="24" v-if="appointmentChartValue">
              <ApexChart  :title="$t('dashboard.appointmentSummary')" type="area"
                :height="350" :options="appointmentChartValue.chartOptions" :series="appointmentChartValue.series"
                linkTo="appointment-calendar"></ApexChart>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
  </div>
</template>

<script>
  import Header from "../layout/header/Header";
  import Sidebar from "../layout/sidebar/Sidebar";
  import { useRouter } from "vue-router";
  import { ref, watchEffect, computed } from 'vue'
  import { useStore } from "vuex"
  import Card from "@/components/common/cards/Card"
  import Appointement from "./Appointment"
  import ApexChart from "@/components/common/charts/ApexChart";
  const columns4 = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      slots: {
        customRender: "patientName",

      },
    },
    {
      title: "Date Time",
     
      dataIndex: 'startDateTime',
    },
    {
      title: "Appointment With",
      dataIndex: "staff",
      slots: {
        customRender: "staff",
      },
    },
  ];

  const columns5 = [
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
  const data5 = [
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
  ];
  const columns6 = [
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
  const data6 = [
    {
      key: "1",
      patient: "Robert",
      appt: "Wellness",
      time: "02:30 PM",
    },
    {
      key: "2",
      patient: "	Steve",
      appt: "Clinical",
      time: "10:30 AM",
    },
  ];
  export default {
    components: {
      Header,
      Sidebar,
      Card,
      Appointement,
      ApexChart
    },

    setup() {
      const store = useStore()
      const router = useRouter();
      watchEffect(() => {
        store.dispatch("totalPatients")
        store.dispatch("todayAppointment")
        store.dispatch("callStatus")
        // store.dispatch("abnormalPatients")
        // store.dispatch("activePatients")
        // store.dispatch("inactivePatients")
        // store.dispatch("criticalPatients")
        // store.dispatch("newPatients")
        // store.dispatch("patientsStats")
        store.dispatch("specialization")

        store.dispatch("network")

        store.dispatch("cptCode")
        store.dispatch("financial")
        store.dispatch("totalPatientsChart")
        store.dispatch("appointmentChart")
        
      })


      // const criticalPatients = computed(() => {
      //   return store.state.counterCards.criticalPaitientcount
      // })
      // const abnormalPatients = computed(() => {
      //   return store.state.counterCards.abnormalPaitientcount
      // })
      // const activePatients = computed(() => {
      //   return store.state.counterCards.activePaitientcount
      // })
      // const inactivePatients = computed(() => {
      //   return store.state.counterCards.inActivePaitientcount
      // })
      const totalPatients = computed(() => {
        return store.state.counterCards.totalPatientcount
      })
      const xlGrid = computed(() => {
        return store.state.counterCards.xlGrid
      })
      const patientsCondition = computed(() => {
        return store.state.dashBoard.patientsCondition
      })
      const data4 = computed(() => {
        return store.state.dashBoard.todayAppointmentState
      })
      const callStatus = computed(() => {
        return store.state.dashBoard.callStatus
      })
      const specialization = computed(() => {

        return store.state.dashBoard.specialization
      })

      const network = computed(() => {

        return store.state.dashBoard.network
      })

      const cptCodeValue = computed(() => {

        return store.state.dashBoard.cptCodeValue
      })
      const financialValue = computed(() => {

        return store.state.dashBoard.financialValue
      })
      const totalPatientsChartValue = computed(() => {

        return store.state.dashBoard.totalPatientsChartValue
      })
      const appointmentChartValue = computed(() => {

        return store.state.dashBoard.appointmentChartValue
      })
 
      function logout() {
        localStorage.removeItem("auth");
        localStorage.clear();
      }

      const button = ref(1);

      function showButton1() {
        button.value = 1;
      }
      function showButton2() {
        button.value = 2;
      }
      function showButton3() {
        button.value = 3;
      }
      return {
        xlGrid,
        // inactivePatients,
        // abnormalPatients,
        // criticalPatients,
        // activePatients,
        totalPatients,
        callStatus,
        patientsCondition,
        specialization,
        network,
        cptCodeValue,
        financialValue,
        totalPatientsChartValue,
        appointmentChartValue,
        logout,
        data4,
        columns4,
        data5,
        columns5,
        data6,
        columns6,
        button,
        showButton1,
        showButton2,
        showButton3,


        // todayApointment
      };
    },
  };
</script>