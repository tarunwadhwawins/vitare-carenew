<template>
	<a-modal width="60%" title="Add Emergency Contact" centered @cancel="closeModal()">
		<a-form ref="formRef" :model="emergencyContactForm" layout="vertical" @finish="submitForm">
			<a-row :gutter="24">

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
							<a-input @change="changedValue" v-model:value="emergencyContactForm.fullName" size="large" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.emailAddress')" name="emergencyEmail" :rules="[{ required: true, message: $t('patient.demographics.emailAddress')+' '+$t('global.validation') }]">
							<a-input @change="changedValue" v-model:value="emergencyContactForm.emergencyEmail" placeholder="test@test.com" size="large" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.emergencyEmail?errorMsg.emergencyEmail[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.phoneNo')+' '+$t('global.validation') }]">
							<a-input-number @change="changedValue" v-model:value="emergencyContactForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="contactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
							<!-- <a-select v-model:value="emergencyContactForm.contactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" /> -->
								<GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactType" mode="multiple" :globalCode="globalCode.pmOfcontact"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.contactType?errorMsg.contactType[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="contactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
							<!-- <a-select v-model:value="emergencyContactForm.contactTime" mode="multiple" size="large" style="width: 100%" :options="globalCode.ptOfDayContact.globalCode.map((item) => ({label: item.name, value: item.id }))" /> -->
								<GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.contactTime" mode="multiple" :globalCode="globalCode.ptOfDayContact"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.contactTime?errorMsg.contactTime[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.gender')" name="gender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
							<!-- <a-select ref="select" v-model:value="emergencyContactForm.gender" style="width: 100%" size="large">
								<a-select-option value="" hidden>{{'Select Gender'}}</a-select-option>
								<a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
							</a-select> -->
							<GlobalCodeDropDown @change="changedValue" v-model:value="emergencyContactForm.gender"  :globalCode="globalCode.gender"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.gender?errorMsg.gender[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<!-- <a-col v-if="isEdit" :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.isPrimary')" name="isPrimary">
              <a-switch v-model:checked="emergencyContactForm.isPrimary" size="large" />
            </a-form-item>
					</div>
				</a-col> -->

				<a-col :sm="24" :span="24">
					<ModalButtons :Id="id" @is_click="handleClear"/>
				</a-col>
			</a-row>
		</a-form>
		<Loader />
	</a-modal>
</template>

<script>
import ModalButtons from "@/components/common/button/ModalButtons";
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue-demi';
import { useStore } from 'vuex';
import Loader from "@/components/loader/Loader.vue";
import { useRoute } from 'vue-router';
import ErrorMessage from "../common/messages/ErrorMessage"
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
export default {
  components: {
    ModalButtons,
    Loader,
	ErrorMessage,
	GlobalCodeDropDown,
  },
  props: {
    patientId: {
			type: Number
		},
    isEmergencyContactEdit: {
			type: Boolean
		},
  },
	setup(props, { emit }) {
		const store = useStore()
		const route = useRoute()
		const formRef = ref()
		const patientUdid = route.params.udid
		const isEdit = reactive(props.isEmergencyContactEdit)
    const isValueChanged = ref(false);

    const globalCode = computed(() => {
      return store.state.common;
    });

    const patients = computed(() => {
      return store.state.patients;
    });
		
		const emergencyContactForm = reactive({
			fullName: '',
			emergencyEmail: '',
			phoneNumber: '',
			contactType: [],
			contactTime: [],
			gender: '',
			// isPrimary: patients.value.emergencyContactDetails && patients.value.emergencyContactDetails.isPrimary ? patients.value.emergencyContactDetails.isPrimary : false,
		})
		console.log('emergencyContactDetails', patients.value)
		
		const id = ref(null)
		if(isEdit) {
			id.value = patients.value.emergencyContactDetails;
		}

    onMounted(() => {
      if(isEdit) {
        Object.assign(emergencyContactForm, patients.value.emergencyContactDetails);
      }
    })

		onUnmounted(() => {
			store.commit('errorMsg', null)
		})

		const modalClose = computed(() => {
			return store.state.patients.closeModal
		})

    const form = reactive({ ...emergencyContactForm });

    const changedValue = (value) => {
			if(value == false) {
				isValueChanged.value = false;
			}
			else {
				isValueChanged.value = true;
			}
    }

    function closeModal() {
			if(isValueChanged.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						emit("closeModal", {
							modal: 'addEmergencyContact',
							value: false
						});
						Object.assign(emergencyContactForm, form);
					}
					else {
						emit("closeModal", {
							modal: 'addEmergencyContact',
							value: true
						});
					}
				})
			}
    }

		const submitForm = () => {
      if(isEdit) {
				store.dispatch('updateEmergencyContact', {
					patientUdid: patientUdid,
					contactUdid: patients.value.emergencyContactDetails.id,
					data: emergencyContactForm
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('emergencyContactsList', patientUdid);
					}
					if(closeModal.value == true) {
						emit('closeModal')
						formRef.value.resetFields();
						Object.assign(emergencyContactForm, form)
					}
				})
			}
			else {
				store.dispatch('addEmergencyContact', {
					patientUdid: patientUdid,
					data: emergencyContactForm
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('emergencyContactsList', patientUdid);
					}
					if(closeModal.value == true) {
						emit('closeModal')
						formRef.value.resetFields();
						Object.assign(emergencyContactForm, form)
					}
				})
			}
		}

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(emergencyContactForm, form)
    }

		const errorMsg = computed(() => {
			return store.state.patients.errorMsg
		})

		return {
      isEdit,
      formRef,
			globalCode,
			emergencyContactForm,
			submitForm,
			handleClear,
			errorMsg,
			closeModal,
			modalClose,
			id,
      changedValue,
			isValueChanged,
		}
	}
}
</script>