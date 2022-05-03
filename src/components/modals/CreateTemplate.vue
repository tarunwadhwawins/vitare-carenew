<template>
<a-modal width="100%" title="Create Template" centered :maskClosable="false" @cancel="closeModal()" :footer="false">

    <a-form ref="formRef" :model="questionnaireTemplate" layout="vertical" @finish="addTemplate" @finishFailed="onFinishFailed">

        <a-row :gutter="16">
            <a-col :span="12">
                <div class="form-group">
                    <a-form-item label="Template Name" name="template" :rules="[{ required: true, message: 'template' +' '+$t('global.validation') }]">
                        <a-input v-model:value="questionnaireTemplate.template" placeholder="Enter Template Name" style="width: 100%" size="large" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.template[0]:''" />
                    </a-form-item>

                </div>

            </a-col>
            <a-col :span="12">
                <div class="form-group">
                    <a-form-item label="Template Type" name="templateId" :rules="[{ required: true, message: 'template Type' +' '+$t('global.validation') }]">
                        <a-select ref="select" v-model:value="questionnaireTemplate.templateId" style="width: 100%" @focus="focus" @change="checkChangeInput()" placeholder="Choose Type" size="large">
                            <a-select-option value="Intake">Intake</a-select-option>
                            <a-select-option value="Screening">Screening</a-select-option>
                            <a-select-option value="Assessment">Assessment</a-select-option>
                            <a-select-option value="Care Plan">Care Plan</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="24">
                <div class="text-right mt-28">
                    <a-button class="btn primaryBtn" type="primary" html-type="submit" v-if="!update" @click="showModal">Save</a-button>
                    <a-button class="btn primaryBtn" type="primary" html-type="submit" v-else @click="showModal">Update</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>

</a-modal>

<!--modals-->

<!---->
</template>

<script>
import {
    ref,
    reactive,
    defineComponent,
    computed,
} from "vue";
import {
    useStore
} from "vuex"
import {
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "../../config/messages";
export default defineComponent({
    props: {
        update: Boolean
    },

    setup(props, {
        emit
    }) {
        const store = useStore()
        const formRef = ref()
        const questionnaireTemplate = reactive({
            template: '',
            templateId: ''
        })
        const addTemplate = () => {
            store.commit('checkChangeInput', false)
        }

        function closeModal() {
            if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {

                        emit('is-visible', false);
                        store.commit('checkChangeInput', false)
                    } else {
                        emit("is-visible", true);

                    }
                });
            } else {
                formRef.value.resetFields();
            }
        }

        function checkChangeInput() {
            store.commit('checkChangeInput', true)
        }

        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })
        return {
            questionnaireTemplate,
            addTemplate,
            closeModal,
            checkChangeInput,
            checkFieldsData,
        }
    }
});
</script>
