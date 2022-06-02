<template>
  <div>
    
    <a-layout >
      
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <TableLoader v-if="loader"/>
        <a-layout-content v-else >
         
          <a-row>
            <a-col :xl="4" :lg="12">
             
                
                  <h2 class="pageTittle">{{$t('patientSummary.patientSummary')}}</h2>
                
               
             
            </a-col>
             <a-col :xl="3" :lg="12">
                  <a-button class="blueBtn" @click="startCall" :loading="iconLoading">Start Call</a-button>
                  <!-- <router-link class="blueBtn" :to="{ name: 'videoCall', params: { id: enCodeString(conferenceId) } }" target="_blank">Start Call</router-link> -->
                </a-col>
            <a-col :xl="9" :lg="12">
              <div class="pageTittle">
                <div class="filter">
                  <a-button @click="showButton(1) ; actionTrack(paramsId,323,'patient')" :class="button == 1 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 323)">Default</a-button>
                  <a-button @click="showButton(2) ; actionTrack(paramsId,285,'patient')" :class="button == 2 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 285)">Timeline</a-button>
                  <a-button @click="showButton(3) ; actionTrack(paramsId,286,'patient')" :class="button == 3 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 286)">Care Plan</a-button>
                  <a-button @click="showButton(4) ; actionTrack(paramsId,287,'patient')" :class="button == 4 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 287)">Patient Vitals</a-button>
                  <a-button @click="showButton(5) ; actionTrack(paramsId,287,'patient')" :class="button == 5 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 287)">Escalation</a-button>
                </div>
              </div>
            </a-col>
            <a-col :xl="8" :lg="24">
              <!-- <div class="timer" @click="actionTrack(paramsId,288,'patient')" v-if="arrayToObjact(screensPermissions, 288)"> -->
                <div class="timer" @click="actionTrack(paramsId,288,'patient')" >
                <h3>{{$t('patientSummary.currentSession')}} : {{formattedElapsedTime}}</h3>
                <a-button v-if="startOn" class="primaryBtn" @click="startTimer">{{$t('patientSummary.startTimer')}}</a-button>
                <a-button v-if="!startOn" class="primaryBtn" id="timer" @click="stopTimer">{{$t('patientSummary.stopTimer')}}</a-button>
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
              <div v-if="button == 5">
                <Escalation :patientId="paramsId"/>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <AddTimeLogModal v-if="stoptimervisible" v-model:visible="stoptimervisible" :isAutomatic="isAutomatic" :isEditTimeLog="isEditTimeLog" :timerValue="formattedElapsedTime" @closeModal="handleClose" @cancel="handleClose"  />
    <!-- <StartCallModal v-model:visible="startCallModalVisible" @closeModal="handleClose" @cancel="handleClose" /> -->
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
import Escalation from "@/components/escalations/Escalation"
import TableLoader from "@/components/loader/TableLoader"; 
import AddTimeLogModal from "@/components/modals/AddTimeLogs";
// import StartCallModal from "@/components/modals/StartCallModal";

import dayjs from "dayjs"; 
import { ref, computed, watchEffect,onBeforeMount, onUnmounted,reactive, onMounted} from "vue";
import { useStore } from 'vuex';
import { useRoute,useRouter  } from 'vue-router';
import {
  timeStamp,
  getSeconds,
  actionTrack,
  enCodeString,
  arrayToObjact
} from '@/commonMethods/commonMethod';
const value = ref(dayjs("12:08", "HH:mm"));
const cancelButton = ref('')
function clearEvent(event){
        event.returnValue = '';
      
    }
