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
                <h2 class="pageTittle">Reset Password</h2>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Current Password</label>
                    <a-input v-model:value="value" :size="size" placeholder="Current Password" />

                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>New Password</label>
                    <a-input v-model:value="value" :size="size" placeholder="New Password" />

                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Confirm New Password</label>
                    <a-input v-model:value="value" :size="size" placeholder="Confirm New Password" />

                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <a-button class="btn blueBtn">Reset Password</a-button>
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
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { ref } from "vue";
export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
      const value = ref('');
    return {
      value1: ref(),
      size: ref("large"),
      value,
    };
  },
};
</script>
