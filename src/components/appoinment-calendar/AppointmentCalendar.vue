<template>
  <div>
    <!---->

    <a-layout-content v-if="appointmentSearch.searchAppointmentRecords">

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

          <Calendar  @is-click="selectDate($event)" />
          <Physicians v-if="staffList " :staff="staffList" />
          
          
        </a-col>
        <a-col :xl="toggle == false ? 24 : 18" :sm="toggle == false ? 24 : 14" :xs="24">
          <a-tabs v-model:activeKey="activeKey" @change="tabClick(activeKey)">

            <a-tab-pane key="1" tab="Day">

              <DayAppointment  />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tomorrow" >
              <DayAppointment  />
            </a-tab-pane>
            <a-tab-pane key="3" tab="Week">

              <WeekAppointment @is-dateClick="selectDate($event)" tabName="week"></WeekAppointment>
            </a-tab-pane>
            <a-tab-pane key="4" tab="Month">
              
              <MonthAppointment v-if="appointmentSearch.searchAppointmentRecords" :appointment="appointmentSearch.searchAppointmentRecords" @is-dateClick="selectDate($event)"  @is-month="monthDate($event)" :seclectDate="month"></MonthAppointment>
           
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </a-layout-content>
    <Loader v-else/>
    <!--modal-->
    <AddAppointment v-if="staffList && patientsList" :maskClosable = "maskebale" v-model:visible="appointmentModal" @ok="handleOk"
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
  import Loader from "../loader/Loader"
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
       Loader
    },

    setup() {
      const toggle = ref(true);
      const maskebale=ref(false)
      const activeKey = ref('1');
      const store = useStore()
     const month=ref(moment())
      const fromDate = ref(moment())
      const toDate = ref(moment())
      let datePick = moment()
///This fuction is working for date select in calendar and view appointment according select date
      function selectDate(event) {
        activeKey.value = ref('1')
        store.state.appointment.searchAppointmentRecords = ""
        fromDate.value = moment(event)
        toDate.value = moment(event)
        datePick = moment(event)
        searchApi()
      }
      function tabClick(value) {
        store.state.appointment.searchAppointmentRecords = ""
        if (value == 1) {
          activeKey.value = ref('1')
          datePick = moment()
          fromDate.value = moment()
          toDate.value = moment()
        } else if (value == 2) {
          datePick = moment().add(1, 'days')
          fromDate.value = moment().add(1, 'days')
          toDate.value = moment().add(1, 'days')
        } else if (value == 3) {
          datePick = moment(moment().add(1, 'days')).startOf('week')
          store.dispatch("weekName", { from: moment(moment().add(1, 'days')).startOf('week'), to: moment(moment()).endOf('week') })
          fromDate.value = moment(moment().add(1, 'days')).startOf('week')
          toDate.value = moment(moment()).endOf('week')
        } else if (value == 4) {
          datePick = moment()
          fromDate.value = moment().startOf('month')
          toDate.value = moment().endOf('month')
        } else {
          datePick = moment()
          fromDate.value = moment()
          toDate.value = moment().add(1, 'days')
        }
        searchApi()
      }
      function monthDate(event){
        activeKey.value = ref('4')
        month.value = moment(event)
        store.state.appointment.searchAppointmentRecords=''
        datePick = moment(event)
          fromDate.value = moment(event).startOf('month')
          toDate.value = moment(event).endOf('month')
          store.dispatch("searchAppointment", { fromDate: fromDate.value, toDate: toDate.value, tabId: 4 })
          
      }
      watchEffect(() => {
        store.dispatch("patientsList")
        store.dispatch("staffList")
        searchApi()
      })
      function searchApi() {
        store.state.appointment.calendarDate = ''
        store.dispatch("calendarDateSelect", datePick)
        store.dispatch("searchAppointment", { fromDate: fromDate.value, toDate: toDate.value, tabId: activeKey.value })
      }
      const patientsList = computed(() => {
        return store.state.communications.patientsList
      })
      const staffList = computed(() => {
        return store.state.common.staffList
      })
      function calenderView(event) {
        toggle.value = event
      }
      const appointmentModal = ref(false);
      const showModal = (event) => {
        if(event.date){
          selectDate(event.date)
          appointmentModal.value = event.check;
        }else{
          appointmentModal.value = event;
        }
        
        
      };
      const handleOk = (e) => {
        console.log(e);
        appointmentModal.value = false;
      };

      const appointmentSearch = store.getters.appointmentRecords.value
    
      // const handleOk2 = (e) => {
      //   console.log(e);
      //   physicianModal.value = false;
      // };

      return {
        month,
        appointmentSearch,
        maskebale,
        activeKey,
        selectDate,
        fromDate,
        toDate,
        patientsList,
        staffList,
        calenderView,
        value1: ref(),
        toggle,
        tabClick,
        appointmentModal,
        handleOk,
        showModal,
        searchApi,
        datePick,
        monthDate,
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