export default {
  components: {
    Header,
    Sidebar,
    // TimeTracker,
    DefaultView,
    TimelineView,
    CarePlanView,
    PatientVitalsView,
    TableLoader,
    Escalation,
    AddTimeLogModal,
    CriticalNotes,
    // StartCallModal,
  },
  setup() {
    localStorage.removeItem('timeLogId')
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const patientUdid = route.params.udid
    const authUser =  JSON.parse(localStorage.getItem('auth'))
    const loggedInUserId =  authUser.user.staffUdid
    const notevisible = ref(false);
    const devicevisible = ref(false);
    const documentvisible = ref(false);
    const addnotesvisible = ref(false);
    const timelogsvisible = ref(false);
    const bloodoxygenvisible = ref(false);
    const bloodglucosevisible = ref(false);
    const stoptimervisible = ref(false);
    const isEditTimeLog = ref(false);
    // const startCallModalVisible = ref(false);
    const loader= ref(true)
    const startOn = computed(() => {
      return store.state.patients.startOn
    });
const iconLoading = ref(false)
    const onClose = (e) => {
      console.log(e, "I was closed.");
    };

    // const startCall = () => {
    //   startCallModalVisible.value = true
    // }

     function videoCall() {
      store.dispatch("appointmentCalls",{patientId:patientUdid})
    }

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

    const patientDetails = computed(()=>{
      return store.state.patients.patientDetails
    })

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const patientCriticalNotes = computed(() => {
      return store.state.patients.patientCriticalNotes
    })
onMounted(()=>{
  cancelButton.value = ''
 
 
})

    const button = ref(1);

    function showButton(value) {
      console.log("value",value)
      button.value = value;
    }
    

    // Countdown Timer
    const elapsedTime = ref(0)
    const timer = ref(undefined)
    
    const formattedElapsedTime = computed(() => {
      const date = new Date(null);
      date.setSeconds(elapsedTime.value / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    })
    const timerValue = ref(30000)
    
    watchEffect(() => {
      store.dispatch('patientDetails', route.params.udid).then(() => {
        if(!startOn.value) {
          timer.value = setInterval(() => {
            elapsedTime.value += 1000;
            if((elapsedTime.value)%timerValue.value === 0) {
              const newFormattedElapsedTime = getSeconds(formattedElapsedTime.value)
              const timeLogId =  localStorage.getItem('timeLogId')
              if((timeLogId && timeLogId != null)) {
                const data = {
                  category: '',
                  loggedBy: loggedInUserId,
                  performedBy: loggedInUserId,
                  date: timeStamp(new Date()),
                  timeAmount: newFormattedElapsedTime,
                  cptCode: '',
                  note: '',
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
                  loggedBy: loggedInUserId,
                  performedBy: loggedInUserId,
                  date: timeStamp(new Date()),
                  timeAmount: newFormattedElapsedTime,
                  cptCode: '',
                  note: '',
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
        }
      })
      // store.dispatch("appointmentCalls",{patientId:patientUdid})
      if(route.name == 'PatientSummary') {
        store.commit("loadingTableStatus",true)
        loader.value = true
        store.dispatch('patientVitals', {patientId: patientUdid, deviceType: 99})
        store.dispatch('patientVitals', {patientId: patientUdid, deviceType: 100});
        store.dispatch('patientVitals', {patientId: patientUdid, deviceType: 101});
        store.dispatch('devices', patientUdid)
        store.dispatch('activeCptCodes')
        store.dispatch('allPatientsList')
        store.dispatch('allStaffList')
        store.dispatch('flagsList')
        store.dispatch('patientFlagsList', patientUdid);
        store.dispatch('patientCriticalNotes', patientUdid);
        store.dispatch('responsiblePerson', patientUdid);
        store.dispatch('physiciansList', patientUdid);
        store.dispatch('emergencyContactsList', patientUdid).then(()=>{
          store.commit("loadingTableStatus",false)
          loader.value = false
        })
      }
    })

    const startTimer = () => {
      timer.value = setInterval(() => {
        elapsedTime.value += 1000;
        if((elapsedTime.value)%timerValue.value === 0) {
          const newFormattedElapsedTime = getSeconds(formattedElapsedTime.value)
          const timeLogId =  localStorage.getItem('timeLogId')
          if((timeLogId && timeLogId != null)) {
            const data = {
              category: '',
              loggedBy: loggedInUserId,
              performedBy: loggedInUserId,
              date: timeStamp(new Date()),
              timeAmount: newFormattedElapsedTime,
              cptCode: '',
              note: '',
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
              loggedBy: loggedInUserId,
              performedBy: loggedInUserId,
              date: timeStamp(new Date()),
              timeAmount: newFormattedElapsedTime,
              cptCode: '',
              note: '',
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
      store.commit('startOn', false);
    }

    

    

    const isAutomatic = ref(false);

    const stopTimer = () => {
      clearInterval(timer.value);
      stoptimervisible.value = true;
      isAutomatic.value = true;
      isEditTimeLog.value = true;
    };
  
    const handleClose = ({link=null,modal, value}) => {
      console.log("dgfd",link,cancelButton.value)
      if(link==true&& cancelButton.value){
       clearInterval(timer.value);
       stoptimervisible.value = false;
       router.push({
                        path: cancelButton.value
                    });
                    
      }
      
      if(modal == 'addTimeLog') {
        elapsedTime.value = 0;
        store.commit('startOn', true);
        stoptimervisible.value = false;
        clearInterval(timer.value);
      }
      else if(value && modal == 'closeTimeLogModal') {
        stoptimervisible.value = value;
        clearInterval(timer.value);
      }
      else {
        // startCallModalVisible.value = modal == "startCall" ? value : false;
      }
      if(value == undefined) {
        timer.value = setInterval(() => {
          elapsedTime.value += 1000;
          if((elapsedTime.value)%timerValue.value === 0) {
            const newFormattedElapsedTime = getSeconds(formattedElapsedTime.value)
            const timeLogId =  localStorage.getItem('timeLogId')
            if((timeLogId && timeLogId != null)) {
              const data = {
                category: '',
                loggedBy: loggedInUserId,
                performedBy: loggedInUserId,
                date: timeStamp(new Date()),
                timeAmount: newFormattedElapsedTime,
                cptCode: '',
                note: '',
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
                loggedBy: loggedInUserId,
                performedBy: loggedInUserId,
                date: timeStamp(new Date()),
                timeAmount: newFormattedElapsedTime,
                cptCode: '',
                note: '',
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
        store.commit('startOn', false);
      }
    };
    
    onBeforeMount(() => {
        window.addEventListener('beforeunload',clearEvent);
    })


    onUnmounted(() => {
      clearInterval(timer.value);
      localStorage.removeItem('timeLogId')
      window.removeEventListener('beforeunload', clearEvent); 
    })

    const conferenceId = computed(() => {
			return store.state.videoCall.conferenceId
		})

    const startCallForm = reactive({
      flag: "d76ad323-cd1b-4bcf-ae3d-2300daa1ea17",
      note: "Call",
      patientId: route.params.udid,
    })
    const form = reactive({ ...startCallForm })

    const startCall = () => {
      store.commit('startOn', true);
      iconLoading.value = true
      store.commit('loadingStatus', true)
      store.dispatch("appointmentCalls", startCallForm).then((response)=>{
        iconLoading.value = false
        if(response==true && conferenceId.value){
          store.commit('loadingStatus', false)
          let redirect = router.resolve({name: 'videoCall', params: {id: enCodeString(conferenceId.value)}});
          // window.open(redirect.href, '_blank');
          window.location.href = redirect.href;
        }
      })
     
    }

    return {
      patientDetails,
      form,
      startCallForm,
      clearEvent,
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      enCodeString,
      conferenceId,
      videoCall,
      startCall,
      paramsId:route.params.udid,
      actionTrack,
      stopTimer,
      formattedElapsedTime,
      isAutomatic,
      isEditTimeLog,
      startTimer,
      handleOkcustom,
      custom,
      next,
      prev,
      handleChange,
      notevisible,
      devicevisible,
      documentvisible,
      addnotesvisible,
      timelogsvisible,
      bloodoxygenvisible,
      bloodglucosevisible,
      stoptimervisible,
      patientCriticalNotes,

      handleClose,
      cancelButton,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
    
      value1: ref(),
      size: ref("large"),
      value3: ref([]),
      value,
      dayjs,
      onClose,
      button,
      showButton,
      startOn,
      loader,
      iconLoading
    };

    
  },

  beforeRouteLeave (to, from, next) {
  cancelButton.value = to.fullPath
   var button= document.getElementById("timer")
   if(to.fullPath!='/logout'){
     if(button){
       button.click()
     }else{
       next()
     }
   }else{
      window.removeEventListener('beforeunload', clearEvent);
       next()
     }
    }
  
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
.blueBtn {
  position: relative;
  top: 3px;
}
</style>
