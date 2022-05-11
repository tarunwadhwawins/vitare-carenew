<template>
<a-modal width="100%" :title="templaterecord.templateName" centered :footer="null">
     <a-form ref="formRef" :model="assignQuestion" layout="vertical" @finish="addAssignQuestion" @finishFailed="onFinishFailed">
    <a-row>
        <a-col :span="16">
            <div class="form-group">
                <label> Search Question</label>
                <a-input v-model:value="value" placeholder="Search Question . . ." size="large" />
            </div>
        </a-col>

        <a-col :span="8">
            <div class="text-right mt-28">
                <a-button class="btn primaryBtn" >Search Existing</a-button>
                <a-button @click="showModal({show:true,id:''})" class="btn secondaryBtn ml-10">Add New Question</a-button>
            </div>
        </a-col>

        <a-col :span="24" >
            <div class="questionnaireMain checkBoxCollapse mt-28">
                
                <a-collapse v-model:activeKey="activeKey" expand-icon-position="right">
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
                                    <p>Options : </p>
                                    <p>{{ options.option }}</p>
                                    <p v-if="options.score">Score - {{options.score}}</p>
                                <div v-if="options.program.length>0">
                                    <a-tag v-for="(program,i) in options.program"  :key="i" >{{program.program}} -  {{program.score? program.score : 0}}</a-tag>
                                </div>
                                </div>
                            </a-col>
                            </div>
                            <a-col :span="24" v-else>
                                <div class="questionOutput">
                                
                                    <p>Score : {{questionList.score?questionList.score : 0}}</p>
                                   
                                   
                                </div>
                            </a-col>
                          
                            <template class="checkBox" #extra>
                            <a-checkbox v-model:checked="assignQuestion.checkBox[questionList.id]" name="checkbox" :value="questionList.id" @change="checkboxChange($event)"></a-checkbox>
                        </template>
                        </a-collapse-panel>
                    
                   
                </a-collapse>
            </div>
        </a-col>
        <a-col :span="24"  class="text-right">
           
                <a-button class="btn primaryBtn" type="primary" html-type="submit">Assign Questions</a-button>
       
        </a-col>

    </a-row>
     </a-form>
    <AddQuestionnaire v-model:visible="visible1" @is-visible="showModal($event)" :templateId="templaterecord.id"/>
    <EditQuestionnaire v-model:visible="visible2" />
</a-modal>

<!--modals-->

<!---->
</template>
 <script>
  import { defineAsyncComponent, defineComponent, ref,onMounted , reactive } from "vue"; 
  import { useStore } from "vuex"
  export default defineComponent({
    components: {
      AddQuestionnaire: defineAsyncComponent(() =>
        import("@/components/administration/questionnaire-bank/modals/AddQuestionnaire")
      ),
      EditQuestionnaire: defineAsyncComponent(() =>
        import("@/components/modals/EditQuestionnaire")
      ),
    },
    props:{
      templaterecord:Array  
    },

    setup(props) {
        const store = useStore()
      const options = ref([
        {
          value: "Steve Smith",
          label: "Steve Smith",
        },
        {
          value: "Jane Doe",
          label: "Jane Doe",
        },
        {
          value: "Henry Joseph",
          label: "Henry Joseph",
        },
        {
          value: "Carol Liam",
          label: "Carol Liam",
        },
        {
          value: "Brett William",
          label: "Brett William",
        },
      ]);
      const assignQuestion = reactive({
          questionId:[],
          checkBox:[]

      })
      onMounted(()=>{
         store.dispatch("questionnaireList")
      })
        function checkboxChange(event) {
            console.log("check",event)
      if (event.target.checked) {
        assignQuestion.questionId.push(event.target.value);
      } else {
        let index = assignQuestion.questionId.indexOf(event.target.value);
        assignQuestion.questionId.splice(index, 1);
      }
    }
      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
  
      const handleBlur = () => {
        console.log("blur");
      };
  
      const handleFocus = () => {
        console.log("focus");
      };
  
      const filterOption = (input, option) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };
      const visible1 = ref(false);
       const id = ref("");
    const showModal = (e) => {
      visible1.value = e.show;
      id.value = e.id;

    }
      const visible2 = ref(false);
      const showModal2 = () => {
        visible2.value = true;
      };
     
      const addAssignQuestion =()=>{
          
          store.dispatch("addAssiignquestionnaire",{data:assignQuestion.questionId,id:props.templaterecord.id}).then(()=>{
            store.dispatch("templateDetailsList",props.templaterecord.id)
          })
      }
      return {
          addAssignQuestion,
          assignQuestion,
          checkboxChange,
        size: ref("large"),
        value: ref(undefined),
        filterOption,
        handleBlur,
        handleFocus,
        handleChange,
        options,
        showModal,
        visible1,
        showModal2,
        visible2,
        id,
       questionnaireList:store.getters.questionnaireList,
       
      };
    },
  });
  </script>
