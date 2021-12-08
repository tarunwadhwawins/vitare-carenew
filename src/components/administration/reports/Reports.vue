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
              <a-col :sm="6" :xs="24">
                <div class="form-group">
                  <label>Choose Date</label>
                  <a-date-picker
                    v-model:value="value1"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :sm="6" :xs="24">
                <div class="form-group">
                  <label>Choose Day</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">All Days</a-select-option>
                    <a-select-option value="Yiminghe">Custom</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Item Display</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="24" :xs="24" class="text-right">
                <a-button class="btn blueBtn">Download</a-button>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { defineComponent, ref } from "vue";
export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
    return {
      value1: ref(),
      size: ref("large"),
    };
  },
};
</script>
