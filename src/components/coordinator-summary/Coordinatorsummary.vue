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
          <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
              <div class="summary-tabs">
                <a-tabs v-model:activeKey="activeKey1">
                  <a-tab-pane key="1" tab="Contacts">
                    <a-row :gutter="24">
                      <a-col :span="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal3"
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
                            <a class="icons"><EditOutlined /></a>
                            <a class="icons"> <DeleteOutlined /></a>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Availability" force-render>
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal2"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :span="24">
                        <a-table
                          :pagination="false"
                          :columns="columns4"
                          :data-source="data4"
                          :scroll="{ x: 900 }"
                        >
                          <template #action>
                            <a class="icons"><EditOutlined /></a>
                            <a class="icons"> <DeleteOutlined /></a>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="3" tab="Roles">
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <div class="common-btn mb-24">
                          <a-button class="btn blackBtn" @click="showModal1"
                            ><PlusOutlined
                          /></a-button>
                        </div>
                      </a-col>
                      <a-col :span="24">
                        <a-table
                          :pagination="false"
                          :columns="columns5"
                          :data-source="data5"
                          :scroll="{ x: 900 }"
                        >
                          <template #action>
                            <a class="icons"><EditOutlined /></a>
                            <a class="icons"> <DeleteOutlined /></a>
                          </template>
                        </a-table>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="4" tab="Documents">
                    <a-col :sm="24" :xs="24">
                      <div class="common-btn mb-24">
                        <a-button class="btn blackBtn" @click="showModal"
                          ><PlusOutlined
                        /></a-button>
                      </div>
                    </a-col>
                    <a-row :gutter="24">
                      <a-col :sm="24" :xs="24">
                        <a-table
                          :columns="columns2"
                          :data-source="data2"
                          :scroll="{ x: 900 }"
                          :pagination="false"
                          @change="onChange"
                        >
                          <template #action>
                            <a class="icons"><EditOutlined /></a>
                            <a class="icons"><DeleteOutlined /></a>
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
    <!--modals-->
    <a-modal v-model:visible="visible" title="Add Documents" centered @ok="handleOk">
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
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Type</label>
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
            <label>Tags</label>
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
    </a-modal>
    <!---->
    <a-modal v-model:visible="visible1" title="Add Roles" centered @ok="handleOk">
      <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Role</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Billing Admin</a-select-option>
              <a-select-option value="Yiminghe">Manager</a-select-option>
              <a-select-option value="Yiminghe">User Admin</a-select-option>
            </a-select>
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!------>
    <a-modal v-model:visible="visible2" title="Add Availability" centered @ok="handleOk">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Start Time</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>End Time</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
    <a-modal v-model:visible="visible3" title="Add Contacts" centered @ok="handleOk">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>First Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Last Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label> Email</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label> Phone No</label>
            <a-input v-model="value" size="large" />
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
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
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
const columns2 = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Document",
    dataIndex: "document",
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 3,
    },
  },
  {
    title: "Tags",
    dataIndex: "tags",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
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
const data2 = [
  {
    key: "1",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter ID",
    tags: "Voter ID",
    action: "",
  },
  {
    key: "2",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter ID",
    tags: "Voter ID",
    action: "",
  },
];
const columns3 = [
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
const data3 = [
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
const columns4 = [
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
const data4 = [
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
const columns5 = [
  {
    title: "Role",
    dataIndex: "role",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data5 = [
  {
    key: "1",
    role: "Manager",
    actions: "",
  },
  {
    key: "2",
    role: "Billing Admin",
    actions: "",
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
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    const showModal = () => {
      visible.value = true;
    };
    const showModal1 = () => {
      visible1.value = true;
    };
    const showModal2 = () => {
      visible2.value = true;
    };
    const showModal3 = () => {
      visible3.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    return {
      logout,
      data,
      columns,
      data1,
      columns1,
      data2,
      columns2,
      data3,
      columns3,
      data4,
      columns4,
      data5,
      columns5,
      activeKey: ref("1"),
      activeKey1: ref("1"),
      filteredOptionsForTag,
      selectedItemsForTag,

      visible,
      visible1,
      visible2,
      visible3,
      showModal,
      showModal1,
      showModal2,
      showModal3,
      handleOk,
    };
  },
};
</script>
