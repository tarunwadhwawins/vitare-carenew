<template>
<a-modal width="100%" :title="update ? 'Edit Section' : 'Create Section'" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="questionnaireSection" layout="vertical" @finish="update ? updateSection() : addSection()" @finishFailed="onFinishFailed">
        <a-row :gutter="16">
            <a-col :span="12">
                <div class="form-group">
                    <a-form-item label="Section Name" name="sectionName" :rules="[{ required: true, message: 'template' +' '+$t('global.validation') }]">
                        <a-input v-model:value="questionnaireSection.templateName" placeholder="Enter Section Name" style="width: 100%" size="large" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateName[0]:''" />
                    </a-form-item>

                </div>

            </a-col>
            <a-col :span="12">
                <div class="form-group">
                 
                    <a-form-item label="Template Type" name="templateTypeId" :rules="[{ required: true, message: 'template Type' +' '+$t('global.validation') }]">
                      <GlobalCodeDropDown v-if="questionnaireSectionType" v-model:value="questionnaireSection.templateTypeId" :globalCode="questionnaireSectionType" @change="checkChangeInput()"/>
                       
                         <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateTypeId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
             <a-col :span="24">
                    <div class="form-group">
                        <a-form-item label="Tags" name="tags" >
                        <a-select ref="select" v-model:value="questionnaireSection.tags" style="width: 100%" @focus="focus" @change="handleChange" mode="tags" size="large" placeholder="Select Tags">
                        </a-select>
                        </a-form-item>
                    </div>

                </a-col>
            <a-col :span="24">
               <div class="steps-action">
                   <a-button style="margin-right: 8px" html-type="reset" v-if="!update" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button  type="primary" html-type="submit" :disabled="disabled" v-if="!update">Save</a-button>
                    <a-button  type="primary" html-type="submit" v-else >Update</a-button>
              </div>
            </a-col>
        </a-row>
        <TableLoader/>
    </a-form>

</a-modal>

</template>

<script>
import { ref, reactive, defineComponent, computed,watchEffect } from "vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import TableLoader from "@/components/loader/TableLoader"
export default defineComponent({
  components:{
    TableLoader,
    GlobalCodeDropDown
  },
  props: {
    update: String,
  },

  setup(props, { emit }) {
    const store = useStore();
    const formRef = ref();
    const disabled= ref(false)
    const questionnaireSection = reactive({
      templateName: "",
      templateTypeId: "",
      tags:[],
    });
    const form = reactive({...questionnaireSection})
    watchEffect(()=>{
      
      if(props.update){
       
        if(store.getters.detailsquestionnaireSection){
        
        Object.assign(questionnaireSection,store.getters.detailsquestionnaireSection.value)

        }else{
          Object.assign(questionnaireSection,form)
        }
      }
    })
    const addSection = () => {
      disabled.value= true
      store.dispatch("addquestionnaireSection", questionnaireSection).then(()=>{
        if(store.state.common.successMsg){
          emit("is-visible", {show:false,id:props.update})
          reset()
          store.dispatch("questionnaireSectionList")
        }
      })
    }
    const updateSection=()=>{
      store.dispatch("updatequestionnaireSection", {data:questionnaireSection,id:props.update}).then(()=>{
        if(store.state.common.successMsg){
          emit("is-visible", {show:false,id:''})
          reset()
          store.dispatch("questionnaireSectionList")
        }
      })
    }
function reset(){
   store.state.patients.errorMsg = ""
    store.commit("checkChangeInput", false)
    Object.assign(questionnaireSection,form)
    disabled.value= false
}
    function closeModal() {
      if (checkFieldsData.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("is-visible", {show:false,id:props.update})
            reset()
            disabled.value= false
          } else {
            emit("is-visible", {show:true,id:props.update})
          }
        });
      } else {
        formRef.value.resetFields();
      }
    }

    function checkChangeInput() {
      store.commit("checkChangeInput", true);
    }
const errorMsg = store.getters.errorMsg.value
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput
    })
    return {
      questionnaireSection,
      addSection,
      closeModal,
      checkChangeInput,
      checkFieldsData,
      errorMsg,
      formRef,
      updateSection,
      questionnaireSectionType:store.getters.questionnaireSectionType
    };
  },
});
</script>
