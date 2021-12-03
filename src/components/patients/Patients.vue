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
                Manange Patients
                <div class="commonBtn">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Add New Patients</a-button
                  >
                </div>
              </h2>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col :xl="8" :sm="8" :xs="24">
                  <div class="colorBox red">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>Critical</p>
                  </div>
                </a-col>
                <a-col :xl="8" :sm="8" :xs="24">
                  <div class="colorBox green">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>High</p>
                  </div>
                </a-col>
                <a-col :xl="8" :sm="8" :xs="24">
                  <div class="colorBox blue">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>Normal</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="data"
                :scroll="{ x: 1600 }"
                @change="onChange"
              >
                <template #firstName="text">
                  <a href="/#/patients-summary">{{ text.text }}</a>
                </template>
                <template #lastName="text">
                  <a href="/#/patients-summary">{{ text.text }}</a>
                </template>
                <template #flags="{ text }">
                  <span class="box" :class="text"></span>
                  <span
                    class="box"
                    :class="(text = text.match(/yellowBgColor/g))"
                    v-if="text.match(/yellowBgColor/g)"
                  ></span>
                </template>
                <template #compliance>
                  <a class="icons"><WarningOutlined /></a>
                </template>

                <template #lastReadingValues>
                  <WarningOutlined />
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <a-modal
      v-model:visible="visible"
      max-width="1140px"
      width="100%"
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Full Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Nick Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Date of Birth</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Weight</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Height</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Email</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Phone No</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Country</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>State</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>City</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Full Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Email Address</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Phone No</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked"
                  >Congestive Health Failure</a-checkbox
                >
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">COPD</a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">Chronic Kidney Disease</a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">Cardiovascular Disease </a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">Depression </a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">Diabetes </a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">Hyper Tension </a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <a-checkbox v-model:checked="checked">Stroke </a-checkbox>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label> Designation</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Email</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Phone No</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Programs'">
            <a-row :gutter="24">
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="6" :xs="24">
                <div class="form-group">
                  <label>Start Date</label>
                  <a-date-picker
                    v-model:value="value1"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :sm="6" :xs="24">
                <div class="form-group">
                  <label>End Date</label>
                  <a-date-picker
                    v-model:value="value2"
                    :size="size"
                    style="width: 100%"
                  />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
                <a-table
                  :columns="columns1"
                  :data-source="data1"
                  :pagination="false"
                  :scroll="{ x: 900 }"
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"><DeleteOutlined /></a>
                  </template>
                </a-table>
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Systolic</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Fasting Blood Sugar</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"><DeleteOutlined /></a>
                  </template>
                </a-table>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="formHeading">
                  <h2>Medicine Routine</h2>
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Medicine</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a
                    ><a class="icons"><DeleteOutlined /></a>
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Billing'">
            <a-row :gutter="24">
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Insurance Id</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Insurance Type</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Expiry Date</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Documents'">
            <a-row :gutter="24">
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label>Document</label>
                  <a-input v-model="value" size="large" type="file" />
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
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
              <a-col :sm="12" :xs="24">
                <div class="form-group">
                  <label> Tags</label>
                  <a-select
                    v-model:value="selectedItemsForTag"
                    mode="multiple"
                    size="large"
                    placeholder="Please Select Roles"
                    style="width: 100%"
                    :options="filteredOptionsForTag.map((item) => ({ value: item }))"
                  />
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
                  :columns="columns4"
                  :data-source="data4"
                  :pagination="false"
                  :scroll="{ x: 900 }"
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"><DeleteOutlined /></a>
                  </template>
                </a-table>
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
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { defineComponent, ref, reactive, computed } from "vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons-vue";
const columns = [
  {
    title: "Flags",
    dataIndex: "flags",
    slots: {
      customRender: "flags",
    },
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    slots: {
      customRender: "firstName",
    },
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    slots: {
      customRender: "lastName",
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 3,
    },
  },
  {
    title: "Sex",
    dataIndex: "sex",
    sorter: {
      compare: (a, b) => a.sex - b.sex,
      multiple: 2,
    },
  },
  {
    title: "Last Reading Date",
    dataIndex: "reading",
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },
  {
    title: "Non Compliance",
    dataIndex: "compliance",
    sorter: {
      compare: (a, b) => a.compliance - b.compliance,
      multiple: 1,
    },
    slots: {
      customRender: "compliance",
    },
  },
  {
    title: "Last Message Sent",
    dataIndex: "message",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 1,
    },
  },
  {
    title: "Last Reading Values",
    dataIndex: "readingvalues",
    sorter: {
      compare: (a, b) => a.readingvalues - b.readingvalues,
      multiple: 1,
    },
    slots: {
      customRender: "lastReadingValues",
    },
    children: [
      {
        title: "Sp02",
        dataIndex: "sp02",
        key: "sp02",
      },
      {
        title: "BP",
        dataIndex: "bp",
        key: "bp",
      },
      {
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
      },
    ],
  },
];
const data = [
  {
    key: "1",
    flags: "redBgColor",
    firstName: "Jane",
    lastName: "Doe",
    age: "85",
    sex: "male",
    reading: "5 months ago",
    compliance: "",
    message: "5 months ago",
    readingvalues: "",
    sp02: "	95%",
    bp: "115/81",
    weight: "189.2",
  },
  {
    key: "2",
    flags: "purpleBgColor",
    firstName: "Steve",
    lastName: "Smith",
    age: "78",
    sex: "Female",
    reading: "15 days ago",
    compliance: "",
    message: "2 months ago",
    readingvalues: "",
    sp02: "-",
    bp: "105/81",
    weight: "-",
  },
  {
    key: "3",
    flags: "blueBgColor yellowBgColor ",
    firstName: "Joseph",
    lastName: "Spouse",
    age: "72",
    sex: "male",
    reading: "2 months ago",
    compliance: "",
    message: "4 months ago",
    readingvalues: "",
    sp02: "-",
    bp: "-",
    weight: "-",
  },
  {
    key: "4",
    flags: "greenBgColor",
    firstName: "Robert",
    lastName: "Henry",
    age: "79",
    sex: "Female",
    reading: "4 months ago",
    compliance: "",
    message: "15 days ago",
    readingvalues: "",
    sp02: "92%",
    bp: "-",
    weight: "181.2",
  },
];
const columns1 = [
  {
    title: "Program Name",
    dataIndex: "program",
  },
  {
    title: "Start Date",
    dataIndex: "start",
  },
  {
    title: "End Date",
    dataIndex: "end",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data1 = [
  {
    key: "1",
    program: "Program 1",
    start: "Nov 12, 2021",
    end: "Dec 20, 2021",
    status: "Active",
    actions: "",
  },
  {
    key: "2",
    program: "Program 2",
    start: "Nov 22, 2021",
    end: "Dec 28, 2021",
    status: "InActive",
    actions: "",
  },
];
const columns2 = [
  {
    title: "History",
    dataIndex: "history",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data2 = [
  {
    key: "1",
    history: "Program 1",
    actions: "",
  },
  {
    key: "2",
    history: "Program 2",
    actions: "",
  },
];
const columns3 = [
  {
    title: "Program Name",
    dataIndex: "program",
  },
  {
    title: "Start Date",
    dataIndex: "start",
  },
  {
    title: "End Date",
    dataIndex: "end",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data3 = [
  {
    key: "1",
    program: "Program 1",
    start: "Nov 12, 2021",
    end: "Dec 20, 2021",
    status: "Active",
    actions: "",
  },
  {
    key: "2",
    program: "Program 1",
    start: "Nov 22, 2021",
    end: "Dec 28, 2021",
    status: "InActive",
    actions: "",
  },
];
const columns4 = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Document",
    dataIndex: "document",
  },
  {
    title: "	Type",
    dataIndex: "type",
  },
  {
    title: "	Tags",
    dataIndex: "tags",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data4 = [
  {
    key: "1",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter Id",
    tags: "	Voter Id",
    actions: "",
  },
  {
    key: "2",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter Id",
    tags: "	Voter Id",
    actions: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    UserOutlined,
    DeleteOutlined,
    EditOutlined,
    WarningOutlined,
  },

  setup() {
    const visible = ref(false);
    const current = ref(0);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );

    const value = ref(1);
    const radioStyle = reactive({
      //   display: "flex",
      //   height: "30px",
      //   lineHeight: "30px",
    });
    return {
      visible,
      showModal,
      handleOk,
      data1,
      columns1,
      data2,
      columns2,
      data3,
      columns3,
      data4,
      columns4,
      data,
      columns,
      filteredOptionsForTag,
      selectedItemsForTag,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      checked: ref(false),
      current,
      steps: [
        {
          title: "Demographics",
          content: "First-content",
        },
        {
          title: "Conditions",
          content: "Second-content",
        },
        {
          title: "Programs",
          content: "Second-content",
        },
        {
          title: "Assessments",
          content: "Second-content",
        },
        {
          title: "Clinical Data",
          content: "Second-content",
        },
        {
          title: "Billing",
          content: "Second-content",
        },
        {
          title: "Documents",
          content: "Last-content",
        },
      ],
      next,
      prev,
      value1: ref(),
      value2: ref(),
      size: ref("large"),
      radioStyle,

      value: ref(["Manger", "Billing Admin", "User Admin"]),
      handleChange,
      options: [...Array(3)].map((i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
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
