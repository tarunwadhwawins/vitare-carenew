<template>
  <a-modal width="1024px" wrapClassName="full-modal" title="Add Vitals" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <h2>{{$t('patientSummary.vitalSummary.BP')}}</h2>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.dateTime')}}</label>
          <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.systolic')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.diastoli')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="24" :xs="24">
        <h2>{{$t('patientSummary.vitalSummary.SpO2')}}</h2>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.dateTime')}}</label>
          <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.value')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="24" :xs="24">
        <h2>{{$t('patientSummary.vitalSummary.glucose')}}</h2>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.dateTime')}}</label>
          <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.value')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="24" :xs="24">
        <h2>{{$t('patientSummary.vitalSummary.weight')}}</h2>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.dateTime')}}</label>
          <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>{{$t('patientSummary.vitalSummary.value')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      size: ref("large"),
    };
  },
});
</script>
<style lang="scss" scoped>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>