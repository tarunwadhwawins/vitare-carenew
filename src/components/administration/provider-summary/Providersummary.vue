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
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">Provider Summary</h2>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="mb-24">
            <a-col :sm="8" :xs="24">
              <div class="patientInfo">
                <div class="patientImg">
                  <img src="@/assets/images/profile-4.jpg" alt="image" />
                </div>
                <p class="name">Jane Doe</p>
                <div class="pat-profile">
                  <div class="pat-profile-inner">
                    <div class="thumb-head">DOB</div>
                    <div class="thumb-desc">Aug 05, 1988 (33)</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Gender</div>
                    <div class="thumb-desc">Male</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">EHR ID</div>
                    <div class="thumb-desc">123THJ</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Specialization</div>
                    <div class="thumb-desc">Clinical</div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :sm="16" :xs="24">
              <div class="thumbDesc">
                <a-tabs v-model:activeKey="activeKey">
                  <a-tab-pane key="1" tab="My Appointments">
                    <a-table
                      :columns="columns"
                      :data-source="data"
                      :pagination="false"
                    >
                      <template #patientName="text">
                        <router-link to="patients-summary">{{
                          text.text
                        }}</router-link>
                      </template>
                      <template #appt="text">
                        <router-link to="manage-care-coordinator">{{
                          text.text
                        }}</router-link>
                      </template>
                    </a-table>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="My Patients" force-render>
                    <a-table
                      :columns="columns1"
                      :data-source="data1"
                      @change="onChange"
                    >
                      <template #firstName="text">
                        <router-link to="patients-summary">{{
                          text.text
                        }}</router-link>
                      </template>
                      <template #lastName="text">
                        <router-link to="patients-summary">{{
                          text.text
                        }}</router-link>
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
                  </a-tab-pane>
                  <a-tab-pane key="3" tab="Permissions"
                    >Content of Tab Pane 3</a-tab-pane
                  >
                  <a-tab-pane key="4" tab="Documents "
                    >Content of Tab Pane 3</a-tab-pane
                  >
                </a-tabs>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
              <div class="summary-tabs">
                <a-tabs v-model:activeKey="activeKey1">
                  <a-tab-pane key="1" tab="Locations">
                    <a-row :gutter="24">
                      <a-col :span="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :span="24">
                        <a-table
                          :pagination="false"
                          :columns="columns3"
                          :data-source="data3"
                          :scroll="{ x: 900 }"
                        >
                          <template #action>
                            <a-tooltip placement="bottom">
                              <template #title>
                                <span>Edit</span>
                              </template>
                              <a class="icons"><EditOutlined /></a>
                            </a-tooltip>
                            <a-tooltip placement="bottom">
                              <template #title>
                                <span>Delete</span>
                              </template>
                              <a class="icons"> <DeleteOutlined /></a>
                            </a-tooltip>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
    <a-modal
      v-model:visible="visible"
      title="Add Locations"
      centered
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Location Name</label>
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
            <label> Phone No</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Zipcode</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Address</label>
            <a-textarea
              v-model:value="value2"
              placeholder="Address"
              allow-clear
            />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
const columns = [
  {
    title: "Patient Name",
    dataIndex: "patient",
    slots: {
      customRender: "patientName",
    },
  },
  {
    title: "Date Time ",
    dataIndex: "date",
  },
  {
    title: "	Appointment With",
    dataIndex: "appt",
    slots: {
      customRender: "appt",
    },
  },
];
const data = [
  {
    key: "1",
    patient: "Steve Smith",
    date: "Dec 20, 2021 - 01:30 PM",
    appt: "Joseph",
  },
  {
    key: "2",
    patient: "Jane Doe",
    date: "Dec 23, 2021 - 11:30 AM",
    appt: "Robert",
  },
];
const columns1 = [
  {
    title: "Flags",
    dataIndex: "flags",
    slots: {
      customRender: "flags",
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    slots: {
      customRender: "name",
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
];
const data1 = [
  {
    key: "1",
    flags: "redBgColor",
    name: "Jane",
    age: "85",
    sex: "male",
    reading: "5 months ago",
  },
  {
    key: "2",
    flags: "purpleBgColor",
    name: "Steve",
    age: "78",
    sex: "Female",
    reading: "15 days ago",
  },
  {
    key: "3",
    flags: "blueBgColor yellowBgColor ",
    name: "Joseph",
    age: "72",
    sex: "male",
    reading: "2 months ago",
  },
  {
    key: "4",
    flags: "greenBgColor",
    name: "Robert",
    age: "79",
    sex: "Female",
    reading: "4 months ago",
  },
];

const columns3 = [
  {
    title: "Location Name",
    dataIndex: "location",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Phone No",
    dataIndex: "phone",
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
    location: "Location 1",
    address: "address1",
    city: "City1",
    phone: "999-2222-111",
    actions: "In",
  },
  {
    key: "2",
    location: "Location 1",
    address: "address2",
    city: "City2",
    phone: "999-2222-111",
    actions: "In",
  },
];

export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
  },

  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    return {
      logout,
      data,
      columns,
      data1,
      columns1,
      data3,
      columns3,
      activeKey: ref("1"),
      activeKey1: ref("1"),

      visible,
      showModal,
      handleOk,
    };
  },
};
</script>
