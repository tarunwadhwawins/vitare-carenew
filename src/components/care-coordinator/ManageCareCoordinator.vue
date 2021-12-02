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
        >
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                Manange Care Coordinator
                <div class="commonBtn">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Add New Coordinator</a-button
                  >
                </div>
              </h2>
            </a-col>
          </a-row>
          <a-row class="mb-24" :gutter="24">
            <a-col :span="12">
              <h2>Specialization</h2>
              <a-row :gutter="24">
                <a-col flex="1 0 0%">
                  <div class="colorBox two">
                    <UserOutlined />
                    <h3>4</h3>
                    <p>Wellness</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
                  <div class="colorBox four">
                    <UserOutlined />
                    <h3>5</h3>
                    <p>Behavior</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12">
              <h2>Network</h2>
              <a-row :gutter="24">
                <a-col flex="1 0 0%">
                  <div class="colorBox six">
                    <UserOutlined />
                    <h3>5</h3>
                    <p>In</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
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
            <a-col :span="24">
              <a-table
                :pagination="false"
                :columns="columns"
                :data-source="data"
                :scroll="{ x: 1200 }"
                @change="onChange"
              >
                <template #action>
                  <a class="icons"><EyeOutlined /></a>
                  <a class="icons"><EditOutlined /></a>
                  <a class="icons"> <DeleteOutlined /></a>
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
      width="1140px"
      title="Add New Coordinator"
      centered
      @ok="handleOk"
      :footer="null"
    >
      <a-row :gutter="24">
        <a-col :span="24">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div
            class="steps-content"
            v-if="steps[current].title == 'Personal Information'"
          >
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>First Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Last Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Designation</label>
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
                  <label>Specialization</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Wellness</a-select-option>
                    <a-select-option value="Yiminghe">Behavior</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Network</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">In</a-select-option>
                    <a-select-option value="Yiminghe">Out</a-select-option>
                  </a-select>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Contacts'">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>First Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>Last Name</label>
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
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-table
                  :pagination="false"
                  :columns="columns1"
                  :data-source="data1"
                  :scroll="{ x: 900 }"
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"> <DeleteOutlined /></a>
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Availability'">
            <a-row :gutter="24">
              <a-col :span="12">
                <div class="form-group">
                  <label>Start Time</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Choose start Time</a-select-option>
                    <a-select-option value="Yiminghe">08:00 AM</a-select-option>
                    <a-select-option value="Yiminghe">08:30 AM</a-select-option>
                    <a-select-option value="Yiminghe">09:00 AM</a-select-option>
                    <a-select-option value="Yiminghe">09:30 AM</a-select-option>
                    <a-select-option value="Yiminghe">10:00 AM</a-select-option>
                    <a-select-option value="Yiminghe">10:30 AM</a-select-option>
                    <a-select-option value="Yiminghe">11:00 AM</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-group">
                  <label>End Time</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy">Choose End Time</a-select-option>
                    <a-select-option value="Yiminghe">02:00 PM</a-select-option>
                    <a-select-option value="Yiminghe">02:30 PM</a-select-option>
                    <a-select-option value="Yiminghe">03:00 PM</a-select-option>
                    <a-select-option value="Yiminghe">03:30 PM</a-select-option>
                    <a-select-option value="Yiminghe">04:00 PM</a-select-option>
                    <a-select-option value="Yiminghe">04:30 PM</a-select-option>
                    <a-select-option value="Yiminghe">05:00 PM</a-select-option>
                    <a-select-option value="Yiminghe">05:30 PM</a-select-option>
                  </a-select>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-table
                  :pagination="false"
                  :columns="columns2"
                  :data-source="data2"
                  :scroll="{ x: 900 }"
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"> <DeleteOutlined /></a>
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Roles'">
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="form-group">
                  <label>Role</label>
                  <a-select
                    v-model:value="selectedItems"
                    mode="multiple"
                    placeholder="Please Select Roles"
                    style="width: 100%"
                    :options="filteredOptions.map((item) => ({ value: item }))"
                  >
                  </a-select>
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="mb-24">
              <a-col :span="24">
                <a-button class="btn primaryBtn">Add</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-table
                  :pagination="false"
                  :columns="columns2"
                  :data-source="data2"
                  :scroll="{ x: 900 }"
                >
                  <template #action>
                    <a class="icons"> <DeleteOutlined /></a>
                  </template>
                </a-table>
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
            <a-row :gutter="24">
              <a-col :span="24">
                <a-table
                  :pagination="false"
                  :columns="columns3"
                  :data-source="data3"
                  :scroll="{ x: 900 }"
                >
                  <template #action>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"> <DeleteOutlined /></a>
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
import { defineComponent, ref, computed } from "vue";
import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
const OPTIONS = ["Manager", "Billing Admin", "User Admin"];
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
const columns = [
  {
    title: "First Name",
    dataIndex: "first",
  },
  {
    title: "Last Name",
    dataIndex: "last",
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
const columns1 = [
  {
    title: "First Name",
    dataIndex: "first",
  },
  {
    title: "Last Name",
    dataIndex: "last",
  },
  {
    title: "Email",
    dataIndex: "email",
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
const data1 = [
  {
    key: "1",
    first: "Jane",
    last: "Doe",
    email: "john@aa.com",
    phone: "999-2222-111",
    actions: "In",
  },
  {
    key: "2",
    first: "Steve",
    last: "	Smith",
    email: "steve@smith.com",
    phone: "999-2222-111",
    actions: "In",
  },
];
const columns2 = [
  {
    title: "Start Time",
    dataIndex: "start",
  },
  {
    title: "End Time",
    dataIndex: "end",
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
    start: "08:00 AM",
    end: "	02:30 PM",
    actions: "",
  },
  {
    key: "2",
    start: "09:00 AM",
    end: "03:30 PM",
    actions: "",
  },
];
const columns3 = [
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
const data3 = [
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
    EyeOutlined,
  },

  setup() {
    const visible = ref(false);
    const current = ref(0);
    const showModal = () => {
      visible.value = true;
    };

    const selectedItems = ref(["Manager"]);
    const filteredOptions = computed(() =>
      OPTIONS.filter((o) => !selectedItems.value.includes(o))
    );

    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );

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

    return {
      visible,
      showModal,
      handleOk,
      data1,
      columns1,
      handleChange,
      data2,
      columns2,
      data3,
      columns3,
      data,
      selectedItems,
      filteredOptions,
      filteredOptionsForTag,
      selectedItemsForTag,
      columns,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      current,
      steps: [
        {
          title: "Personal Information",
          content: "First-content",
        },
        {
          title: "Contacts",
          content: "Second-content",
        },
        {
          title: "Availability",
          content: "Second-content",
        },
        {
          title: "Roles",
          content: "Second-content",
        },
        {
          title: "Documents",
          content: "Last-content",
        },
      ],
      next,
      prev,
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
