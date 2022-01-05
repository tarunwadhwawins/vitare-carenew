<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">Reports</h2>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :sm="8" :xs="24">
                <div class="form-group">
                  <label>Report Name</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy"
                      >Choose Report</a-select-option
                    >
                    <a-select-option value="lucy">Report 1</a-select-option>
                    <a-select-option value="Yiminghe">Report 2</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :sm="8" :xs="24">
                <div class="form-group">
                  <label>Start Date</label>
                  <a-date-picker
                    v-model:value="value1"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :sm="8" :xs="24">
                <div class="form-group">
                  <label>End Date</label>
                  <a-date-picker
                    v-model:value="value1"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :span="24">
                <div class="text-right">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Download</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import { defineComponent, ref } from "vue";

export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
    const checked = ref([false]);

    return {
      checked,
      value1: ref(),
      size: ref("large"),
    };
  },
};
</script>
<style lang="scss">
</style>