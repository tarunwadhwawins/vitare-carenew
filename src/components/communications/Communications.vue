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
          ><Sidebar
        /></a-layout-sider>
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                Communications
                <div class="commonBtn">
                  <a-button class="btn blueBtn">Start Call</a-button>
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Send Message</a-button
                  >
                </div>
              </h2>
            </a-col>
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col :xl="6" :sm="6" :xs="24">
                  <div class="colorBox blueBg">
                    <UserOutlined />
                    <h3>15</h3>
                    <p>Yesterday</p>
                  </div>
                </a-col>
                <a-col :xl="6" :sm="6" :xs="24">
                  <div class="colorBox two">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>Today</p>
                  </div>
                </a-col>
                <a-col :xl="6" :sm="6" :xs="24">
                  <div class="colorBox skyBlue">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>Tomorrow</p>
                  </div>
                </a-col>
                <a-col :xl="6" :sm="6" :xs="24">
                  <div class="colorBox four">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>Week</p>
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
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="data"
                :scroll="{ x: 900 }"
                @change="onChange"
              >
                <template #resend>
                  <a class="icons"><MessageOutlined /></a>
                </template>

                <template #type="{ text }">
                  <a class="icons" v-if="text == 'comment'"
                    ><CommentOutlined
                  /></a>
                  <a class="icons" v-if="text == 'voiceMail'"
                    ><PhoneOutlined
                  /></a>
                  <a class="icons" v-if="text == 'sent'"><PhoneOutlined /></a>
                  <a class="icons" v-if="text == 'mail'"><MailOutlined /></a>
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
      title="Communications"
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>From</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>To</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Patient</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>From</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Message Category</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy"
                >Appointment Reminder</a-select-option
              >
              <a-select-option value="Yiminghe"
                >Recall Reminder</a-select-option
              >
              <a-select-option value="Yiminghe"
                >Portal Invitation
              </a-select-option>
              <a-select-option value="Yiminghe"
                >Patient Message Notification
              </a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Priority</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Urgent</a-select-option>
              <a-select-option value="Yiminghe">Medium</a-select-option>
              <a-select-option value="Yiminghe">Normal</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <label>Message</label>
            <a-textarea v-model="value2" allow-clear />
          </div>
        </a-col>
      </a-row>
    </a-modal>

    <!---->
  </div>
</template>
<!---->
<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { defineComponent, ref } from "vue";
import {
  UserOutlined,
  MessageOutlined,
  CommentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
const columns = [
  {
    title: "Patient",
    dataIndex: "patient",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
  },
  {
    title: "Sent To",
    dataIndex: "sentto",
    sorter: {
      compare: (a, b) => a.sentto - b.sentto,
      multiple: 1,
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    slots: {
      customRender: "type",
    },
  },
  {
    title: "Staff",
    dataIndex: "staff",
    slots: {
      customRender: "staff",
    },
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
  },
  {
    title: "Category",
    dataIndex: "message",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 3,
    },
  },

  {
    title: "Date Sent",
    dataIndex: "sent",
    sorter: {
      compare: (a, b) => a.sent - b.sent,
      multiple: 1,
    },
  },
  {
    title: "Appt Type, Date, Time",
    dataIndex: "appt",
    sorter: {
      compare: (a, b) => a.appt - b.appt,
      multiple: 1,
    },
  },
  {
    title: "Resend",
    dataIndex: "resend",
    slots: {
      customRender: "resend",
    },
  },
];
const data = [
  {
    key: "1",
    type: "comment",
    status: "Delievered",
    message: "Appointment Reminder",
    patient: "Jane Doe",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: "Steve Smith",
  },
  {
    key: "2",
    type: "voiceMail",
    status: "Voice Mail",
    message: "Recall Reminder",
    patient: "Steve Smith",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: "Robert Henry",
  },
  {
    key: "3",
    type: "sent",
    status: "Sent",
    message: "Patient Message",
    patient: "Joseph Spouse",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: "Jane Doe",
  },
  {
    key: "4",
    type: "mail",
    status: "Sent",
    message: "Portal Invitation",
    patient: "Robert Henry",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: "Jane Doe",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    UserOutlined,
    MessageOutlined,
    CommentOutlined,
    PhoneOutlined,
    MailOutlined,
  },

  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
      data,
      columns,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
    };
  },
};
</script>
