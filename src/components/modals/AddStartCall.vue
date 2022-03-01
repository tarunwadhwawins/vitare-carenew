<template>
  <a-modal width="1000px" title="Start Call" centered :footer="null">
  <a-form :model="startCall" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="videoCall" @finishFailed="videoCallFailed">
    <a-row :gutter="24">
        <a-col :sm="18" :xs="24">
            <div class="form-group">
                <!-- <label>{{$t('appointmentCalendar.appointment')}}</label> -->
                <a-form-item :label="$t('appointmentCalendar.appointment')" name="callId" :rules="[{ required: false, message: $t('appointmentCalendar.appointment')+' '+$t('global.validation') }]">
                 <a-select ref="select" v-model:value="startCall.callId" style="width: 100%" size="large" >
                        <a-select-option value="" disabled>{{'Select Appointment'}}</a-select-option>
                        <a-select-option v-for="data in dropdownData.appointmentConference" :key="data.id" :value="data.id">{{data.patient}} {{`(${data.appointmentType})`}} {{`(${dateOnlyFormat(data.date)+' '+meridiemFormatFromTimestamp(data.time)})`}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="4" :xs="24">
        <div class="text-right mt-28">
          <a-button class="blueBtn" html-type="submit">Start Call</a-button>
        </div>
      </a-col>
    </a-row>
    <!-- <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row> -->
</a-form>
  </a-modal>
</template>
<script>
import { computed, reactive, } from "vue";
import {useStore} from "vuex"
import { dateOnlyFormat,meridiemFormatFromTimestamp} from "../../commonMethods/commonMethod"
export default {
  setup(props,{emit}) {
     const store =useStore()
     const startCall = reactive({
       callId:''
     })
     const dropdownData = computed(()=>{
       return store.state.appointment
     })
     function videoCall(){
       console.log('object',startCall.callId);
       emit("videoCall",startCall.callId)
     }
    return {
      videoCall,
      dateOnlyFormat,
      meridiemFormatFromTimestamp,
      startCall,
      dropdownData
    };
  },
};
</script>
