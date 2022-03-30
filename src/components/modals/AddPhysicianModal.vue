<template>
	<a-modal width="60%" title="Add Physician" centered @cancel="closeModal()">
		<a-row :gutter="24">
      <a-col :sm="24" :xs="24">
				<a-form layout="vertical" ref="formRef" :model="addPhysicianForm" @finish="submitForm">
					<a-row :gutter="24">
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.name')" name="name" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
									<a-input @change="changedValue" v-model:value="addPhysicianForm.name" size="large" />
									<ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
								</a-form-item>
							</div>
						</a-col>
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
									<GlobalCodeDropDown @change="changedValue"  v-model:value="addPhysicianForm.designation" :globalCode="globalCode.designations"/>
									<ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
								</a-form-item>
							</div>
						</a-col>
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.email')+' '+$t('global.validation') }]">
									<a-input @change="changedValue" v-model:value="addPhysicianForm.email" placeholder="test@test.com" size="large"/>
									<ErrorMessage v-if="errorMsg" :name="errorMsg.email ? errorMsg.email[0] : ''" />
								</a-form-item>
							</div>
						</a-col>
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.phoneNo')" name="phoneNumber" :rules="[{ required: false, message: $t('global.phoneNo')+' '+$t('global.validation') }]">
									<a-input-number @change="changedValue" v-model:value="addPhysicianForm.phoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
									<ErrorMessage v-if="errorMsg" :name="errorMsg.phoneNumber?errorMsg.phoneNumber[0]:''" />
								</a-form-item>
							</div>
						</a-col>
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('patient.conditions.fax')" name="fax" :rules="[{ required: false, message: $t('patient.conditions.fax')+' '+$t('global.validation') }]">
									<a-input @change="changedValue" v-model:value="addPhysicianForm.fax" size="large" />
									<ErrorMessage v-if="errorMsg" :name="errorMsg.fax?errorMsg.fax[0]:''" />
								</a-form-item>
							</div>
						</a-col>

						<a-col :sm="24" :span="24">
							<ModalButtons :Id="id" @is_click="handleClear"/>
						</a-col>

					</a-row>
				</a-form>
        <Loader />
      </a-col>
    </a-row>
	</a-modal>
</template>

<script>
import ModalButtons from "@/components/common/button/ModalButtons";
import Loader from "@/components/loader/Loader.vue";
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue-demi'
import { useStore } from 'vuex';
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
	GlobalCodeDropDown
  },
  props: {
    isPhysicianEdit: {
			type: Boolean
		},
  },
	setup(props, { emit }) {
		const store = useStore()
		const route = useRoute()
		const formRef = ref()
		const patientUdid = route.params.udid
		const isEdit = reactive(props.isPhysicianEdit)
    const isValueChanged = ref(false);

    const globalCode = computed(() => {
      return store.state.common;
    });

		const modalClose = computed(() => {
			return store.state.patients.closeModal
		})

		const addPhysicianForm = reactive({
			name: '',
			designation: '',
			email: '',
			phoneNumber: '',
			fax: '',
		})
    const form = reactive({ ...addPhysicianForm });

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
							modal: 'addPhysician',
							value: false
						});
						Object.assign(addPhysicianForm, form);
					}
					else {
						emit("closeModal", {
							modal: 'addPhysician',
							value: true
						});
					}
				})
			}
    }

    const patients = computed(() => {
      return store.state.patients;
    });
		
		const id = ref(null)
		if(isEdit) {
			id.value = patients.value.physicianDetails;
		}

    onMounted(() => {
      if(isEdit) {
        Object.assign(addPhysicianForm, patients.value.physicianDetails);
      }
    })
		
		onUnmounted(() => {
			store.commit('errorMsg', null)
		})

		const submitForm = () => {
      if(isEdit) {
				store.dispatch('updatePhysician', {
					patientUdid: patientUdid,
					familyUdid: patients.value.physicianDetails.id,
					data: addPhysicianForm
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('physiciansList', patientUdid);
					}
					if(closeModal.value == true) {
						emit('closeModal')
						formRef.value.resetFields();
						Object.assign(addPhysicianForm, form)
					}
				})
			}
			else {
				console.log('addPhysicianForm', addPhysicianForm)
				store.dispatch('addPhysician', {
					patientUdid: patientUdid,
					data: addPhysicianForm,
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('physiciansList', patientUdid);
					}
					if(closeModal.value == true) {
						emit('closeModal')
						formRef.value.resetFields();
						Object.assign(addPhysicianForm, form)
					}
				})
			}
		}

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addPhysicianForm, form)
    }

		const errorMsg = computed(() => {
			return store.state.patients.errorMsg
		})

		return {
			formRef,
			globalCode,
			addPhysicianForm,
			submitForm,
			handleClear,
			errorMsg,
			modalClose,
			closeModal,
			changedValue,
			isValueChanged,
			id,
		}
	}
}
</script>