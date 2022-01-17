<template>
  <a-modal width="1000px" title="Add Note" centered>
    <a-row :gutter="24">
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Date</label>
          <a-date-picker
            v-model:value="value1"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>

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
            placeholder="Choose Category"
          >
            <a-select-option value="lucy">Clinical</a-select-option>
            <a-select-option value="Yimidnghe">Admin</a-select-option>
            <a-select-option value="Yimdinghe">General</a-select-option>
          </a-select>
        </div>
      </a-col>

      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Type</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Choose Type"
          >
            <a-select-option value="lucy">Type 1</a-select-option>
            <a-select-option value="Yimidnghe">Type 2</a-select-option>
            <a-select-option value="Yimdinghe">Type 3</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Note</label>
          <a-textarea
            v-model:value="value2"
            placeholder="Notes"
            :auto-size="{ minRows: 7 }"
          />
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
      value1: ref(),
    };
  },
});
</script>
