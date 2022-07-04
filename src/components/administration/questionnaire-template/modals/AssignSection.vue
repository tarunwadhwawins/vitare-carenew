<template>
<a-modal width="100%" :title="title" centered :maskClosable="false" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="section" layout="vertical" @finish="update ? updateTemplate() : addTemplate()" >
        <a-row :gutter="16">
            <a-col :span="12">
                <div class="form-group">
                 
                    <a-form-item :label="$t('questionnaire.templateType')" name="templateTypeId" :rules="[{ required: true, message: $t('questionnaire.templateType') +' '+$t('global.validation') }]">
                      <GlobalCodeDropDown v-if="sectionType" v-model:value="section.sectionId" :globalCode="sectionType" @change="checkChangeInput()"/>
                       
                         <ErrorMessage v-if="errorMsg" :name="errorMsg.question?errorMsg.templateTypeId[0]:''" />
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
    update: String,
  },

  setup(props, { emit }) {
    const store = useStore();
    const formRef = ref();
    
    const section = reactive({
      
     sectionId: "",
     
    });
    const disabled= ref(false)
    const form = reactive({...section})
    watchEffect(()=>{
      
    //   if(props.update){
        
    //     if(store.getters.detailssection){
        
    //     Object.assign(section,store.getters.detailssection.value)

    //     }else{
    //       Object.assign(section,form)
    //     }
    //   }
    })
    const assignSection = () => {
      disabled.value= true
      store.dispatch("assignSection", section).then(()=>{
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
      section,
      assignSection,
      closeModal,
      checkChangeInput,
      checkFieldsData,
      errorMsg,
      formRef,
     
      disabled,
      sectionType:store.getters.sectionType,
      reset,
      
    };
  },
});
</script>
