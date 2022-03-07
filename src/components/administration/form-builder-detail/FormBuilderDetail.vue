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
                <h2 class="pageTittle">Form Builder Detail</h2>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Patient Name</label>
                  <a-input
                    v-model:value="value"
                    size="large"
                    placeholder="Patient Name"
                  />
                </div>
              </a-col>

              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Date of birth</label>
                  <a-date-picker
                    v-model:value="value1"
                    size="large"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Phone No.</label>
                  <a-input
                    v-model:value="value"
                    size="large"
                    placeholder="Phone No."
                  />
                </div>
              </a-col>

              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Address</label>
                  <a-textarea v-model:value="value" :rows="2" />
                </div>
              </a-col>

              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Allergies</label>

                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Allergy 1</a-select-option>
                    <a-select-option value="Yiminghe"
                      >Allergy 2</a-select-option
                    >
                  </a-select>
                </div>
              </a-col>

              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Other Care Plan</label>
                  <a-radio-group
                    name="radioGroup"
                    v-model:value="value10"
                    class="d-flex"
                  >
                    <a-radio value10="1">Yes</a-radio>
                    <a-radio value10="2">No</a-radio>
                  </a-radio-group>
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Care Plan</label>
                  <div class="d-flex">
                    <a-checkbox v-model:checked="checked1"
                      >Care Plan 1</a-checkbox
                    >
                    <a-checkbox v-model:checked="checked2"
                      >Care Plan 2</a-checkbox
                    >
                    <a-checkbox v-model:checked="checked3"
                      >Care Plan 3</a-checkbox
                    >
                    <a-checkbox v-model:checked="checked4"
                      >Care Plan 4</a-checkbox
                    >
                  </div>
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Note</label>
                  <a-textarea v-model:value="value" :rows="4" />
                </div>
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
      checked1: ref(false),
      checked2: ref(false),
      checked3: ref(false),
      checked4: ref(false),
      value10: ref(false),
    };
  },
};
</script>
