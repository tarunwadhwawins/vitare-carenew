<template>
<a-modal width="1000px" :title="threshodId ? 'Edit General Parameters': $t('thresholds.thresholdModal.generalParameters')" centered :footer="null" :maskClosable="false" @cancel="closeModal()">

    <Loader v-if="threshodId" />

    <a-form ref="formRef" :model="thresholdForm" layout="vertical" @finish="submitForm" @finishFailed="taskFormFailed">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('thresholds.thresholdModal.generalParametersGroup')" name="generalParametersGroup" :rules="[{required: true,message:$t('thresholds.thresholdModal.generalParametersGroup') + ' ' +$t('global.validation'),},]">
                        <a-input v-model:value="thresholdForm.generalParametersGroup" size="large" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :md="12" :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.type')" name="deviceTypeId" :rules="[{required: true,message: $t('global.type') + ' ' + $t('global.validation'),},]">
                        <a-select v-if="globalCode.deviceType.globalCode" ref="select" v-model:value="thresholdForm.deviceTypeId" style="width: 100%" size="large" :disabled="threshodId ? true : false" placeholder="Select Device Type" @change="handleDevice">
                            <a-select-option value hidden disabled>
                                {{ "Select Device Type" }}
                            </a-select-option>
                            <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{ device.name }}</a-select-option>
                        </a-select>
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType ? errorMsg.deviceType[0] : ''" />
                    </a-form-item>
                </div>
            </a-col>
        </a-row>

        <div v-if="vitalData">
            <a-row :gutter="24" v-for="(vital, i) in vitalData" :key="i">
                <a-col :md="12" :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item :label="$t('thresholds.thresholdModal.highLimit') +'(' +vital.field +')'" name="generalParametershigh[vital.id]" :rules="[{required:false, message:'Only number is required.',pattern:new RegExp(/\d+(\.\d{1,2})?$/g)}]">
                            <!-- <a-input v-model="value" size="large" /> -->
                            <a-input v-model:value="thresholdForm.generalParametershigh[vital.id]" size="large" style="width: 100%" />
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.note ? errorMsg.high[0] : ''" />
                        </a-form-item>
                    </div>
                </a-col>
                <a-col :md="12" :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item :label="$t('thresholds.thresholdModal.lowLimit') +'(' +vital.field +')'" name="generalParameterslow[vital.id]" :rules="[{required:false, message:'Only number is required.',pattern:new RegExp(/\d+(\.\d{1,2})?$/g)}]">
                            <!-- <a-input v-model="value" size="large" /> -->
                            <a-input v-model:value="thresholdForm.generalParameterslow[vital.id]" size="large" style="width: 100%" />
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.note ? errorMsg.low[0] : ''" />
                        </a-form-item>
                    </div>
                </a-col>
            </a-row>
        </div>
        <a-row :gutter="24">
            <a-col :span="24">
                <div class="steps-action">
                    <ModalButtons @is_click="handleCancel" :disabled="formButton" :Id="threshodId" />
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>

<script>
import {

    ref,
    reactive,
    computed,
    watchEffect
} from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import ErrorMessage from "../common/messages/ErrorMessage";
import {
    useStore
} from "vuex";
import {
    regex
} from "@/RegularExpressions/regex";
import Loader from "@/components/loader/Loader";
import {
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "../../config/messages";
const OPTIONS = ["Jane Doe", "Steve Smith", "Joseph William"];
const OPTIONSTAG = ["Admin", "Clinical", "Office", "Personal"];

export default {
    components: {
        ErrorMessage,
        ModalButtons,
        Loader,
    },
    props: {
        threshodId: {
            type: String,
        },
    },
    setup(props, {
        emit
    }) {
        const store = useStore();

        const value = ref();
        const value2 = ref();
        const formRef = ref();
        const formButton = ref(false)
        const selectedItems = ref(["Jane Doe"]);
        const filteredOptions = computed(() =>
            OPTIONS.filter((o) => !selectedItems.value.includes(o))
        );

        const selectedItemsForTag = ref(["Admin"]);
        const filteredOptionsForTag = computed(() =>
            OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
        );

        const thresholdForm = reactive({
            deviceType: "",
            deviceTypeId: "",
            generalParametersGroup: "",
            generalParametershigh: [],
            generalParameterslow: [],
            udid: [],
        });
        const form = reactive({
            ...thresholdForm
        });
        const globalCode = computed(() => {
            return store.state.common;
        });

        const vitalData = computed(() => {
            return store.state.thresholds.vitalData;
        });
        const vitalEdit = computed(() => {
            return store.state.thresholds;
        });

        function closeModal() {
            console.log("check", thresholdForm)
            if (thresholdForm.generalParametersGroup != "" || thresholdForm.deviceTypeId != "") {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        ///console.log("check2")
                        handleCancel();
                        emit("is-visible", false);

                    } else {
                        emit("is-visible", true);
                        //             if (props.threshodId) {

                        //                 Object.assign(thresholdForm, form);
                        //                 Object.assign(thresholdForm, vitalEdit.value.vitalEdit)
                        //                 setTimeout(() => {
                        //                     store.commit('loadingStatus', false)
                        //         }, 2000)

                        // }

                        console.log("check", thresholdForm)
                    }
                });
            }
        }

        function handleDevice() {
            store.state.thresholds.vitalData = null;
            thresholdForm.generalParametershigh = [];
            thresholdForm.generalParameterslow = [];
            store.dispatch("getVital", thresholdForm.deviceTypeId);
        }

        const submitForm = () => {
            formButton.value = true
            let parameter = [];
            thresholdForm.generalParameterslow.forEach(function (Element, i) {
                if (Element) {
                    console.log("Element", Element);
                    parameter.push({
                        type: i,
                        lowLimit: Element,
                        highLimit: thresholdForm.generalParametershigh[i],
                        parameterId: props.threshodId ? thresholdForm.udid[i] : "",
                    });
                }
            });
            if (props.threshodId != null) {
                store.dispatch("updateGeneralParameterGroup", {
                    data: {
                        deviceTypeId: thresholdForm.deviceTypeId,
                        generalParameterGroup: thresholdForm.generalParametersGroup,
                        parameter: parameter,
                    },
                    id: props.threshodId,
                });
            } else {
                store.dispatch("addGeneralParameterGroup", {
                    deviceTypeId: thresholdForm.deviceTypeId,
                    generalParameterGroup: thresholdForm.generalParametersGroup,
                    parameter: parameter,
                });
            }

            setTimeout(() => {
                store.getters.vitalDataGetters.value.vitalList = ''
                store.dispatch("generalParameterList");
                emit("is-visible", false);
                handleCancel();
            }, 2000);
        };

        const handleCancel = () => {
            formRef.value.resetFields();
            Object.assign(thresholdForm, form);
            store.commit('vitalNull')

        };
        watchEffect(() => {

            if (props.threshodId != null) {

                if (vitalEdit.value.vitalEdit) {
                    store.commit('loadingStatus', true)
                    store.dispatch("getVital", vitalEdit.value.vitalEdit.deviceTypeId);

                    Object.assign(thresholdForm, vitalEdit.value.vitalEdit)

                    setTimeout(() => {
                        store.commit('loadingStatus', false)
                    }, 2000)

                }
            }
        });

        return {
            handleDevice,
            globalCode,
            thresholdForm,
            vitalData,
            handleCancel,
            submitForm,
            selectedItems,
            filteredOptions,
            filteredOptionsForTag,
            selectedItemsForTag,
            size: ref("large"),
            value,
            value2,
            formRef,
            regex,
            vitalEdit,
            closeModal,
            formButton,

        };
    },
};
</script>
