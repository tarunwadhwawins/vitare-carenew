<template>
  <a-modal width="1000px" title="Time Tracker">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <h3 class="mb-24">{{$t('patientSummary.timeTrackerModal.patientReviewTime')}}</h3>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.timeTrackerModal.billingCode')}}</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">90791 (Evaluation)</a-select-option>
            <a-select-option value="Yiminghe"
              >90832 (LCSW Ongoing Services)</a-select-option
            >
            <a-select-option value="Yiminghe">96130 (Deep Dive)</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Time</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <h3 class="mb-24">{{$t('patientSummary.timeTrackerModal.videoConsultTime')}}</h3>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.timeTrackerModal.videoBillingCode')}}</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">90791 (Evaluation)</a-select-option>
            <a-select-option value="Yiminghe"
              >90832 (LCSW Ongoing Services)</a-select-option
            >
            <a-select-option value="Yiminghe">96130 (Deep Dive)</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('global.time')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
