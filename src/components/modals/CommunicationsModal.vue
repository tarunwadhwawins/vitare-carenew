<template>
<a-modal width="1000px" title="Communications" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-form ref="formRef" :model="messageForm" layout="vertical" @finish="sendMessage" @finishFailed="sendMessageFailed">
        <a-row :gutter="24">

            <a-col :sm="12" :xs="24">
                <div class="form-group">

                    <a-form-item :label="$t('communications.communicationsModal.from')" name="from" :rules="[{ required: true, message: $t('communications.communicationsModal.from')+' '+$t('global.validation')  }]">

                        <StaffDropDown :disabled="arrayToObjact(staffPermissions,37) ? false : true" v-model:value="messageForm.from" @handleStaffChange="handleStaffChange($event)" :close="closeValue" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24" @click="referenceId">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.to')" name="to">
                        <div class="btn toggleButton" :class="toggleTo ? 'active' : ''" @click="toggleTo = !toggleTo">
                            <span class="btn-content">{{ $t('communications.communicationsModal.patient') }}</span>
                        </div>
                        <div class="btn toggleButton" :class="toggleTo ? '' : 'active'" @click="toggleTo = !toggleTo">
                            <span class="btn-content">{{ $t('communications.communicationsModal.staff') }}</span>
                        </div>
                        <a-input type="hidden" id="entityType" v-model="messageForm.entityType" :value="toggleTo ? 'patient' : 'staff'" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24" v-show="toggleTo">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.patient')" name="referenceId" :rules="[{ required: true, message: $t('communications.communicationsModal.patient')+' '+$t('global.validation')  }]">

                        <PatientDropDown v-if="patientsList" v-model:value="messageForm.referenceId" @handlePatientChange="handlePatientChange($event)" :close="closeValue" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24" v-show="!toggleTo">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.staff')" name="referenceId" :rules="[{ required: true, message: $t('communications.communicationsModal.staff')+' '+$t('global.validation')  }]">
                        <StaffDropDown v-if="staffList" :checkSameAsStaff="true" v-model:value="messageForm.referenceId" @handlePatientChange="handlePatientChange($event)" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.messageCategory')" name="messageCategoryId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageCategory')+' '+$t('global.validation')  }]">

                        <GlobalCodeDropDown v-model:value="messageForm.messageCategoryId" :globalCode="messageCategories" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.priority')" name="priorityId" :rules="[{ required: true, message: $t('communications.communicationsModal.priority')+' '+$t('global.validation')  }]">

                        <GlobalCodeDropDown v-model:value="messageForm.priorityId" :globalCode="taskPriority" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('communications.communicationsModal.messageType')" name="messageTypeId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageType')+' '+$t('global.validation')  }]">
                        <a-select ref="select" v-model:value="messageForm.messageTypeId" style="width: 100%" size="large" @change="checkChangeInput()">
                            <a-select-option value="" disabled>{{'Select Message Type'}}</a-select-option>
                            <template v-for="type in messageType">
                                <a-select-option v-if="type.name == 'SMS' || type.name == 'Email'" :key="type.id" :value="type.id">{{ type.name }}</a-select-option>
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
                <ModalButtons name="communication" @is_click="handleCancel"/>

            </a-col>
        </a-row>
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
    defineAsyncComponent
} from "vue";
import {
    useStore
} from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import {
    arrayToObjact,
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "../../config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
export default defineComponent({
    components: {
        ModalButtons,
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
        // const loadingStatus = ref()
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
            store.dispatch("globalCodes");
            store.dispatch("allPatientsList");
            store.dispatch("allStaffList");
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
        const sendMessage = () => {
            closeValue.value = true
            messageForm.entityType = document.getElementById("entityType").value;
            store.getters.communicationRecord.value.communicationsList = "";
            store.dispatch("addCommunication", messageForm).then(() => {
                store.dispatch("communicationsList");
                store.dispatch("communicationTypes");
                closeValue.value = false
                store.commit('checkChangeInput', false)
            });

            emit("is-visible", false);
            formRef.value.resetFields();
            Object.assign(messageForm, form);
        };

        const handleCancel = () => {
          store.commit('checkChangeInput', false)
            formRef.value.resetFields();
            Object.assign(messageForm, form);
        };

        function checkChangeInput() {
            store.commit('checkChangeInput', true)
        }

        function closeModal() {
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
                    } else {
                        emit("is-visible", true);
                    }
                });
            }
        }
        const patientChange = (value) => {
            store.dispatch("patientDetails", value);
        };

        function referenceId() {
            messageForm.referenceId = "";
        }
        const staffPermissions = computed(() => {
            return store.state.screenPermissions.staffPermissions;
        });

       
        return {
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
            staffPermissions,
            arrayToObjact,
            // handleStaffSearch,
            handleStaffChange,
            // handlePatientSearch,
            handlePatientChange,
            closeValue,
            checkChangeInput
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
    width: 100px;
}

.toggleButton.active {
    background-color: #777;
    color: #fff;
}
</style>
