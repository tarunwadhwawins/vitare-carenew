<template>
  <a-layout-content>
    <a-row>
      <a-col :span="24">
        <h2 class="pageTittle">
          {{$t('global.dashboard')}}

          <div class="filter" v-if="timeline">

            <a-button v-for="item in timeline['globalCode']" :key="item.id" @click="showButton(item.id)"
              :class="timeLineButton== item.id ? 'active' : ''"> {{item.name}}</a-button>
          </div>
        </h2>
      </a-col>
      <a-col :span="24">

        <a-row :gutter="24" v-if="grid">

          <Card v-for="item in totalPatients" :key="item.count" :count="item.total" :text='item.text'
            link="manage-patients" :xl="grid.xlGrid" :color="item.color" :sm="grid.smGrid" :textColor="item.textColor">
          </Card>

        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <Appointement v-if="data4" :appointment="dateFormat(data4)" :columns="columns4"
        :title="$t('dashboard.todayAppointment')">
      </Appointement>

      <a-col :sm="12" :xs="24" v-if="callStatus">
        <ApexChart :title="$t('global.callQueue')" type="bar" :height="250" :options="callStatus.calloption"
          :series="callStatus.callseries" linkTo="communications" />
      </a-col>
    </a-row>

    <a-row :gutter="24">

      <a-col :sm="12" :xs="24" v-if="patientsCondition">

        <ApexChart title="Patients Stats" type="bar" :height="412" :options="patientsCondition.option1"
          :series="patientsCondition.series1" linkTo="manage-patients">
        </ApexChart>

      </a-col>
      <a-col :sm="12" :xs="24" v-if="specialization">
        <a-card :title="$t('dashboard.careCoordinatorStats') " class="common-card">
          <a-tabs default-active-key="activeKey1">
            <a-tab-pane key="1" tab="Specialization" v-if="specialization">
              <ApexChart type="bar" :height="350" :options="specialization.wellness" :series="specialization.behavior"
                linkTo="manage-care-coordinator"></ApexChart>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Network " force-render v-if="network">
              <ApexChart type="bar" :height="350" v-if="network" :options="network.In" :series="network.Out"
                linkTo="manage-care-coordinator">
              </ApexChart>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">

      <a-col :sm="12" :xs="24" v-if="specialization">

        <ApexChart :title="$t('dashboard.cPTCodeBillingSummary')" type="bar" :height="350" :options="cptCodeValue.code"
          :series="cptCodeValue.value" linkTo="cpt-codes"></ApexChart>

      </a-col>
      <a-col :sm="12" :xs="24" v-if="specialization">

        <!-- <div class="list-group">
                  <div class="list-group-item">
                    <div class="name">Billed</div>
                    <div class="value">4567 $</div>
                  </div>
                </div> -->
        <ApexChart :title="$t('dashboard.financialStats')" type="pie" :height="362" :options="financialValue.billed"
          :series="financialValue.due" linkTo="time-tracking-report"></ApexChart>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24" v-if="totalPatientsChartValue">

        <ApexChart :title="$t('dashboard.totalPatientsChart')" type="area" :height="350"
          :options="totalPatientsChartValue.chartOptions" :series="totalPatientsChartValue.series"
          linkTo="manage-patients"></ApexChart>

      </a-col>
      <a-col :sm="12" :xs="24" v-if="appointmentChartValue">
        <ApexChart :title="$t('dashboard.appointmentSummary')" type="area" :height="350"
          :options="appointmentChartValue.chartOptions" :series="appointmentChartValue.series"
          linkTo="appointment-calendar"></ApexChart>
      </a-col>
    </a-row>
  </a-layout-content>

  <!---->

</template>

<script>

  import { watchEffect, computed } from 'vue'
  import Card from "@/components/common/cards/Card"
  import Appointement from "./Appointment"
  import ApexChart from "@/components/common/charts/ApexChart";
  import moment from 'moment';
  import { useStore } from 'vuex'
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

      dataIndex: 'date',
    },
    {
      title: "Appointment With",
      dataIndex: "staff['name']",
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
      Card,
      Appointement,
      ApexChart
    },

    setup() {
      const store = useStore()
      const timeline = computed(() => {
        return store.state.common.timeline
      })
      const timeLineButton = computed(() => {
        return store.state.dashBoard.timeLineButton
      })
      function apiCall(data) {
        store.dispatch("counterCard", data.value)
        store.dispatch("todayAppointment", data.value)
        store.dispatch("callStatus", data.value)
        store.dispatch("specialization", data.value)

        store.dispatch("network", data.value)

        store.dispatch("cptCode", data.value)
        store.dispatch("financial", data.value)
        store.dispatch("totalPatientsChart", data.value)
        store.dispatch("appointmentChart", data.value)
      }
      watchEffect(() => {
        apiCall(timeLineButton)

      })
      function dateFormat(data) {

        data.map(el => {
          let date = moment(new Date(el.date));
          el.date = date.format("MMM DD, YYYY") + ", " + moment(el.time, "HH:mm:ss").format("hh:mm A")
        })
        return data
      }
      const totalPatients = computed(() => {
        return store.state.counterCards.totalPatientcount
      })
      const grid = computed(() => {
        return store.state.counterCards.grid
      })
      const patientsCondition = computed(() => {
        return store.state.counterCards.patientsCondition
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


      function showButton(id) {
        store.state.dashBoard.timeLineButton = id;
        apiCall(timeLineButton)
      }

      return {
        dateFormat,
        grid,
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
        timeLineButton,
        showButton,
        timeline
      };
    },
  };
</script>