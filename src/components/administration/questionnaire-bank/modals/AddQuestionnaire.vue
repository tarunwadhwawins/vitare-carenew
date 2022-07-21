<template>
<a-modal width="80%" :title="name ? $t('questionnaire.addQuestionnaire') +'('+name+')':$t('questionnaire.addQuestionnaire')" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="questionnaire" layout="vertical" @finish="addQuestionnaire">

        <div class="questionnaireMain">
            <a-row :gutter="24">
                <a-col :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item :label="$t('questionnaire.question')" name="question" :rules="[{ required: true, message: $t('questionnaire.question') +' '+$t('global.validation') }]">
                            <a-input v-model:value="questionnaire.question" placeholder="Enter Question" style="width: 100%" size="large" @change="checkChangeInput()" />
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.question[0]:''" />
                        </a-form-item>

                    </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item label="Question Type" name="questionType" :rules="[{ required: true, message: 'Question Type' +' '+$t('global.validation') }]">
                            <a-select ref="select" v-model:value="questionnaire.questionType" style="width: 100%" size="large" placeholder="Select Question Type" :getPopupContainer="triggerNode => triggerNode.parentNode" @change="checkChangeInput()">
                                <a-select-option value="Test">Test</a-select-option>
                                <a-select-option value="Survey">Survey</a-select-option>
                            </a-select>
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.dataTypeId?errorMsg.questionType[0]:''" />
                        </a-form-item>
                    </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item :label="$t('questionnaire.type')" name="dataTypeId" :rules="[{ required: true, message: $t('questionnaire.type') +' '+$t('global.validation') }]">
                            <GlobalCodeDropDown v-model:value="questionnaire.dataTypeId" :dataId="58" @handleGlobalChange="handleGlobalChange($event,'questionnaire.dataTypeId')" @change="checkChangeInput(); questionType();" made="single" />
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.dataTypeId?errorMsg.dataTypeId[0]:''" />
                        </a-form-item>
                    </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                    <div class="form-group questionnairTag">
                        <label> {{$t('questionnaire.tags')}}</label>
                        <a-select ref="select" v-model:value="questionnaire.tags" style="width: 100%" mode="tags" size="large" :placeholder="$t('questionnaire.selectTags')" :getPopupContainer="triggerNode => triggerNode.parentNode">
                        </a-select>
                    </div>

                </a-col>

                <a-col :sm="24" class="mt-25" v-if="questionnaire.dataTypeId==243 || questionnaire.dataTypeId==244">

                    <a-row>

                    </a-row>
                    <a-row :gutter="16" v-for="(lable,index) in questionnaire.lable" :key="lable.key">

                        <a-col :span="2" v-if="questionnaire.questionType == 'Test'">
                            <label v-if="index==0" :class="index==0 ? 'mt-20':'mt-40'">{{$t('questionnaire.correct')}}</label>
                            <a-checkbox :class="index==0 ? 'd-flex ':'mt-40'" v-model:chacked="questionnaire.answer[lable.key]" v-model:value="lable.key" v-if="questionnaire.dataTypeId==244" name="default" @change="checkboxChange($event);checkChangeInput();" />
                            <a-radio-group v-else v-model:value="value">
                                <a-radio :class="index==0 ? 'mt-20':'mt-40'" :value="lable.key" @change="radioChange($event)"></a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col :span="2">
                            <label v-if="index==0" :class="index==0 ? 'd-flex ':''">{{$t('questionnaire.default')}}</label>
                            <a-checkbox :class="index==0 ? 'mt-20':'mt-40'" v-model:chacked="questionnaire.default[lable.key]" v-model:value="lable.key" name="default" v-if="questionnaire.dataTypeId==244" @change="checkboxChangeDefault($event);checkChangeInput();" />
                            <a-radio-group v-else v-model:value="value2">
                                <a-radio :class="index==0 ? 'mt-20':'mt-40'" :value="lable.key" @change="radioChangeDefault($event)"></a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col :span="5">
                            <div class="form-group">
                                <a-form-item :label="$t('questionnaire.label')">
                                    <a-input v-model:value="lable.value" :placeholder="$t('questionnaire.label')" style="width: 100%" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="2">
                            <div class="form-group">
                                <a-form-item :label="$t('questionnaire.score')">
                                    <a-input v-model:value="questionnaire.labelScore[lable.key]" placeholder="Score" style="width: 100%" size="large" @change="checkChangeInput()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="5" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('questionnaire.program')">
                                    <ArrayDataSearch v-if="programList" v-model:value="questionnaire.programId[lable.key]" :globalCode="programList" @change="checkChangeInput(); programChange($event,lable.key,programList);" mode="multiple" :max-tag-count="2" :maxTagTextLength="5" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="2" v-for="(programScores,i) in questionnaire.programId[lable.key]" :key="i">
                            <a-tooltip>
                                <template #title>
                                    <span>{{(arrayToObjact(programList, programScores)).name}}</span>
                                </template>

                                <div class="form-group">
                                    <span><label>{{(arrayToObjact(programList, programScores)).name.length>5 ?(arrayToObjact(programList, programScores)).name.substring(0,10)+'...' : (arrayToObjact(programList, programScores)).name}}</label></span>
                                    <a-form-item>
                                        <a-input v-model:value="questionnaire.programScore[(lable.key+''+programScores)]" :placeholder="(arrayToObjact(programList, programScores)).name +' Score'" style="width: 100%" size="large" @change="checkChangeInput()" />
                                    </a-form-item>
                                </div>
                            </a-tooltip>
                        </a-col>
                        <a-button v-if="questionnaire.lable.length > 1" class="mt-30" danger :size="size" :disabled="questionnaire.lable.length === 1" @click="removeLable(lable)">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                        </a-button>

                        <a-col :span="1" class="text-right" v-if="index==(questionnaire.lable.length-1)">
                            <a-button class="mt-30" type="primary" size="large" @click="addLable">
                                <template #icon>
                                    <PlusOutlined />
                                </template>
                            </a-button>
                        </a-col>
                    </a-row>

                </a-col>
                <a-col :span="3" v-else>
                    <div class="form-group">

                        <label>{{$t('questionnaire.score')}}</label>
                        <a-input v-model:value="questionnaire.textScore" placeholder="Score" style="width: 100%" size="large" />

                    </div>
                </a-col>

                <a-col :span="24">
          <FormButtons @onCancel="closeModal" :submitButton="update ? $t('global.update') : $t('global.save')"/>
                   
                </a-col>
            </a-row>
        </div>
    </a-form>
