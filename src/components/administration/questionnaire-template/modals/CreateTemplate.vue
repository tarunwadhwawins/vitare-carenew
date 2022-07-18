<template>
<a-modal width="100%" :title="update ? 'Edit Template' : 'Create Template'" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="questionnaireTemplate" layout="vertical" @finish="update ? updateTemplate() : addTemplate()">
        <a-row :gutter="16">
            <a-col :span="12">
                <div class="form-group">

                    <a-form-item :label="$t('questionnaire.templateName')" name="templateName" :rules="[{ required: true, message: $t('questionnaire.templateName') +' '+$t('global.validation') }]">
                        <a-input v-model:value="questionnaireTemplate.templateName" :placeholder="$t('questionnaire.entertemplateName')" style="width: 100%" size="large" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateName[0]:''" />
                    </a-form-item>

                </div>

            </a-col>
            <a-col :span="12">
                <div class="form-group">

                    <a-form-item :label="$t('questionnaire.templateType')" name="templateTypeId" :rules="[{ required: true, message: $t('questionnaire.templateType') +' '+$t('global.validation') }]">
                        <GlobalCodeDropDown v-model:value="questionnaireTemplate.templateTypeId" :dataId="57" @handleGlobalChange="handleGlobalChange($event,'questionnaireTemplate.templateTypeId')" @change="checkChangeInput()" :disabled="cloneId ? true : false" :editDataGlobal="cloneId ? dataGlobal : []" :close="oneTimeRefresh"/>
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateTypeId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="24">
                <div class="form-group questionnairTag">

                    <a-form-item :label="$t('questionnaire.tags')" name="tags">
                        <a-select ref="select" v-model:value="questionnaireTemplate.tags" style="width: 100%" @focus="focus" @change="handleChange" mode="tags" size="large" :placeholder="$t('questionnaire.selectTags')" :getPopupContainer="triggerNode => triggerNode.parentNode">

                            <a-select-option v-for="item,index in questionnaireTemplate.tags" :key="index" :value="item">{{item}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>

            </a-col>
            <a-col :span="24">

                <div class="steps-action">
                    <a-form-item>
                        <a-button class="modal-button" style="margin-right: 8px" html-type="reset" v-if="!update" @click="closeModal">{{$t('global.cancel')}}</a-button>
                        <a-button class="modal-button" type="primary" html-type="submit" :disabled="disabled" v-if="!update">{{$t('global.save')}}</a-button>
                        <a-button class="modal-button" type="primary" html-type="submit" v-else>{{$t('global.update')}}</a-button>
                    </a-form-item>
                </div>
            </a-col>
        </a-row>
        <TableLoader />
    </a-form>

</a-modal>
</template>

<script>
import { ref, reactive, defineComponent, computed,watchEffect } from "vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import TableLoader from "@/components/loader/TableLoader"
import ErrorMessage from "@/components/common/messages/ErrorMessage"
export default defineComponent({
    emits: ["is-visible"],
    components: {
        TableLoader,
        GlobalCodeDropDown,
        ErrorMessage
    },
    props: {
        update: String,
        cloneId: String
    },

    setup(props, {
        emit
    }) {
        const store = useStore();
        const formRef = ref();
      const  oneTimeRefresh = ref(false)
        const questionnaireTemplate = reactive({
            templateName: "",
            templateTypeId: "",
            tags: [],
        });
        const disabled = ref(false)
        const form = reactive({
            ...questionnaireTemplate
        })
        const detailsQuestionnaireTemplate = store.getters.detailsQuestionnaireTemplate
        const dataGlobal = ref([])
        watchEffect(() => {
      if(props.cloneId && detailsQuestionnaireTemplate.value){

        dataGlobal.value.push({
          label:detailsQuestionnaireTemplate.value.templateType,
          value: detailsQuestionnaireTemplate.value.templateTypeId
        })
        questionnaireTemplate.templateTypeId = detailsQuestionnaireTemplate.value.templateType
         
      }
            if (props.update) {

                if (detailsQuestionnaireTemplate.value) {

                    Object.assign(questionnaireTemplate, detailsQuestionnaireTemplate.value)

                } else {
                    Object.assign(questionnaireTemplate, form)
                }
            }
        })
        const addTemplate = () => {
            disabled.value = true
            
            store.dispatch("addQuestionnaireTemplate", questionnaireTemplate).then(() => {
                if (store.state.common.successMsg) {
                 
                    if (props.cloneId) {
                        
                        detailsQuestionnaireTemplate.value ?
                            detailsQuestionnaireTemplate.value.questionnaireQuestion.forEach((element) => {

                                if (element.entityType != 'question') {
                                    store.dispatch("sectionAssignToTemplate", {
                                        id: store.getters.addQuestionnaireTemplate.value.id,
                                        sectionId: [element.questionnaireSection.id],
                                        method: "post",
                                        showPopup: false
                                    })

                                } else {
                                    store.dispatch("addAssiignquestionnaire", {
                                        data: {
                                            questionId: [element.question.id],
                                            id: store.getters.addQuestionnaireTemplate.value.id,

                                        },
                                        method: "post",
                                        id: store.getters.addQuestionnaireTemplate.value.id,
                                        temOrSection: "template",
                                        showPopup: false
                                    })

                                }
                            }) : ''

                    }
                    emit("is-visible", {
                        show: false,
                        id: props.update
                    })
                    reset()
                    store.dispatch("questionnaireTemplateList")
                    disabled.value = false
                     oneTimeRefresh.value = true
            setTimeout(()=>{
              oneTimeRefresh.value = false
            },100)
                }
            })
        }
        const updateTemplate = () => {
            store.dispatch("updateQuestionnaireTemplate", {
                data: questionnaireTemplate,
                id: props.update
            }).then(() => {
                if (store.state.common.successMsg) {
                    emit("is-visible", {
                        show: false,
                        id: ''
                    })
                    reset()
                    store.dispatch("questionnaireTemplateList")
                }
            })
        }

        function reset() {
            store.state.patients.errorMsg = ""
            store.commit("checkChangeInput", false)
            Object.assign(questionnaireTemplate, form)
            questionnaireTemplate.tags = []
            disabled.value = false
            store.state.questionnaireTemplate.detailsQuestionnaireTemplate = []
            oneTimeRefresh.value = true
            setTimeout(()=>{
              oneTimeRefresh.value = false
            },100)

        }

        function closeModal() {

            if (checkFieldsData.value) {
                emit("is-visible", {
                    show: true,
                    id: props.update
                })
                warningSwal(messages.modalWarning).then((response) => {

                    if (response == true) {
                        emit("is-visible", {
                            show: false,
                            id: props.update
                        })
                        reset()
                        disabled.value = false
                    } else {
                        emit("is-visible", {
                            show: true,
                            id: props.update
                        })
                    }
                });
            } else {
                reset()
                formRef.value.resetFields()
                disabled.value = false
                emit("is-visible", {
                    show: false,
                    id: props.update
                })
            }
        }

        function checkChangeInput() {
            store.commit("checkChangeInput", true);
        }
        const errorMsg = store.getters.errorMsg.value
        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput
        })
        const handleGlobalChange = (data, type) => {
            if (type == 'questionnaireTemplate.templateTypeId') {
                questionnaireTemplate.templateTypeId = data

            }

        }
        const options = ref([]);
        const handleChange = value => {
            options.value = []
            questionnaireTemplate.tags.map((item) => {
                options.value.push({
                    value: item,
                    label: item,
                })
            })

            console.log(`selected ${value}`);
        };

        return {
            handleChange,
            options,
            questionnaireTemplate,
            addTemplate,
            closeModal,
            checkChangeInput,
            checkFieldsData,
            errorMsg,
            formRef,
            updateTemplate,
            disabled,
oneTimeRefresh,
            reset,
            handleGlobalChange,
            dataGlobal

        };
    },
});
</script>
