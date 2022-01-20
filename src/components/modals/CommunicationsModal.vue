<template>
  <a-modal width="1000px" title="Communications" centered>
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>From</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>To</label>
        </div>
        <a-radio-group v-model:value="radio">
          <a-radio :value="1">Patient</a-radio>
          <a-radio :value="2">Staff</a-radio>
        </a-radio-group>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Patient</label>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Select Patient"
            style="width: 100%"
            size="large"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </div>

        <!-- <div class="form-group">
          <label>Staff</label>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Select Staff"
            style="width: 100%"
            size="large"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </div> -->
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Subject</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Message Category</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Choose Category"
          >
            <a-select-option value="Appointment"
              >Appointment Reminder</a-select-option
            >
            <a-select-option value="Recall">Recall Reminder</a-select-option>
            <a-select-option value="Portal">Portal Invitation </a-select-option>
            <a-select-option value="Patient"
              >Patient Message Notification
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Priority</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Choose Priority"
          >
            <a-select-option value="lucy">Urgent</a-select-option>
            <a-select-option value="Yimdinghe">Medium</a-select-option>
            <a-select-option value="Yiminghe">Normal</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="form-group">
          <label>Message</label>
          <a-textarea v-model="value2" allow-clear />
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
        value: "Jane",
        label: "Jane Doe",
      },
      {
        value: "Steve",
        label: "Steve Smith",
      },
      {
        value: "Joseph",
        label: "Joseph Spouse",
      },
      {
        value: "Robert",
        label: "Robert Henry",
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
    const radio = ref(1);
    return {
      size: ref("large"),
      radio,
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
