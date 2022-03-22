<template>
	<a-modal width="60%" title="Add Family Member" centered>
		<a-form ref="formRef" :model="familyMemberForm" layout="vertical" @finish="submitForm">
			<a-row :gutter="24">

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.fullName')" name="fullName" :rules="[{ required: true, message: $t('patient.demographics.fullName')+' '+$t('global.validation') }]">
							<a-input v-model:value="familyMemberForm.fullName" size="large" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.fullName?errorMsg.fullName[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.emailAddress')" name="familyEmail" :rules="[{ required: true, message: $t('patient.demographics.emailAddress')+' '+$t('global.validation') }]">
							<a-input v-model:value="familyMemberForm.familyEmail" placeholder="test@test.com" size="large" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyEmail?errorMsg.familyEmail[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.phoneNo')" name="familyPhoneNumber" :rules="[{ required: false, message: $t('global.phoneNo')+' '+$t('global.validation') }]">
							<a-input-number v-model:value="familyMemberForm.familyPhoneNumber" placeholder="Please enter 10 digit number" size="large" maxlength="10" style="width: 100%" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyPhoneNumber?errorMsg.familyPhoneNumber[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.preferredMethodofContact')" name="familyContactType" :rules="[{ required: false, message: $t('patient.demographics.preferredMethodofContact')+' '+$t('global.validation') }]">
							<a-select v-model:value="familyMemberForm.familyContactType" mode="multiple" size="large" style="width: 100%" :options="globalCode.pmOfcontact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactType?errorMsg.familyContactType[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('patient.demographics.preferredTimeofDayforContact')" name="familyContactTime" :rules="[{ required: false, message: $t('patient.demographics.preferredTimeofDayforContact')+' '+$t('global.validation') }]">
							<a-select v-model:value="familyMemberForm.familyContactTime" mode="multiple" size="large" style="width: 100%" :options="globalCode.ptOfDayContact.globalCode.map((item) => ({label: item.name, value: item.id }))" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyContactTime?errorMsg.familyContactTime[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.gender')" name="familyGender" :rules="[{ required: true, message: $t('global.gender')+' '+$t('global.validation') }]">
							<a-select ref="select" v-model:value="familyMemberForm.familyGender" style="width: 100%" size="large">
								<a-select-option value="" hidden>{{'Select Gender'}}</a-select-option>
								<a-select-option v-for="gender in globalCode.gender.globalCode" :key="gender.id" :value="gender.id">{{gender.name}}</a-select-option>
							</a-select>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.familyGender?errorMsg.familyGender[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col :md="12" :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.relation')" name="relation" :rules="[{ required: true, message: $t('global.relation')+' '+$t('global.validation') }]">
							<a-select ref="select" v-model:value="familyMemberForm.relation" style="width: 100%" size="large">
								<a-select-option value="" hidden>{{'Select Relation'}}</a-select-option>
								<a-select-option v-for="relation in globalCode.relation.globalCode" :key="relation.id" :value="relation.id">{{relation.name}}</a-select-option>
							</a-select>
							<ErrorMessage v-if="errorMsg" :name="errorMsg.relation?errorMsg.relation[0]:''" />
						</a-form-item>
					</div>
				</a-col>

				<a-col v-if="isEdit" :md="12" :sm="12" :xs="24">
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
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue-demi';
import { useStore } from 'vuex';
import Loader from "@/components/loader/Loader.vue";
import { useRoute } from 'vue-router';
import ErrorMessage from "../common/messages/ErrorMessage"
export default {
  components: {
    ModalButtons,
    Loader,
		ErrorMessage,
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
		const isEdit = reactive(props.isFamilyMemberEdit)

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
		console.log('familyMemberDetails', patients.value)
		
		const id = ref(null)
		if(isEdit) {
			id.value = patients.value.familyMemberDetails;
		}

    onMounted(() => {
      if(isEdit) {
        Object.assign(familyMemberForm, patients.value.familyMemberDetails);
      }
    })

		onUnmounted(() => {
			store.commit('errorMsg', null)
		})

    const form = reactive({ ...familyMemberForm });

		const submitForm = () => {
      if(isEdit) {
				store.dispatch('updateFamilyMember', {
					patientUdid: patientUdid,
					familyUdid: patients.value.familyMemberDetails.id,
					data: familyMemberForm
				}).then(() => {
					if(route.name == 'PatientSummary') {
						store.dispatch('familyMembersList', patientUdid);
					}
					if(closeModal.value == true) {
						emit('closeModal')
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
						store.dispatch('familyMembersList', patientUdid);
					}
					if(closeModal.value == true) {
						emit('closeModal')
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

		const closeModal = computed(() => {
			return store.state.patients.closeModal
		})

		return {
      isEdit,
      formRef,
			globalCode,
			familyMemberForm,
			submitForm,
			handleClear,
			errorMsg,
			closeModal,
			id,
		}
	}
}
</script>