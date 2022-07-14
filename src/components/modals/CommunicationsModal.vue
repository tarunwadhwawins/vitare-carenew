<template>
<a-modal width="1000px" title="Communications" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-form ref="formRef" :model="messageForm" layout="vertical" @finish="sendMessage" @finishFailed="sendMessageFailed" autocomplete="off">
        <a-row :gutter="24">
            <a-col v-if="toggleTo" :xl="24" :lg="24">
                <div class="form-group">
                    <div class="timer">
                        <h3>{{$t('patientSummary.currentSession')}} : {{ formattedElapsedTime }}</h3>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.from')" name="from" :rules="[{ required: true, message: $t('communications.communicationsModal.from')+' '+$t('global.validation')  }]">
                        <StaffDropDown :isDisabled="arrayToObjact(screensPermissions,37) ? false : true" v-model:value="messageForm.from" @handleStaffChange="handleStaffChange($event);checkChangeInput()" :close="closeValue" :editDataStaff="editTaskState" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24" @click="referenceId">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.to')" name="to">
                        <div class="btn toggleButton" :class="toggleTo ? 'active' : ''" @click="toggleTo = !toggleTo; checkChangeInput('entityType')">
                            <span class="btn-content">{{ $t('communications.communicationsModal.patient') }}</span>
                        </div>
                        <div class="btn toggleButton" :class="toggleTo ? '' : 'active'" @click="toggleTo = !toggleTo; checkChangeInput('entityType')">
                            <span class="btn-content">{{ $t('global.careCoodinator') }}</span>
                        </div>
                        <a-input type="hidden" id="entityType" v-model="messageForm.entityType" :value="toggleTo ? 'patient' : 'staff'" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24" v-show="toggleTo">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.patient')" name="referenceId" :rules="[{ required: true, message: $t('communications.communicationsModal.patient')+' '+$t('global.validation')  }]">

                        <PatientDropDown v-if="patientsList" v-model:value="messageForm.referenceId" @handlePatientChange="handlePatientChange($event);checkChangeInput('patient')" :close="closeValue" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24" v-show="!toggleTo">
                <div class="form-group">
                    <a-form-item :label="$t('global.careCoodinator')" name="referenceId" :rules="[{ required: true, message: $t('global.careCoodinator')+' '+$t('global.validation')  }]">
                        <StaffDropDown v-if="staffList" :checkSameAsStaff="true" v-model:value="messageForm.referenceId" @handlePatientChange="handlePatientChange($event);checkChangeInput()" :close="closeValue"/>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.messageCategory')" name="messageCategoryId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageCategory')+' '+$t('global.validation')  }]">

                        <GlobalCodeDropDown v-model:value="messageForm.messageCategoryId" :dataId="24" @handleGlobalChange="handleGlobalChange($event,'messageForm.messageCategoryId')" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.priority')" name="priorityId" :rules="[{ required: true, message: $t('communications.communicationsModal.priority')+' '+$t('global.validation')  }]">

                        <GlobalCodeDropDown v-model:value="messageForm.priorityId" :dataId="7" @handleGlobalChange="handleGlobalChange($event,'messageForm.priorityId')" @change="checkChangeInput()" :isColor="true" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.messageType')" name="messageTypeId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageType')+' '+$t('global.validation')  }]">
                        <a-select :getPopupContainer="triggerNode => triggerNode.parentNode"  v-model:value="messageForm.messageTypeId" style="width: 100%" size="large" @change="checkChangeInput()">
                            <a-select-option value="" disabled>{{'Select Message Type'}}</a-select-option>
                            <template v-for="type in messageType">
                                <a-select-option v-if="type.name == 'App Message' || type.name == 'Email'" :key="type.id" :value="type.id">{{ type.name }}</a-select-option>
                            </template>
                        </a-select>

                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.subject')" name="subject" :rules="[{ required: true, message: $t('communications.communicationsModal.subject')+' '+$t('global.validation')  }]">
                        <a-input v-model:value="messageForm.subject" size="large" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.message')" name="message" :rules="[{ required: true, message: $t('communications.communicationsModal.message')+' '+$t('global.validation')  }]">
                        <a-textarea v-model:value="messageForm.message" allow-clear @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="24">
                <FormButtons @onCancel="closeModal"/>
            </a-col>
        </a-row>
        <Loader />
    </a-form>
