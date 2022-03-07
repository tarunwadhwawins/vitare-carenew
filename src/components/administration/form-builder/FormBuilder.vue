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
          <div class="common-bg formBuilder">
            <a-row :gutter="20">
              <a-col :span="24">
                <h2 class="pageTittle">Form One</h2>
              </a-col>
              <a-col :span="5">
                <div class="sideWrapper">
                  <h3>Layout Controls</h3>
                  <ul>
                    <li>Header</li>
                    <li>Horizontal Line</li>
                    <li>Straight Text</li>
                  </ul>
                  <h3>Form Controls</h3>
                  <ul>
                    <li>Date Time</li>
                    <li>Global Code</li>
                    <li>Integer</li>
                    <li>Money Decimal</li>
                    <li>Text Area</li>
                    <li>Text Box (2/20)</li>
                    <li>Checkbox</li>
                    <li>Radio Button</li>
                    <li>File Input</li>
                    <li>Select Input</li>
                    <li>Range Input</li>
                  </ul>
                </div>
              </a-col>
              <a-col :span="13">
                <div class="centerWrapper">
                  <div class="form-group">
                    <label>Input Text</label>
                    <div class="actions">
                      <EditOutlined />
                      <CloseOutlined />
                    </div>
                    <a-input v-model:value="value" size="large" />
                  </div>
                  <div class="form-group">
                    <label>Text Area</label>
                    <div class="actions">
                      <EditOutlined />
                      <CloseOutlined />
                    </div>
                    <a-textarea
                      v-model:value="value"
                      :rows="4"
                    />
                  </div>
                  <div class="form-group">
                    <label>Select Input</label>
                    <div class="actions">
                      <EditOutlined />
                      <CloseOutlined />
                    </div>
                    <a-select
                      ref="select"
                      v-model="value1"
                      style="width: 100%"
                      size="large"
                      @focus="focus"
                      @change="handleChange"
                    >
                      <a-select-option value="lucy">Select 1</a-select-option>
                      <a-select-option value="Yiminghe"
                        >Select 2</a-select-option
                      >
                    </a-select>
                  </div>
                  <div class="form-group">
                    <label>Date </label>
                    <div class="actions">
                      <EditOutlined />
                      <CloseOutlined />
                    </div>
                    <a-date-picker
                      v-model:value="value1"
                      style="width: 100%"
                      size="large"
                    />
                  </div>
                  <div class="form-group">
                    <label>Checkboxs</label>
                    <div class="actions">
                      <EditOutlined />
                      <CloseOutlined />
                    </div>
                    <div class="d-flex">
                      <a-checkbox v-model:checked="checked1"
                        >Checkbox 1</a-checkbox
                      >
                      <a-checkbox v-model:checked="checked2"
                        >Checkbox 2</a-checkbox
                      >
                      <a-checkbox v-model:checked="checked3"
                        >Checkbox 3</a-checkbox
                      >
                      <a-checkbox v-model:checked="checked4"
                        >Checkbox 4</a-checkbox
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Radio Buttons</label>
                    <div class="actions">
                      <EditOutlined />
                      <CloseOutlined />
                    </div>
                    <a-radio-group
                      name="radioGroup"
                      v-model:value="value10"
                      class="d-flex"
                    >
                      <a-radio value10="1">Radio 1</a-radio>
                      <a-radio value10="2">Radio 2</a-radio>
                      <a-radio value10="3">Radio 3</a-radio>
                      <a-radio value10="4">Radio 4</a-radio>
                    </a-radio-group>
                  </div>
                </div>
              </a-col>
              <a-col :span="6">
                <div class="sideWrapper">
                  <h3>Controls Properties</h3>
                  <div class="innerWrapper">
                    <div class="form-group">
                      <label>Text</label>
                      <a-input v-model:value="value" placeholder="Input Text" />
                      <a-checkbox v-model:checked="checked"
                        >Required</a-checkbox
                      >
                    </div>
                    <div class="text-right">
                      <a-button class="btn secondaryBtn">Close</a-button>
                      <a-button class="btn primaryBtn">Update</a-button>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="text-right">
                  <a-button class="btn secondaryBtn">Cancel</a-button>
                  <router-link to="/form-builder-detail">
                    <a-button class="btn primaryBtn ml-10">Save</a-button>
                  </router-link>
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
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { EditOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default {
  components: {
    Header,
    Sidebar,
    EditOutlined,
    CloseOutlined,
  },

  setup() {
    return {
      checked: ref(false),
      value10: ref(false),
    };
  },
};
</script>
