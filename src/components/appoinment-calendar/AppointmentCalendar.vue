<template>
  <div>
    <!---->
   
        <a-layout-content>
         
          <Title :title="$t('appointmentCalendar.appointmentCalendar')" @calenderToggle="calenderView($event)" :isActive="toggle" :button="{
            fullCalendarView: $t('appointmentCalendar.fullCalendarView'),
            hideCalendarView:$t('appointmentCalendar.hideCalendarView')
          }" />
          <a-row :gutter="24">
            <a-col :xl="6" :sm="10" :xs="24" v-show="toggle">
              <div class="apptBtn">
                <a-button class="btn primaryBtn" @click="showModal(true)">
                  {{$t('appointmentCalendar.newAppointment')}}</a-button
                >
              </div>
            
                <Calendar /> 
              <Physicians  v-if="staffList" :staff="staffList"/>
            </a-col>
            <a-col :xl="toggle == false ? 24 : 18" :sm="toggle == false ? 24 : 14" :xs="24">
              <a-tabs v-model:activeKey="activeKey">
                
                <a-tab-pane key="1" tab="Day">
                  <DayAppointment v-if="appointmentSearch" :todayRcord="appointmentSearch"/>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Tomorrow">
                  <DayAppointment v-if="appointmentSearch" :todayRcord="appointmentSearch"/>
                </a-tab-pane>
                <a-tab-pane key="3" tab="Week">
                  
                  <WeekAppointment></WeekAppointment>
                </a-tab-pane>
                <a-tab-pane key="4" tab="Month">
                 <MonthAppointment/>
                </a-tab-pane>
              </a-tabs>
            </a-col>
          </a-row>
        </a-layout-content>
    <!--modal-->
    <AddAppointment v-if="staffList && patientsList" v-model:visible="appointmentModal" @ok="handleOk" @is-visible="showModal($event)" :staff="staffList" :patient="patientsList"/>
    
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
import {  ref, watchEffect,computed } from "vue";
import { useStore } from "vuex"
export default {
  components: {
    AddAppointment,
    Title,
    Calendar,
    Physicians,
    DayAppointment,
   
    MonthAppointment,
    WeekAppointment
  },

  setup() {
    const toggle = ref(true);
    const store = useStore()
    // const value = ref();
    // const onPanelChange = (value, mode) => {
    //   console.log(value, mode);
    // };
    // const getMonths = (value) => {
    //   const localeData = value.localeData();
    //   const months = [];

    //   for (let i = 0; i < 12; i++) {
    //     months.push(localeData.monthsShort(value.month(i)));
    //   }
    //   return months;
    // };
    // const getYears = (value) => {
    //   const year = value.year();
    //   const years = [];
    //   for (let i = year - 10; i < year + 10; i += 1) {
    //     years.push(i);
    //   }
    //   return years;
    // };
    
    watchEffect(() => {
        store.dispatch("patientsList")
        store.dispatch("staffList")
        store.dispatch("searchAppointment","?fromDate=2022-01-21&toDate=2022-01-31")
      })
      const patientsList = computed(() => {
        return store.state.communications.patientsList
      })
      const staffList = computed(() => {
        return store.state.communications.staffList
      })
function calenderView(event){
  toggle.value=event
}
    const appointmentModal = ref(false);
    const showModal = (event) => {
      appointmentModal.value= event;
    };
    const handleOk = (e) => {
      console.log(e);
      appointmentModal.value = false;
    };

   const appointmentSearch = computed(() => {
     return store.state.appointment.searchAppointmentRecords
   })
    // const handleOk2 = (e) => {
    //   console.log(e);
    //   physicianModal.value = false;
    // };

    return {
      patientsList,
      staffList,
      calenderView,
      value1: ref(),
      toggle,
      // value,
      // onPanelChange,
      // getMonths,
      // getYears,

      appointmentModal,
      handleOk,
      showModal,
      appointmentSearch,
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
