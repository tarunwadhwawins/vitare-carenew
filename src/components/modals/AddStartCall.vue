<template>
<a-modal width="1000px" title="Start Call" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-form :model="startCall" ref="formRef" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="videoCall" @finishFailed="videoCallFailed">
        <a-row :gutter="24">
            <a-col :sm="18" :xs="24">
                <div class="form-group">
                    <a-form-item label="Patient List" name="patientId" :rules="[{ required: true, message: 'Patient'+' '+$t('global.validation') }]">
                        <!-- <a-select ref="select" v-model:value="startCall.patientId" style="width: 100%" size="large">
                            <a-select-option value="" disabled>{{'Select Appointment'}}</a-select-option>
                            <a-select-option v-for="data in dropdownData.appointmentConference" :key="data.id" :value="data.patientId">{{data.patient}} {{`(${data.appointmentType})`}} {{`(${dateOnlyFormat(data.date)+' '+meridiemFormatFromTimestamp(data.time)})`}}</a-select-option>
                        </a-select> -->
                        <PatientDropDown  v-model:value="startCall.patientId" @handlePatientChange="handlePatientChange($event)" />
                    </a-form-item>
                </div> 
            </a-col>
            <a-col :sm="4" :xs="24">
                <div class="text-right mt-28">
                    <a-button class="blueBtn" html-type="submit">Start Call</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>

<script>
import { computed, onUnmounted, reactive,ref } from "vue";
import { useStore } from "vuex";
import {
  dateOnlyFormat,
  meridiemFormatFromTimestamp,
  deCodeString,enCodeString
} from "@/commonMethods/commonMethod";
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
import { useRouter } from "vue-router";
export default {
  components:{
    PatientDropDown
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef =ref()
    const startCall = reactive({
      patientId: "",
    });
    const dropdownData = computed(() => {
      return store.state.appointment;
    });

    function videoCall() {
      store.dispatch("appointmentCalls",{patientId:startCall.patientId})
      setTimeout(()=>{
        if(conferenceId.value){
           router.push({ name: 'videoCall', params: { id: enCodeString(conferenceId.value) } })
        }
      },2000)
    }

    onUnmounted(()=>{
      store.dispatch("getVideoDetails",conferenceId.value)
    })

    function videoCallFailed(value){
      console.log(value);
    }

    const form = reactive({ ...startCall })


    function closeModal() {
      formRef.value.resetFields();
    }
    const handlePatientChange = (val) => {
      startCall.patientId = val;
    }

    const conferenceId = computed(()=>{
      return store.state.videoCall.conferenceId
    })
    
    return {
      conferenceId,
      handlePatientChange,
      closeModal,
      formRef,
      form,
      videoCallFailed,
      enCodeString,
      deCodeString,
      videoCall,
      dateOnlyFormat,
      meridiemFormatFromTimestamp,
      startCall,
      dropdownData,
    };
  },
};
</script>
