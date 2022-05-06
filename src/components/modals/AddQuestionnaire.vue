<template>
<a-modal width="100%" title="Add Questionnaire" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="questionnaire" layout="vertical" @finish="addQuestionnaire" @finishFailed="onFinishFailed">

        <div class="questionnaireMain">
            <a-row :gutter="24">
                <a-col :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item label="Question" name="question" :rules="[{ required: true, message: 'question' +' '+$t('global.validation') }]">
                            <a-input v-model:value="questionnaire.question" placeholder="Enter Question" style="width: 100%" size="large" />
                            <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.question[0]:''" />
                        </a-form-item>

                    </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                    <div class="form-group">
                        <a-form-item label="Type" name="dataTypeId" :rules="[{ required: true, message: dataTypeId +' '+$t('global.validation') }]">
                            <GlobalCodeDropDown v-if="questionDataType" v-model:value="questionnaire.dataTypeId" :globalCode="questionDataType" @change="checkChangeInput(); questionType()" />

                        </a-form-item>
                    </div>
                </a-col>
                <a-col :span="24">
                    <div class="form-group">
                        <label> Tags</label>
                        <a-select ref="select" v-model:value="questionnaire.tags" style="width: 100%" @focus="focus" @change="handleChange" mode="tags" size="large" placeholder="Select Tags">
                        </a-select>
                    </div>

                </a-col>

                <a-col :sm="24" class="mt-25" v-if="questionnaire.dataTypeId==243 || questionnaire.dataTypeId==244">

                    <a-row :gutter="16" v-for="(lable,index) in questionnaire.lable" :key="lable.key">

                        <a-col :span="1">

                            <a-checkbox class="mt-40" v-model:value="lable.key" v-if="questionnaire.dataTypeId==244" name="default" @change="checkboxChange" />

                            <a-radio-group v-else v-model:value="value">
                                <a-radio class="singleChoice mt-40" :value="lable.key" @change="radioChange"></a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col :span="5">
                            <div class="form-group">
                                <a-form-item label="Lable">

                                    <a-input v-model:value="lable.value" placeholder="Label" style="width: 100%" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="2">
                            <div class="form-group">
                                <a-form-item label="Score">
                                    <a-input v-model:value="questionnaire.score[lable.key]" placeholder="Score" style="width: 100%" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="4" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Programs">

                                    <GlobalCodeDropDown v-if="programList" v-model:value="questionnaire.programId[lable.key]" :globalCode="programList" @change="checkChangeInput(); programChange($event,lable.key)" mode="multiple" :maxTagTextLength="1" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="2" v-for="(programScores,i) in questionnaire.programId[lable.key]" :key="i">
                            <div class="form-group">
                                <a-form-item :label="(arrayToObjact(programList, programScores)).name.length>5 ?(arrayToObjact(programList, programScores)).name.substring(0,5)+'...' : (arrayToObjact(programList, programScores)).name +' Score'">
                                    <a-input v-model:value="questionnaire.programScore[(lable.key+''+programScores)]" :placeholder="(arrayToObjact(programList, programScores)).name +' Score'" style="width: 100%" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-button v-if="questionnaire.lable.length > 1" class="mt-30" danger :size="size" :disabled="questionnaire.lable.length === 1" @click="removeLable(lable)">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                        </a-button>

                        <a-col :span="1" class="text-right" v-if="index==0">
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

                        <label>Score</label>
                        <a-input v-model:value="questionnaire.textScore" placeholder="Score" style="width: 100%" size="large" />

                    </div>
                </a-col>

                <a-col :span="24">

                    <div class="steps-action">
                        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                            <a-button class="modal-button" @click="handleClear()" html-type="reset">{{$t('global.clear')}}</a-button>
                            <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                            <a-button v-if="Id" class="modal-button" type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                        </a-form-item>
                    </div>
                </a-col>
            </a-row>
        </div>
    </a-form>
</a-modal>
</template>

<script>
import {

    ref,
    reactive,
    onMounted
} from "vue";

