<template>
<a-modal width="100%" :title="update ? 'Edit Template' : 'Create Template'" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="questionnaireTemplate" layout="vertical" @finish="update ? updateTemplate() : addTemplate()" @finishFailed="onFinishFailed">
        <a-row :gutter="16">
            <a-col :span="12">
                <div class="form-group">
                  
                    <a-form-item :label="$t('questionnaire.templateName')" name="templateName" :rules="[{ required: true, message: $t('questionnaire.templateName') +' '+$t('global.validation') }]">
                        <a-input v-model:value="questionnaireTemplate.templateName" :placeholder="$t('questionnaire.entertemplateName')" style="width: 100%" size="large" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateName[0]:''" />
                    </a-form-item>

                </div>

            </a-col>
            <a-col :span="12">
                <div class="form-group">
                 
                    <a-form-item :label="$t('questionnaire.templateType')" name="templateTypeId" :rules="[{ required: true, message: $t('questionnaire.templateType') +' '+$t('global.validation') }]">
                      <GlobalCodeDropDown v-if="questionnaireTemplateType" v-model:value="questionnaireTemplate.templateTypeId" :globalCode="questionnaireTemplateType" @change="checkChangeInput()"/>
                       
                         <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateTypeId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
             <a-col :span="24">
                    <div class="form-group">
                        <a-form-item :label="$t('questionnaire.tags')" name="tags" >
                        <a-select ref="select" v-model:value="questionnaireTemplate.tags" style="width: 100%" @focus="focus" @change="handleChange" mode="tags" size="large" :placeholder="$t('questionnaire.selectTags')">
                        </a-select>
                        </a-form-item>
                    </div>

                </a-col>
            <a-col :span="24">
              
                <div class="steps-action">
                   <a-button style="margin-right: 8px" html-type="reset" v-if="!update" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button  type="primary" html-type="submit" :disabled="disabled" v-if="!update">{{$t('global.save')}}</a-button>
                    <a-button  type="primary" html-type="submit" v-else >{{$t('global.update')}}</a-button>
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
    const questionnaireTemplate = reactive({
      templateName: "",
      templateTypeId: "",
      tags:[],
    });
    const disabled= ref(false)
    const form = reactive({...questionnaireTemplate})
    watchEffect(()=>{
      
      if(props.update){
        console.log("check",props.update)
        if(store.getters.detailsQuestionnaireTemplate){
        
        Object.assign(questionnaireTemplate,store.getters.detailsQuestionnaireTemplate.value)

        }else{
          Object.assign(questionnaireTemplate,form)
        }
      }
    })
    const addTemplate = () => {
      disabled.value= true
      store.dispatch("addQuestionnaireTemplate", questionnaireTemplate).then(()=>{
        if(store.state.common.successMsg){
          emit("is-visible", {show:false,id:props.update})
          reset()
          store.dispatch("questionnaireTemplateList")
          disabled.value= false
        }
      })
    }
    const updateTemplate=()=>{
      store.dispatch("updateQuestionnaireTemplate", {data:questionnaireTemplate,id:props.update}).then(()=>{
        if(store.state.common.successMsg){
          emit("is-visible", {show:false,id:''})
          reset()
          store.dispatch("questionnaireTemplateList")
        }
      })
    }
function reset(){
   store.state.patients.errorMsg = ""
    store.commit("checkChangeInput", false)
    Object.assign(questionnaireTemplate,form)
    disabled.value= false
}
    function closeModal() {
      
      if (checkFieldsData.value) {
        emit("is-visible", {show:true,id:props.update})
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
        formRef.value.resetFields()
        disabled.value= false
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
      questionnaireTemplate,
      addTemplate,
      closeModal,
      checkChangeInput,
      checkFieldsData,
      errorMsg,
      formRef,
      updateTemplate,
      disabled,
      questionnaireTemplateType:store.getters.questionnaireTemplateType,
      reset,
    };
  },
});
</script>
