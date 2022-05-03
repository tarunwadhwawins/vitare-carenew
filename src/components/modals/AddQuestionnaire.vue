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
                            <a-select ref="select" v-model:value="questionnaire.dataTypeId" style="width: 100%" size="large" @focus="focus" @change="questionType" placeholder="Select Type">
                                <a-select-option value="1">Single Choice</a-select-option>
                                <a-select-option value="2">Multiple Choice</a-select-option>
                                <a-select-option value="3">Textbox</a-select-option>
                            </a-select>
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

                <a-col :sm="24" class="mt-25" v-if="questionnaire.dataTypeId==2 || questionnaire.dataTypeId==1">

                    <a-row :gutter="16" v-for="(lable,index) in questionnaire.lable" :key="lable.key">

                        <a-col :span="1">
                            <a-checkbox class="singleChoice" v-if="questionnaire.dataTypeId==2" v-model:checked="checked21">
                            </a-checkbox>
                            <a-radio-group v-else v-model:value="value">
                                <a-radio class="singleChoice" :value="index"></a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col :span="7">
                            <a-input v-model:value="lable.value" placeholder="Label" style="width: 100%" size="large" />

                        </a-col>
                        <a-col :span="3">
                            <a-input v-model:value="questionnaire.score[lable.key]" placeholder="Score" style="width: 100%" size="large" />
                        </a-col>
                        <a-col :sm="5" :xs="24">
                            <a-select ref="select" v-model="questionnaire.program[lable.key]" style="width: 100%" size="large" @focus="focus" @change="programChange($event,lable.key)" placeholder="Program  Type" mode="multiple">
                                <a-select-option value="1">RPM</a-select-option>
                                <a-select-option value="2">TCM</a-select-option>
                                <a-select-option value="3">BHI</a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="3" v-for="(programScores,i) in questionnaire.program[lable.key]" :key="i">

                            <a-input v-model:value="questionnaire.programScore[(lable.key+''+i)]" placeholder="Rpm Score" style="width: 100%" size="large" />
                        </a-col>
                        <MinusCircleOutlined v-if="questionnaire.lable.length > 1" class="dynamic-delete-button" :disabled="questionnaire.lable.length === 1" @click="removeLable(lable)" />
                        <a-col :span="2" class="text-right" v-if="index==0">
                            <a-button type="primary" size="large" @click="addLable">
                                <template #icon>
                                    <PlusOutlined  />
                                </template>
                            </a-button>
                        </a-col>
                    </a-row>

                </a-col>

                <a-col :span="24">

                    <div class="steps-action">
                        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                            <a-button class="modal-button" @click="handleClear()" html-type="reset">{{$t('global.clear')}}</a-button>
                            <a-button class="modal-button" type="primary" html-type="submit" >{{$t('global.save')}}</a-button>
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
    reactive
} from "vue";

import {
    MinusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons-vue";
export default {
    components: {
        PlusOutlined,
        MinusCircleOutlined
    },
    props: {

    },
    setup() {

        const formRef = ref();
        const value = ref('1');
        const questionnaire = reactive({
            question: '',
            dataTypeId: '',
            lable: [],
            score: [],
            program: [],
            programScore: [],
            tags: []

        })
        questionnaire.lable.push({
            value: '',
            key: Date.now()
        })

        function programChange(val, index) {
            questionnaire.program[index] = val
        }

        function addLable() {
            questionnaire.lable.push({
                value: '',
                key: Date.now(),
            });

        }

        function questionType() {
            console.log("check", questionnaire.tags)
        }
        const addQuestionnaire = () => {
            formRef.value.validate().then(() => {
                console.log('values', questionnaire.lable);
            }).catch(error => {
                console.log('error', error);
            });

        }

        const removeLable = item => {
            let index = questionnaire.lable.indexOf(item);

            if (index !== -1) {
                questionnaire.lable.splice(index, 1);
            }
        };

        function closeModal() {
            console.log("check")
        }
        return {
            questionnaire,
            programChange,
            size: ref("large"),
            checked1: ref(false),
            addLable,
            questionType,
            addQuestionnaire,

            removeLable,

            formRef,
            value,
            closeModal

        };
    },
};
</script>
