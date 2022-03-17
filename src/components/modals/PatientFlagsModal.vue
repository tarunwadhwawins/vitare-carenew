<template>
	<a-modal width="500px" height="500px" title="Add Flag">
    <a-form ref="formRef" :model="addFlagForm" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="18" :xs="24">
          <a-form-item name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation') }]">
            <a-select ref="select" v-model:value="addFlagForm.flag" size="large">
              <a-select-option value="" hidden>Select Flag</a-select-option>
              <a-select-option v-for="flag in flagsList" :key="flag.id" :value="flag.id">{{flag.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :sm="6" :xs="24">
          <a-button class="add-button" size="large" html-type="submit">Add</a-button>
        </a-col>
      </a-row>
    </a-form>
		<!-- <Loader /> -->
  </a-modal>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// // import Loader from "@/components/loader/Loader";
export default {
	components: {
		// Loader,
	},
    setup(props, {emit}) {
      const store = useStore();
      const route = useRoute();
      const patientUdid = route.params.udid;
      const formRef = ref();

      const flagsList = computed(() => {
        return store.state.flags.flagsList
      })

      const addFlagForm = reactive({
        flag: ""
      })
      const form = reactive({ ...addFlagForm })

      const submitForm = () => {
				emit('closeModal')
        store.dispatch('addPatientFlag', { patientUdid: patientUdid, data: addFlagForm }).then(() => {
          store.dispatch('patientFlagsList', patientUdid);
          formRef.value.resetFields();
          Object.assign(addFlagForm, form);
        })
      }

      return {
				formRef,
				flagsList,
				addFlagForm,
				submitForm,
			}
		}
}
</script>