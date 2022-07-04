<template>
<a-modal width="100%" :title="detailsQuestionnaireTemplate.templateName" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="section" layout="vertical" @finish="assignSection" >
        <a-row :gutter="16">
            <a-col :span="12">
                <div class="form-group">
                 
                    <a-form-item :label="$t('questionnaire.sectionName')" name="sectionId" :rules="[{ required: true, message: $t('questionnaire.sectionName') +' '+$t('global.validation') }]">
                      <GlobalCodeDropDown v-if="sectionType" v-model:value="section.sectionId" :globalCode="sectionType" @change="checkChangeInput()" mode="multiple"/>
                       
                         <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.sectionId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
             
            <a-col :span="24">
              
                <div class="steps-action">
                   <!-- <a-button style="margin-right: 8px" html-type="reset" v-if="!update" @click="reset()">{{$t('global.clear')}}</a-button> -->
                   <a-button  type="primary" html-type="submit" >{{$t('global.save')}}</a-button>
                   <!-- <a-button  type="primary" html-type="submit" v-else >{{$t('global.update')}}</a-button> -->
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
import ErrorMessage from "@/components/common/messages/ErrorMessage"
export default defineComponent({
  emits: ["is-visible"],
  components:{
    TableLoader,
    GlobalCodeDropDown,
    ErrorMessage
  },
  props: {
    udid: String,
  },

  setup(props, { emit }) {
    const store = useStore();
    const formRef = ref();
    
    const section = reactive({
      
     sectionId: [],
     
    });
    const disabled= ref(false)
    const form = reactive({...section})
     const detailsQuestionnaireTemplate =  store.getters.detailsQuestionnaireTemplate
    watchEffect(()=>{
      store.dispatch("allSections");
    //   if(props.update){
        
    //     if(store.getters.detailssection){
        
    //     Object.assign(section,store.getters.detailssection.value)

    //     }else{
    //       Object.assign(section,form)
    //     }
    //   }
    })
    const assignSection = () => {
      console.log("check",detailsQuestionnaireTemplate.value)
      disabled.value= true
      store.dispatch("sectionAssignToTemplate",  {id:detailsQuestionnaireTemplate.value.id,sectionId:section.sectionId}).then(()=>{
        if(store.state.common.successMsg){
          emit("is-visible", {show:false,id:props.update})
          reset()
          store.dispatch("sectionList")
          disabled.value= false
        }
      })
    }

function reset(){
   store.state.patients.errorMsg = ""
    store.commit("checkChangeInput", false)
    Object.assign(section,form)
    disabled.value= false
}
    function closeModal() {
      
      if (checkFieldsData.value) {
        emit("is-visible", {show:true,id:detailsQuestionnaireTemplate.id})
        warningSwal(messages.modalWarning).then((response) => {
          
          if (response == true) {
            emit("is-visible", {show:false,id:detailsQuestionnaireTemplate.id})
            reset()
            disabled.value= false
          } else {
            emit("is-visible", {show:true,id:detailsQuestionnaireTemplate.id})
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
      section,
      assignSection,
      closeModal,
      checkChangeInput,
      checkFieldsData,
      errorMsg,
      formRef,
      disabled,
      detailsQuestionnaireTemplate,
      sectionType:store.getters.allSections,
      reset,
      
    };
  },
});
</script>
