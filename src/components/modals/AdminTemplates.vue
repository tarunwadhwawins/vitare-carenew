<template>
  <a-modal title="Add New Template">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Template Name</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>

      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Status</label>
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
