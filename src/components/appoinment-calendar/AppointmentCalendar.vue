<template>
  <div>
    <!---->

    <a-layout-content>

      <Title :title="$t('appointmentCalendar.appointmentCalendar')" @calenderToggle="calenderView($event)"
        :isActive="toggle" :button="{
            fullCalendarView: $t('appointmentCalendar.fullCalendarView'),
            hideCalendarView:$t('appointmentCalendar.hideCalendarView')
          }" />
      <a-row :gutter="24">
        <a-col :xl="6" :sm="10" :xs="24" v-show="toggle">
          <div class="apptBtn">
            <a-button class="btn primaryBtn" @click="showModal(true)">
              {{$t('appointmentCalendar.newAppointment')}}</a-button>
          </div>

          <Calendar @is-click="tabClick($event)" :tabType="activeKey" />
          <Physicians v-if="staffList" :staff="staffList" />
        </a-col>
        <a-col :xl="toggle == false ? 24 : 18" :sm="toggle == false ? 24 : 14" :xs="24">
          <a-tabs v-model:activeKey="activeKey" @change="selectDate(activeKey)">

            <a-tab-pane key="1" tab="Day">

              <DayAppointment />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tomorrow">
              <DayAppointment />
            </a-tab-pane>
            <a-tab-pane key="3" tab="Week">

              <WeekAppointment></WeekAppointment>
            </a-tab-pane>
            <a-tab-pane key="4" tab="Month">
              <MonthAppointment />
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </a-layout-content>
    <!--modal-->
    <AddAppointment v-if="staffList && patientsList" v-model:visible="appointmentModal" @ok="handleOk"
      @is-visible="showModal($event)" :staff="staffList" :patient="patientsList" />

    <!---->
  </div>
</template>

<script>
  import AddAppointment from "@/components/modals/AddAppointment";

  import Title from "./Title"
  import Calendar from "./Calendar"
  import Physicians from "./Physicians"
  import DayAppointment from "./DayAppointment"
  import MonthAppointment from "./MonthAppointment"
  import WeekAppointment from "./WeekAppointment"
  import { ref, watchEffect, computed } from "vue";
  import { useStore } from "vuex"
  import moment from "moment"
  import { timeStamp } from "../../commonMethods/commonMethod"
  //import Loader from "../loader/Loader"
  export default {
    components: {
      AddAppointment,
      Title,
      Calendar,
      Physicians,
      DayAppointment,
      MonthAppointment,
      WeekAppointment,
      // Loader
    },

    setup() {
      const toggle = ref(true);
      const activeKey = ref('1');
      const store = useStore()
      const fromDate = ref(timeStamp(moment()))
      const toDate = ref(timeStamp(moment()))
      let datePick = moment()
      function tabClick(event) {
        store.state.appointment.searchAppointmentRecords = ""
        activeKey.value = ref('1')
        fromDate.value = timeStamp(event)
        toDate.value = timeStamp(event)
        datePick = event
        searchApi()
      }

      function selectDate(value) {
        store.state.appointment.searchAppointmentRecords = ""
        //console.log("dfsd",value)
        if (value == 1) {
          datePick = moment()
          fromDate.value = timeStamp(moment())
          toDate.value = timeStamp(moment())
        } else if (value == 2) {
          datePick = moment().add(1, 'days')
          fromDate.value = timeStamp(moment().add(1, 'days'))
          toDate.value = timeStamp(moment().add(1, 'days'))
        } else if (value == 3) {
          datePick = moment(moment().add(1, 'days')).startOf('week')
          store.dispatch("weekName", { from: moment(moment().add(1, 'days')).startOf('week'), to: moment(moment()).endOf('week') })
          fromDate.value = timeStamp(moment())
          toDate.value = timeStamp(moment().add(7, 'days'))
        } else if (value == 4) {
          datePick = moment()
          fromDate.value = timeStamp(moment())
          toDate.value = timeStamp(moment().add(30, 'days'))
        } else {
          datePick = moment()
          toDate.value = timeStamp(moment().add(1, 'days'))
        }
        searchApi()
      }
      watchEffect(() => {
        store.dispatch("patientsList")
        store.dispatch("staffList")
        searchApi()
      })
      function searchApi() {
        store.state.appointment.calendarDate=''
        store.dispatch("calendarDateSelect", datePick)
        store.dispatch("searchAppointment", "?fromDate=" + fromDate.value + "&toDate=" + toDate.value)
      }
      const patientsList = computed(() => {
        return store.state.communications.patientsList
      })
      const staffList = computed(() => {
        return store.state.communications.staffList
      })
      function calenderView(event) {
        toggle.value = event
      }
      const appointmentModal = ref(false);
      const showModal = (event) => {
        appointmentModal.value = event;
      };
      const handleOk = (e) => {
        console.log(e);
        appointmentModal.value = false;
      };


      // const handleOk2 = (e) => {
      //   console.log(e);
      //   physicianModal.value = false;
      // };

      return {
        activeKey,
        selectDate,
        fromDate,
        toDate,
        patientsList,
        staffList,
        calenderView,
        value1: ref(),
        toggle,
        // value,
        // onPanelChange,
        // getMonths,
        // getYears,
        tabClick,
        appointmentModal,
        handleOk,
        showModal,
        searchApi,
        datePick,
        // handleOk2,

        //physicianModal,
      };
    },
  };
</script>

<style scoped>
  .apptBtn {
    text-align: center;
    margin: 0 0 25px 0;
  }
</style>