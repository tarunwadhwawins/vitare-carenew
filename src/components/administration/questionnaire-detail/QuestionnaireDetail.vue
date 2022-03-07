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
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  Questionnaire Detail
                  <div class="commonBtn">
                    <router-link to="/questionnaire-bank">
                      <a-button class="btn primaryBtn">Back</a-button>
                    </router-link>
                  </div>
                </h2>
              </a-col>
              <a-col :span="24">
                <h3>Access to Ambulatory Care</h3>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked1">
                  <p>No regular source of care</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked2">
                  <p>Difficulty with transportation to medical care</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>TCM - 2</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox class="questionOutput" v-model:checked="checked3">
                  <p>
                    Work/family responsibilities that pose barrier to
                    appointments
                  </p>
                  <a-tag>TCM - 2</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox
                  class="questionOutput last"
                  v-model:checked="checked4"
                >
                  <p>Regular use of emergency room for care</p>
                  <a-tag>RPM - 4</a-tag>
                  <a-tag>BHI - 1</a-tag>
                </a-checkbox>
              </a-col>
            </a-row>
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
    return {
      checked1: ref(false),
      checked2: ref(false),
      checked3: ref(false),
      checked4: ref(false),
    };
  },
};
</script>