</a-modal>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { warningSwal, arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import { useStore } from "vuex";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import ArrayDataSearch from "@/components/modals/search/ArrayDataSearch.vue";
import ErrorMessage from "@/components/common/messages/ErrorMessage"
import FormButtons from "@/components/common/button/FormButtons"
export default {
    name: 'Add Questionnaire',
    emits: ["is-visible"],
    components: {
        PlusOutlined,
        DeleteOutlined,
        GlobalCodeDropDown,
        ErrorMessage,
        ArrayDataSearch,
        FormButtons
    },
    props: {
        id: String,
        templateId: String,
        temOrSection: String,
        name: String,
        update: String,
    },
    setup(props, {
        emit
    }) {
        const store = useStore();
        const formRef = ref();
        const value = ref("1");
        const value2 = ref("1");
        const questionnaire = reactive({
            questionType: '',
            default: [],
            answer: [],
            question: "",
            dataTypeId: "",
            lable: [],
            labelScore: [],
            programId: [],
            programScore: [],
            tags: [],
            textScore: "",
        });
        const form = reactive({
            ...questionnaire,
        });

        onMounted(() => {
            store.dispatch("programList");
        });

        function programChange(val, index, programList) {
            if (val != undefined) {
                questionnaire.programId[index] = val;
                programList.forEach((data) => {
                    var test = questionnaire.programId[index].find(item => data.id == item)
                    if (test == "undefined") {
                        questionnaire.programScore[index + '' + data.id] ? questionnaire.programScore[index + '' + data.id] = '' : ''
                        console.log("test", questionnaire.programScore)
                    }
                })
            }
            //  questionnaire.programId[index].forEach((item)=>{
            //      var test =programList.find(data => data.id==item)

            //programList.forEach((data)=>{

            // if(item!==data.id){
            //     console.log(data.id,item)
            //     questionnaire.programScore[index+''+data.id] ? questionnaire.programScore[index+''+data.id] : ''
            // }
            //})
            //console.log(val, questionnaire.programId[index],questionnaire.programScore,programList)
            //})
        }

        function addLable() {
            questionnaire.lable.push({
                value: "",
                key: Date.now(),
            });
        }

        function questionType() {
            questionnaire.lable = [];
            questionnaire.programScore = [];
            questionnaire.programId = [];
            questionnaire.programScore = [];
            questionnaire.textScore = "";

            if (questionnaire.dataTypeId == 243 || questionnaire.dataTypeId == 244) {
                questionnaire.lable.push({
                    value: "",
                    key: Date.now(),
                });
            }
        }
        const addQuestionnaire = () => {
            let data = "";
            if (questionnaire.dataTypeId == 243 || questionnaire.dataTypeId == 244) {
                let lable = [];
                questionnaire.lable.forEach((element) => {
                    let programScores = [];
                    questionnaire.programId[element.key] ?
                        questionnaire.programId[element.key].forEach((items) => {
                            programScores.push({
                                programId: items,
                                programScore: questionnaire.programScore[
                                        element.key + "" + items
                                    ] ?
                                    questionnaire.programScore[element.key + "" + items] : null,
                            });
                        }) :
                        "";
                    let defaultChacked = questionnaire.default.indexOf(element.key);
                    let answer = questionnaire.answer.indexOf(element.key);
                    let objact = {
                        labelName: element.value,
                        program: programScores,
                        labelScore: questionnaire.labelScore[element.key] ?
                            questionnaire.labelScore[element.key] : null,
                        defaultOption: defaultChacked == -1 ? 0 : 1,
                        answer: answer == -1 ? 0 : 1,
                    };
                    lable.push(objact);
                });
                data = {
                    question: questionnaire.question,
                    dataTypeId: questionnaire.dataTypeId,
                    tags: questionnaire.tags,
                    duration: null,
                    option: lable,
                };
            } else {
                data = {
                    question: questionnaire.question,
                    dataTypeId: questionnaire.dataTypeId,
                    tags: questionnaire.tags,
                    duration: null,
                    score: questionnaire.textScore,
                };
            }
            store.dispatch("addQuestionnaire", data).then(() => {
                if (props.templateId) {
                    store.commit("checkChangeInput", false)
                    store.dispatch("addAssiignquestionnaire", {
                        data: {
                            questionId: [store.getters.addQuestionnaire.value.id],
                            id: props.templateId,
                            
                        },
                        showPopup:false,
                        method:"post",
                        id: props.templateId,
                        temOrSection: props.temOrSection
                    }).then(() => {

                        if (props.temOrSection == 'section') {
                            store.dispatch("templateSectionDetailsList", props.templateId)
                        } else {

                            store.dispatch("detailsQuestionnaireTemplate", props.templateId)
                        }
                    })

                } else {
                    store.dispatch("questionnaireList")

                }
                emit("is-visible", {
                    show: false,
                    id: props.id
                })
                reset()

            })
            // formRef.value.validate().then(() => {
            //     console.log('values', questionnaire.lable);
            // }).catch(error => {
            //     console.log('error', error);
            // });
        };

        const removeLable = (item) => {

            let index = questionnaire.lable.indexOf(item);

            if (index !== -1) {
                questionnaire.lable.splice(index, 1);
            }
        };

        function checkChangeInput() {
            store.commit("checkChangeInput", true);
        }

        function checkboxChangeDefault(event) {
            if (event.target.checked) {
                questionnaire.default.push(event.target.value);
            } else {
                let index = questionnaire.default.indexOf(event.target.value);
                questionnaire.default.splice(index, 1);
            }
        }

        function radioChange(event) {
            questionnaire.answer = [];
            questionnaire.answer.push(event.target.value);
        }

        function radioChangeDefault(event) {
            questionnaire.default = [];
            questionnaire.default.push(event.target.value);
        }

        function checkboxChange(event) {
            if (event.target.checked) {
                questionnaire.answer.push(event.target.value);
            } else {
                let index = questionnaire.answer.indexOf(event.target.value);
                questionnaire.answer.splice(index, 1);
            }
        }

        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        });

        function reset() {
            Object.assign(questionnaire, form);
        }

        function closeModal() {
            if (checkFieldsData.value) {
                emit("is-visible", {
                    show: true,
                    id: props.id
                })
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        emit("is-visible", {
                            show: false,
                            id: props.id
                        })
                        reset();
                        store.commit("checkChangeInput", false)
                    } else {
                        emit("is-visible", {
                            show: true,
                            id: props.id
                        })
                    }
                });
            } else {
                formRef.value.resetFields();
                emit("is-visible", {
                    show: false,
                    id: props.id
                })
            }
        }
        const handleGlobalChange = (data, type) => {
            if (type == 'questionnaire.dataTypeId') {
                questionnaire.dataTypeId = data
                questionnaire.lable = [];
                questionnaire.programScore = [];
                questionnaire.programId = [];
                questionnaire.programScore = [];
                questionnaire.textScore = "";

                if (questionnaire.dataTypeId == 243 || questionnaire.dataTypeId == 244) {
                    questionnaire.lable.push({
                        value: "",
                        key: Date.now(),
                    });
                }
            }
            console.log("check", data)
        }
        const errorMsg = store.getters.errorMsg.value
        return {
            handleGlobalChange,
            questionnaire,
            programChange,
            size: ref("large"),

            addLable,
            questionType,
            addQuestionnaire,
            removeLable,

            formRef,
            value,
            value2,
            closeModal,
            programList: store.getters.programList,
            checkChangeInput,
            arrayToObjact,
            checkboxChange,
            checkboxChangeDefault,
            radioChange,
            radioChangeDefault,
            reset,
            errorMsg
        };
    },
};
</script>
<style lang="scss" scoped>
.form-group label {
    margin: 0 0 8px 0;
}
</style>
