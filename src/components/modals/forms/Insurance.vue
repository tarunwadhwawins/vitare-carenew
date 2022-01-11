<template>
  <a-row :gutter="24">
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Insurance Number</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Insurance Name</label>
        <a-select
          ref="select"
          show-search
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Personal</a-select-option>
          <a-select-option value="Yiminghe1">Business</a-select-option>
          <a-select-option value="Yiminghe2">Life/Health</a-select-option>
          <a-select-option value="Yimingh3e">Benefits</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Expiration Date</label>
        <a-date-picker v-model:value="date1" size="large" style="width: 100%"/>
      </div>
    </a-col>
    <a-col :span="24">
      <div class="formHeading">
        <h2>Secondary Insurance</h2>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Insurance Number</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Insurance Name</label>
        <a-select
          ref="select"
          show-search
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Personal</a-select-option>
          <a-select-option value="Yiminghe1">Business</a-select-option>
          <a-select-option value="Yimingh2e">Life/Health</a-select-option>
          <a-select-option value="Yiming3he">Benefits</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Expiration Date</label>
        <a-date-picker v-model:value="date2" size="large" style="width: 100%"/>
      </div>
    </a-col>
    <a-col :span="24">
      <div class="formHeading">
        <h2>Tertiary Insurance</h2>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Insurance Number</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Insurance Name</label>
        <a-select
          ref="select"
          show-search
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Personal</a-select-option>
          <a-select-option value="Yimin3ghe">Business</a-select-option>
          <a-select-option value="Yimin4ghe">Life/Health</a-select-option>
          <a-select-option value="Yim5inghe">Benefits</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>Expiration Date</label>
        <a-date-picker v-model:value="date3" size="large" style="width: 100%"/>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { EditOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {},
  setup() {
    return {
      date1: ref(),
      date2: ref(),
      date3: ref(),
    };
  },
});
</script>
