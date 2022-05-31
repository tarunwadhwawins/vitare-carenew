<template>
	<a-modal width="1000px" :title="$t('appointmentCalendar.addAppointment.addAppointment')" centered :maskClosable="maskebale" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="appointmentForm" layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
			<a-row :gutter="24">
				<a-col :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('appointmentCalendar.addAppointment.patient')" name="patientId" :rules="[{ required: isPatientSummary || isChat ? false : true, message: $t('appointmentCalendar.addAppointment.patient')+' '+$t('global.validation')  }]">
							<a-input v-if="isPatientSummary || isChat" v-bind:value="patientName" :disabled="true" size="large" />
							<PatientDropDown v-else :disabled="isPatientSummary || isChat" v-model:value="appointmentForm.patientId" @handlePatientChange="handlePatientChange($event)" @change="checkChangeInput()" :close="closeValue" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.patientId?errorMsg.patientId[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.careCoodinator')" name="staffId" :rules="[{ required: true, message: $t('global.careCoodinator')+' '+$t('global.validation')  }]">
							<StaffDropDown v-model:value="appointmentForm.staffId" @handleStaffChange="handleStaffChange($event)" @change="checkChangeInput()" :close="closeValue" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.staffId?errorMsg.staffId[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :sm="12" :xs="24">
					<div class="form-group">
					
						<a-form-item :label="$t('appointmentCalendar.addAppointment.startDate')" name="startDate" :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.startDate')+' '+$t('global.validation') }]">
							<a-date-picker :disabledDate="d => !d || d.isSameOrBefore(moment().subtract(1,'days'))" v-model:value="appointmentForm.startDate" format="DD, MMM YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" @change="checkChangeInput()" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.startTime')" name="startTime" :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
							<a-time-picker use12-hours format="hh:mm A" v-model:value="appointmentForm.startTime" :disabledHours="() => disableHours" :size="size" style="width: 100%" @change="checkChangeInput(); getTime()" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.startTime?errorMsg.startTime[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('global.duration') +' '+$t('global.time')" name="durationId" :rules="[{ required: true, message: $t('global.duration') +' '+$t('global.time')+' '+$t('global.validation')  }]">
							<GlobalCodeDropDown v-if="durationList" v-model:value="appointmentForm.durationId" :globalCode="durationList" @change="checkChangeInput()" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.durationId?errorMsg.durationId[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :sm="12" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('appointmentCalendar.addAppointment.typeOfVisit')" name="typeOfVisit" :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.typeOfVisit')+' '+$t('global.validation')  }]">
							<GlobalCodeDropDown v-if="typeOfVisitList" v-model:value="appointmentForm.typeOfVisit" :globalCode="typeOfVisitList" @change="checkChangeInput()" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.typeOfVisit?errorMsg.typeOfVisit[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :sm="24" :xs="24">
					<div class="form-group">
						<a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
							<GlobalCodeDropDown v-model:value="appointmentForm.flag" :globalCode="flagsList" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :span="24">
					<div class="form-group">
						<a-form-item :label="$t('appointmentCalendar.addAppointment.note')" name="note" :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.note')+' '+$t('global.validation') }]">
							<a-textarea v-model:value="appointmentForm.note" allow-clear @change="checkChangeInput()" />
							<ErrorMessage v-if="errorMsg" :name="errorMsg.note?errorMsg.note[0]:''" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :span="24">
					<div class="steps-action">
						<ModalButtons @is_click="handleCancel" />
					</div>
				</a-col>
			</a-row>
    </a-form>
		<Loader />
	</a-modal>
</template>

<script>
import {
	ref,
	watchEffect,
	computed,
	reactive,
	onMounted
} from "vue"
import {
	useStore
} from "vuex"
import ErrorMessage from "../common/messages/ErrorMessage"
import {
	timeStamp,
	disableHours,
	timeStampFormate,
} from "../../commonMethods/commonMethod"
import moment from 'moment';
import ModalButtons from "@/components/common/button/ModalButtons";
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue"
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue"
import {
	useRoute
} from 'vue-router'
import {
	warningSwal
} from "@/commonMethods/commonMethod";
import {
	messages
} from "../../config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import Loader from "@/components/loader/Loader";

export default {
	components: {
		ErrorMessage,
		ModalButtons,
		PatientDropDown,
		StaffDropDown,
		Loader,
		GlobalCodeDropDown
	},
	props: {
		staff: {
			type: Object
		},
		patient: {
			type: Object
		},
		maskebale: {
			type: Boolean
		},
		patientId: {
			type: Number
		},
		patientName: {
			type: String
		},
		isChat: {
			type: Boolean
		},
	},
	setup(props, { emit }) {
		const formRef = ref();
		const route = useRoute();
		const store = useStore()
		const staffData = ref([]);
		const patientData = ref([]);
		const patientUdid = route.params.udid;
		const disabled = ref(false)
		const isPatientSummary = ref(false)
		const closeValue = ref(false)
	
		const filterOption = (input, option) => {
			return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
		};
		const appointmentForm = reactive({
			patientId: '',
			staffId: '',
			startDate: '',
			startTime: '',
			durationId: '',
			typeOfVisit: '',
			flag: '',
			note: '',
		});

		const flagsList = computed(() => {
			return store.state.flags.flagsList
		})

		onMounted(() => {
			store.state.flags.flagsList ? '':store.dispatch('flagsList')
			
		})

		watchEffect(() => {
		
			if (props.patientId != null) {
				Object.assign(appointmentForm, {
					patientId: props.patientId
				})
				disabled.value = true
				if(route.name == "PatientSummary") {
					isPatientSummary.value = true
				}
			}
			store.state.common.allPatientsList ? "" : store.dispatch("allPatientsList")
			store.state.common.allStaffList ? "" : store.dispatch("allStaffList")
		})

		const handleStaffChange = (val) => {
			appointmentForm.staffId = val;
		};

		const handlePatientChange = (val) => {
			appointmentForm.patientId = val;
		};

		const onFinishFailed = () => {
			//
		};

		const list = ref([])
		const durationList = computed(() => {
			return store.state.common.duration;
		})
		const typeOfVisitList = computed(() => {
			return store.state.common.typeOfVisit;
		})

		const allPatients = computed(() => {
			return store.state.common.allPatientsList
		})

		const staffList = props.staff ? reactive(props.staff) : computed(() => {
			return store.state.common.allStaffList
		})

		const submitForm = () => {
			const date = appointmentForm.startDate
			closeValue.value = true
			const timeFormat = (moment(appointmentForm.startTime)).format('HH:mm');
			store.dispatch('addAppointment', {
				patientId: props.patientId ? props.patientId : appointmentForm.patientId,
				staffId: appointmentForm.staffId,
				startDate: timeStamp(date + " " + timeFormat),
				startTime: timeFormat,
				durationId: appointmentForm.durationId,
				appointmentTypeId: appointmentForm.typeOfVisit,
				note: appointmentForm.note,
				flag: appointmentForm.flag,
			}).then(() => {
				if (props.patientId != null && route.name == 'PatientSummary') {
					store.dispatch('latestAppointment', patientUdid)
					store.dispatch('patientTimeline', {
						id: patientUdid,
						type: ''
					});
				}
				if (store.state.appointment.successMsg) {
					closeValue.value = false
					store.dispatch("calendarDateSelect", moment(date))
					store.state.appointment.successMsg = null
					emit('is-visible', {
						check: false,
						date: moment(date)
					});
					emit('is-heardeVisible', {
						check: false,
						date: moment(date)
					});
					handleCancel()
				}
				if(props.isChat) {
					store.dispatch('patientAppointmentsList', props.patientId)
				}
				emit("closeModal", {
					modal: 'addAppointment',
					value: false
				});
			});
			store.commit('checkChangeInput', false)
		}

		const errorMsg = computed(() => {
			if (store.state.careCoordinator.errorMsg) {
				// scrollToTop()
			}
			return store.state.careCoordinator.errorMsg
		})

		const form = reactive({ ...appointmentForm })

		const handleCancel = () => {
				formRef.value.resetFields();
				Object.assign(appointmentForm, form)
				//emit('is-visible', false);
		};

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
						closeValue.value = true
						setTimeout(() => {
							closeValue.value = false
						}, 100)
						handleCancel();
						emit("is-visible", false);
						emit("closeModal", {
							modal: 'addAppointment',
							value: false
						});
						emit('is-heardeVisible', false);
						store.commit('checkChangeInput', false)
					} else {
						emit("is-visible", true);
						emit("closeModal", {
							modal: 'addAppointment',
							value: true
						});
					}
				});
			}
			else {
				formRef.value.resetFields();
			}
		}

		function getTime() {
			let timeSelect = timeStamp(appointmentForm.startTime)
			if (timeStampFormate(timeSelect, 'HH:00') < '08:00' || timeStampFormate(timeSelect, 'HH:00') > '20:00') {
				appointmentForm.startTime = ''
			}
		}

		return {
			checkFieldsData,
			checkChangeInput,
			handlePatientChange,
			handleStaffChange,
			loadingStatus: store.getters.loadingStatus,
			staffData,
			patientData,
			allPatients,
			form,
			errorMsg,
			staffList,
			appointmentForm,
			submitForm,
			durationList,
			typeOfVisitList,
			size: ref("large"),
			onFinishFailed,
			handleCancel,
			moment,
			formRef,
			list,
			closeModal,
			disabled,
			isPatientSummary,
			filterOption,
			closeValue,
			disableHours,
			getTime,
			flagsList,
		
		};
	},
};
</script>
