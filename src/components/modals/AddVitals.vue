<template>
  <a-modal width="1024px" wrapClassName="full-modal" title="Add Vitals" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <h3>BP</h3>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Date & Time</label>
          <a-date-picker
            v-model:value="value1"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Systolic</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Diastoli</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="24" :xs="24">
        <h3>SpO2</h3>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Date & Time</label>
          <a-date-picker
            v-model:value="value2"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Value</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="24" :xs="24">
        <h3>Glucose</h3>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Date & Time</label>
          <a-date-picker
            v-model:value="value3"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Value</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="24" :xs="24">
        <h3>Weight</h3>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Date & Time</label>
          <a-date-picker
            v-model:value="value4"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Value</label>
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
      value1: ref(),
      value2: ref(),
      value3: ref(),
      value4: ref(),
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