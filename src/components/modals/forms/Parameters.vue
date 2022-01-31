<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.parameters.bloodPressure')}}</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.parameters.systolic')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.parameters.diastolic')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.parameters.pulse')}}</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.parameters.BPM')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.parameters.bloodOxygenSaturation')}}</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.parameters.SPO2')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.parameters.glucosen')}}</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.parameters.FastingBloodSugar')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.parameters.randomBloodSugar')}}</label>
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
