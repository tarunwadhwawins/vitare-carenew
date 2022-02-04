<template>
  <a-modal width="1000px" :title="$t('appointmentCalendar.addAppointment.addAppointment')" centered>
    <a-form  ref="formRef" :model="appointmentForm" layout="vertical" @finish="sendMessage" @finishFailed="onFinishFailed">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('appointmentCalendar.addAppointment.patient')" name="patientId"
              :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.patient')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-if="patientsList" v-model:value="appointmentForm.patientId" style="width: 100%"
                size="large">
                <a-select-option value="" hidden>{{'Select Patient'}}</a-select-option>
                <a-select-option v-for="patient in patientsList" :key="patient.id" :value="patient.id">{{
                  patient.name+' '+patient.middleName+' '+patient.lastName }}</a-select-option>
              </a-select>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.patientId?errorMsg.patientId[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('appointmentCalendar.addAppointment.staff')" name="staffId"
              :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.staff')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-if="staffList" v-model:value="appointmentForm.staffId" style="width: 100%"
                size="large">
                <a-select-option value="" hidden>{{'Select Staff'}}</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{ staff.fullName }}
                </a-select-option>
              </a-select>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.staffId?errorMsg.staffId[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('appointmentCalendar.addAppointment.startDate')" name="startDate"
              :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.startDate')+' '+$t('global.validation') }]">
              <a-date-picker :disabled-date="disabledDate" v-model:value="appointmentForm.startDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD"
                :size="size" style="width: 100%" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.startTime')" name="startTime"
              :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
              <a-time-picker format="HH:mm " v-model:value="appointmentForm.startTime" :size="size"
                style="width: 100%" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.startTime?errorMsg.startTime[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.duration') +' '+$t('global.time')" name="durationId"
              :rules="[{ required: true, message: $t('global.duration') +' '+$t('global.time')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-if="durationList" v-model:value="appointmentForm.durationId" style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Duration Time'}}</a-select-option>
                <a-select-option v-for="duration in durationList['globalCode']" :key="duration.id" :value="duration.id">
                  {{ duration.name }}</a-select-option>
              </a-select>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.durationId?errorMsg.durationId[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('appointmentCalendar.addAppointment.typeOfVisit')" name="typeOfVisit"
              :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.typeOfVisit')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-if="typeOfVisitList" v-model:value="appointmentForm.typeOfVisit"
                style="width: 100%" size="large">
                <a-select-option value="" disabled>{{'Select Type Of Visit'}}</a-select-option>
                <a-select-option v-for="visit in typeOfVisitList['globalCode']" :key="visit.id" :value="visit.id">{{
                  visit.name }}</a-select-option>
              </a-select>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.typeOfVisit?errorMsg.typeOfVisit[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('appointmentCalendar.addAppointment.note')" name="note"
              :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.note')+' '+$t('global.validation') }]">
              <a-textarea v-model:value="appointmentForm.note" allow-clear />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.note?errorMsg.note[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="steps-action">
            <ModalButtons @is_click="handleCancel"/> 
            
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, watchEffect, computed, reactive } from "vue"
  import { useStore } from "vuex"
  import ErrorMessage from "../common/messages/ErrorMessage"
  import { scrollToTop,timeStamp } from "../../commonMethods/commonMethod"
  import moment from 'moment';
  import dayjs, { Dayjs } from 'dayjs';
  import ModalButtons from "@/components/common/button/ModalButtons";

  export default {
    components: {
      ErrorMessage,
      ModalButtons,
    },
    props:{
      staff:{
        type:Object
      },
      patient:{
        type:Object
      },
    },
    setup(props, { emit }) {
      const formRef = ref();
      const store = useStore()
      const disabledDate = current => {
      // Can not select days before today and today
      return current && current < dayjs().endOf('day');
    };
      watchEffect(() => {
       
        store.state.communications.patientsList ? "" : store.dispatch("patientsList")
        store.state.communications.staffList ? "" : store.dispatch("staffList")
      })
      const onFinishFailed = () => {
        scrollToTop()
      };
      const durationList = computed(() => {
        return store.state.common.duration;
      })
      const typeOfVisitList = computed(() => {
        return store.state.common.typeOfVisit;
      })
      const patientsList = props.patient ? reactive(props.patient) : computed(() => {
        return store.state.communications.patientsList
      })
      const staffList = props.staff ? reactive(props.staff) : computed(() => {
        return store.state.communications.staffList
      })
      
      const appointmentForm = reactive({
        patientId: '',
        staffId: '',
        startDate: '',
        startTime: '',
        durationId: '',
        typeOfVisit: '',
        note: '',
      });
      const sendMessage = () => {
        const date = appointmentForm.startDate
   const  timeFormat = (moment(appointmentForm.startTime)).format('HH:mm');

        store.dispatch('addAppointment', {
          patientId: appointmentForm.patientId,
          staffId: appointmentForm.staffId,
          startDate: timeStamp(date+" "+timeFormat),
          startTime: timeFormat,
          durationId: appointmentForm.durationId,
          appointmentTypeId: appointmentForm.typeOfVisit,
          note: appointmentForm.note
        })
        setTimeout(()=>{
            if(store.state.appointment.successMsg){
              store.state.appointment.successMsg=null
              handleCancel()
              emit('is-visible', false);
            }
            },3000)
      }
      const errorMsg = computed(() => {
        if (store.state.careCoordinator.errorMsg) {
          scrollToTop()
        }
        return store.state.careCoordinator.errorMsg
      }) 
      const form = reactive({ ...appointmentForm })
      const handleCancel = () => {
        formRef.value.resetFields();
        Object.assign(appointmentForm, form)
        //emit('is-visible', false);
      };
      return {
        form,
        errorMsg,
        patientsList,
        staffList,
        appointmentForm,
        sendMessage,
        durationList,
        typeOfVisitList,
        size: ref("large"),
        onFinishFailed,
        handleCancel,
        moment,
        disabledDate,
        formRef
      };
    },
  };
</script>