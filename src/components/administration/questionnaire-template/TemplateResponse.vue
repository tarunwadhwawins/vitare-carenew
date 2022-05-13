<template>
<div class="common-bg">
    <h2 class="pageTittle">{{ detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''}}</h2>
    <a-form ref="formRef" :model="questionnaireTemplate" layout="vertical" @finish="ansTemplate" @finishFailed="onFinishFailed">
        <div class="template" v-for="questionList in templateDetailsList" :key="questionList.questionId">
            <a-typography-title :level="5">{{ questionList.question }}</a-typography-title>
            <div class="templateInner">
                <div v-if="questionList.dataTypeId==243">
                    <a-radio-group v-if="questionList.dataTypeId==243" v-model:value="questionnaireTemplate.radioOption[questionList.id]">
                        <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
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
                <div v-else-if="questionList.dataTypeId==244">
                    <a-checkbox-group v-model:value="questionnaireTemplate.checkBoxOption[questionList.id]">
                        <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
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
                                    <a-textarea v-model:value="questionnaireTemplate.templateText[questionList.id]" placeholder="Enter Text..." :bordered="false" :rows="2"  width="100%" />
                                    <ErrorMessage v-if="errorMsg" :name="errorMsg.templateText?errorMsg.templateText[0]:''" />
                                </a-form-item>

                           

                        </div>
                    </a-col>
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
    <a-table v-if="show" rowKey="id" :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="handleTableChange" :pagination=false>
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
    const ansTemplate = () => {
      let data = [];
      templateDetailsList.value
        ? templateDetailsList.value.forEach((element) => {
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
      store.dispatch("addAssiignquestionnaireResponse",{data:data,id:udid}).then(()=>{
        store.dispatch("scoreCount",udid).then(()=>{
show.value = true
        })

      })
    };
    const templateDetailsList = store.getters.templateDetailsList;
    watchEffect(() => {
      templateDetailsList.value
        ? templateDetailsList.value.forEach((element) => {
            if (element.dataTypeId == 243 || element.dataTypeId == 244) {
              let checkBox = [];
              element.options.forEach((item) => {
                if (item.defaultOption == 1 && element.dataTypeId == 243) {
                  questionnaireTemplate.radioOption[element.id] = item.id;
                }
                if (item.defaultOption == 1 && element.dataTypeId == 244) {
                  checkBox.push(item.id);
                }
              });
              if (checkBox.length > 0) {
                questionnaireTemplate.checkBoxOption[element.id] = checkBox;
              }
            }
          })
        : "";
    });
    
    return {
      udid,
      questionnaireTemplate,
      detailsQuestionnaireTemplate: store.getters.detailsQuestionnaireTemplate,
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
