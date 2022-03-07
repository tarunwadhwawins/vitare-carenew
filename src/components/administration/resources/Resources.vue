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
            <div class="questionnaireMain">
              <a-row>
                <a-col :span="24">
                  <h2 class="pageTittle">Resources</h2>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :sm="12" :xs="24">
                  <div class="form-group">
                    <label>Resource Name</label>
                    <a-input
                      v-model:value="value1"
                      placeholder="Enter Resource Name"
                      style="width: 100%"
                      size="large"
                    />
                  </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                  <div class="form-group">
                    <label>Address</label>
                    <a-input
                      v-model:value="value2"
                      placeholder="Enter Address"
                      style="width: 100%"
                      size="large"
                    />
                  </div>
                </a-col>

                <a-col :sm="12" :xs="24">
                  <div class="form-group">
                    <label>Phone No.</label>
                    <a-input
                      v-model:value="value3"
                      placeholder="123456790"
                      style="width: 100%"
                      size="large"
                    />
                  </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                  <div class="form-group">
                    <label>Contact Person</label>
                    <a-input
                      v-model:value="value4"
                      placeholder="Enter Contact Person Name"
                      style="width: 100%"
                      size="large"
                    />
                  </div>
                </a-col>

                <a-col :sm="24" :xs="24" class="text-right mt-25">
                  <a-button class="btn blueBtn">Save</a-button>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
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
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const value4 = ref();
    return {
      value1,
      value2,
      value3,
      value4,
    };
  },
};
</script>

