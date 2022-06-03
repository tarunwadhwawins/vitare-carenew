<template>
	<a-modal width="50%" height="500px" :title="title">
    <a-form ref="formRef" :model="addFlagForm" @finish="submitForm" layout="vertical">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation') }]">
            <GlobalCodeDropDown v-model:value="addFlagForm.flag" :globalCode="patientFlags"/>
            <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label="$t('common.reason')" name="reason" :rules="[{ required: true, message: $t('common.reason')+' '+$t('global.validation') }]">
            <a-textarea v-model:value="addFlagForm.reason" allow-clear />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.reason ? errorMsg.reason[0] : ''" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-button class="add-button" size="large" html-type="submit">{{ $t('global.save') }}</a-button>
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
export default {
	components: {
		Loader,
    GlobalCodeDropDown
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

      const patientFlags = computed(() => {
        return store.state.flags.patientFlags
      })

      const addFlagForm = reactive({
        flag: "",
        reason: ""
      })
      const form = reactive({ ...addFlagForm })

      const submitForm = () => {
        store.dispatch('addPatientFlag', {
          patientUdid: patientUdid,
          data: addFlagForm
        }).then(() => {
          store.dispatch('patientTimeline', {id:route.params.udid, type:''});
          store.dispatch('patientFlagsList', patientUdid).then(() => {
            title.value = latestFlag.value && latestFlag.value != null ? 'Update Flag' : 'Add Flag'
          })
          formRef.value.resetFields();
          Object.assign(addFlagForm, form);
          emit("closeModal", {
            modal: 'addFlag',
            value: false
          });
        })
      }

      return {
				formRef,
				patientFlags,
				addFlagForm,
				submitForm,
				title,
			}
		}
}
</script>