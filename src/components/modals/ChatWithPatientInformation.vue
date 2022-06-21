<template>
<a-modal width="95%" title="Messages" centered :maskClosable="false" @cancel="closeModal()" class="chatModal" :footer="false">
    <div class="common-bg">
        <div class="videoWrapper chatBox2">
            <div class="leftWrapper" id="videoDiv">
                <div class="chatBox" ref="scroll" id="chatBox">
                    <ChatScreenBody :conversationList="reverseRecord(conversationList)" :communication="communication" screen="withPatient" :patientId="patientId" />
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
            </div>

            <ChatRightPanel :idPatient="patientUdid" :communication="communication" :isChat="true" />
        </div>
    </div>
    <Loader />
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
        const patientUdid = ref(null)
        const patientId = ref(null)
        const communications = reactive(props.communication)
        const isCommunicationWithPatient = ref(false)
        const conversationList = ref([])
        const tabvalue = reactive({
            tab: [],
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
            addPinModalVisible.value = true
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
            store.dispatch("latestmessage", props.communication.id).then(() => {

                store.getters.latestmessage.value.map((item) => {
                    conversationList.value.push(item)
                })
                store.getters.latestmessage.value.length > 0 ? getScroll() : ''
            })
            // getScroll()
        }, 4000);

        const tableContent = ref(null)
        const list = computed(() => {
            return store.state.communications.conversationList
        })
        const meta = store.getters.messagesMeta
        var record = []
        var scroller = ''
        watchEffect(() => {

            // store.state.communications.conversationList = []
            // store.dispatch("conversation", props.communication.id).then(()=>{

            //  // list.conversationList.reverse()
            //   conversationList.value = list.conversationList.reverse()
            // })
            tableContent.value = document.getElementsByClassName('chatBoxInner')
            //getScroll()
            if (list.value.length > 0) {

                var tableContent1 = document.querySelector(".chatBoxInner");

                tableContent1.addEventListener("scroll", (event) => {
                   
                    let currentScroll = event.target.scrollTop ;

                    if (currentScroll < 3) {
                        let current_page = meta.value.current_page + 1;

                        if (current_page <= meta.value.total_pages) {
                            
                            scroller = event.target.scrollHeight
                            store.state.communications.messagesMeta = ''
                            record = conversationList.value

                            store.state.communications.conversationList = []
                            store.dispatch("conversation", props.communication.id + '&page=' + current_page).then(() => {
                                loadMoredata();
                            })
                        }
                    }

                })
            }
        })

        function loadMoredata() {

            const newData = list.value

            newData.forEach((element) => {
                record.push(element);
            });

            conversationList.value = record;
            setTimeout(() => {
                   
                    tableContent.value[0].scrollTop = scroller -10
                
             
            }, 10);
        }

        function getScroll() {
            setTimeout(() => {
                if ((tableContent.value) && (tableContent.value[0].scrollTop < tableContent.value[0].scrollHeight + 10) == true) {
                    tableContent.value[0].scrollTop = tableContent.value[0].scrollHeight + 10
                }
            }, 1000)
        }

        function sendMsg() {
            if (formValue.msgSend) {
                conversationList.value.push({
                    conversationId: props.communication.id,
                    senderId: auth.user.id,
                    message: formValue.msgSend,
                    type: "text",
                    isRead: 0,
                    createdAt: 'Today, ' + moment().format("HH:mm A")
                })
                store.dispatch("conversationSend", {
                    conversationId: props.communication.id,
                    message: formValue.msgSend,
                    type: "text",
                })
                formValue.msgSend = ''
                getScroll()
            }
            //conversationList.value = list.conversationList

        }

        function closeModal() {
            store.state.communications.conversationList = []
            clearInterval(interval);
            addPinModalVisible.value = false
            localStorage.removeItem('patientUdid')
        }

        onMounted(() => {
            store.commit('loadingStatus', false)
            setTimeout(() => {
                store.commit('loadingStatus', false)
            }, 3000);
            store.dispatch("conversation", props.communication.id + '&page=').then(() => {

                // list.conversationList.reverse()
                conversationList.value = list.value

                getScroll()
            })
            if (communications.is_sender_patient) {
                patientUdid.value = communications.fromId
                patientId.value = communications.senderId
                isCommunicationWithPatient.value = true
            } else if (communications.is_receiver_patient) {
                patientUdid.value = communications.toId
                patientId.value = communications.receiverId
                isCommunicationWithPatient.value = true
            } else {
                isCommunicationWithPatient.value = false
            }

            if (isCommunicationWithPatient.value) {
                store.dispatch("patientDetails", patientUdid.value)
                store.dispatch('patientTimeline', {
                    id: patientUdid.value,
                    type: ''
                });
            }

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
            if (flag.name == 'Normal') {
                patientFlag.value = flag.id
            }
        });

        function reverseRecord(data) {
            return data.sort(function (a, b) {
                return a.id - b.id;
            })
        }
        return {
            enCodeString,
            list,
            sendMsg,
            formValue,
            dateFormat,
            closeModal,
            auth,
            scroll,
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
            conversationList,
            reverseRecord,
        };
    },
};
</script>

<style scoped>
/* .chatBoxDiv {
  height: 680px !important;
} */
.chatBox {
    height: calc(100vh - 194px)!important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}

.patientTimeline {
    width: 100% !important;
}

.chatBox .chatBoxInner {
    min-height:calc(100vh - 281px)!important;
    overflow: auto !important;
}

.callButton {
    margin-bottom: 20px;
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
