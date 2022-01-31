<template>
  <a-modal max-width="1140px" width="100%" title="Add Global Codes">
    <a-row :gutter="24">
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Category</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Choose Category</a-select-option>
            <a-select-option value="Yiminghe">AppointmentType</a-select-option>
            <a-select-option value="Yiminghe">Specialization </a-select-option>
            <a-select-option value="Yiminghe">Communication Category</a-select-option>
            <a-select-option value="Yiminghe">Communication Status</a-select-option>
            <a-select-option value="Yiminghe">Task Status</a-select-option>
            <a-select-option value="Yiminghe">Task Priority</a-select-option>
            <a-select-option value="Yiminghe">Relationship</a-select-option>
            <a-select-option value="Yiminghe">Gender</a-select-option>
            <a-select-option value="Yiminghe">Health Conditions</a-select-option>
            <a-select-option value="Yiminghe">Designation</a-select-option>
            <a-select-option value="Yiminghe">Document Type</a-select-option>
            <a-select-option value="Yiminghe">Insurance Type</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Code Name</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Data Type</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Description </label>
          <a-textarea v-model:value="value2" placeholder="Description" allow-clear />
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
