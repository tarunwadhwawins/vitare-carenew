<template>
  <a-modal width="1000px" title="Add Task" centered>
    <a-row :gutter="24">
      <a-col :span="24">
        <div class="form-group">
          <label>Title</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :span="24">
        <div class="form-group">
          <label> Long Description</label>
          <a-textarea
            v-model:value="value"
            placeholder="Description"
            :auto-size="{ minRows: 3 }"
          />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Status</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Select Status"
          >
            <a-select-option value="Yiminsghe">Waiting</a-select-option>
            <a-select-option value="Yidgfminghe">Inprogress</a-select-option>
            <a-select-option value="Yimfginghe">Completed</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Priority</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Select Priority"
          >
            <a-select-option value="lucy">Urgent</a-select-option>
            <a-select-option value="Yimingshe">Medium</a-select-option>
            <a-select-option value="Yiminghe">Normal</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Assigned To</label>
          <a-select
            v-model:value="selectedItems"
            mode="multiple"
            size="large"
            placeholder="Please Select Roles"
            style="width: 100%"
            :options="filteredOptions.map((item) => ({ value: item }))"
          />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Category</label>
          <a-select
            v-model:value="selectedItemsForTag"
            mode="multiple"
            size="large"
            placeholder="Please Select Category"
            style="width: 100%"
            :options="filteredOptionsForTag.map((item) => ({ value: item }))"
          />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Start Date</label>
          <a-date-picker
            v-model:value="value1"
            :size="size"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Due Date</label>
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
    const value = ref("");
    return {
      selectedItems,
      filteredOptions,
      filteredOptionsForTag,
      selectedItemsForTag,
      size: ref("large"),
      value,
      value1: ref(),
      value2: ref(),
    };
  },
};
</script>
