<template>
<a-modal width="1000px"  :title="$t('appointmentCalendar.addAppointment.addAppointment')" centered :maskClosable="maskebale" @cancel="closeModal()" :footer="false">
    <a-form ref="formRef" :model="appointmentForm" layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('appointmentCalendar.addAppointment.patient')" name="patientId" :rules="[{ required: isPatientSummary || isChat ? false : true, message: $t('appointmentCalendar.addAppointment.patient')+' '+$t('global.validation')  }]">
                        <a-input v-if="isPatientSummary || isChat || patientId" v-bind:value="patientName" :disabled="true" size="large" />
                        <PatientDropDown v-else :disabled="isPatientSummary || isChat ||patientId" v-model:value="appointmentForm.patientId" @handlePatientChange="handlePatientChange($event)" @change="checkChangeInput()" :close="closeValue" />
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
                        <a-time-picker use12-hours format="hh:mm A" v-model:value="appointmentForm.startTime" :disabledHours="() => disableHours" :size="size" style="width: 100%" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.startTime?errorMsg.startTime[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.duration') +' '+$t('global.time')" name="durationId" :rules="[{ required: true, message: $t('global.duration') +' '+$t('global.time')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown v-if="durationList" v-model:value="appointmentForm.durationId" :dataId="31" @handleGlobalChange="handleGlobalChange($event,'appointmentForm.durationId'); checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.durationId?errorMsg.durationId[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="'Time Zone'" name="timezoneId" :rules="[{ required: true, message: 'Time Zone'+' '+$t('global.validation')  }]">
                         <TimeZoneDropDown  v-model:value="appointmentForm.timezoneId" @handleTimeZoneChange="handleTimeZoneChange($event); checkChangeInput()" :close="closeValue" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('appointmentCalendar.addAppointment.typeOfVisit')" name="typeOfVisit" :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.typeOfVisit')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown v-if="typeOfVisitList" v-model:value="appointmentForm.typeOfVisit" :dataId="1" @handleGlobalChange="handleGlobalChange($event,'appointmentForm.typeOfVisit'); checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.typeOfVisit?errorMsg.typeOfVisit[0]:''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="Priority" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                        <ArrayDataSearch v-model:value="appointmentForm.flag" :globalCode="flagsList" @change="checkChangeInput()" />
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
                <FormButtons @onCancel="closeModal" />
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
  
} from "../../commonMethods/commonMethod"
import moment from 'moment';
import FormButtons from "@/components/common/button/FormButtons";
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue"
import TimeZoneDropDown from "@/components/modals/search/TimeZoneSearch.vue"
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
import ArrayDataSearch from "@/components/modals/search/ArrayDataSearch";

export default {
    components: {
        ErrorMessage,
        FormButtons,
        PatientDropDown,
        StaffDropDown,
        Loader,
        GlobalCodeDropDown,
        TimeZoneDropDown,
        ArrayDataSearch
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
    setup(props, {
        emit
    }) {
        const formRef = ref();
        const route = useRoute();
        const store = useStore()
        const staffData = ref([]);
        const patientData = ref([]);
        const patientUdid = route.name == 'PatientSummary' ? route.params.udid : props.patientId;
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
            timezoneId:''
        });

        const flagsList = computed(() => {
            return store.state.flags.flagsList
        })

        onMounted(() => {
            // closeValue.value = true;
            //             setTimeout(()=>{
            //                 closeValue.value = false;
            //             },100)
            store.state.flags.flagsList ? '' : store.dispatch('flagsList')
           // store.dispatch("allPatientsList")
           // store.dispatch("allStaffList")
        })

        watchEffect(() => {

            if (props.patientId != null) {
                Object.assign(appointmentForm, {
                    patientId: props.patientId
                })
                disabled.value = true
                if (route.name == "PatientSummary") {
                    isPatientSummary.value = true
                }
            }

        })

        const handleStaffChange = (val) => {
			store.commit('checkChangeInput', true)
            appointmentForm.staffId = val;
        };

        const handleTimeZoneChange = (val) => {
			store.commit('checkChangeInput', true)
            appointmentForm.timezoneId = val;
        };

        const handlePatientChange = (val) => {
			store.commit('checkChangeInput', true)
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
            
            const timeFormat = (moment(appointmentForm.startTime)).format('HH:mm');
            store.dispatch('addAppointment', {
                patientId: patientUdid ? patientUdid : appointmentForm.patientId,
                staffId: appointmentForm.staffId,
                startDate: timeStamp(date + " " + timeFormat),
                startTime: timeFormat,
                durationId: appointmentForm.durationId,
                appointmentTypeId: appointmentForm.typeOfVisit,
                note: appointmentForm.note,
                flag: appointmentForm.flag,
                timezoneId:appointmentForm.timezoneId
            }).then(() => {
				closeValue.value = true;
                        setTimeout(()=>{
                            closeValue.value = false;
                        },100)
                if (props.patientId != null && route.name == 'PatientSummary') {
                    
                    store.dispatch('latestAppointment', patientUdid)
                    store.dispatch('patientAppointmentsList', patientUdid)
                    store.dispatch('patientTimeline', {
                        id: patientUdid,
                        type: ''
                    });
                }
                if (store.state.appointment.successMsg) {
                    
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
                if (props.isChat) {
                    store.dispatch('latestAppointment', patientUdid)
                    store.dispatch('patientAppointmentsList', patientUdid)
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

        const form = reactive({
            ...appointmentForm
        })

        const handleCancel = () => {
			closeValue.value = true
            formRef.value.resetFields();
            Object.assign(appointmentForm, form)
            //emit('is-visible', false);
			closeValue.value = false
        };

        function checkChangeInput() {
            store.state.careCoordinator.errorMsg = ''
            store.commit('checkChangeInput', true)
        }

        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })

        function closeModal() {
            emit("is-visible", true)
            emit("closeModal", true)
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
            } else {
                formRef.value.resetFields();
                emit("is-visible", false)
                emit("closeModal", false)
            }
        }

       // function getTime() {
            // let timeSelect = timeStamp(appointmentForm.startTime)
            // if (timeStampFormate(timeSelect, 'HH:00') < '08:00' || timeStampFormate(timeSelect, 'HH:00') > '20:00') {
            //     appointmentForm.startTime = ''
            // }
        //}

        const handleGlobalChange = (data,type) =>{
            if(type =='appointmentForm.durationId'){
                appointmentForm.durationId = data
            }
            if(type=='appointmentForm.typeOfVisit'){
                appointmentForm.typeOfVisit = data
            }
        }

        return {
            handleGlobalChange,
            handleTimeZoneChange,
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
            
            flagsList,

        };
    },
};
</script>
