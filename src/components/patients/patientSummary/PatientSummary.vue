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

            <a-col :xl="4" :lg="6">
              <h2 class="pageTittle">{{$t('patientSummary.patientSummary')}}</h2>
            </a-col>
            <a-col :xl="3" :lg="2">
              <a-button class="blueBtn" @click="sendMessage" v-if="conversationWithPatient != null">Send Message</a-button>
            </a-col>
            <a-col :xl="2" :lg="2">
              <a-button class="blueBtn" @click="startCall" :loading="iconLoading">Start Call</a-button>
            </a-col>
            <a-col :xl="8" :lg="14">
              <div class="pageTittle patientSummaryFilters">
                <div class="filter">
                  <a-button @click="showButton(1) ; actionTrack(paramsId,323,'patient')" :class="button == 1 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 323)">Default</a-button>
                  <a-button @click="showButton(2) ; actionTrack(paramsId,285,'patient')" :class="button == 2 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 285)">Timeline</a-button>
                  <a-button @click="showButton(3) ; actionTrack(paramsId,286,'patient')" :class="button == 3 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 286)">Care Plan</a-button>
                  <a-button @click="showButton(4) ; actionTrack(paramsId,287,'patient')" :class="button == 4 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 287)">Patient Vitals</a-button>
                  <a-button @click="showButton(5) ; actionTrack(paramsId,287,'patient')" :class="button == 5 ? 'active' : ''" v-if="arrayToObjact(screensPermissions, 287)">Escalation</a-button>
                </div>
              </div>
            </a-col>
            <a-col :xl="7" :lg="6">
              <!-- <div class="timer" @click="actionTrack(paramsId,288,'patient')" v-if="arrayToObjact(screensPermissions, 288)"> -->
                <div class="timer" @click="actionTrack(paramsId,288,'patient')" >
                <h3>{{$t('patientSummary.currentSession')}} : {{formattedElapsedTime}}</h3>
                <a-button v-if="showStartTimer && !showPauseTimer" class="primaryBtn" @click="startTimer">{{$t('patientSummary.startTimer')}}</a-button>
                <a-button v-if="showPauseTimer" class="primaryBtn" @click="pauseTimer">{{$t('patientSummary.pauseTimer')}}</a-button>
                <a-button v-if="showResumeTimer && !showStartTimer" class="primaryBtn" @click="startTimer">{{$t('patientSummary.resumeTimer')}}</a-button>
                <a-button v-if="!showStartTimer" class="primaryBtn" id="timer" @click="stopTimer">{{$t('patientSummary.stopTimer')}}</a-button>
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
                <TableLoader />
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
        <ChatWithPatientInformation v-model:visible="chatWithPatientInfoVisible" v-if="chatWithPatientInfoVisible && conversation" :communication="conversation" :conversationId="conversationId" :idPatient="receiverId" />
      </a-layout>
    </a-layout>

    <AddTimeLogModal v-if="stoptimervisible" v-model:visible="stoptimervisible" :isAutomatic="isAutomatic" :isEditTimeLog="isEditTimeLog" :timerValue="formattedElapsedTime" @closeModal="handleClose" @cancel="handleClose"  />
    <!-- <StartCallModal v-model:visible="startCallModalVisible" @closeModal="handleClose" @cancel="handleClose" /> -->
    <VideoCallVue  v-if="videoModal && conferenceId" v-model:visible="videoModal" :conferenceId ="conferenceId"/>
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
import ChatWithPatientInformation from "@/components/modals/ChatWithPatientInformation";
// import StartCallModal from "@/components/modals/StartCallModal";
// import VideoCallVue from "../../video-call/videoCall.vue";
import dayjs from "dayjs"; 
import { ref, computed,onBeforeMount, onUnmounted,reactive, onMounted, defineAsyncComponent} from "vue";
import { useStore } from 'vuex';
import { useRoute,useRouter  } from 'vue-router';
import {
  timeStamp,
  getSeconds,
  actionTrack,
  enCodeString,
  arrayToObjact
} from '@/commonMethods/commonMethod';
import moment from 'moment';
const value = ref(dayjs("12:08", "HH:mm"));
function clearEvent(event){
        event.returnValue = '';
      
    }
    const stoptimervisible = ref(false);
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
    ChatWithPatientInformation,
    // StartCallModal,
    VideoCallVue:defineAsyncComponent(()=>import('@/components/video-call/PatientVideoCall.vue'))
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
    const chatWithPatientInfoVisible = ref(false);
    const cancelButton = ref(localStorage.getItem('cancelButton'))
    const videoModal = ref(false)
    const isEditTimeLog = ref(false);
    // const startCallModalVisible = ref(false);
    const loader= ref(true)
    
    const iconLoading = ref(false)
    const onClose = (e) => {
      console.log(e, "I was closed.");
    };

    const showStartTimer = computed(() => {
        return store.state.common.showStartTimer
    });
    const showPauseTimer = computed(() => {
        return store.state.common.showPauseTimer
    });
    const showResumeTimer = computed(() => {
        return store.state.common.showResumeTimer
    });

    const patientDetails = computed(()=>{
      return store.state.patients.patientDetails
    })

    const receiverId = ref(null)

    onMounted(() => {
      if(route.name == "PatientSummary") {
        store.dispatch('patientDetails', route.params.udid).then(() => {
          receiverId.value = patientDetails.value.user.data.id
          const fromDate = moment().format('X')
          const toDate = moment().format('X')
          let dateFilter = fromDate && toDate ? "&fromDate=" + fromDate + "&toDate=" + toDate : ''
          store.dispatch("program", patientUdid);
          store.commit("loadingTableStatus",true)
          loader.value = true
          store.dispatch("patientVitals", { patientId: route.params.udid, deviceType: 99, filter: dateFilter })
          store.dispatch("patientVitals", { patientId: route.params.udid, deviceType: 100, filter: dateFilter });
          store.dispatch("patientVitals", { patientId: route.params.udid, deviceType: 101, filter: dateFilter });
          store.dispatch('devices', route.params.udid)
          store.dispatch('activeCptCodes')
          store.dispatch('allPatientsList')
          store.dispatch('allStaffList')
          store.dispatch('flagsForPatient')
          store.dispatch('patientFlagsList', route.params.udid);
          store.dispatch('patientCriticalNotes', route.params.udid);
          store.dispatch('responsiblePerson', route.params.udid);
          store.dispatch('physiciansList', route.params.udid);
          store.dispatch('patientConditions', route.params.udid);
          store.dispatch('emergencyContactsList', route.params.udid).then(()=>{
            store.commit("loadingTableStatus",false)
            loader.value = false
          })
          if(!showStartTimer.value && route.params.globalSearch) {
            elapsedTime.value = 0;
            store.commit('showStartTimer', true);
            stoptimervisible.value = false;
            clearInterval(timer.value);
            startTimer()
          }
          store.dispatch("conversationWithPatient", receiverId.value)
        })
      }
    })

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

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const patientCriticalNotes = computed(() => {
      return store.state.patients.patientCriticalNotes
    })

    const button = ref(1);

    function showButton(value) {
      // console.log("value",value)
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
    
    onMounted(() => {
      store.dispatch('patientDetails', route.params.udid).then(() => {
        if(!showStartTimer.value) {
          startTimer()
        }
      })
      // store.dispatch("appointmentCalls",{patientId:patientUdid})
      if(route.name == 'PatientSummary') {
        store.dispatch("program", patientUdid);
        store.commit("loadingTableStatus",true)
        loader.value = true
        store.dispatch('devices', patientUdid)
        store.dispatch('activeCptCodes')
        store.dispatch('allPatientsList')
        store.dispatch('allStaffList')
        store.dispatch('flagsForPatient')
        store.dispatch('patientFlagsList', patientUdid);
        store.dispatch('patientCriticalNotes', patientUdid);
        store.dispatch('responsiblePerson', patientUdid);
        store.dispatch('physiciansList', patientUdid);
        store.dispatch('patientConditions', patientUdid);
        store.dispatch('emergencyContactsList', patientUdid).then(()=>{
          store.commit("loadingTableStatus",false)
          loader.value = false
        })
      }
    })

    function startTimer() {
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
      store.commit('showPauseTimer', true);
      store.commit('showStartTimer', false);
      store.commit('showResumeTimer', false);
    }

    const isAutomatic = ref(false);

    const stopTimer = () => {
      clearInterval(timer.value);
      stoptimervisible.value = true;
      isAutomatic.value = true;
      isEditTimeLog.value = true;
      store.commit('showStartTimer', true);
      store.commit('showPauseTimer', false);
      store.commit('showResumeTimer', false);
    };

    const pauseTimer = () => {
        store.commit('showResumeTimer', true);
        store.commit('showPauseTimer', false);
        clearInterval(timer.value);
    };
  
    const handleClose = ({link=null,modal, value, cancelBtn}) => {
      if(modal == 'cancelButton') {
        if(link==true&& cancelBtn != null) {
          elapsedTime.value = 0;
          store.commit('showStartTimer', true);
          stoptimervisible.value = false;
          clearInterval(timer.value);
          router.push({
            path: cancelBtn
          });
        }
        else {
          stoptimervisible.value = false;
          if(!showPauseTimer.value) {
            startTimer()
          }
          store.commit('showStartTimer', false);
        }
      }
      else if(modal == 'closeTimeLogModal') {
        if(!showPauseTimer.value) {
          startTimer()
        }
        store.commit('showStartTimer', false);
        stoptimervisible.value = false;
      }
      else if(modal == 'addTimeLog') {
        elapsedTime.value = 0;
        store.commit('showStartTimer', true);
        stoptimervisible.value = false;
        clearInterval(timer.value);
        if(cancelBtn != null) {
          router.push({
            path: cancelBtn
          });
        }
      }
      if(value == undefined) {
        if(!showPauseTimer.value) {
          startTimer()
        }
        store.commit('showStartTimer', false);
      }
    };
    
    onBeforeMount(() => {
        window.addEventListener('beforeunload',clearEvent);
    })


    onUnmounted(() => {
      store.commit('showStartTimer', false);
      store.commit('showPauseTimer', true);
      store.commit('showResumeTimer', false);
      store.state.patients.tabvalue = []
      clearInterval(timer.value);
      localStorage.removeItem('timeLogId')
      window.removeEventListener('beforeunload', clearEvent); 
      store.state.patients.patientDetails = ''
      store.state.patients.patientDocuments = ''
      store.state.patients.patientTimeline = ''
      store.state.patients.patientConditions = []
      store.state.patients.patientReferralSource = ''
      store.state.patients.referralList = ''
      store.state.patients.familyMembersList = ''
      store.state.patients.emergencyContactsList = ''
      store.state.patients.timeLineType = ''
      store.state.patients.timeLineType = ''
      store.state.patients.latestVital = []
      store.state.patients.latestCriticalNote = []
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
      store.commit('showStartTimer', true);
      iconLoading.value = true
      videoModal.value = true
      store.commit('loadingStatus', true)
      store.dispatch("appointmentCalls", startCallForm).then((response)=>{
        iconLoading.value = false
        if(response==true && conferenceId.value){
          // store.commit('loadingStatus', false)
          // let redirect = router.resolve({name: 'videoCall', params: {id: enCodeString(conferenceId.value)}});
          // window.location.href = redirect.href;
        }
      })

      
     
    }

    const conversationWithPatient = computed(() => {
      return store.state.communications.conversationWithPatient
    })

    const conversation = computed(() => {
      return store.state.communications.conversationsList
    })
    const conversationId = ref(null)
    
    const sendMessage = () => {
      conversationId.value = conversationWithPatient.value.id
      store.dispatch("conversation", conversationId.value).then(() => {
        // console.log("conversation", conversation.value)
        chatWithPatientInfoVisible.value = true
      })
    }

    return {
      videoModal,
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
      sendMessage,
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
      chatWithPatientInfoVisible,
      conversation,
      conversationId,
      conversationWithPatient,
      receiverId,

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
      loader,
      iconLoading,
      showStartTimer,
      showPauseTimer,
      showResumeTimer,
      pauseTimer,
    };

    
  },

  beforeRouteLeave (to, from, next) {
  localStorage.setItem('cancelButton', to.fullPath)
  // cancelButton.value = to.fullPath

  //  if(to.path!='/logout'&&to.path!='/'){
      var button= document.getElementById("timer")
     if(button){
       button.click()
     }else{
       next()
     }
  //  }else{
  //     window.removeEventListener('beforeunload', clearEvent);
  //      next()
  //    }
    }
  
};
</script>

<style lang="scss">
.timer {
  font-size: 12px !important;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
  .primaryBtn {
    font-size: 12px;
    padding: 6px 10px;
    &:first-of-type{
      margin-right: 5px;
    }
  }
}
.blueBtn {
  position: relative;
  top: 0;
}
</style>
