<template>
  <a-modal width="1000px" title="Add Health" centered>
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Date & Time</label>
          <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Value</label>
          <a-input v-model="value" size="large" placeholder="Value" />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {
      size: ref("large"),
    };
  },
});
</script>
