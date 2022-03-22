<template>
	<a-modal width="60%" title="Add Physician" centered>
		<a-row :gutter="24">
      <a-col :sm="24" :xs="24">
				<a-form layout="vertical" ref="formRef" :model="addPhysicianForm" @finish="submitForm">
					<a-row :gutter="24">
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.name')" name="name" :rules="[{ required: true, message: $t('global.name')+' '+$t('global.validation') }]">
									<a-input v-model:value="addPhysicianForm.name" size="large" />
									<ErrorMessage v-if="errorMsg" :name="errorMsg.name?errorMsg.name[0]:''" />
								</a-form-item>
							</div>
						</a-col>
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.designation')" name="designation" :rules="[{ required: true, message: $t('global.designation')+' '+$t('global.validation') }]">
									<a-select @change="changedValue" ref="select" v-model:value="addPhysicianForm.designation" style="width: 100%" size="large">
										<a-select-option value="" disabled>{{'Select Designation'}}</a-select-option>
										<a-select-option v-for="designation in globalCode.designations.globalCode" :key="designation.id" :value="designation.id">{{designation.name}}</a-select-option>
									</a-select>
									<ErrorMessage v-if="errorMsg" :name="errorMsg.designation?errorMsg.designation[0]:''" />
								</a-form-item>
							</div>
						</a-col>
						
						<a-col :sm="12" :xs="24">
							<div class="form-group">
								<a-form-item :label="$t('global.email')" name="email" :rules="[{ required: true, message: $t('global.email')+' '+$t('global.validation') }]">
									<a-input @change="changedValue" v-model:value="addPhysicianForm.email" placeholder="test@test.com" size="large"/>
									<ErrorMessage v-if="errorMsg && errorMsg.email!=null" :name="errorMsg.email?errorMsg.email[0]:''" />
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
import { computed, reactive, ref, onMounted } from 'vue-demi'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  components: {
    ModalButtons,
    Loader,
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

    const globalCode = computed(() => {
      return store.state.common;
    });

		const addPhysicianForm = reactive({
			name: '',
			designation: '',
			email: '',
			phoneNumber: '',
			fax: '',
		})
    const form = reactive({ ...addPhysicianForm });

    const patients = computed(() => {
      return store.state.patients;
    });

    onMounted(() => {
      if(isEdit) {
        Object.assign(addPhysicianForm, patients.value.physicianDetails);
      }
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
					emit('closeModal')
					formRef.value.resetFields();
					Object.assign(addPhysicianForm, form)
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
					emit('closeModal')
					formRef.value.resetFields();
					Object.assign(addPhysicianForm, form)
				})
			}
		}

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addPhysicianForm, form)
    }

		return {
			formRef,
			globalCode,
			addPhysicianForm,
			submitForm,
			handleClear,
		}
	}
}
</script>