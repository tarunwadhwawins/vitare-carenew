<template>
  <a-row :gutter="24">
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>First Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Last Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Designation</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="Administrative">Administrative</a-select-option>
          <a-select-option value="Manager">Manager</a-select-option>
          <a-select-option value="Executive">Executive</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label> Gender</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Male</a-select-option>
          <a-select-option value="Yiminghe">Female</a-select-option>
          <a-select-option value="Yiminghe">Others</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Email</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Phone No</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Specialization</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Wellness</a-select-option>
          <a-select-option value="Yiminghe">Behavior</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Network</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">In</a-select-option>
          <a-select-option value="Yiminghe">Out</a-select-option>
        </a-select>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {
      size: ref("large"),
    };
  },
});
</script>
