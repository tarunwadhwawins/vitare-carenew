<template>
  <a-modal width="1000px" title="Start Call" centered :footer="null">
    <a-row :gutter="24">
      <a-col :sm="10" :xs="24">
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
      <a-col :sm="10" :xs="24">
        <div class="form-group">
          <label>Staff</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            search
            @change="handleChange"
            mode="tags"
            placeholder="Select Staff"
          >
            <a-select-option value="Yiminghe1">Jane Doe</a-select-option>
            <a-select-option value="Yiminghe2">Steve Smith</a-select-option>
            <a-select-option value="Yiminghe3">Joseph William</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="4" :xs="24">
        <div class="text-right mt-28">
          <router-link to="video-call"
            ><a-button class="blueBtn">Start Call</a-button></router-link
          >
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
     const options = ref([
      {
        value: 'Steve Smith',
        label: 'Steve Smith',
      },
      {
        value: 'Jane Doe',
        label: 'Jane Doe',
      },
      {
        value: 'Henry Joseph',
        label: 'Henry Joseph',
      },
      {
        value: 'Carol Liam',
        label: 'Carol Liam',
      },
      {
        value: 'Brett William',
        label: 'Brett William',
      },
    ]);
    const handleChange = value => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log('blur');
    };

    const handleFocus = () => {
      console.log('focus');
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
