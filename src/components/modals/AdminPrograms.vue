<template>
  <a-modal title="Add New Program" @ok="handleOk">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Choose Programs</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Description</label>
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
import { defineComponent, ref } from "vue";
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
