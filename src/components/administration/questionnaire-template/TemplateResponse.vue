<template>
<div class="common-bg">
    <h2 class="pageTittle">{{ detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''}}</h2>
    
    <a-form ref="formRef" :model="questionnaireTemplate" layout="vertical" @finish="ansTemplate" @finishFailed="onFinishFailed" v-if="detailsQuestionnaireTemplate">
        <div class="template" v-for="questionList in detailsQuestionnaireTemplate.questionnaireQuestion" :key="questionList.id">
        <div v-if="questionList.entityType=='question'">
          <div v-for="record,index in questionList.question" :key="index">
            <a-typography-title :level="5"></a-typography-title>
            <!-- <div class="templateInner">
                <div v-if="questionList.question.dataTypeId==243">
                    <a-radio-group v-if="questionList.question.dataTypeId==243" v-model:value="questionnaireTemplate.question.radioOption[questionList.id]">
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
                    <a-checkbox-group v-model:value="questionnaireTemplate.question.checkBoxOption[questionList.id]">
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
            </div> -->
        </div>
        </div>
        <div class="healthTemplateBox" v-else>
       <h4>Section Name : {{questionList.questionnaireSection.sectionName}}</h4>
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
                                    <a-textarea v-model:value="questionnaireTemplate.templateText[record.question.question.id]" placeholder="Enter Text..." :bordered="false" :rows="2"  width="100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.templateText?errorMsg.templateText[0]:''" />
                                </a-form-item>

                           

                        </div>
                    </a-col>
                </div>
            </div>
</div> 
            </div>
        </div>
        <a-col :span="24" v-if="templateDetailsList.length>0">

            <div class="steps-action">
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">

                    <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.save')}}</a-button>

                </a-form-item>
            </div>
        </a-col>
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
    const questionnaireTemplate = reactive({
      templateText: [],
      radioOption: [],
      checkBoxOption: [],
    });
    const udid = route.params.udid;
const show = ref(false)
    onMounted(() => {
      store.dispatch("detailsQuestionnaireTemplate", udid);
      store.dispatch("templateDetailsList", udid);
    });
    const detailsQuestionnaireTemplate = store.getters.detailsQuestionnaireTemplate
    const ansTemplate = () => {
      let data = [];
      detailsQuestionnaireTemplate.value
        ? detailsQuestionnaireTemplate.value.questionnaireQuestion.forEach((element) => {
            let newRescord = "";
            if (element.dataTypeId == 244) {
              newRescord = {
                question: element.id,
                dataType: element.dataTypeId,
                answer: questionnaireTemplate.checkBoxOption[element.id],
              };
            } else if (element.dataTypeId == 243) {
              newRescord = {
                question: element.id,
                dataType: element.dataTypeId,
                answer: questionnaireTemplate.radioOption[element.id],
              };
            } else {
              newRescord = {
                question: element.id,
                dataType: element.dataTypeId,
                answer: questionnaireTemplate.templateText[element.id],
              };
            }
            data.push(newRescord);
          })
        : "";
        show.value=true
      store.dispatch("addAssiignquestionnaireResponse",{data:data,id:udid}).then(()=>{
        store.dispatch("scoreCount",udid).then(()=>{
show.value = true
        })

      })
    };
    const templateDetailsList = store.getters.templateDetailsList;
    watchEffect(() => {
      console.log("check",detailsQuestionnaireTemplate.value)
      detailsQuestionnaireTemplate.value
        ? detailsQuestionnaireTemplate.value.questionnaireQuestion.forEach((element) => {
           
         if(element.entityType!='question'){
          element.questionnaireSection.questionSection.map((records)=>{

         
 if (records.question.dataTypeId == 243 || records.question.dataTypeId == 244) {
              let checkBox = [];
              records.question.options.forEach((item) => {
                if (item.defaultOption == 1 && records.question.dataTypeId == 243) {
                  questionnaireTemplate.radioOption[records.question.id] = item.id;
                }
                if (item.defaultOption == 1 && records.question.dataTypeId == 244) {
                  console.log("check",records.question)
                  checkBox.push(item.id);
                }
              });
              if (checkBox.length > 0) {
                questionnaireTemplate.checkBoxOption[records.question.id] = checkBox;
              }
            }
            })
         }
           
          })
        : "";
    });
    
    return {
      udid,
      questionnaireTemplate,
      detailsQuestionnaireTemplate,
      templateDetailsList,
      ansTemplate,
      value: ref("1"),
      show,
      columns,
      data:store.getters.scoreCount
    };
  },
});
</script>
   <style lang="scss" scoped>
.template {
  margin: 15px 0 0;
  h5.ant-typography {
    margin: 0;
  }
  .templateInner {
    padding: 0 0 0 15px;
  }
}
</style>
