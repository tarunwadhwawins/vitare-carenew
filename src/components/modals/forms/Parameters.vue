<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Blood Pressure</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Systolic</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Diastolic</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Pulse</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>BPM</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Blood Oxygen Saturation</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>SPO2</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>Glucosen</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Fasting Blood Sugar</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Random Blood Sugar</label>
        <a-input v-model="value" size="large" />
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
    return {};
  },
});
</script>
