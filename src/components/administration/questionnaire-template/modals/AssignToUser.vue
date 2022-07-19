<template>

<a-modal width="80%" :title="detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName:''" centered :maskClosable="false" @cancel="closeModal()" :footer="false">

    <a-form ref="formRef" :model="userAssign" layout="vertical" @finish="assignTemplate">
        <a-row :gutter="16">
            <a-col :sm="12" :xs="24">
                <div class="form-group">

                    <a-form-item :label="$t('tasks.tasksModal.patient')" name="patientsId" :rules="[{ required: validation, message: $t('tasks.tasksModal.patient')+' '+$t('global.validation')  }]">
                        <PatientDropDown mode="multiple" v-model:value="userAssign.patientsId" @handlePatientChange="handlePatientChange($event)" :close="closeValue" />

                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.careCoodinator')" name="staffId" :rules="[{ required: validation, message: $t('global.careCoodinator')+' '+$t('global.validation')  }]">
                        <StaffDropDown mode="multiple" v-model:value="userAssign.staffId" @handleStaffChange="handleStaffChange($event)" :close="closeValue" />

                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="24">
                <FormButtons @onCancel="closeModal" :submitButton="$t('global.assign')" />

            </a-col>
        </a-row>
        <TableLoader />
    </a-form>

</a-modal>
</template>

<script>
import { ref, reactive, defineComponent, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import TableLoader from "@/components/loader/TableLoader"
import FormButtons from "@/components/common/button/FormButtons"
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue";
export default defineComponent({
    name: 'Assign To User',
    emits: ["is-visible"],
    components: {
        TableLoader,
        FormButtons,
        PatientDropDown,
        StaffDropDown
    },
    props: ["tempId"],

    setup(props, {
        emit
    }) {
        const store = useStore();
        const formRef = ref();
        const validation = ref(true)
        const userAssign = reactive({
            type: '',
            patientsId: [],
            staffId: [],

        })
        const form = reactive({
            ...userAssign
        })
        onMounted(() => {
store.dispatch("detailsQuestionnaireTemplate", props.tempId)
        })
        watchEffect(()=>{
            if(userAssign.patientsId.length > 0 || userAssign.staffId.length > 0){
                validation.value = false
            }else{
                validation.value = true
            }
        })

        const assignTemplate = () => {
            if(userAssign.patientsId.length > 0 || userAssign.staffId.length > 0){
            let data = []
            userAssign.patientsId.length > 0 ? userAssign.patientsId.map((item) => {
                data.push({
                    "questionnaireTemplateId": props.tempId,
                    "entityType": 247,
                    "referenceId": item

                })
            }) : ''
            userAssign.staffId.length > 0 ? userAssign.patientsId.map((item) => {
                data.push({
                    "questionnaireTemplateId": props.tempId,
                    "entityType": 246,
                    "referenceId": item

                })

            }) : ''
          
            store.dispatch("assignToUser", data).then(()=>{
                if(store.state.common.successMsg){
                    emit("is-visible", {
                            show: false,
                            id: props.tempId
                        })
                }
            })
            }
        }
        const handleStaffChange = (val) => {
            userAssign.staffId = val;
        };

        const handlePatientChange = (val) => {
            userAssign.patientsId = val;
        };

        function reset() {

            store.state.patients.errorMsg = ""
            store.commit("checkChangeInput", false)
            Object.assign(userAssign, form)

        }

        function closeModal() {

            if (checkFieldsData.value) {
                emit("is-visible", {
                    show: true,
                    id: props.tempId
                })
                warningSwal(messages.modalWarning).then((response) => {

                    if (response == true) {
                        emit("is-visible", {
                            show: false,
                            id: props.tempId
                        })
                        reset()

                    } else {
                        reset()
                        emit("is-visible", {
                            show: true,
                            id: props.tempId
                        })
                    }
                });
            } else {
                formRef.value.resetFields()

                emit("is-visible", {
                    show: false,
                    id: props.tempId
                })
            }
        }

        function checkChangeInput() {
            store.commit("checkChangeInput", true);
        }
        const errorMsg = store.getters.errorMsg
        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput
        })

        return {

            closeModal,
            checkChangeInput,
            checkFieldsData,
            errorMsg,
            formRef,
            reset,
            userAssign,
            assignTemplate,
            handleStaffChange,
            handlePatientChange,
            validation,
            detailsQuestionnaireTemplate: store.getters.detailsQuestionnaireTemplate,

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
