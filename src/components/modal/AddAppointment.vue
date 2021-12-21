<template>
  <div>
    <a-modal
      v-model:visible="visible"
      width="1000px"
      title="Appointment Detail"
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Patient</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Staff</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Start Date</label>
            <a-date-picker
              v-model:value="value1"
              :size="size"
              style="width: 100%"
            />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Time</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Select Time</a-select-option>
              <a-select-option value="Yiminghe">10 Mins</a-select-option>
              <a-select-option value="Yiminghe">20 Mins</a-select-option>
              <a-select-option value="Yiminghe">30 Mins</a-select-option>
              <a-select-option value="Yiminghe">1 Hour</a-select-option>
              <a-select-option value="Yiminghe">2 Hour</a-select-option>
              <a-select-option value="Yiminghe">4 Hour</a-select-option>
              <a-select-option value="Yiminghe">Full Day</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <label>Note</label>
            <a-textarea v-model="value2" allow-clear />
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default {
  setup() {
    const visible = ref(false);
    const toggle = ref(true);

    const showappointmentModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const value = ref();

    return {
      visible,
      showappointmentModal,
      handleOk,
      value,
    };
  },
};
</script>
<style lang="scss">
</style>