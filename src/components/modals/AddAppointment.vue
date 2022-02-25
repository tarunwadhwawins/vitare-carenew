<template>
  <a-modal width="1000px" :title="$t('appointmentCalendar.addAppointment.addAppointment')" centered :maskClosable="maskebale">
    <a-form  ref="formRef" :model="appointmentForm" layout="vertical" @finish="sendMessage" @finishFailed="onFinishFailed">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('appointmentCalendar.addAppointment.patient')" name="patientId"
              :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.patient')+' '+$t('global.validation')  }]">
              
              <!-- <AutoComplete
                :options="patients"
                @on-select="onSelectOption"
                v-model:value="appointmentForm.patientId" /> -->
  
              <a-select ref="select" v-if="allPatients" v-model:value="appointmentForm.patientId" style="width: 100%"
                size="large">
                <a-select-option value="" hidden>{{'Select Patient'}}</a-select-option>
                <a-select-option v-for="patient in allPatients" :key="patient.id" :value="patient.id">{{
                  patient.name+' '+patient.id+' '+patient.lastName }}</a-select-option> 
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
              <a-date-picker  v-model:value="appointmentForm.startDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD"
                :size="size" style="width: 100%" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('global.startTime')" name="startTime"
              :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
              <a-time-picker use12-hours format="hh:mm A" v-model:value="appointmentForm.startTime" :size="size"
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
                <a-select-option value="" hidden>{{'Select Duration Time'}}</a-select-option>
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
  import { timeStamp } from "../../commonMethods/commonMethod"
  import moment from 'moment';
  import ModalButtons from "@/components/common/button/ModalButtons";
//import AutoComplete from "@/components/common/input/AutoComplete";
import { useRoute } from 'vue-router'

  export default {
    components: {
      ErrorMessage,
      ModalButtons,
      //AutoComplete,
    },
    props:{
      staff:{
        type:Object
      },
      patient:{
        type:Object
      },
      maskebale:{
        type:Boolean
      },
      patientId:{
        type: Number
      },
      patientName:{
        type: Number
      },
    },
    setup(props, { emit }) {
      const formRef = ref();
      const route = useRoute();
      const store = useStore()
      const patientUdid = route.params.udid;
      const idPatient = reactive(props.patientId);
      const patientName = reactive(props.patientName);

      
      console.log('patientName', patientName)
    //   const disabledDate = current => {
    //   return current && current < dayjs().endOf('day');
    // };
      
      const appointmentForm = reactive({
        patientId: '',
        staffId: '',
        startDate: '',
        startTime: '',
        durationId: '',
        typeOfVisit: '',
        note: '',
      });

      watchEffect(() => {
        if(idPatient != null) {
          Object.assign(appointmentForm, {
            patientId: idPatient
          })
        }
        store.state.patients.patientsList ? "" : store.dispatch("patientsList")
        store.state.common.staffList ? "" : store.dispatch("staffList")
      })
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
     
        const allPatients =  computed(() => {
          return store.state.communications.patientsList
        })

      
      const staffList = props.staff ? reactive(props.staff) : computed(() => {
        return store.state.common.staffList
      })
      
      // const patients = ref([])
      // console.log("obj",staffList.value);
      // if(allPatients.value != null) {
        
      //   allPatients.value.forEach(element => {
      //     patients.value.push({
      //       value: element.fullName,
      //       id: element.id,
      //     })
      //   });
      // }
      
      // const selectedOptionId = ref(null);
      // const onSelectOption = (selected) => {
      //   patients.value.forEach(patient => {
      //     if(patient.value == selected) {
      //       selectedOptionId.value = patient.id
      //     }
      //   });
      // };

      const sendMessage = () => {
        // Object.assign(appointmentForm, {
        //   patientId: idPatient
        // })
        
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
        }).then(() => {
          if(idPatient != null && route.name == 'PatientSummary') {
            store.dispatch('latestAppointment', patientUdid)
            store.dispatch('patientTimeline', patientUdid);
          }
          emit('closeModal');
        });
        setTimeout(()=>{
            if(store.state.appointment.successMsg){
              store.dispatch("calendarDateSelect", moment(date))
          store.dispatch("searchAppointment", { fromDate: moment(date), toDate: moment(date), tabId: 1 })
          store.dispatch("searchAppointment", { fromDate: moment(), toDate: moment(), tabId: "today" })
              store.state.appointment.successMsg=null
              handleCancel()
              emit('is-visible', false);
            }
            },3000)
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
      return {
        allPatients,
        form,
        errorMsg,
        // patientsList,
        staffList,
        appointmentForm,
        sendMessage,
        durationList,
        typeOfVisitList,
        size: ref("large"),
        onFinishFailed,
        handleCancel,
        moment,
        //disabledDate,
        formRef,
        list,
        //onSelectOption,
        //patients,
      };
    },
  };
</script>