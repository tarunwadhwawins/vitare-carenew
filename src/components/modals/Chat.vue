<template>
<a-modal width="800px" title="Reply" centered @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <div class="chatBox">
                <a-list item-layout="horizontal">
                    <a-list-item>
                        <a-list-item-meta>
                            <template #avatar>
                                <a-avatar>
                                    <img src="../../assets/images/video-call-thumb-3.png" alt="" /></a-avatar>
                            </template>
                            <template #title>
                                <a href="#">{{communication.receiver}}</a>
                            </template>
                            <template #description>
                                <span>Active</span>
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>

                <div class="chatBoxInner" v-for="msg,index in list.conversationList" :key="index">
                    <div class="chatWrapper left" v-if="communication.senderId==msg.senderId">

                        <div class="message">
                            {{msg.message}}
                        </div>
                        <div class="time">{{ dateFormat(msg.createdAt)}}</div>
                    </div>
                    <div class="chatWrapper right" v-if="communication.receiverId==msg.senderId">
                        <div class="message">
                            {{msg.message}}
                        </div>
                        <div class="time">{{ dateFormat(msg.createdAt)}}</div>
                    </div>

                </div>
               
                <a-form ref="formRef" :model="formValue" layout="vertical" @finishFailed="taskFormFailed">
                    <div class="sendMessage" v-if="auth.user.id==communication.receiverId">
                        <a-input v-model:value="formValue.msgSend" size="large" placeholder="Type Message">
                            <template #addonAfter>
                                <!-- <a-button v-show="name=='communication' && !Id" class="modal-button" type="primary" html-type="submit">{{$t('global.send')}}</a-button> -->
                                <SendOutlined @click="sendMsg" />
                            </template>
                        </a-input>
                    </div>
                    <div class="sendMessage" v-else>
                        <a-input v-model:value="formValue.msgSend" size="large" placeholder="Type Message" disabled>
                            <template #addonAfter disabled>
                                <!-- <a-button v-show="name=='communication' && !Id" class="modal-button" type="primary" html-type="submit">{{$t('global.send')}}</a-button> -->
                                <SendOutlined @click="sendMsg" />
                            </template>
                        </a-input>
                    </div>
                </a-form>
            </div>
        </a-col>
    </a-row>
    <loader />
</a-modal>
</template>

<script>
import {
    SendOutlined
} from "@ant-design/icons-vue";
import {
    watchEffect,
    reactive
} from "vue"
import {
    useStore
} from "vuex"
import {
    dateFormat
} from "@/commonMethods/commonMethod"
import Loader from "@/components/loader/Loader";
import moment from "moment"

export default {
    components: {
        SendOutlined,
        Loader
    },
    props: {
        communication: {
            type: String
        }
    },
    setup(props) {
        const store = useStore()
        const formValue = reactive({
            msgSend: ''
        })
        //const scroll = ref('chatBoxInner')
        const auth = JSON.parse(localStorage.getItem("auth"))
        let interval = setInterval(() => {
            store.dispatch("conversation", props.communication.id)
        }, 3000);
        watchEffect(() => {
            store.state.communications.conversationList = ""
            store.dispatch("conversation", props.communication.id)
            //  const container = scroll.value;
            //   container.scrollTop = container.scrollHeight;

        })

        const list = store.getters.communicationRecord.value

        function sendMsg() {

            if (formValue.msgSend) {
                list.conversationList.push({
                    id: 2,
                    conversationId: props.communication.id,
                    senderId: props.communication.receiverId,
                    message: formValue.msgSend,
                    type: "text",
                    isRead: 0,
                    createdAt: moment
                })
                store.dispatch("conversationSend", {
                    conversationId: props.communication.id,
                    message: formValue.msgSend,
                    type: "text",
                })

                formValue.msgSend = ''
                // store.state.communications.conversationList=""

                store.dispatch("conversation", props.communication.id)
            }
        }

        function closeModal() {
            //store.state.communications.conversationList = ""
            clearInterval(interval);
        }

        return {
            list,
            sendMsg,
            formValue,
            dateFormat,
            closeModal,
            auth,
            //scroll,

        };
    },
};
</script>
