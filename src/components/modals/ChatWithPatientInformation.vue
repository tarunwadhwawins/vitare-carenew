<template>
  <a-modal width="100%" title="Communication" centered :maskClosable="false"  @cancel="closeModal()" class="chatModal" :footer="false">
    <a-row :gutter="24" class="chatBoxDiv">
      <a-col :span="12">
        <div class="chatBox" ref="scroll" id="chatBox">

          <div class="chatBoxInner">
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
          </div>
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
      
      <a-col :span="12">
        <div class="callRightWrapper">
          <a-row>
            <a-col :span="12">
              <div class="header">
                <PatientInfoTop :patientDetails="patientDetails" :hideEditIcon="true" />
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
                    <p>Document</p>
                  </div>
                </a-col>

                <a-col :span="8" @click="showVitalsModal" :class="patientVitalsVisible == true ? 'bold' : ''">
                  <div class="moreAction">
                    <div class="moreActionImg redBgColor">
                      <img src="@/assets/images/wave.svg" />
                    </div>
                    <p>Vital</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>

          <div class="body">
            <a-row>
              <PatientTimeline v-if="timelineDetailVisible == true" :isCommunication="true" :profileId="patientUdid" className="thumbDesc patientTimeline"/>
              <NotesDetail v-if="notesDetailVisible == true" :isCommunication="true" :pId="patientUdid" />
              <DocumentDetail v-if="documentDetailVisible == true" :isCommunication="true" :patientDetails="patientDetails" />
              <PatientVitalsDetails v-if="patientVitalsVisible == true" :isCommunication="true" :patientUdid="patientUdid" />
            </a-row>
          </div>

        </div>
      </a-col>
      <Loader />
    </a-row>
  </a-modal>
</template>

<script>
import {
  SendOutlined,
} from "@ant-design/icons-vue";
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
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
  timeStamp
} from "@/commonMethods/commonMethod"
import Loader from "@/components/loader/Loader";
import moment from "moment"
import NotesDetail from "@/components/video-call/table/NotesDetail";
import DocumentDetail from "@/components/video-call/table/DocumentDetail";
// import PatientVitalsDetails from "@/components/video-call/table/PatientVitalsDetails";
import PatientVitalsDetails from "@/components/patients/patientSummary/views/PatientVitalsGrid";

export default {
  components: {
    PatientInfoTop,
    PatientTimeline,
    SendOutlined,
    Loader,
    NotesDetail,
    DocumentDetail,
    PatientVitalsDetails,
  },
  props: {
    communication: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore()
    const formValue = reactive({
      msgSend: ''
    })
    const notesDetailVisible = ref(false)
    const documentDetailVisible = ref(false)
    const patientVitalsVisible = ref(false)
    const timelineDetailVisible = ref(true)
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
      timelineDetailVisible.value = false;
      store.commit('loadingStatus', false)
    };

    const showDocumentsModal = () => {
      store.commit('loadingStatus', true)
      documentDetailVisible.value = true;
      notesDetailVisible.value = false;
      patientVitalsVisible.value = false;
      timelineDetailVisible.value = false;
      store.commit('loadingStatus', false)
    };
    const showVitalsModal = () => {
      patientVitalsVisible.value = true;
      notesDetailVisible.value = false;
      documentDetailVisible.value = false;
      timelineDetailVisible.value = false;
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
        tableContent.value[0].scrollTop = tableContent.value[0].scrollHeight+10
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
    }
    
    onMounted(() => {
      // getScroll()
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
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
      showTimelineModal,
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
    };
  },
};
</script>

<style scoped>
.chatBoxDiv {
  height: 680px !important;
}
.chatBox {
  position: relative;
  height: 650px !important;
}
.patientTimeline {
  width: 100% !important;
}
.body {
  overflow: scroll;
  height: 520px;
}
.chatBox .chatBoxInner {
  max-height: none !important;
}
</style>
