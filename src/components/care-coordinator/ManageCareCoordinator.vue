<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :style="{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }"
        >
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                Care Coordinator
                <div class="commonBtn">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Add New Coordinator</a-button
                  >
                </div>
              </h2>
            </a-col>
          </a-row>
          <a-row class="mb-24" :gutter="24">
            <a-col :sm="12" :xs="24">
              <h2>Specialization</h2>
              <a-row :gutter="24">
                <a-col :sm="12" :xs="24">
                  <div class="colorBox two">
                    <UserOutlined />
                    <h3>4</h3>
                    <p>Wellness</p>
                  </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                  <div class="colorBox four">
                    <UserOutlined />
                    <h3>5</h3>
                    <p>Behavior</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :sm="12" :xs="24">
              <h2>Network</h2>
              <a-row :gutter="24">
                <a-col :sm="12" :xs="24">
                  <div class="colorBox six">
                    <UserOutlined />
                    <h3>5</h3>
                    <p>In</p>
                  </div>
                </a-col>
                <a-col :sm="12" :xs="24">
                  <div class="colorBox five">
                    <UserOutlined />
                    <h3>6</h3>
                    <p>Out</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-input-search
                v-model:value="inputvalue"
                placeholder="Search . . ."
                enter-button="Search"
                size="large"
                @search="onSearch"
                class="mb-24"
              />
            </a-col>
            <a-col :span="12">
              <div class="text-right mb-24">
                <a-button class="primaryBtn">Export to Excel</a-button>
              </div>
            </a-col>
            <a-col :span="24">
              <a-table
                :pagination="false"
                :columns="columns"
                :data-source="data"
                :scroll="{ x: 1200 }"
                @change="onChange"
              >
                <template #action>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>View</span>
                    </template>
                    <a class="icons"><EyeOutlined /></a>
                  </a-tooltip>
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
                <template #first="text">
                  <router-link to="corrdinator-summary">{{ text.text }}</router-link>
                </template>
                <template #last="text">
                  <router-link to="corrdinator-summary">{{ text.text }}</router-link>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <CoordinatorsModal v-model:visible="CoordinatorsModal" @ok="handleOk" />
    <!---->
  </div>
</template>
<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import CoordinatorsModal from "@/components/modals/CoordinatorsModal";
import { defineComponent, ref, computed } from "vue";
import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
const columns = [
  {
    title: "First Name",
    dataIndex: "first",
    slots: {
      customRender: "first",
    },
  },
  {
    title: "Last Name",
    dataIndex: "last",
    slots: {
      customRender: "last",
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    sorter: {
      compare: (a, b) => a.role - b.role,
      multiple: 3,
    },
  },
  {
    title: "Specialization",
    dataIndex: "specialization",
    sorter: {
      compare: (a, b) => a.specialization - b.specialization,
      multiple: 2,
    },
  },
  {
    title: "Network",
    dataIndex: "network",
    sorter: {
      compare: (a, b) => a.network - b.network,
      multiple: 1,
    },
  },
  {
    title: "Created At",
    dataIndex: "created",
    sorter: {
      compare: (a, b) => a.created - b.created,
      multiple: 1,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 1,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data = [
  {
    key: "1",
    first: "Jane",
    last: "Doe",
    role: "Physician",
    specialization: "Wellness",
    network: "In",
    created: "Nov 10,2021",
    status: "Active",
    action: 70,
  },
  {
    key: "2",
    first: "Steve",
    last: "Smith",
    role: "Cardiologist",
    specialization: "Behavior",
    network: "Out",
    created: "Nov 07,2021",
    status: "Active",
    action: 70,
  },
  {
    key: "3",
    first: "Joseph",
    last: "William",
    role: "RN",
    specialization: "Wellness",
    network: "In",
    created: "Nov 01,2021",
    status: "Active",
    action: 70,
  },
  {
    key: "4",
    first: "Robert",
    last: "Henry",
    role: "Physician",
    specialization: "Behavior",
    network: "Out",
    created: "Nov 10,2021",
    status: "Active",
    action: 70,
  },
];
export default {
  components: {
    Header,
    Sidebar,
    UserOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    CoordinatorsModal,
  },
  setup() {
    const CoordinatorsModal = ref(false);
    const showModal = () => {
      CoordinatorsModal.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      CoordinatorsModal.value = false;
    };
    return {
      CoordinatorsModal,
      showModal,
      handleOk,
      data,
      columns,
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
