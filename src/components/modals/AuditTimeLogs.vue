<template>
<a-modal width="1000px" title="Edit Audit Time Log" :footer="null" :maskClosable="false" @cancel="closeModal()" centered>
    <a-form :model="auditTimeLog" name="auditTimeLog" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="editAuditTimeLog" @finishFailed="auditTimeLogFailed">
        <a-row :gutter="24">
            <a-col :md="12" :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogReport.staff')" name="staff" :rules="[{ required: true, message: $t('timeLogReport.staff')+' '+$t('global.validation') }]">
                        <a-select ref="select" v-model:value="auditTimeLog.staff" style="width: 100%" size="large">
                            <a-select-option value="" disabled>Select Staff</a-select-option>
                            <a-select-option v-for="staff in staffList" :key="staff.id">{{ staff.fullName }}</a-select-option>
                        </a-select>
                        <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" /> -->
                    </a-form-item>
                </div>
            </a-col>
            <a-col :md="12" :sm="12" :xs="24"> 
                <div class="form-group">
                    <a-form-item :label="$t('timeLogReport.patient')" name="patient" :rules="[{ required: true, message: $t('timeLogReport.patient')+' '+$t('global.validation') }]">
                        <a-select ref="select" v-model:value="auditTimeLog.patient" style="width: 100%" size="large">
                            <a-select-option value="" disabled>Select Patient</a-select-option>
                            <a-select-option v-for="patient in patients" :key="patient.id">{{ patient.firstName}}</a-select-option>
                        </a-select>
                        <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" /> -->
                    </a-form-item>
                </div>
            </a-col> 
            <a-col :md="12" :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.timeAmount')" name="timeAmount" :rules="[{ required: true, message: $t('timeLogs.timeAmount')+' '+$t('global.validation')  }]">
                        <a-time-picker v-model:value="auditTimeLog.timeAmount" format="HH:mm" :size="size" style="width: 100%" />
                        <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" /> -->
                    </a-form-item>
                </div>
            </a-col>
            <a-col :md="12" :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogReport.note')" name="note" :rules="[{ required: false, message: $t('timeLogReport.note')+' '+$t('global.validation') }]">
                        <a-textarea v-model:value="auditTimeLog.note" allow-clear />
                        <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" /> -->
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :span="24">
            <ModalButtons  :Id="Id"/>
            </a-col>
        </a-row>

    </a-form>
</a-modal>
</template>

<script>
import { defineComponent, reactive, computed, watchEffect } from "vue";

import { useStore } from "vuex";

// import {
//     warningSwal,
//     arrayToObjact
// } from "../../../commonMethods/commonMethod";
// import {
//     messages
// } from "../../../config/messages";
// import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import ModalButtons from "@/components/common/button/ModalButtons";
export default defineComponent({
  components: {
    // Loader,
    // ErrorMessage,
    ModalButtons,
  },
  props:{
      Id:Number
  },
  setup() {
    const store = useStore();
    const auditTimeLog = reactive({
      staff: "",
      patient: "",
      timeAmount: "",
      note: "",
    });
    const addDevice = () => {
      // store.dispatch("addDevice", {
      //     data: device,
      //     id: patients.value.addDemographic.id,
      // });
      // setTimeout(() => {
      //     store.dispatch("devices", patients.value.addDemographic.id);
      // }, 2000);
    };

    watchEffect(()=>{
        Object.assign(auditTimeLog,timeLogReports)
        console.log('-->',Object.assign(auditTimeLog,timeLogReports))
    })
    const staffList = computed(() => {
      return store.state.common.staffList;
    });
    const patients = computed(() => {
      return store.state.communications.patientsList;
    });

    const timeLogReports = computed(() => {
            return store.state.timeLogReport.editAuditTimeLog
        })

    return {
      timeLogReports,
      staffList,
      auditTimeLog,
      patients,
      addDevice,
    };
  },
});
</script>
