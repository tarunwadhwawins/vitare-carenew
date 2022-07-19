<template>
<div class="common-bg" v-if="questionnaireResponseDetails">
    <h2 class="pageTittle">
        {{ questionnaireResponseDetails ? questionnaireResponseDetails.templateName : ''}}
        <router-link to="/questionnaireResponse" class="b-inline ml-10">
            <a-button class="btn">Back</a-button>
        </router-link>
    </h2>
    <a-row>
    <a-col :span=12>
    <div class="templateType"> <div>User Type  : <span> {{questionnaireResponseDetails ? questionnaireResponseDetails.entity :''}}</span></div><div>Staff Name : <span> {{questionnaireResponseDetails ? questionnaireResponseDetails.userName :''}}</span></div><div>Template Type : <span> {{questionnaireResponseDetails ? questionnaireResponseDetails.templateType : ''}}</span></div> </div>
    </a-col>
    <a-col :span="12">
       
<div class="templateType right"> <div>Status  : <span> {{questionnaireResponseDetails ? questionnaireResponseDetails.status :''}}</span></div><div>Filled Date : <span> {{questionnaireResponseDetails ? questionnaireResponseDetails.createdAt :''}}</span></div> <div>Score : <a><span @click="getResponse" :title="data ? data[0].program:''"> {{data ? data[0].program.substring(0,10)+'...':''}}</span></a></div></div>
    </a-col>
    </a-row>
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
                                <!-- <div>{{index+1}}.</div> -->
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
                                <!-- <div>{{index+1}}.</div> -->
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
                <div v-for="record,index in questionnaireResponseDetails.clientQuestionResponse[questionList.questionnaireSection.sectionName]" :key="index">
                   
                    <a-typography-title :level="5">{{ record.question.question }}</a-typography-title>
                    <div class="templateInner">
                        <div v-if="record.question.dataTypeId==243">
                            
                            <a-radio-group v-if="record.answer" v-model:value="questionnaireTemplate.radioOption[record.question.id]" disabled>
                                <a-col :span="24" v-for="(options,index) in record.question.options" :key="index">
                                    <div class="questionOutput" v-if="record.answer==options.id">
                                        <!-- <div>{{index+1}}.</div> -->
                                        <a-radio v-model:value="questionnaireTemplate.radioOption[record.question.id]" checked></a-radio>
                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                        </div>
                                    </div>
                                </a-col>
                            </a-radio-group>
                        </div>
                        <div v-else-if="record.question.dataTypeId==244">
                            <a-checkbox-group v-model:value="questionnaireTemplate.checkBoxOption[record.question.id]" disabled v-if="record.answer">
                                <a-col :span="24" v-for="(options,index) in record.question.options" :key="index">
                                    
                                    <div class="questionOutput" v-if="options.id">
                                        <!-- <div>{{index+1}}.</div> -->
                                        <a-checkbox class="ml-10 " v-model:checked="options.id" v-model:value="options.id">
                                        </a-checkbox>
                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                        </div>
                                    </div>
                                </a-col>
                            </a-checkbox-group>
                        </div>
                        <div v-else>
                            <a-col :span="24" v-if="record.answer">

                                <div class="form-group">
                                    <a-form-item >
                                        <a-textarea v-model:value="record.answer" placeholder="Enter Text..." :bordered="false" :rows="2" width="100%" disabled/>
  
                                    </a-form-item>

                                </div>
                            </a-col>
                        </div>
                    </div>
                </div>
            </div>
        
        
      </div>
       
    </a-form>
    

    <TableLoader />
</div>
<CommonLoader v-else/>
 <Score v-model:visible="visibleModal" title="Response Score" />
</template>

<script>
import { defineComponent, ref, onMounted, reactive, watchEffect } from "vue";
import TableLoader from "@/components/loader/TableLoader";
import CommonLoader from "@/components/loader/CommonLoader";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Score from "@/components/questionnaireForm/modals/ScoreModal"
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
        CommonLoader,
        Score
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
       const  visibleModal = ref(false)
      const questionnaireResponseDetails = store.getters.questionnaireResponseDetails
        onMounted(() => {
            
            store.dispatch("questionnaireResponseDetails", udid).then(()=>{
store.dispatch("detailsQuestionnaireTemplate", questionnaireResponseDetails.value.questionnaireTemplateId)
store.dispatch("scoreCount", questionnaireResponseDetails.value.questionnaireTemplateId)
            })
           
        });
          
        const detailsQuestionnaireTemplate = store.getters.detailsQuestionnaireTemplate
        
        
        watchEffect(() => {
       
            detailsQuestionnaireTemplate.value ?
                detailsQuestionnaireTemplate.value.questionnaireQuestion.forEach((element) => {

                    if (element.entityType != 'question') {
                        
                      questionnaireResponseDetails.value?   questionnaireResponseDetails.value.clientQuestionResponse[element.questionnaireSection.sectionName].map((records) => {

                            if (records.question.dataTypeId == 243 || records.question.dataTypeId == 244) {
                                let checkBox = [];
                                records.question.options.forEach((item) => {
                                    console.log("check",item)
                                    if (records.question.dataTypeId == 243) {
                                        questionnaireTemplate.radioOption[records.question.id] = true;
                                    }
                                    if ( records.question.dataTypeId == 244) {
                                       
                                        checkBox.push(item.id);
                                    }
                                });
                                console.log("check",questionnaireTemplate.radioOption)
                                if (checkBox.length > 0) {
                                    questionnaireTemplate.checkBoxOption[records.question.id] = checkBox;
                                }
                            }
                        }) : ''
                    }

                }) :
                "";
        });
          const  getResponse =() =>{
        visibleModal.value = true
       
     }


        return {
            udid,
            questionnaireTemplate,
            detailsQuestionnaireTemplate,
            
           
            value: ref("1"),
            show,
            columns,
            data: store.getters.scoreCount,
            userName,
            questionnaireResponseDetails,
            getResponse,
            visibleModal
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
.right{
    text-align: right;
}
</style>
