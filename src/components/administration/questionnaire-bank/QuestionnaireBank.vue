<template>
<div>
    <div class="common-bg">
        <div class="questionnaireMain">
            <a-row :gutter="20">
                <a-col :span="24">
                    <h2 class="pageTittle">
                        Questionnaire Bank
                        <div class="commonBtn">

                            <a-button class="btn primaryBtn" @click="showModal({show:true,id:''})">Add New Question</a-button>

                        </div>
                    </h2>
                </a-col>
                <a-col :sm="18" :xs="24">
                    <div class="form-group">
                        <a-input v-model="value" size="large" placeholder="Search Questionnaire" />
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="">
                        <a-button class="btn primaryBtn">Search</a-button>
                    </div>
                </a-col>
                <a-col :span="24">
                    
                    <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
                        <a-collapse-panel v-for="questionList in questionnaireList" :key="questionList.questionId" :header="questionList.question">
                            <div v-if="questionList.dataTypeId==244 || questionList.dataTypeId==243">
                            <a-col :span="24" v-for="(options,index) in questionList.options" :key="index">
                                <div class="questionOutput">
                                <a-checkbox v-model:checked="options.defaultOption" disabled>
                                    Default
                                    </a-checkbox>
                                    <a-checkbox  v-model:checked="options.correct" disabled>
                                    Correct
                                    </a-checkbox>
                                    <div class="ml-10 ">
                                    <p>{{ options.option }}</p>
                                    <p v-if="options.score">Score - {{options.score}}</p>
                                    <div v-if="options.program.length>0">
                                        <a-tag v-for="(program,i) in options.program"  :key="i" >{{program.program}} -  {{program.score? program.score : 0}}</a-tag>
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
                                <router-link to="/questionnaire">
                                    <EditOutlined />
                                </router-link>
                                <DeleteOutlined />
                            </template>
                        </a-collapse-panel>
                        
                        
                    </a-collapse>
                </a-col>
            </a-row>
        </div>
    </div>

</div>
<AddQuestionnaire v-model:visible="visible" @is-visible="showModal($event)" />
</template>
<script>
import { ref, defineAsyncComponent, onMounted } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex"
export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    AddQuestionnaire: defineAsyncComponent(() =>import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")),
  },
  setup() {
    const activeKey = ref(["2"])
    const visible = ref(false)
    const store = useStore()
    const id = ref("");
    const showModal = (e) => {
      visible.value = e.show;
      id.value = e.id;
    }
    onMounted(()=>{
        store.dispatch("questionnaireList")
    })
    
    return {
      showModal,
      visible,
      activeKey,
      id,
      questionnaireList:store.getters.questionnaireList
    };
  },
};
</script>
