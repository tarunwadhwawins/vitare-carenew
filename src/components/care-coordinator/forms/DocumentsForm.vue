<template>
  <a-form :model="documentsForm" @submit.prevent="addCareCoordinatorRole">
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="form-group">
          <label>Name</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label>Document</label>
          <a-input v-model="value" size="large" type="file" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Type</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Id Proof</a-select-option>
            <a-select-option value="Yiminghe">Clinical</a-select-option>
            <a-select-option value="Yiminghe">Insurance</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form-group">
          <label> Tags</label>
          <a-select
            v-model:value="selectedItemsForTag"
            mode="multiple"
            size="large"
            placeholder="Please Select Roles"
            style="width: 100%"
            :options="filteredOptionsForTag.map((item) => ({ value: item }))"
          />
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <button class="btn primaryBtn">Add</button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { ref, computed } from "vue";
const OPTIONS = ["Manager", "Billing Admin", "User Admin"];
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
export default {
  methods: {
    addCareCoordinatorRole() {
      
    }
  },
  setup() {
    const selectedItems = ref(["Manager"]);
    const filteredOptions = computed(() =>
      OPTIONS.filter((o) => !selectedItems.value.includes(o))
    );
    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    return {
      selectedItems,
      filteredOptions,
      filteredOptionsForTag,
      selectedItemsForTag,
    };
  },
};
</script>