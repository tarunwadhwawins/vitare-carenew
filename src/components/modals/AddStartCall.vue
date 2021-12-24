<template>
  <a-modal width="1000px" title="Start Call" centered :footer="null">
    <a-row :gutter="24">
      <a-col :sm="10" :xs="24">
        <div class="form-group">
          <label>Patient</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            search
            @change="handleChange"
          >
            <a-select-option value="lucy">Select Patient</a-select-option>
            <a-select-option value="Yiminghe">Steve Smith</a-select-option>
            <a-select-option value="Yiminghe">Jane Doe</a-select-option>
            <a-select-option value="Yiminghe">Henry Joseph</a-select-option>
            <a-select-option value="Yiminghe">Carol Liam</a-select-option>
            <a-select-option value="Yiminghe">Brett William</a-select-option>
            <a-select-option value="Yiminghe">John Smith</a-select-option>
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
          >
            <a-select-option value="lucy">Select Staff</a-select-option>
            <a-select-option value="Yiminghe">Jane Doe</a-select-option>
            <a-select-option value="Yiminghe">Steve Smith</a-select-option>
            <a-select-option value="Yiminghe">Joseph William</a-select-option>
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
import { defineComponent, ref } from "vue";
export default {
  setup() {
    return {
      size: ref("large"),
    };
  },
};
</script>
