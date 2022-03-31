<template>
<a-modal width="800px" title="Reply" centered @cancel="closeModal()" class="chatModal">
    <a-row :gutter="24">
        <a-col :span="24" class="chatBox2">
            <div class="chatBox" ref="scroll" id="chatBox">
                <a-list item-layout="horizontal">
                    <a-list-item>
                        <a-list-item-meta>
                            <template #avatar>
                                
                                <a-avatar >
                                    <img v-if="patientPic" src="patientPic" alt="" />
                                    
                                        <img v-else src="@/assets/images/userAvatar.png" alt="" /></a-avatar>
                                       
                            </template>
                            <template #title>
                                
                                <a href="#">{{communication.patientName}}</a>
                            </template>
                            <template #description>
                                <span>Active</span>
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>

                <div class="chatBoxInner" v-for="msg,index in list.conversationList" :key="index">
                    <div class="chatWrapper left" v-if="auth.user.id!=msg.senderId">

                        <div class="message">
                            {{msg.message}}
                        </div>
                        <div class="time">{{ dateFormat(msg.createdAt)}}</div>
                    </div>
                    <div class="chatWrapper right" v-if="auth.user.id==msg.senderId">
                        <div class="message">
                            {{msg.message}}
                        </div>
                       
                        <div class="time" >{{ dateFormat(msg.createdAt)}}</div>
                    </div>

                </div>
                
            </div>
        </a-col>
    </a-row>
    <loader />
    <template #footer>
        <a-form ref="formRef" :model="formValue" layout="vertical" @finish="sendMsg" @finishFailed="taskFormFailed">
            <div class="sendMessage" v-if="auth.user.id==communication.receiverId || auth.user.id==communication.senderId">
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
        </template>
</a-modal>
</template>

<script>
import {
    SendOutlined
} from "@ant-design/icons-vue";
import {
    watchEffect,
    reactive,
    onMounted,
    ref
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

        const scroll = ref()
        const auth = JSON.parse(localStorage.getItem("auth"))
        let interval = setInterval(() => {
            store.dispatch("conversation", props.communication.id)
            getScroll()
        }, 5000);
        const scrollHeight = ref(null)
        const tableContent = ref(null)
        watchEffect(() => {
            store.state.communications.conversationList = ""
            store.dispatch("conversation", props.communication.id)
            store.dispatch("communicationsList");

             tableContent.value = document.getElementsByClassName('chatBox')
            getScroll()
          
              

        })
function getScroll(){
    setTimeout(()=>{
                scrollHeight.value = tableContent.value[0].scrollHeight
                tableContent.value[0].scrollTop=tableContent.value[0].scrollHeight
        },2000)
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
                // store.state.communications.conversationList=""

                //store.dispatch("conversation", props.communication.id)
            }
        }

        function closeModal() {
            store.state.communications.conversationList = ""
            clearInterval(interval);
        }
        onMounted(() => {
           
                // tableContent.addEventListener('scroll', (event) => {
                // let maxScroll = event.target.scrollHeight - event.target.clientHeight
                // let currentScroll = event.target.scrollTop + 2
                // console.log("data",currentScroll,maxScroll)  
                // }) 
        })
        return {
            list,
            sendMsg,
            formValue,
            dateFormat,
            closeModal,
            auth,
            scroll,

        };
    },
};
</script>
