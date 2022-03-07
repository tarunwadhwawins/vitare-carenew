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
                <h2 class="pageTittle">
                  Create Form
                  <div class="commonBtn">
                    <router-link to="/groups">
                      <a-button class="btn primaryBtn">Back</a-button>
                    </router-link>
                  </div>
                </h2>
              </a-col>
              <a-col :span="20">
                <div class="form-group">
                  <label> Form Name</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Enter Form Name"
                  />
                </div>
              </a-col>
              <a-col :span="4">
                <div class="text-right mt-28">
                  <router-link to="/form-builder">
                  <a-button class="btn primaryBtn"
                    >Next</a-button
                  >
                  </router-link>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <CreateGroup v-model:visible="visible" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import CreateGroup from "@/components/modals/CreateGroup";
import { defineComponent, ref } from "vue";


export default {
  components: {
    Header,
    Sidebar,
    CreateGroup
  },

  setup() {
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    return {
      visible,
      showModal,
    };
  },
};
</script>
