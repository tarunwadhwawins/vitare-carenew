<template>
	<a-modal width="50%" height="500px" :title="title" @cancel="closeModal()" :maskClosable="false">
    <a-form ref="formRef" :model="addFlagForm" @finish="submitForm" layout="vertical">
      <a-row :gutter="24">
       
        <a-col :span="24" v-if="flags.length==0">
          <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation') }]">
            <GlobalCodeDropDown v-model:value="addFlagForm.flag" :globalCode="flagsForPatients" @change="checkChangeInput()"/>
            <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
          </a-form-item>
        </a-col>
        <a-col :span="24" v-else>
          <a-form-item :label="$t('common.removalReason')" name="removalReasonId" :rules="[{ required: true, message: $t('common.removalReason')+' '+$t('global.validation') }]">
            <GlobalCodeDropDown v-model:value="addFlagForm.removalReasonId" :globalCode="removalReason" @change="checkChangeInput()"/>
            <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.removalReasonId[0] : ''" />
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="flags.length==0">
          <a-form-item :label="$t('common.reason')" name="reason" :rules="[{ required: true, message: $t('common.reason')+' '+$t('global.validation') }]">
            <a-textarea v-model:value="addFlagForm.reason" allow-clear @change="checkChangeInput()"/>
            <ErrorMessage v-if="errorMsg" :name="errorMsg.reason ? errorMsg.reason[0] : ''" />
          </a-form-item>
        </a-col>
         <a-col :span="24" v-else>
          <a-form-item :label="$t('common.comment')" name="reason" :rules="[{ required: true, message: $t('common.comment')+' '+$t('global.validation') }]">
            <a-textarea v-model:value="addFlagForm.reason" allow-clear @change="checkChangeInput()"/>
            <ErrorMessage v-if="errorMsg" :name="errorMsg.reason ? errorMsg.reason[0] : ''" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <div class="steps-action">
                    <a-button @click="closeModal" class="modal-button">Cancel</a-button>
                    <a-button class="modal-button" type="primary" html-type="submit" >{{$t('global.save')}}</a-button>
                </div>
         
        </a-col>
      </a-row>
    </a-form>
		<Loader />
  </a-modal>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Loader from "@/components/loader/Loader";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { warningSwal} from "@/commonMethods/commonMethod";
import {  messages} from "../../config/messages";
export default {
	components: {
		Loader,
    GlobalCodeDropDown
	},
  props:{
    flags:Array
  },
    setup(props, {emit}) {
      const store = useStore();
      const route = useRoute();
      const patientUdid = route.params.udid;
      const formRef = ref();
    
      const latestFlag = computed(() => {
        return store.state.flags.latestFlag
      })
      const title = latestFlag.value && latestFlag.value != null ? ref('Update Flag') : ref('Add Flag')

      const flagsForPatients = computed(() => {
        return store.state.flags.flagsForPatients
      })

      const addFlagForm = reactive({
        flag: "",
        reason: "",
        removalReasonId:''
      })
      const form = reactive({ ...addFlagForm })

      const submitForm = () => {
        if(props.flags.length>0){
        store.dispatch('updatePatientFlag', {
         
          flag:props.flags,reason:addFlagForm.reason,deleteReason:addFlagForm.removalReasonId
        }).then(() => {
          store.dispatch('patientTimeline', {id:route.params.udid, type:store.state.patients.tabvalue.join(",")});
          store.dispatch('patientFlagsList', patientUdid).then(() => {
           /// title.value = latestFlag.value && latestFlag.value != null ? 'Update Flag' : 'Add Flag'
          })
           store.commit('checkChangeInput', false)
          formRef.value.resetFields();
          Object.assign(addFlagForm, form);
           emit("closeModal", {
            modal: 'addFlag',
            value: false
          });
        })
        }else{
          store.dispatch('addPatientFlag', {
          patientUdid: patientUdid,
          data: addFlagForm
        }).then(() => {
          store.dispatch('patientTimeline', {id:route.params.udid, type:store.state.patients.tabvalue.join(",")});
          store.dispatch('patientFlagsList', patientUdid).then(() => {
            title.value = latestFlag.value && latestFlag.value != null ? 'Update Flag' : 'Add Flag'
          })
           store.commit('checkChangeInput', false)
          formRef.value.resetFields();
          Object.assign(addFlagForm, form);
          emit("closeModal", {
            modal: 'addFlag',
            value: false
          });
        })
        }
      }
 function checkChangeInput() {
            store.commit('checkChangeInput', true)
        }

        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })

        function closeModal() {
         
            if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        formRef.value.resetFields();
                       Object.assign(addFlagForm, form);
                        emit("closeModal", {
            modal: 'addFlag',
            value: false
          });
                       
                        store.commit('checkChangeInput', false)
                    } else {
                       emit("closeModal", {
            modal: 'addFlag',
            value: true
          });
                        
                    }
                });
            } 
            emit("closeModal", {
            modal: 'addFlag',
            value: false
          });
            formRef.value.resetFields();
        }
      return {
				formRef,
				flagsForPatients,
				addFlagForm,
				submitForm,
				title,
        checkChangeInput,
        closeModal,
        removalReason:store.getters.removalReason
			}
		}
}
</script>