</a-modal>
</template>

<script>
import {
    ref,
    reactive,
    watchEffect,
    computed,
    onMounted,
    defineComponent,
    defineAsyncComponent,
} from "vue";
import {
    useStore
} from "vuex";
import FormButtons from "@/components/common/button/FormButtons";
import {
    arrayToObjact,
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "../../config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import { timeStamp } from "../../commonMethods/commonMethod";
import Loader from "@/components/loader/Loader";
export default defineComponent({
    components: {
        Loader,
        FormButtons,
        GlobalCodeDropDown,
        PatientDropDown: defineAsyncComponent(() => import("@/components/modals/search/PatientDropdownSearch.vue")),
        StaffDropDown: defineAsyncComponent(() => import("@/components/modals/search/StaffDropdownSearch.vue"))
    },
    setup(props, {
        emit
    }) {
        const store = useStore();
        const toggleTo = ref(true);
        const staffData = ref([]);
        const patientData = ref([]);
        const value = ref();
        const loggedInUserDetails = JSON.parse(localStorage.getItem("auth"));

        const editTaskState = [{
            value: loggedInUserDetails.user.staff.id,
            label: loggedInUserDetails.user.staff.fullName,
        }]
       
        const auth = JSON.parse(localStorage.getItem("auth"));
        const messageForm = reactive({
            from: "",
            entityType: "",
            referenceId: "",
            subject: "",
            messageCategoryId: "",
            priorityId: "",
            messageTypeId: "",
            message: "",
        });
        const closeValue = ref(false)
        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })
        watchEffect(() => {
            // store.dispatch("globalCodes");
            store.dispatch("allPatientsList");
            store.dispatch("allStaffList");
            if(loggedInUserDetails != null) {
                Object.assign(messageForm, {
                    from: loggedInUserDetails.user.staff.id,
                });
            }
        });

        const sendMessageFailed = () => {}

        onMounted(() => {

        })

        const handleStaffChange = (val) => {
            messageForm.from = val;
        };

        const handlePatientChange = (val) => {
            messageForm.referenceId = val;
        };

        const taskPriority = computed(() => {
            return store.state.common.taskPriority;
        });
        const taskPriorityWithColor = taskPriority.value
        console.log('taskPriorityWithColor', taskPriorityWithColor)
        const messageCategories = computed(() => {
            return store.state.common.messageCategories;
        });
        const messageType = computed(() => {
            return store.state.common.messageType;
        });

        const patientsList = computed(() => {
            return store.state.common.allPatientsList;
        });
        const staffList = computed(() => {
            return store.state.common.allStaffList;
        });

        const formRef = ref();
        const form = reactive({
            ...messageForm
        });

        // Countdown Timer
        const elapsedTime = ref(0)
        const timer = ref(undefined)
        
        const formattedElapsedTime = computed(() => {
            const date = new Date(null);
            date.setSeconds(elapsedTime.value / 1000);
            const utc = date.toUTCString();
            return utc.substr(utc.indexOf(":") - 2, 8);
        })

        function startTimer() {
            timer.value = setInterval(() => {
                elapsedTime.value += 1000;
            }, 1000);
        }

        const stopTimer = () => {
            clearInterval(timer.value);
            elapsedTime.value = 0
        };

        const addCommunication = computed(() => {
            return store.state.communications.addCommunication
        })

        const timeApprovalStatus = computed(() => {
            return store.state.common.timeApprovalStatus
        })

        const sendMessage = () => {
            closeValue.value = true
            messageForm.entityType = document.getElementById("entityType").value;
            store.getters.communicationRecord.value.communicationsList = "";
            store.dispatch("addCommunication", messageForm).then(() => {
                if(messageForm.entityType == 'patient') {
                    const approvalStatus = ref(null)
                    timeApprovalStatus.value.map((item) => {
                        if(item.name == 'Pending') {
                            approvalStatus.value = item.id
                        }
                    })
                    store.dispatch("timeApproval", {
                        staff: messageForm.from,
                        patient: messageForm.referenceId,
                        time: timeStamp(formattedElapsedTime),
                        type: messageForm.messageTypeId,
                        status: approvalStatus.value,
                        entityType: messageForm.entityType,
                        referenceId: addCommunication.value.id,
                    })
                }
                store.dispatch("communicationsList");
                store.dispatch("communicationTypes");
                closeValue.value = false
                store.commit('checkChangeInput', false)
                emit("is-visible", false);
                formRef.value.resetFields();
                Object.assign(messageForm, form);
                store.commit('patientReferenceId', null)
                clearInterval(timer.value);
                stopTimer()
            });
        };

        const handleCancel = () => {

            store.commit('checkChangeInput', false)
            formRef.value.resetFields();
            Object.assign(messageForm, form);
            store.commit('patientReferenceId', null)
        };

        const patientReferenceId = computed(() => {
            return store.state.patients.patientReferenceId
        })
        function checkChangeInput(value) {
            store.commit('checkChangeInput', true)
            if(value == "entityType") {
                store.commit('patientReferenceId', null)
                if(!toggleTo.value) {
                    clearInterval(timer.value);
                    stopTimer()
                }
            }
            if(value == "patient") {
                clearInterval(timer.value);
                if(value == "patient" && patientReferenceId.value != null) {
                    warningSwal(messages.timerMessage).then((response) => {
                        if (response == true) {
                            store.commit('patientReferenceId', messageForm.referenceId)
                            stopTimer()
                            startTimer()
                        }
                        else {
                            startTimer()
                            store.commit('patientReferenceId', patientReferenceId.value)
                            messageForm.referenceId = patientReferenceId.value
                            // Show Previous Patient here
                        }
                    });
                }
                else {
                    startTimer()
                    store.commit('patientReferenceId', messageForm.referenceId)
                }
            }
        }

        function closeModal() {
            emit("is-visible", true)
            if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        closeValue.value = true
                        setTimeout(() => {
                            closeValue.value = false
                        }, 100)
                        store.commit('checkChangeInput', false)
                        handleCancel();
                        emit("is-visible", false);
                        stopTimer()
                        store.commit('patientReferenceId', null)
                    }
                    else {
                        emit("is-visible", true);
                    }
                });
            }
            else {
                formRef.value.resetFields();
                emit("is-visible", false)
                stopTimer()
                store.commit('patientReferenceId', null)
            }
        }
        const patientChange = (value) => {
            store.dispatch("patientDetails", value);
        };

        function referenceId() {
            messageForm.referenceId = "";
        }

        const handleGlobalChange = (data,type) =>{
      if (type == "messageForm.messageCategoryId") {
        messageForm.messageCategoryId = data;
      }
      if (type == "messageForm.priorityId") {
        messageForm.priorityId = data;
      }
    }
       
       
        return {
            handleGlobalChange,
            loadingStatus: store.getters.loadingStatus,
            staffData,
            patientData,
            value,
            sendMessageFailed,
            toggleTo,
            patientChange,
            handleCancel,
            sendMessage,
            patientsList,
            staffList,
            taskPriority,
            messageCategories,
            messageType,
            messageForm,
            formRef,
            auth,
            closeModal,
            referenceId,
            screensPermissions:store.getters.screensPermissions,
            arrayToObjact,
            // handleStaffSearch,
            handleStaffChange,
            // handlePatientSearch,
            handlePatientChange,
            closeValue,
            checkChangeInput,
            formattedElapsedTime,
            editTaskState,
            loggedInUserDetails,
        };
    },
});
</script>

<style>
.ant-modal-footer {
    display: none;
}

.toggleButton {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 6px 16px;
    display: inline-block;
    cursor: pointer;
    width: fit-content;
}

.toggleButton.active {
    background-color: #777;
    color: #fff;
}
</style>
