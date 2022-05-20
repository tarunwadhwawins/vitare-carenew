<template>
  <a-col :span="12">
    <div class="callRightWrapper chatBoxRight">
      <a-row>
        <a-col :span="12">
          <div class="header">
            <PatientInfoTop :patientDetail="patientDetails" :patientUdid="patientUdid" :hideEditIcon="false" />
          </div>
        </a-col>
        <a-col :span="12">
          <a-row>
            <a-col :span="8" :class="timelineDetailVisible == true ? 'bold' : ''">
              <div class="moreAction" @click="showTimelineModal">
                <div class="moreActionImg four">
                  <img src="@/assets/images/edit.svg" />
                </div>
                <p>Timeline View</p>
              </div>
            </a-col>
            <a-col :span="8" :class="notesDetailVisible == true ? 'bold' : ''">
              <div class="moreAction" @click="showNotesModal">
                <div class="moreActionImg four">
                  <img src="@/assets/images/edit.svg" />
                </div>
                <p>Notes</p>
              </div>
            </a-col>
            <a-col :span="8" :class="documentDetailVisible == true ? 'bold' : ''">
              <div class="moreAction" @click="showDocumentsModal">
                <div class="moreActionImg green">
                  <img src="@/assets/images/report.svg" />
                </div>
                <p>Documents</p>
              </div>
            </a-col>

            <a-col :span="8" @click="showVitalsModal" :class="patientVitalsVisible == true ? 'bold' : ''">
              <div class="moreAction">
                <div class="moreActionImg redBgColor">
                  <img src="@/assets/images/wave.svg" />
                </div>
                <p>Vitals</p>
              </div>
            </a-col>

            <a-col :span="8" @click="showAppointments" :class="patientAppointmentsVisible == true ? 'bold' : ''">
              <div class="moreAction">
                <div class="moreActionImg purpleBgColor">
                  <CalendarOutlined />
                </div>
                <p>Appointments</p>
              </div>
            </a-col>

            <a-col :span="8" @click="addPin">
              <div class="moreAction">
                <div class="moreActionImg brightRedBgColor">
                  <PushpinOutlined />
                </div>
                <p>Pins</p>
              </div>
            </a-col>

            <a-col :span="8" @click="startCall">
              <div class="moreAction">
                <div class="moreActionImg darkGreenBgColor">
                  <PhoneOutlined />
                </div>
                <p>Start Call</p>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <div class="body">

        <!-- Pin Note -->
        <a-col :sm="24">
          <Pins v-if="patientPins && patientPins.length > 0" :patientPins="patientPins" :patientUdid="patientUdid" />
        </a-col>

        <a-row>
          <PatientTimeline v-if="timelineDetailVisible == true" :isCommunication="true" :profileId="patientUdid" className="thumbDesc patientTimeline"/>
          <NotesDetail v-if="notesDetailVisible == true" :isCommunication="true" :pId="patientUdid" />
          <DocumentDetail v-if="documentDetailVisible == true" :isCommunication="true" :patientDetails="patientDetails" />
          <PatientVitalsDetails v-if="patientVitalsVisible == true" :isCommunication="true" :patientUdid="patientUdid" />
          <AppointmentsTable v-if="patientAppointmentsVisible == true" :patientUdid="patientUdid" />
          <AddPin v-model:visible="addPinModalVisible" :patientUdid="patientUdid" @closeModal="closeModal"/>
        </a-row>
      </div>

    </div>
  </a-col>
</template>

<script>
import {
  // SendOutlined,
  PhoneOutlined,
  CalendarOutlined,
  PushpinOutlined,
} from "@ant-design/icons-vue";
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
// import ChatScreenBody from "@/components/communications/ChatScreenBody";
import Pins from "@/components/patients/patientSummary/common/CriticalNotes";
import {
  watchEffect,
  reactive,
  ref,
  onUnmounted,
  computed,
  toRefs,
	onMounted,
} from "vue"
import {
  useStore
} from "vuex"
import {
  dateFormat,
  timeStamp,
  enCodeString,
} from "@/commonMethods/commonMethod"
// import Loader from "@/components/loader/Loader";
import moment from "moment"
import NotesDetail from "@/components/video-call/table/NotesDetail";
import DocumentDetail from "@/components/video-call/table/DocumentDetail";
import AppointmentsTable from "@/components/communications/tables/AppointmentsTable";
// import PatientVitalsDetails from "@/components/video-call/table/PatientVitalsDetails";
import PatientVitalsDetails from "@/components/patients/patientSummary/views/PatientVitalsGrid";
import AddPin from "@/components/modals/CriticalNote";
import { useRouter } from 'vue-router';

