<template>
<div class="common-bg">
    <div class="questionnaireMain">
        <a-row :gutter="24">
            <a-col :span="24">
                <h2 class="pageTittle">

                    {{ detailsQuestionnaireTemplate ? detailsQuestionnaireTemplate.templateName : ''}}
                    <div class="commonBtn">
                        <a-button class="btn secondaryBtn" @click="showModal2">Search Question</a-button>
                        <a-button class="btn secondaryBtn ml-10 buttonWtIcon" @click="showModal">Add Question
                            <PlusOutlined />
                        </a-button>
                        <router-link to="/questionnaire-template" class="b-inline ml-10">
                            <a-button class="btn primaryBtn">Back</a-button>
                        </router-link>
                    </div>
                </h2>
            </a-col>
            <a-col :span="24">
                <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right" v-if="templateDetailsList">
                        <a-collapse-panel v-for="questionList in templateDetailsList" :key="questionList.questionId" :header="questionList.question">
                            <div v-if="questionList.dataTypeId==244 || questionList.dataTypeId==243">
                                <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
                                    <div class="questionOutput">
                                        <a-checkbox v-model:checked="options.defaultOption" disabled>
                                            Default
                                        </a-checkbox>
                                        <a-checkbox v-model:checked="options.correct" disabled>
                                            Correct
                                        </a-checkbox>
                                        <div class="ml-10 ">
                                        <p>{{ options.option }}</p>
                                        <p v-if="options.score">Score - {{options.score}}</p>
                                        <div v-if="options.program.length>0">
                                            <a-tag v-for="(program,i) in options.program" :key="i">{{program.program}} - {{program.score? program.score : 0}}</a-tag>
                                        </div>
                                        </div>
                                    </div>
                                </a-col>
                            </div>
                            <a-col :span="24" v-else>
                                <div class="questionOutput">

                                    <p>Score : {{questionList.score?questionList.score : 0}}</p>

                                </div>
                            </a-col>

                            <template #extra>
                                <EditOutlined @click="showModal1" />
                                <DeleteOutlined /></template>
                        </a-collapse-panel>

                    </a-collapse>

                </a-collapse>
            </a-col>
        </a-row>
    </div>
    <!--modals-->
    <AddQuestionnaire v-model:visible="visible2" @ok="handleOk" />
    <EditQuestionnaire v-model:visible="visible3" @ok="handleOk" />
    <SearchQuestion v-if="detailsQuestionnaireTemplate" v-model:visible="visible1" @ok="handleOk" :templaterecord="detailsQuestionnaireTemplate" />
    <!---->
</div>
</template>
<script>
  import { defineComponent, ref,onMounted } from "vue";
  import { DeleteOutlined, EditOutlined,PlusOutlined } from "@ant-design/icons-vue";
  import AddQuestionnaire from "@/components/administration/questionnaire-bank/modals/AddQuestionnaire"
  import EditQuestionnaire from "@/components/modals/EditQuestionnaire";
  import SearchQuestion from "@/components/administration/questionnaire-template/modals/SearchQuestion";
  import { useStore  } from "vuex"
  import { useRoute  } from 'vue-router';
  export default defineComponent({
      name:"Question Template Details",
    components: {
    
      DeleteOutlined,
      EditOutlined,
      AddQuestionnaire,
      EditQuestionnaire,
      SearchQuestion,
      PlusOutlined
    },
    setup() {
      const store = useStore()
      const route = useRoute()
    const udid = route.params.udid
      const activeKey = ref(["1"])
      const visible2 = ref(false)
      const showModal = () => {
        visible2.value = true;
      };
      const visible3 = ref(false)
      const showModal1 = () => {
        visible3.value = true
      };
      const visible1 = ref(false)
      const showModal2 = () => {
        visible1.value = true;
      };
   
      onMounted(()=>{
         store.dispatch("detailsQuestionnaireTemplate",udid) 
        store.dispatch("templateDetailsList",udid)
      })

      return {
        checked1: ref(false),
        checked2: ref(false),
        checked3: ref(false),
        checked4: ref(false),
        checked5: ref(false),
        checked6: ref(false),
        checked7: ref(false),
        checked8: ref(false),
        checked9: ref(false),
        checked10: ref(false),
        checked11: ref(false),
        checked12: ref(false),
        activeKey,
        visible2,
        showModal,
        visible3,
        showModal1,
        visible1,
        showModal2,
        udid,
   detailsQuestionnaireTemplate:store.getters.detailsQuestionnaireTemplate,
        templateDetailsList:store.getters.templateDetailsList
      };
    },
  });
  </script>
   