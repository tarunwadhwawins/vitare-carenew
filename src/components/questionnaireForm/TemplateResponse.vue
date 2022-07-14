<template>
<div class="common-bg">
    <h2 class="pageTittle">
        {{ detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''}}
        <router-link to="/questionnaireResponse" class="b-inline ml-10">
            <a-button class="btn">Back</a-button>
        </router-link>
    </h2>
    <div class="templateType"> <div>User Type  : <span> Staff</span></div><div>Staff Name : <span> {{userName}}</span></div><div>Template Type : <span> {{detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateType : ''}}</span></div> </div>


    <a-form ref="formRef" :model="questionnaireTemplate" layout="vertical" @finish="ansTemplate" @finishFailed="onFinishFailed" v-if="detailsQuestionnaireTemplate">
        <div class="template" v-for="questionList in detailsQuestionnaireTemplate.questionnaireQuestion" :key="questionList.id">
            <div v-if="questionList.entityType=='question'">
              
                <div >
                    <a-typography-title :level="5">{{questionList.question.question}}</a-typography-title>
                    <div class="templateInner">
                <div v-if="questionList.question.dataTypeId==243">
                    <a-radio-group v-if="questionList.question.dataTypeId==243" v-model:value="questionnaireTemplate.radioOption[questionList.question.id]">
                        <a-col :span="24" v-for="(options,index) in questionList.question.options" :key="index">
                            <div class="questionOutput">
                                <div>{{index+1}}.</div>
                                <a-radio v-model:value="options.id"></a-radio>
                                <div class="ml-10 ">
                                    <p>{{ options.option }}</p>
                                </div>
                            </div>
                        </a-col>
                    </a-radio-group>
                </div>
                <div v-else-if="questionList.question.dataTypeId==244">
                    <a-checkbox-group v-model:value="questionnaireTemplate.checkBoxOption[questionList.question.id]">
                        <a-col :span="24" v-for="(options,index) in questionList.question.options" :key="index">
                            <div class="questionOutput">
                                <div>{{index+1}}.</div>
                                <a-checkbox class="ml-10 " v-model:checked="options.defaultOption" v-model:value="options.id">
                                </a-checkbox>
                                <div class="ml-10 ">
                                    <p>{{ options.option }}</p>
                                </div>
                            </div>
                        </a-col>
                    </a-checkbox-group>
                </div>
                <div v-else>
                    <a-col :span="24">
                        
                            <div class="form-group">
                                <a-form-item name="templateName">
                                    <a-textarea v-model:value="questionnaireTemplate.templateText[questionList.question.id]" placeholder="Enter Text..." :bordered="false" :rows="2"  width="100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.templateText?errorMsg.templateText[0]:''" />
                                </a-form-item>

                        </div>
                    </a-col>
                </div>
            </div>
                </div>
            </div>
            <div class="healthTemplateBox" v-else>
                <h4> {{questionList.questionnaireSection.sectionName}}</h4>
                <div v-for="record,index in questionList.questionnaireSection.questionSection" :key="index">
                    <a-typography-title :level="5">{{ record.question.question }}</a-typography-title>
                    <div class="templateInner">
                        <div v-if="record.question.dataTypeId==243">
                            <a-radio-group v-if="record.question.dataTypeId==243" v-model:value="questionnaireTemplate.radioOption[record.question.id]">
                                <a-col :span="24" v-for="(options,index) in record.question.options" :key="index">
                                    <div class="questionOutput">
                                        <div>{{index+1}}.</div>
                                        <a-radio v-model:value="options.id"></a-radio>
                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                        </div>
                                    </div>
                                </a-col>
                            </a-radio-group>
                        </div>
                        <div v-else-if="record.question.dataTypeId==244">
                            <a-checkbox-group v-model:value="questionnaireTemplate.checkBoxOption[record.question.id]">
                                <a-col :span="24" v-for="(options,index) in record.question.options" :key="index">
                                    <div class="questionOutput">
                                        <div>{{index+1}}.</div>
                                        <a-checkbox class="ml-10 " v-model:checked="options.defaultOption" v-model:value="options.id">
                                        </a-checkbox>
                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                        </div>
                                    </div>
                                </a-col>
                            </a-checkbox-group>
                        </div>
                        <div v-else>
                            <a-col :span="24">

                                <div class="form-group">
                                    <a-form-item name="templateName">
                                        <a-textarea v-model:value="questionnaireTemplate.templateText[record.question.id]" placeholder="Enter Text..." :bordered="false" :rows="2" width="100%" />
                                        <ErrorMessage v-if="errorMsg" :name="errorMsg.templateText?errorMsg.templateText[0]:''" />
                                    </a-form-item>

                                </div>
                            </a-col>
                        </div>
                    </div>
                </div>
            </div>
        
        
      </div>
      
    </a-form>
    <a-table v-if="data" rowKey="id" :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="handleTableChange" :pagination=false>
    </a-table>

    <TableLoader />
