<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
          ><Sidebar
        /></a-layout-sider>
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
               Appointment Calendar
                <div class="commonBtn">
                  <a-button class="btn primaryBtn"
                    >Full Calendar View</a-button
                  >
                </div>
              </h2>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <a-modal
      v-model:visible="visible"
      width="1140px"
      title="Add New Patients"
      centered
      @ok="handleOk"
      :footer="null"
    >
      <a-row :gutter="24">
        <a-col :span="24">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content" v-if="steps[current].title == 'Demographics'">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Full Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Nick Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Date of Birth</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label> Gender</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Male</a-select-option>
                    <a-select-option value="Yiminghe">Female</a-select-option>
                    <a-select-option value="Yiminghe">Others</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Weight</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Height</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Email</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Phone No</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Country</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>State</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>City</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Zipcode</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="24">
                <div class="form-group">
                  <label>Address</label>
                  <a-textarea v-model="value2" allow-clear />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Primary Family Member</h2>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Full Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label> Gender</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Male</a-select-option>
                    <a-select-option value="Yiminghe">Female</a-select-option>
                    <a-select-option value="Yiminghe">Others</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Email Address</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Phone No</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Relation</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Conditions'">
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Health Conditions</h2>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="8">
                <a-checkbox v-model:checked="checked"
                  >Congestive Health Failure</a-checkbox
                >
              </a-col>
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">COPD</a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Chronic Kidney Disease</a-checkbox>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Cardiovascular Disease </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Depression </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Diabetes </a-checkbox>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Hyper Tension </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Stroke </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox v-model:checked="checked">Other </a-checkbox>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Primary Physician</h2>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label> Designation</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Email</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Phone No</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Programs'">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Programs</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Choose Program</a-select-option>
                    <a-select-option value="Yiminghe">Program 1</a-select-option>
                    <a-select-option value="Yiminghe">Program 2</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="6">
                <div class="form-group">
                  <label>Start Date</label>
                  <a-date-picker
                    v-model:value="value1"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :span="6">
                <div class="form-group">
                  <label>End Date</label>
                  <a-date-picker
                    v-model:value="value2"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Status</label>
                  <a-radio-group v-model:value="value">
                    <a-radio :style="radioStyle" :value="1">Active</a-radio>
                  </a-radio-group>
                  <a-radio-group v-model:value="value">
                    <a-radio :style="radioStyle" :value="2">Inactive</a-radio>
                  </a-radio-group>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-table :columns="columns1" :data-source="data1"  :pagination="false" :scroll="{ x: 900 }" />
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Assessments'">
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Blood Pressure</h2>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Systolic</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Diastolic</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Pulse</h2>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>BPM</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Blood Oxygen Saturation</h2>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>SPO2</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Glucosen</h2>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Fasting Blood Sugar</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Random Blood Sugar</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Clinical Data'">
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Medicine History</h2>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="form-group">
                  <label>Medical History</label>
                  <a-textarea v-model="value2" allow-clear />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-table
                  :columns="columns2"
                  :data-source="data2"
                  :pagination="false"
                  :scroll="{ x: 900 }"
                />
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Medicine Routine</h2>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Medicine</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label> Routine</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-table
                  :columns="columns3"
                  :data-source="data3"
                  :pagination="false"
                  :scroll="{ x: 900 }"
                />
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Billing'">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Insurance Id</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Insurance Type</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Expiry Date</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Documents'">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Document</label>
                  <a-input v-model="value" size="large" type="file" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label> Type</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Id Proof</a-select-option>
                    <a-select-option value="Yiminghe">Clinical</a-select-option>
                    <a-select-option value="Yiminghe">Insurance</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label> Tags</label>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-table :columns="columns4" :data-source="data4" :pagination="false" :scroll="{ x: 900 }" />
              </a-col>
            </a-row>
          </div>
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev"
              >Previous</a-button
            >
            <a-button v-if="current < steps.length - 1" type="primary" @click="next"
              >Next</a-button
            >
            <a-button
              v-if="current == steps.length - 1"
              type="primary"
              @click="$message.success('Processing complete!')"
            >
              Done
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-modal>

    <!---->
  </div>
</template>


<script>
import Header from "../layout/header/header";
import Sidebar from "../layout/sidebar/sidebar";
export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {

    return {

    };
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  min-height: 200px;
  text-align: left;
  padding: 12px 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.steps-action {
  text-align: right;
}
</style>
