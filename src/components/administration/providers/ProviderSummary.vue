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
                  <div class="info">
                    <p>Jane Doe</p>
                    <p>
                      <a href="tel:1234567890"
                        ><PhoneOutlined :rotate="90" /> +343-3563-767</a
                      >
                    </p>
                    <p>132, My Street, Kingston, New York 12401.</p>
                  </div>
                </div>
                <div class="pat-profile">
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Tags</div>
                    <div class="thumb-desc">Tag 1</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Modules</div>
                    <div class="thumb-desc">TCM, RPM</div>
                  </div>
                  <div class="pat-profile-inner">
                    <div class="thumb-head">Default Location</div>
                    <div class="thumb-desc">Location 1</div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :sm="16" :xs="24">
              <div class="summary-tabs">
                <h2 class="mb-24">Locations</h2>
                <a-table  rowKey="id"
                  :pagination="false"
                  :columns="columns3"
                  :data-source="data3"
                  :scroll="{ x: 600 }"
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
import { ref } from "vue";
import {
  DeleteOutlined,
  EditOutlined,
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
  {
    key: "3",
    location: "Location 3",
    address: "address3",
    city: "City3",
    phone: "999-2222-111",
    actions: "In",
  },
  {
    key: "4",
    location: "Location ",
    address: "address4",
    city: "City4",
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
    const handleOk = () => {
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
