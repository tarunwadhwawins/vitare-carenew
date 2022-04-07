<template>
  <a-modal width="70%" title="Start Call" centered @cancel="onCloseModal()">
    <a-form ref="formRef" :model="startCallForm" layout="vertical" @finish="submitForm">
			<a-row :gutter="24">
				<a-col :sm="24" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
							<GlobalCodeDropDown v-model:value="startCallForm.flag" :globalCode="flagsList" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :span="24">
					<div class="form-group">
						<a-form-item :label="$t('appointmentCalendar.addAppointment.note')" name="note" :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.note')+' '+$t('global.validation') }]">
							<a-textarea v-model:value="startCallForm.note" allow-clear @change="checkChangeInput()" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.note?errorMsg.note[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :span="24">
					<div class="steps-action">
						<a-button class="modal-button" type="primary" html-type="submit">{{$t('global.startCall')}}</a-button>
					</div>
				</a-col>
			</a-row>
    </a-form>
	</a-modal>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue-demi'
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import {
  enCodeString
} from '@/commonMethods/commonMethod';
export default {
	components: {
		GlobalCodeDropDown,
	},
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
		const formRef = ref();
		const isChangeInput = ref(false);

    onMounted(() => {
			store.dispatch('flagsList')
    })
    
		const flagsList = computed(() => {
			return store.state.flags.flagsList
		})
    
		const conferenceId = computed(() => {
			return store.state.videoCall.conferenceId
		})

    const startCallForm = reactive({
      flag: "",
      note: "",
      patientId: route.params.udid,
    })
    const form = reactive({ ...startCallForm })

    const submitForm = () => {
      console.log('startCallForm', startCallForm)
      store.dispatch("appointmentCalls", startCallForm)
      let redirect = router.resolve({name: 'videoCall', params: {id: enCodeString(conferenceId.value)}});
      window.open(redirect.href, '_blank');
      emit("closeModal", {
        modal: 'startCall',
        value: false
      });
    }

		const checkChangeInput = () => {
			isChangeInput.value = true
		}

    const onCloseModal = () => {
			if (isChangeInput.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						emit("closeModal", {
							modal: 'startCall',
							value: false
						});
            formRef.value.resetFields();
            Object.assign(startCallForm, form)
            isChangeInput.value = false
					} else {
						emit("closeModal", {
							modal: 'startCall',
							value: true
						});
					}
				});
			}
			else {
				formRef.value.resetFields();
			}
		}

    return {
      formRef,
      flagsList,
      startCallForm,
      submitForm,
      checkChangeInput,
      onCloseModal,
    }
  }
}
</script>