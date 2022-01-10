<template>
  <a-modal width="800px" title="Send Message" centered :footer="null">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Patient</label>

          <a-select
            v-model:value="value"
            show-search
            placeholder="Select Patient"
            style="width: 100%"
            :options="options"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            size="large"
          >
          </a-select>
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Message</label>
          <a-textarea
            v-model:value="value2"
            placeholder="Message"
            :auto-size="{ minRows: 2 }"
          />
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="text-right">
            <a-button class="blueBtn">Send Message</a-button>
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
        value: "Jane Doe",
        label: "Jane Doe",
      },
      {
        value: "Henry Joseph",
        label: "Henry Joseph",
      },
      {
        value: "Carol Liam",
        label: "Carol Liam",
      },
      {
        value: "Brett William",
        label: "Brett William",
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
      size: ref("large"),
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
