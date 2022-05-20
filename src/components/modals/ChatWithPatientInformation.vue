<template>
  <a-modal width="95%" title="Messages" centered :maskClosable="false"  @cancel="closeModal()" class="chatModal" :footer="false">
    <a-row :gutter="24">
      <a-col :span="12" class="chatBox2">
        <div class="chatBox" ref="scroll" id="chatBox">
          <!-- <div class="chatBoxInner">
            <div v-for="msg,index in list.conversationList" :key="index">
              <div class="chatWrapper left" v-if="msg.senderId == patientId">
                <div class="message">
                  {{msg.message}}
                </div>
                <div class="time">{{ msg.createdAt }}</div>
              </div>
              <div class="chatWrapper right" v-if="msg.senderId != patientId">
                <div class="message">
                  {{msg.message}}
                </div>
                <div class="time" >{{ msg.createdAt }}</div>
              </div>
            </div>
          </div> -->
          <ChatScreenBody :conversationList="list.conversationList" :communication="communication" screen="withPatient" :patientId="patientId" />
        </div>
        <a-form ref="formRef" :model="formValue" layout="vertical" @finish="sendMsg" @finishFailed="taskFormFailed">
          <div class="sendMessage" v-if="auth.user.id==communication.receiverId || auth.user.id==communication.senderId">
            <a-input v-model:value="formValue.msgSend" size="large" placeholder="Type Message">
              <template #addonAfter>
                <SendOutlined @click="sendMsg" />
              </template>
            </a-input>
          </div>
          <div class="sendMessage" v-else>
            <a-input v-model:value="formValue.msgSend" size="large" placeholder="Type Message" disabled>
              <template #addonAfter disabled>
                <SendOutlined @click="sendMsg" />
              </template>
            </a-input>
          </div>
        </a-form>
      </a-col>

      <RightPanel :patientDetail="patientDetail" :patientUdid="patientUdid" :communication="communication" />

      <Loader />
    </a-row>
  </a-modal>
</template>

<script>
import {
  SendOutlined,
  // PhoneOutlined,
  // CalendarOutlined,
  // PushpinOutlined,
} from "@ant-design/icons-vue";
// import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
// import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
import ChatScreenBody from "@/components/communications/ChatScreenBody";
// import Pins from "@/components/patients/patientSummary/common/CriticalNotes";
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
import Loader from "@/components/loader/Loader";
import moment from "moment"
// import NotesDetail from "@/components/video-call/table/NotesDetail";
// import DocumentDetail from "@/components/video-call/table/DocumentDetail";
// import AppointmentsTable from "@/components/communications/tables/AppointmentsTable";
// import PatientVitalsDetails from "@/components/video-call/table/PatientVitalsDetails";
// import PatientVitalsDetails from "@/components/patients/patientSummary/views/PatientVitalsGrid";
// import AddPin from "@/components/modals/CriticalNote";
import RightPanel from "@/components/common/communications/RightPanel";
import { useRouter } from 'vue-router';

export default {
  components: {
    RightPanel,
    // PatientInfoTop,
    // PatientTimeline,
    SendOutlined,
    Loader,
    // NotesDetail,
    // DocumentDetail,
    // AppointmentsTable,
    // PatientVitalsDetails,
    ChatScreenBody,
    // PhoneOutlined,
    // CalendarOutlined,
    // PushpinOutlined,
    // Pins,
    // AddPin,
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
      localStorage.removeItem('patientUdid')
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
  height: 630px !important;
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
.callRightWrapper .patientTimeline .ant-timeline {
  overflow: unset !important;
}
.callRightWrapper .header .patientInfo .patientImg .info {
  margin-left: -50px !important;
}
</style>
