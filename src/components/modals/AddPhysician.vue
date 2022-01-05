<template>
  <a-modal title="Add New Physician">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Physician</label>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Select Physician"
            style="width: 100%"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default {
  setup() {
    const options = ref([
      {
        value: "Steve Smith",
        label: "Steve Smith",
      },
      {
        value: "Robert Henry",
        label: "Robert Henry",
      },
      {
        value: "Smith Joseph",
        label: "Smith Joseph",
      },
      {
        value: "Jane Doe",
        label: "Jane Doe",
      },
    ]);
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log("blur");
    };

    const handleFocus = () => {
      console.log("focus");
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      value: ref(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
    };
  },
};
</script>
