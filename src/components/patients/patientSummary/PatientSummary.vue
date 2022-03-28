<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <Loader />
          <a-row>
            <a-col :xl="5" :lg="10">
              <h2 class="pageTittle">{{$t('patientSummary.patientSummary')}}</h2>
            </a-col>
            <a-col :xl="11" :lg="14">
              <div class="pageTittle">
                <div class="filter">
                  <a-button @click="showButton1" :class="button == 1 ? 'active' : ''" >Default</a-button>
                  <a-button @click="showButton2" :class="button == 2 ? 'active' : ''" >Timeline</a-button>
                  <a-button @click="showButton3" :class="button == 3 ? 'active' : ''" >Care Plan</a-button>
                  <a-button @click="showButton4" :class="button == 4 ? 'active' : ''" >Patient Vitals</a-button>
                </div>
              </div>
            </a-col>
            <a-col :xl="8" :lg="24">
              <div class="timer">
                <h3>{{$t('patientSummary.currentSession')}} : {{formattedElapsedTime}}</h3>
                <a-button v-if="startOn" class="primaryBtn" @click="start">{{$t('patientSummary.startTimer')}}</a-button>
                <a-button v-if="!startOn" class="primaryBtn" id="timer" @click="showStopTimerModal">{{$t('patientSummary.stopTimer')}}</a-button>
              </div>
            </a-col>
            <a-col :sm="24">
              <CriticalNotes v-if="patientCriticalNotes && patientCriticalNotes.length > 0" />
            </a-col>
            <a-col :sm="24" :xs="24">
              <div v-if="button == 1">
                <DefaultView/>
              </div>
              <div v-if="button == 2">
                <TimelineView/>
              </div>
              <div v-if="button == 3">
                <CarePlanView/>
              </div>
              <div v-if="button == 4">
                <PatientVitalsView/>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <AddTimeLogModal v-if="stoptimervisible" v-model:visible="stoptimervisible" :isTimeLog="isTimeLog" :timerValue="formattedElapsedTime" @closeModal="handleOk" @cancel="start" />
    <!-- <TimeTracker v-model:visible="stoptimervisible" @ok="handleOk" /> -->
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import DefaultView from "@/components/patients/patientSummary/views/DefaultView";
import TimelineView from "@/components/patients/patientSummary/views/TimelineView";
import CarePlanView from "@/components/patients/patientSummary/views/CarePlanView";
import PatientVitalsView from "@/components/patients/patientSummary/views/PatientVitalsView";
import CriticalNotes from "@/components/patients/patientSummary/common/CriticalNotes";
import Loader from "@/components/loader/Loader";
import AddTimeLogModal from "@/components/modals/AddTimeLogs";

import dayjs from "dayjs";
import { ref, computed, watchEffect,onBeforeMount} from "vue";
import { useStore } from 'vuex';
import { useRoute  } from 'vue-router';
import {
  timeStamp,
  getSeconds,
} from '@/commonMethods/commonMethod';
const value = ref(dayjs("12:08", "HH:mm"));

