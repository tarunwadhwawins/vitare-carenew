<template>
<a-modal width="1000px" title="Start Call" centered :footer="null">
    <a-form :model="startCall" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="videoCall" @finishFailed="videoCallFailed">
        <a-row :gutter="24">
            <a-col :sm="18" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('appointmentCalendar.appointment')" name="conferenceId" :rules="[{ required: true, message: $t('appointmentCalendar.appointment')+' '+$t('global.validation') }]">
                        <a-select ref="select" v-model:value="startCall.conferenceId" style="width: 100%" size="large">
                            <a-select-option value="" disabled>{{'Select Appointment'}}</a-select-option>
                            <a-select-option v-for="data in dropdownData.appointmentConference" :key="data.id" :value="data.conferenceId">{{data.patient}} {{`(${data.appointmentType})`}} {{`(${dateOnlyFormat(data.date)+' '+meridiemFormatFromTimestamp(data.time)})`}}</a-select-option>
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
    </a-form>
</a-modal>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import {
  dateOnlyFormat,
  meridiemFormatFromTimestamp,
} from "../../commonMethods/commonMethod";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const startCall = reactive({
      conferenceId: "",
    });
    const dropdownData = computed(() => {
      return store.state.appointment;
    });

    function videoCall() {
      console.log("object", startCall.conferenceId);
      store.commit("conferenceId", startCall.conferenceId);
      if (conferenceId.value) {
        router.push({
          path: "video-call",
          params: startCall.conferenceId,
        });
      }
    }

    const conferenceId = computed(() => {
      return store.state.communications.conferenceId;
    });
    return {
      conferenceId,
      videoCall,
      dateOnlyFormat,
      meridiemFormatFromTimestamp,
      startCall,
      dropdownData,
    };
  },
};
</script>
