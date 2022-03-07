<template>
  <div class="questionnaireMain">
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row :gutter="16">
              <a-col :span="24">
                <h2 class="pageTittle">Create Template</h2>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <div class="form-group">
                  <label> Template Name</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Enter Template Name"
                  />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Template Type</label>
                  <a-select
                    ref="select"
                    v-model:value="value1"
                    style="width: 100%"
                    @focus="focus"
                    @change="handleChange"
                    placeholder="Choose Type"
                    size="large"
                  >
                    <a-select-option value="Intake">Intake</a-select-option>
                    <a-select-option value="Screening"
                      >Screening</a-select-option
                    >
                    <a-select-option value="Assessment"
                      >Assessment</a-select-option
                    >
                    <a-select-option value="Care Plan"
                      >Care Plan</a-select-option
                    >
                  </a-select>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="text-right mt-28">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Save</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!--modals-->
    <CreateTemplate v-model:visible="visible2" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { defineComponent, ref } from "vue";
import CreateTemplate from "@/components/modals/CreateTemplate";

export default {
  components: {
    Header,
    Sidebar,
    CreateTemplate,
  },

  setup() {
    const activeKey = ref(["1"]);
    const toggle = ref(true);
    const visible2 = ref(false);
    const showModal = () => {
      visible2.value = true;
    };
    return {
      activeKey,
      value1: ref(),
      value2: ref(),
      size: ref("large"),
      checked1: ref(false),
      checked2: ref(false),
      checked3: ref(false),
      checked4: ref(false),
      checked5: ref(false),
      checked6: ref(false),
      checked7: ref(false),
      checked8: ref(true),
      checked9: ref(false),
      checked10: ref(false),
      checked21: ref(false),
      checked22: ref(false),
      checked23: ref(false),
      toggle,
      value3: ref(),
      visible2,
      showModal,
    };
  },
};
</script>
