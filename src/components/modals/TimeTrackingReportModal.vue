<template>
  <a-modal width="1000px" title="Add Time Tracking Report" centered>
    <a-row :gutter="24">
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Report Name</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Select Report"
          >
            <a-select-option value="lucy">Report 1</a-select-option>
            <a-select-option value="Yiminghe">Report 2</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Start Date</label>
          <a-date-picker
            v-model:value="value1"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>End Date</label>
          <a-date-picker
            v-model:value="value2"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { ref, computed } from "vue";

const OPTIONS = ["Jane Doe", "Steve Smith", "Joseph William"];
const OPTIONSTAG = ["Admin", "Clinical", "Office", "Personal"];
export default {
  setup() {
    const selectedItems = ref(["Jane Doe"]);
    const filteredOptions = computed(() =>
      OPTIONS.filter((o) => !selectedItems.value.includes(o))
    );

    const selectedItemsForTag = ref(["Admin"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    return {
      selectedItems,
      filteredOptions,
      filteredOptionsForTag,
      selectedItemsForTag,
      size: ref("large"),
      value1: ref(),
      value2: ref(),
    };
  },
};
</script>
