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
              <h2 class="pageTittle">Care Coordinator Summary</h2>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="mb-24">
            <a-col :sm="8" :xs="24">
              <div class="patientInfo">
                <div class="patientImg">
                  <img src="../../assets/images/profile-4.jpg" alt="image" />
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
                    <a-table :columns="columns" :data-source="data" :pagination="false">
                      <template #patientName="text">
                        <router-link to="patients-summary">{{ text.text }}</router-link>
                      </template>
                      <template #appt="text">
                        <router-link to="manage-care-coordinator">{{
                          text.text
                        }}</router-link>
                      </template>
                    </a-table>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="My Patients" force-render>
                    <a-table :columns="columns1" :data-source="data1" @change="onChange">
                      <template #firstName="text">
                        <router-link to="patients-summary">{{ text.text }}</router-link>
                      </template>
                      <template #lastName="text">
                        <router-link to="patients-summary">{{ text.text }}</router-link>
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
                  <a-tab-pane key="3" tab="Permissions">Content of Tab Pane 3</a-tab-pane>
                  <a-tab-pane key="4" tab="Documents ">Content of Tab Pane 3</a-tab-pane>
                </a-tabs>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
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
export default {
  components: {
    Header,
    Sidebar,
  },

  setup() {
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
    }

    return {
      logout,
      data,
      columns,
      data1,
      columns1,
      activeKey: ref("1"),
    };
  },
};
</script>