import {
    DeleteOutlined,
    PlusOutlined,

} from "@ant-design/icons-vue";
import {
    useStore
} from "vuex"
import {
    arrayToObjact
} from "@/commonMethods/commonMethod"
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
export default {
    components: {
        PlusOutlined,
        DeleteOutlined,
        GlobalCodeDropDown
    },
    props: {

    },
    setup() {
        const store = useStore()
        const formRef = ref();
        const value = ref('1');
        const questionnaire = reactive({
            default: [],
            question: '',
            dataTypeId: '',
            lable: [],
            score: [],
            programId: [],
            programScore: [],
            tags: [],
            textScore: ''

        })
        const form = reactive({
            ...questionnaire
        })

        onMounted(() => {
            store.dispatch("programList")
        })

        function programChange(val, index) {
            console.log(val, questionnaire.programScore, index)

            questionnaire.programId[index] = val

        }

        function addLable() {
            questionnaire.lable.push({
                value: '',
                key: Date.now(),
            });

        }

        function questionType() {

            questionnaire.lable = []
            questionnaire.score = []
            questionnaire.programId = []
            questionnaire.programScore = []
            questionnaire.textScore = ''
            if (questionnaire.dataTypeId == 243 || questionnaire.dataTypeId == 244) {

                questionnaire.lable.push({
                    value: '',
                    key: Date.now(),
                });
            }

        }
        const addQuestionnaire = () => {
            let data = ''
            if (questionnaire.dataTypeId == 243 || questionnaire.dataTypeId == 244) {
                let lable = []
                questionnaire.lable.forEach((element) => {
                    let programScores = []
                    questionnaire.programId[element.key] ? questionnaire.programId[element.key].forEach((items) => {
                        programScores.push({
                            "programId": items,
                            "programScores": questionnaire.programScore[element.key + '' + items] ? questionnaire.programScore[element.key + '' + items] : null
                        })
                    }) : ''
                    let index = questionnaire.default.indexOf(element.key)
                    let objact = {
                        "labelName": element.value,
                        "program": programScores,
                        "score": questionnaire.score[element.key] ? questionnaire.score[element.key] : null,
                        "defaultOption": index == -1 ? 0 : 1
                    }
                    lable.push(objact)

                })
                data = {
                    "question": questionnaire.question,
                    "dataTypeId": questionnaire.dataTypeId,
                    "tags": questionnaire.tags,
                    "duration": null,
                    "option": lable
                }
            } else {
                data = {
                    "question": questionnaire.question,
                    "dataTypeId": questionnaire.dataTypeId,
                    "tags": questionnaire.tags,
                    "duration": null,
                    "score": questionnaire.textScore
                }
            }
            store.dispatch('addQuestionnaire', data)
            console.log("check", data)
            // formRef.value.validate().then(() => {
            //     console.log('values', questionnaire.lable);
            // }).catch(error => {
            //     console.log('error', error);
            // });

        }

        const removeLable = item => {
            let index = questionnaire.lable.indexOf(item);

            if (index !== -1) {
                questionnaire.lable.splice(index, 1);
            }
        }

        function checkChangeInput() {
            store.commit('checkChangeInput', true)
        }

        function checkboxChange(event) {

            if (event.target.checked) {
                questionnaire.default.push(event.target.value)
            } else {
                let index = questionnaire.default.indexOf(event.target.value)
                questionnaire.default.splice(index, 1);

            }
        }

        function radioChange(event) {
            questionnaire.default = []
            questionnaire.default.push(event.target.value)

        }

        function closeModal() {
            Object.assign(questionnaire, form)
        }
        return {
            questionnaire,
            programChange,
            size: ref("large"),

            addLable,
            questionType,
            addQuestionnaire,
            removeLable,
            questionDataType: store.getters.questionDataType,
            formRef,
            value,
            closeModal,
            programList: store.getters.programList,
            checkChangeInput,
            arrayToObjact,
            checkboxChange,
            radioChange

        };
    },
};
</script>
