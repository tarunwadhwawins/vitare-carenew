<template>
  <a-modal width="1000px" title="General Parameters" centered>
    <a-row :gutter="24">
      <a-col :sm="6" :xs="24">
        <div class="form-group">
          <label>General Parameters Group</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="6" :xs="24">
        <div class="form-group">
          <label>Type </label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="Blood">Blood Glucose Fasting </a-select-option>
            <a-select-option value="NonFastBlood">Blood Glucose Non-Fasting </a-select-option>
            <a-select-option value="Systolic">Systolic BP</a-select-option>
            <a-select-option value="Diastolic">Diastolic BP</a-select-option>
            <a-select-option value="Pulse">Pulse (BP Cuff)</a-select-option>
            <a-select-option value="Weight">Weight</a-select-option>
            <a-select-option value="Spo2">Spo2</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="6" :xs="24">
        <div class="form-group">
          <label>High Limit </label>
          <!-- <a-input v-model="value" size="large" /> -->
          <a-input-number v-model:value="value" :min="0" :max="10" :step="0.1" size="large" style="width:100%"/>
        </div>
      </a-col>
      <a-col :sm="6" :xs="24">
        <div class="form-group">
          <label>Low Limit </label>
          <!-- <a-input v-model="value" size="large" /> -->
          <a-input-number v-model:value="value2" :min="0" :max="10" :step="0.1" size="large" style="width:100%"/>
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
     const value = ref();
     const value2 = ref();
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
      value,
      value2,
    };
  },
};
</script>
