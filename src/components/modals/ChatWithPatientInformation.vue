<template>
  <a-modal width="95%" title="Messages" centered :maskClosable="false"  @cancel="closeModal()" class="chatModal" :footer="false">
    <a-row :gutter="24">
      <a-col :span="12" class="chatBox2">
        <div class="chatBox" ref="scroll" id="chatBox">
          <ChatScreenBody :conversationList="list.conversationList" :communication="communication" screen="withPatient" :patientId="patientId" />
          <a-form ref="formRef" class="messageBox" :model="formValue" layout="vertical" @finish="sendMsg" @finishFailed="taskFormFailed">
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
        </div>
      </a-col>

      <a-col :span="12">
        <ChatRightPanel :idPatient="patientUdid" :communication="communication" :isChat="true" />
      </a-col>

      <Loader />
    </a-row>
  </a-modal>
</template>

<script>
import {
  SendOutlined,
} from "@ant-design/icons-vue"
import ChatScreenBody from "@/components/communications/ChatScreenBody"
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
import Loader from "@/components/loader/Loader"
import moment from "moment"
import ChatRightPanel from "@/components/common/communications/ChatRightPanel"

export default {
  components: {
    ChatRightPanel,
    SendOutlined,
    Loader,
    ChatScreenBody,
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
        store.dispatch("patientDetails", patientUdid.value)
					store.dispatch('patientTimeline', {
						id: patientUdid.value,
						type: ''
					});
      }

      store.state.communications.conversationList = ""
      store.dispatch("conversation", props.communication.id)
      tableContent.value = document.getElementsByClassName('chatBoxInner')
      getScroll()
    })

    function getScroll() {
      setTimeout(() => {
        if((tableContent.value) && (tableContent.value[0].scrollTop < tableContent.value[0].scrollHeight+10) == true) {
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

    return {
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
      notesDetailVisible,
      documentDetailVisible,
      patientVitalsVisible,
      timelineDetailVisible,
      ...toRefs(tabvalue),
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
  height: 560px !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}
.patientTimeline {
  width: 100% !important;
}
.chatBox .chatBoxInner {
  min-height: 520px !important;
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
.callRightWrapper .patientTimeline .ant-timeline {
  overflow: unset !important;
}
.callRightWrapper .header .patientInfo .patientImg .info {
  margin-left: -50px !important;
}
span.dragImg {
  display: none !important;
}
.messageBox {
  position: sticky;
}
</style>
