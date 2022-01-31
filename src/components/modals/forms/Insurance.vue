<template>
  <a-row :gutter="24">
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.insuranceNumber')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.insuranceName')}}</label>
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
          <a-select-option value="Yiminghe">Business</a-select-option>
          <a-select-option value="Yiminghe">Life/Health</a-select-option>
          <a-select-option value="Yiminghe">Benefits</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.expirationDate')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.insurance.secondaryInsurance')}}</h2>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.insuranceNumber')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.insuranceName')}}</label>
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
          <a-select-option value="Yiminghe">Business</a-select-option>
          <a-select-option value="Yiminghe">Life/Health</a-select-option>
          <a-select-option value="Yiminghe">Benefits</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.expirationDate')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.insurance.tertiaryInsurance')}}</h2>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.insuranceNumber')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.insuranceName')}}</label>
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
          <a-select-option value="Yiminghe">Business</a-select-option>
          <a-select-option value="Yiminghe">Life/Health</a-select-option>
          <a-select-option value="Yiminghe">Benefits</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="8" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.insurance.expirationDate')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>