export default {
  components: {
    Header,
    Sidebar,
    // TimeTracker,
    DefaultView,
    TimelineView,
    CarePlanView,
    PatientVitalsView,
    Loader,
    AddTimeLogModal,
    CriticalNotes,
  },
  setup() {
    localStorage.removeItem('timeLogId')
    const store = useStore();
    const route = useRoute();
    const patientUdid = route.params.udid
    
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible7 = ref(false);
    const visible8 = ref(false);
    const visible9 = ref(false);
    const notevisible = ref(false);
    const devicevisible = ref(false);
    const documentvisible = ref(false);
    const addnotesvisible = ref(false);
    const timelogsvisible = ref(false);
    const bloodoxygenvisible = ref(false);
    const bloodglucosevisible = ref(false);
    const stoptimervisible = ref(false);
    
    const startOn = ref(false);

    const onClose = (e) => {
      console.log(e, "I was closed.");
    };

    const custom = ref(false);
    const current = ref(0);

    const handleOkcustom = (e) => {
      console.log(e);
      custom.value = false;
    };
    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const patientCriticalNotes = computed(() => {
      return store.state.patients.patientCriticalNotes
    })


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
    function showButton4() {
      button.value = 4;
    }

    // Countdown Timer
    const elapsedTime = ref(0)
    const timer = ref(undefined)
    const myInterval = ref(undefined)
    
    const formattedElapsedTime = computed(() => {
      const date = new Date(null);
      date.setSeconds(elapsedTime.value / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    })
    const timerValue = ref(30000)
    
    watchEffect(() => {
      timer.value = setInterval(() => {
        elapsedTime.value += 1000;
        if((elapsedTime.value)%timerValue.value === 0) {
          const newFormattedElapsedTime = getSeconds(formattedElapsedTime.value)
          const timeLogId =  localStorage.getItem('timeLogId')
          if((timeLogId && timeLogId != null)) {
            const data = {
              category: '',
              loggedBy: 'gfdgfhggfhhfgh',
              performedBy: 'gfdgfhggfhhfgh',
              date: timeStamp(new Date()),
              timeAmount: newFormattedElapsedTime,
              cptCode: '',
              note: 'Time Log',
              isAutomatic: true,
            }
            store.dispatch('updatePatientTimeLog', {
              timeLogId: timeLogId,
              patientUdid: patientUdid,
              data: data
            }).then(() => {
              store.dispatch('latestTimeLog', patientUdid)
            });
          }
          else {
            const data = {
              category: '',
              loggedBy: 'gfdgfhggfhhfgh',
              performedBy: 'gfdgfhggfhhfgh',
              date: timeStamp(new Date()),
              timeAmount: newFormattedElapsedTime,
              cptCode: '',
              note: 'Time Log',
              isAutomatic: true,
            }
            store.dispatch('addTimeLog', {
              id: patientUdid,
              data: data
            }).then(() => {
              store.dispatch('latestTimeLog', patientUdid)
            });
          }
        }
      }, 1000);

      if(route.name == 'PatientSummary') {
        store.dispatch('patientVitals', {patientId: patientUdid, deviceType: 99});
        store.dispatch('patientVitals', {patientId: patientUdid, deviceType: 100});
        store.dispatch('patientVitals', {patientId: patientUdid, deviceType: 101});
        store.dispatch('devices', patientUdid)
        store.dispatch('activeCptCodes')
        store.dispatch('allPatientsList')
        store.dispatch('allStaffList')
        store.dispatch('flagsList')
        store.dispatch('patientFlagsList', patientUdid);
        store.dispatch('patientCriticalNotes', patientUdid);
        store.dispatch('familyMembersList', patientUdid);
        store.dispatch('physiciansList', patientUdid);
        store.dispatch('emergencyContactsList', patientUdid);
      }
    })

    const start = () => {
      timer.value = setInterval(() => {
        elapsedTime.value += 1000;
        if((elapsedTime.value)%timerValue.value === 0) {
          const newFormattedElapsedTime = getSeconds(formattedElapsedTime.value)
          const timeLogId =  localStorage.getItem('timeLogId')
          if((timeLogId && timeLogId != null)) {
            const data = {
              category: '',
              loggedBy: 'gfdgfhggfhhfgh',
              performedBy: 'gfdgfhggfhhfgh',
              date: timeStamp(new Date()),
              timeAmount: newFormattedElapsedTime,
              cptCode: '',
              note: 'Time Log',
              isAutomatic: true,
            }
            store.dispatch('updatePatientTimeLog', {
              timeLogId: timeLogId,
              patientUdid: patientUdid,
              data: data
            }).then(() => {
              store.dispatch('latestTimeLog', patientUdid)
            });
          }
          else {
            const data = {
              category: '',
              loggedBy: 'gfdgfhggfhhfgh',
              performedBy: 'gfdgfhggfhhfgh',
              date: timeStamp(new Date()),
              timeAmount: newFormattedElapsedTime,
              cptCode: '',
              note: 'Time Log',
              isAutomatic: true,
            }
            store.dispatch('addTimeLog', {
              id: patientUdid,
              data: data
            }).then(() => {
              store.dispatch('latestTimeLog', patientUdid)
            });
          }
        }
      }, 1000);
      startOn.value = false;
    }

    const isTimeLog = ref(false);
    const showStopTimerModal = () => {
      clearInterval(timer.value);
      clearInterval(myInterval.value);
      stoptimervisible.value = true;
      isTimeLog.value = true;
    };
  
    const handleOk = (e) => {
      elapsedTime.value = 0;
      startOn.value = true;
      console.log(e);
      visible.value = false;
      stoptimervisible.value = false;
    };
    
    onBeforeMount(() =>{
      window.addEventListener('beforeunload', (event) => {
        event.returnValue = 'ffghg';
      });
    })

    return {
      showStopTimerModal,
      formattedElapsedTime,
      isTimeLog,
      start,

      handleOkcustom,
      custom,
      next,
      prev,
      handleChange,

      visible,
      visible1,
      visible2,
      visible7,
      visible8,
      visible9,
      notevisible,
      devicevisible,
      documentvisible,
      addnotesvisible,
      timelogsvisible,
      bloodoxygenvisible,
      bloodglucosevisible,
      stoptimervisible,
      patientCriticalNotes,

      handleOk,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      activeKey: ref("2"),
      activeKey1: ref("8"),
      activeKey2: ref("10"),
      activeKey3: ref("12"),
      activeKey4: ref("14"),
      value1: ref(),
      size: ref("large"),
      value3: ref([]),
      value,
      dayjs,
      onClose,
      button,
      showButton1,
      showButton2,
      showButton3,
      showButton4,
      value10: ref([]),
      startOn,
    };

    
  },
  beforeRouteLeave (to, from, next) {
   var button= document.getElementById("timer")
   if(button){
     button.click()
     console.log(to, from)
   }else{
     next()
   }
    
    
  },
  
};
</script>

<style lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
}
</style>
