<template>
  <a-modal max-width="1140px" width="100%" title="Add CPT Codes">
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Service Type</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Choose Service</a-select-option>
            <a-select-option value="Yiminghe">Service Type 1</a-select-option>
            <a-select-option value="Yiminghe">Service Type 2 </a-select-option>
            <a-select-option value="Yiminghe">Service Type 3</a-select-option>
            <a-select-option value="Yiminghe">Service Type 4</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>CPT Code</label>
          <a-input v-model="value" size="large" placeholder="CPT Code" />
        </div>
      </a-col>
      <a-col :sm="6" :xs="24">
        <div class="form-group">
          <label>Billing Amount</label>
          <a-input v-model="value" size="large" placeholder="$" />
        </div>
      </a-col>
      <a-col :sm="6" :xs="24">
        <div class="form-group">
          <label>Duration </label>
          <div class="duration">
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Choose Duration</a-select-option>
              <a-select-option value="Yiminghe">10 </a-select-option>
              <a-select-option value="Yiminghe">20 </a-select-option>
              <a-select-option value="Yiminghe">30 </a-select-option>
              <a-select-option value="Yiminghe">40 </a-select-option>
              <a-select-option value="Yiminghe">50 </a-select-option>
              <a-select-option value="Yiminghe">60 </a-select-option>
            </a-select>
            <span>Mins </span>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Description </label>
          <a-textarea v-model:value="value2" placeholder="Message" allow-clear />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Active/Inactive</label>
          <a-switch v-model:checked="checked" />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const checked = ref([false]);
    return {
      size: ref("large"),
      checked,
    };
  },
};
</script>
