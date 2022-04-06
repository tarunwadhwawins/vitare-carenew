<template>
	<a-modal width="60%" :title="$t('global.addFamilyMembers')" centered @cancel="closeModal()" zIndex="1040">
		<a-form ref="formRef" :model="familyMemberForm" layout="vertical" @finish="submitForm">
			<a-row :gutter="24">

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
							<a-input @change="changedValue" v-model:value="familyMemberForm.fullName" @keyup="keyup" size="large" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message: $t('global.validValidation')+' '+$t('global.email').toLowerCase(), type: 'email' }]">
							<a-input @change="changedValue" v-model:value="familyMemberForm.familyEmail" @keyup="keyup" placeholder="test@test.com" size="large" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyEmail?errorMsg.familyEmail[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: false, message: $t('global.phoneNo')+' '+$t('global.validation') }]">
							<!-- <PhoneNumber @change="changedValue" v-model.trim:value="familyMemberForm.familyPhoneNumber" @setPhoneNumber="setPhoneNumber" /> -->
							<a-input-number @change="changedValue" v-model:value="familyMemberForm.familyPhoneNumber" @keyup="keyup" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
							<GlobalCodeDropDown @change="changedValue" v-model:value="familyMemberForm.familyContactType" @keyup="keyup" mode="multiple" :globalCode="globalCode.pmOfcontact"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
							<GlobalCodeDropDown @change="changedValue" v-model:value="familyMemberForm.familyContactTime" @keyup="keyup" mode="multiple" :globalCode="globalCode.ptOfDayContact"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
							<GlobalCodeDropDown @change="changedValue" v-model:value="familyMemberForm.familyGender" @keyup="keyup"  :globalCode="globalCode.gender"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyGender?errorMsg.familyGender[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: true, message: $t('global.relation')+' '+$t('global.validation') }]">
							<GlobalCodeDropDown @change="changedValue" v-model:value="familyMemberForm.relation" @keyup="keyup"  :globalCode="globalCode.relation"/>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.relation?errorMsg.relation[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col v-if="isFamilyMemberEdit" :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.isPrimary')" name="isPrimary">
              <a-switch v-model:checked="familyMemberForm.isPrimary" size="large" />
            </a-form-item>
					</div>
				</a-col>

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
import { computed, reactive, ref, watchEffect, onUnmounted } from 'vue-demi';
import { useStore } from 'vuex';
import Loader from "@/components/loader/Loader.vue";
import { useRoute } from 'vue-router';
import ErrorMessage from "../common/messages/ErrorMessage"
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
// import PhoneNumber from "@/components/modals/forms/fields/PhoneNumber"
export default {
  components: {
    ModalButtons,
    Loader,
		ErrorMessage,
		GlobalCodeDropDown,
		// PhoneNumber,
  },
  props: {
    patientId: {
			type: Number
		},
    isFamilyMemberEdit: {
			type: Boolean
		},
  },
	setup(props, { emit }) {
		const store = useStore()
		const route = useRoute()
		const formRef = ref()
		const patientUdid = reactive(props.patientId)
    const isValueChanged = ref(false);

    const globalCode = computed(() => {
      return store.state.common;
    });

    const patients = computed(() => {
      return store.state.patients;
    });
		
		const familyMemberForm = reactive({
			fullName: '',
			familyEmail: '',
			familyPhoneNumber: '',
			familyContactType: [],
			familyContactTime: [],
			familyGender: '',
			relation: '',
			isPrimary: patients.value.familyMemberDetails && patients.value.familyMemberDetails.isPrimary ? patients.value.familyMemberDetails.isPrimary : false,
		})
    const form = reactive({ ...familyMemberForm });

    const changedValue = () => {
			isValueChanged.value = true;
    }

    function closeModal() {
			if(isValueChanged.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						emit("closeModal", {
							modal: 'addFamilyMember',
							value: false
						});
						Object.assign(familyMemberForm, form);
						isValueChanged.value = false;
					}
					else {
						emit("closeModal", {
							modal: 'addFamilyMember',
							value: true
						});
					}
				})
			}
    }
		
		const id = ref(null)
		if(props.isFamilyMemberEdit) {
			id.value = patients.value.familyMemberDetails;
		}

    watchEffect(() => {
      if(props.isFamilyMemberEdit) {
        Object.assign(familyMemberForm, patients.value.familyMemberDetails);
      }
    })

		const keyup = () => {
			store.commit('errorMsg', null)
		}

		onUnmounted(() => {
			store.commit('errorMsg', null)
		})


		const modalClose = computed(() => {
			return store.state.patients.closeModal
		})
		const submitForm = () => {
      if(props.isFamilyMemberEdit) {
				store.dispatch('updateFamilyMember', {
					patientUdid: patientUdid,
					familyUdid: patients.value.familyMemberDetails.id,
					data: familyMemberForm
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('patientDetails', patientUdid)
						store.dispatch('familyMembersList', patientUdid);
					}
					if(modalClose.value == true) {
						emit("closeModal", {
							modal: 'addFamilyMember',
							value: false
						});
						formRef.value.resetFields();
						Object.assign(familyMemberForm, form)
					}
				})
			}
			else {
				store.dispatch('addFamilyMember', {
					patientUdid: patientUdid,
					data: familyMemberForm
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('patientDetails', patientUdid)
						store.dispatch('familyMembersList', patientUdid);
					}
					if(modalClose.value == true) {
						emit("closeModal", {
							modal: 'addFamilyMember',
							value: false
						});
						formRef.value.resetFields();
						Object.assign(familyMemberForm, form)
					}
				})
			}
		}

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(familyMemberForm, form)
    }

		const errorMsg = computed(() => {
			return store.state.patients.errorMsg
		})

    const setPhoneNumber = (value) => {
      familyMemberForm.familyPhoneNumber = value;
    };

		return {
      changedValue,
      formRef,
			globalCode,
			familyMemberForm,
			submitForm,
			handleClear,
			errorMsg,
			isValueChanged,
			closeModal,
			modalClose,
			id,
			keyup,
			setPhoneNumber,
		}
	}
}
</script>