export default {
  components: {
    PatientInfoTop,
    PatientTimeline,
    // SendOutlined,
    // Loader,
    NotesDetail,
    DocumentDetail,
    AppointmentsTable,
    PatientVitalsDetails,
    // ChatScreenBody,
    PhoneOutlined,
    CalendarOutlined,
    PushpinOutlined,
    Pins,
    AddPin,
  },
  props: {
    communication: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const formValue = reactive({
      msgSend: ''
    })
    const notesDetailVisible = ref(false)
    const documentDetailVisible = ref(false)
    const patientVitalsVisible = ref(false)
    const patientAppointmentsVisible = ref(false)
    const timelineDetailVisible = ref(true)
    const addPinModalVisible = ref(false)
    const patientUdid =  ref(null)
    const patientId =  ref(null)
    const communications = reactive(props.communication)
    const isCommunicationWithPatient = ref(false)
    const tabvalue = reactive({
      tab: [],
    });

    function resize() {
      window.addEventListener("mousemove", resizeDiv);
      window.addEventListener("touchmove", resizeDiv);
    }
    function resizeDiv(e) {
      let video_width = ((e.clientX - 50) / document.body.clientWidth) * 100;
      document.getElementById("videoDiv").style.width = video_width + "%";
    }
    window.addEventListener("mouseup", (e) => {
      console.log(e);
      window.removeEventListener("mousemove", resizeDiv);
    });
      window.addEventListener("touchend", (e) => {
      console.log(e);
      window.addEventListener("touchmove", resizeDiv);
    });
  
    function chnageTab() {
      store.commit("loadingTableStatus", true);
      store
        .dispatch("patientTimeline", {
          id: patientUdid.value,
          type: tabvalue.tab.length == 0 ? "" : tabvalue.tab.join(","),
        })
        .then(() => {
          store.commit("loadingTableStatus", false);
        });
    }

    const showNotesModal = () => {
      store.commit('loadingStatus', true)
      notesDetailVisible.value = true;
      documentDetailVisible.value = false;
      patientVitalsVisible.value = false;
      patientAppointmentsVisible.value = false;
      timelineDetailVisible.value = false;
      store.commit('loadingStatus', false)
    };

    const showDocumentsModal = () => {
      store.commit('loadingStatus', true)
      documentDetailVisible.value = true;
      notesDetailVisible.value = false;
      patientVitalsVisible.value = false;
      patientAppointmentsVisible.value = false;
      timelineDetailVisible.value = false;
      store.commit('loadingStatus', false)
    };
    const showVitalsModal = () => {
      patientVitalsVisible.value = true;
      patientAppointmentsVisible.value = false;
      notesDetailVisible.value = false;
      documentDetailVisible.value = false;
      timelineDetailVisible.value = false;
    };
    const showAppointments = () => {
      patientVitalsVisible.value = false;
      patientAppointmentsVisible.value = true;
      notesDetailVisible.value = false;
      documentDetailVisible.value = false;
      timelineDetailVisible.value = false;
    };
    const addPin = () => {
      addPinModalVisible.value=true
    };

    const showTimelineModal = () => {
      store.commit('loadingStatus', true)
      patientVitalsVisible.value = false;
      notesDetailVisible.value = false;
      documentDetailVisible.value = false;
      timelineDetailVisible.value = true;
      store.commit('loadingStatus', false)
    };

    const scroll = ref()
    const auth = JSON.parse(localStorage.getItem("auth"))
    let interval = setInterval(() => {
      store.dispatch("conversation", props.communication.id)
      getScroll()
    }, 2000);
    
    const tableContent = ref(null)
    
    watchEffect(() => {
      store.commit('loadingStatus', false)
      setTimeout(() => {
        store.commit('loadingStatus', false)
      }, 3000);
      if(communications.is_sender_patient) {
        patientUdid.value = communications.fromId
        patientId.value = communications.senderId
        isCommunicationWithPatient.value = true
      }
      else if(communications.is_receiver_patient) {
        patientUdid.value = communications.toId
        patientId.value = communications.receiverId
        isCommunicationWithPatient.value = true
      }
      else {
        isCommunicationWithPatient.value = false
      }

      if(isCommunicationWithPatient.value) {
        store.dispatch("timeLineType");
        store.dispatch("patientTimeline", {
          id: patientUdid.value,
          type: "",
        });
        store.dispatch("patientVitals", {
          patientId: patientUdid.value,
          deviceType: 99,
        });
        store.dispatch("patientVitals", {
          patientId: patientUdid.value,
          deviceType: 100,
        });
        store.dispatch("patientVitals", {
          patientId: patientUdid.value,
          deviceType: 101,
        });
        store.dispatch("patientDetails", patientUdid.value)
        store.dispatch('patientCriticalNotes', patientUdid.value)
      }

      store.state.communications.conversationList = ""
      store.dispatch("conversation", props.communication.id)
      tableContent.value = document.getElementsByClassName('chatBoxInner')
      getScroll()
      localStorage.setItem('patientUdid', patientUdid.value)
    })

    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    });

    function getScroll() {
      setTimeout(() => {
        if((tableContent.value[0].scrollTop < tableContent.value[0].scrollHeight+10) == true) {
          tableContent.value[0].scrollTop = tableContent.value[0].scrollHeight+10
        }
      }, 2000)
    }
    const list = store.getters.communicationRecord.value

    function sendMsg() {
      if (formValue.msgSend) {
        list.conversationList.push({
          conversationId: props.communication.id,
          senderId: auth.user.id,
          message: formValue.msgSend,
          type: "text",
          isRead: 0,
          createdAt: timeStamp(moment())
        })
        store.dispatch("conversationSend", {
          conversationId: props.communication.id,
          message: formValue.msgSend,
          type: "text",
        })
        formValue.msgSend = ''
      }
      getScroll()
    }

    function closeModal() {
      store.state.communications.conversationList = ""
      clearInterval(interval);
      addPinModalVisible.value = false
    }
    
    onMounted(() => {
      // getScroll()
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    const conferenceId = computed(() => {
			return store.state.videoCall.conferenceId
		})

		const flagsList = computed(() => {
			return store.state.flags.flagsList
		})

    const patientPins = computed(() => {
      return store.state.patients.patientCriticalNotes
    })

    const patientFlag = ref(null);
    flagsList.value.forEach(flag => {
      if(flag.name == 'Normal') {
        patientFlag.value = flag.id
      }
    });

    const startCallForm = reactive({
      flag: patientFlag,
      note: "Call",
      patientId: patientUdid.value,
    })

    const startCall = () => {
      store.commit('loadingStatus', true)
      store.dispatch("appointmentCalls", startCallForm).then((response)=>{
        if(response == true && conferenceId.value) {
          store.commit('loadingStatus', false)
          let redirect = router.resolve({name: 'videoCall', params: {id: enCodeString(conferenceId.value)}});
          window.open(redirect.href, '_blank');
        }
      })
     
    }

    return {
      conferenceId,
      enCodeString,
      list,
      sendMsg,
      formValue,
      dateFormat,
      closeModal,
      auth,
      scroll,
      resize,
      resizeDiv,
      showNotesModal,
      showDocumentsModal,
      showVitalsModal,
      showAppointments,
      addPin,
      showTimelineModal,
      addPinModalVisible,
      patientUdid,
      patientId,
      patientDetails,
      notesDetailVisible,
      documentDetailVisible,
      patientVitalsVisible,
      timelineDetailVisible,
      chnageTab,
      ...toRefs(tabvalue),
      timeLineType: store.getters.timeLineType,
      startCall,
      patientPins,
      patientAppointmentsVisible,
    };
  },
};
</script>

<style scoped>
/* .chatBoxDiv {
  height: 680px !important;
} */
.chatBox {
  height: 640px !important;
}
.patientTimeline {
  width: 100% !important;
}
.chatBox .chatBoxInner {
  min-height: 640px !important;
  overflow: scroll !important;
}
.callButton {
  margin-bottom: 20px;
}
.anticon-calendar, .anticon-pushpin, .anticon-phone {
  color: #ffffff;
  font-size: 16px !important;
  position: relative !important;
  top: -2px !important;
}
.callRightWrapper .body {
  overflow-y: scroll;
  height: 445px;
  overflow-x: hidden;
}
.callRightWrapper .header .patientInfo .patientImg .info {
  margin-left: -50px !important;
}
</style>