</div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, watchEffect } from "vue";
import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const columns = [{
        title: "Programs",
        dataIndex: "program",

    },
    {
        title: "Score",
        dataIndex: "score",
    },
    {
        title: "Actions",
        dataIndex: "actions",
        slots: {
            customRender: "actions",
        },
    },
];
export default defineComponent({
    name: "Question Template Details",
    components: {
        TableLoader,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const userName = JSON.parse(localStorage.getItem("responseusername"));
        const questionnaireTemplate = reactive({
            templateText: [],
            radioOption: [],
            checkBoxOption: [],
        });
        const udid = route.params.udid;
        const show = ref(false)
        onMounted(() => {
            store.dispatch("detailsQuestionnaireTemplate", udid);
           
        });
        const detailsQuestionnaireTemplate = store.getters.detailsQuestionnaireTemplate
        const ansTemplate = () => {
            console.log("check",questionnaireTemplate)
            let data = [];
            detailsQuestionnaireTemplate.value ?
                detailsQuestionnaireTemplate.value.questionnaireQuestion.forEach((element) => {
                    let newRescord = "";
                     if (element.entityType != 'question') {
                        element.questionnaireSection.questionSection.map((records) => {
                    if (records.question.dataTypeId == 244) {
                        newRescord = {
                            question: records.question.id,
                            dataType: records.question.dataTypeId,
                            answer: questionnaireTemplate.checkBoxOption[records.question.id] ? questionnaireTemplate.checkBoxOption[records.question.id] : '',
                            sectionId:element.questionnaireSection.id,
                        };
                    } else if (records.question.dataTypeId == 243) {
                        newRescord = {
                            question: records.question.id,
                            dataType: records.question.dataTypeId,
                            answer: questionnaireTemplate.radioOption[records.question.id] ? questionnaireTemplate.radioOption[records.question.id] :'' ,
                            sectionId:element.questionnaireSection.id,
                        };
                    } else {
                        newRescord = {
                            question: records.question.id,
                            dataType: records.question.dataTypeId,
                            answer: questionnaireTemplate.templateText[records.question.id] ? questionnaireTemplate.templateText[records.question.id] : '',
                            sectionId:element.questionnaireSection.id,
                        };
                    }
                    data.push(newRescord);
                        })
                        
                     }else{
                         if (element.question.dataTypeId == 244) {
                        newRescord = {
                            question: element.question.id,
                            dataType: element.question.dataTypeId,
                            answer: questionnaireTemplate.checkBoxOption[element.question.id] ? questionnaireTemplate.checkBoxOption[element.question.id] :'',
                            sectionId:element.questionnaireSection.id,
                        };
                    } else if (element.question.dataTypeId == 243) {
                        newRescord = {
                            question: element.question.id,
                            dataType: element.question.dataTypeId,
                            answer: questionnaireTemplate.radioOption[element.question.id] ? questionnaireTemplate.radioOption[element.question.id] : '',
                            sectionId:"",
                        };
                    } else {
                        newRescord = {
                            question: element.question.id,
                            dataType: element.question.dataTypeId,
                            answer: questionnaireTemplate.templateText[element.question.id] ? questionnaireTemplate.templateText[element.question.id] :'',
                            sectionId:"",
                        };
                    }
data.push(newRescord);
                     }
                    
                }) :
                "";
                console.log("check",data)
            show.value = false
            store.dispatch("addAssiignquestionnaireResponse", {
                data: data,
                id: udid
            }).then(() => {
                store.dispatch("scoreCount", udid).then(() => {
                    show.value = true
                })

            })
        };
        
        watchEffect(() => {
       
            detailsQuestionnaireTemplate.value ?
                detailsQuestionnaireTemplate.value.questionnaireQuestion.forEach((element) => {

                    if (element.entityType != 'question') {
                        element.questionnaireSection.questionSection.map((records) => {

                            if (records.question.dataTypeId == 243 || records.question.dataTypeId == 244) {
                                let checkBox = [];
                                records.question.options.forEach((item) => {
                                    if (item.defaultOption == 1 && records.question.dataTypeId == 243) {
                                        questionnaireTemplate.radioOption[records.question.id] = item.id;
                                    }
                                    if (item.defaultOption == 1 && records.question.dataTypeId == 244) {
                                       
                                        checkBox.push(item.id);
                                    }
                                });
                                if (checkBox.length > 0) {
                                    questionnaireTemplate.checkBoxOption[records.question.id] = checkBox;
                                }
                            }
                        })
                    }else{
                        if (element.question.dataTypeId == 243 || element.question.dataTypeId == 244) {
                                let checkBox = [];
                                element.question.options.forEach((item) => {
                                    if (item.defaultOption == 1 && element.question.dataTypeId == 243) {
                                        questionnaireTemplate.radioOption[element.question.id] = item.id;
                                    }
                                    if (item.defaultOption == 1 && element.question.dataTypeId == 244) {
                                        
                                        checkBox.push(item.id);
                                    }
                                });
                                if (checkBox.length > 0) {
                                    questionnaireTemplate.checkBoxOption[element.question.id] = checkBox;
                                }
                            }
                    }

                }) :
                "";
        });

        return {
            udid,
            questionnaireTemplate,
            detailsQuestionnaireTemplate,
            
            ansTemplate,
            value: ref("1"),
            show,
            columns,
            data: store.getters.scoreCount,
            userName
        };
    },
});
</script>
   
<style lang="scss" scoped>
.pageTittle {
  text-align: center;
  background: #e3e3e3;
  padding: 15px 0;
  margin: 0;
  a {
    position: absolute;
    right: 10px;
  }
}
.templateType {
    font-size: 18px;
    padding: 10px 0;
    color: #000;
    text-transform: capitalize;
    span {
            font-weight: 600;
    }
}
.template {
    margin: 15px 0 0;
    border: 1px solid #e3e3e3;
    padding: 15px;
    h4 {
      font-size: 22px;
      margin: 0 0 15px;
    }
    h5.ant-typography {
        margin: 0 0 5px;
    }
    .questionOutput {
      >div {
        width: 25px;
      }
    }
  
}
</style>
