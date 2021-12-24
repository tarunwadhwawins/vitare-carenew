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
                <div class="addtaskButton">
                  <a-button class="btn blueBtn">Start Call</a-button>
                  <a-button class="btn primaryBtn" @click="showModal"
                    >Send Message</a-button
                  >
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>Email</span>
                    </template>
                    <a-button
                      type="primary"
                      :size="small"
                      @click="openNotification('bottomRight')"
                    >
                      <template #icon>
                        <MailOutlined />
                      </template>
                    </a-button>
                  </a-tooltip>

                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>SMS</span>
                    </template>
                    <a-button
                      type="primary"
                      :size="small"
                      @click="openNotification1('bottomRight')"
                    >
                      <template #icon>
                        <MessageOutlined />
                      </template>
                    </a-button>
                  </a-tooltip>

                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>Reminder</span>
                    </template>
                    <a-button
                      type="primary"
                      :size="small"
                      @click="openNotification2('bottomRight')"
                    >
                      <template #icon>
                        <AlertOutlined />
                      </template>
                    </a-button>
                  </a-tooltip>

                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>Call</span>
                    </template>
                    <a-button
                      type="primary"
                      :size="small"
                      @click="openNotification3('bottomRight')"
                    >
                      <template #icon>
                        <PhoneOutlined />
                      </template>
                    </a-button>
                  </a-tooltip>
                  <!-- <a-button @click="openNotification">Email</a-button>
                  <a-button @click="openNotification1">SMS</a-button>
                  <a-button @click="openNotification2">Reminder</a-button>
                  <a-button @click="openNotification3">Call</a-button> -->
                </div>
                <div class="filter">
                  <button
                    class="btn"
                    :class="toggle ? 'active' : ''"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">Dashboard View</span>
                  </button>
                  <button
                    class="btn"
                    :class="toggle ? '' : 'active'"
                    @click="toggle = !toggle"
                  >
                    <span class="btn-content">List View</span>
                  </button>
                </div>
              </h2>
            </a-col>
            <a-col :span="24">
              <div class="dashboard-view" v-show="toggle">
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
                  <a-col :sm="12" :xs="24">
                    <a-card title="Call Planned" class="common-card">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="calloption"
                        :series="callseries"
                        @click="clickHandler"
                      ></apexchart>
                    </a-card>
                  </a-col>
                  <a-col :sm="12" :xs="24">
                    <a-card title="Call Queue" class="common-card">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="callqueoption"
                        :series="callqueseries"
                        @click="clickHandler2"
                      ></apexchart>
                    </a-card>
                  </a-col>
                  <a-col :sm="12" :xs="24">
                    <a-card title="Populate Waiting Room" class="common-card">
                      <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1" tab="New Requests">
                          <a-table
                            :columns="columns5"
                            :data-source="data5"
                            :pagination="false"
                          >
                            <template #patientName="text">
                              <router-link to="patients-summary">{{
                                text.text
                              }}</router-link>
                            </template>
                            <template #action>
                              <a-button class="btn blueBtn">Start</a-button>
                            </template>
                          </a-table>
                        </a-tab-pane>
                        <a-tab-pane
                          key="2"
                          tab="Future Appointments"
                          force-render
                        >
                          <a-table
                            :columns="columns6"
                            :data-source="data6"
                            :pagination="false"
                          >
                            <template #patientName="text">
                              <router-link to="patients-summary">{{
                                text.text
                              }}</router-link>
                            </template>
                          </a-table>
                        </a-tab-pane>
                      </a-tabs>
                    </a-card>
                  </a-col>

                  <a-col :sm="12" :xs="24">
                    <a-card title="Communication Type" class="common-card">
                      <apexchart
                        type="area"
                        height="245"
                        :options="chartOptions"
                        :series="series"
                        @click="clickHandler2"
                      ></apexchart>
                    </a-card>
                  </a-col>
                </a-row>
              </div>
              <div class="list-view" v-show="!toggle">
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
                      :columns="columns"
                      :data-source="data"
                      :scroll="{ x: 900 }"
                      @change="onChange"
                    >
                      <template #resend>
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>Message</span>
                          </template>
                           <a class="icons"><MessageOutlined /></a>
                        </a-tooltip>
                       
                      </template>
                      <template #patient="text">
                        <router-link to="patients-summary">{{
                          text.text
                        }}</router-link>
                      </template>
                      <template #staff="text">
                        <router-link to="corrdinator-summary">{{
                          text.text[0]
                        }}</router-link
                        ><br />
                        <router-link to="corrdinator-summary">{{
                          text.text[1]
                        }}</router-link>
                      </template>

                      <template #status="{ text }">
                        <span class="circleBox" :class="text"></span>
                        <span
                          class="box"
                          :class="(text = text.match(/yellowBgColor/g))"
                          v-if="text.match(/yellowBgColor/g)"
                        ></span>
                      </template>

                      <template #type="{ text }">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>Comment</span>
                          </template>
                           <a class="icons" v-if="text == 'comment'"
                          ><CommentOutlined
                        /></a>
                        </a-tooltip>
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>Voice Mail</span>
                          </template>
                             <a class="icons" v-if="text == 'voiceMail'"
                          ><PhoneOutlined
                        /></a>
                        </a-tooltip>
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>Sent</span>
                          </template>
                             <a class="icons" v-if="text == 'sent'"
                          ><PhoneOutlined
                        /></a>
                        </a-tooltip>
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>Mail</span>
                          </template>
                             <a class="icons" v-if="text == 'mail'"
                          ><MailOutlined
                        /></a>
                        </a-tooltip>

                      </template>
                    </a-table>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col :span="24"> </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <CommunicationsModal v-model:visible="CommunicationsModal" @ok="handleOk" />
    <!---->
  </div>
</template>
<!---->
<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { defineComponent, ref, h } from "vue";
import { notification, Button } from "ant-design-vue";
import { useRouter } from "vue-router";
import CommunicationsModal from "@/components/modals/CommunicationsModal";
import {
  UserOutlined,
  MessageOutlined,
  CommentOutlined,
  PhoneOutlined,
  MailOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};
const columns = [
  {
    title: "Patient",
    dataIndex: "patient",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
    slots: {
      customRender: "patient",
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
    slots: {
      customRender: "status",
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
    title: "Actions",
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
    status: "greenBgColor",
    message: "Appointment Reminder",
    patient: "Jane Doe",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Steve Smith", "Jane Doe"],
  },
  {
    key: "2",
    type: "voiceMail",
    status: "three",
    message: "Recall Reminder",
    patient: "Steve Smith",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Robert Henry"],
  },
  {
    key: "3",
    type: "sent",
    status: "blue",
    message: "Patient Message",
    patient: "Joseph Spouse",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Jane Doe"],
  },
  {
    key: "4",
    type: "mail",
    status: "greenBgColor",
    message: "Portal Invitation",
    patient: "Robert Henry",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Jane Doe"],
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
    AlertOutlined,
    CommunicationsModal,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          // width: [5, 7, 5, 8],
          curve: "straight",
          // dashArray: [0, 8, 5, 6],
        },
        xaxis: {
          categories: ["10", "12", "2", "4", "6", "8"],
        },
        tooltip: {
          x: {
            // format: "dd/MM/yy HH:mm",/
          },
        },
      },
      series: [
        {
          name: "SMS",
          data: [15, 16, 18, 15, 14, 17, 18],
        },
        {
          name: "Reminder",
          data: [12, 14, 15, 13, 12, 15, 14],
        },
        {
          name: "Call",
          data: [11, 10, 11, 9, 10, 9, 11],
        },
        {
          name: "Email",
          data: [8, 7, 6, 8, 7, 8, 6],
        },
      ],

      due: [4567, 1000],
      billed: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Billed", "Due"],
        colors: ["#267dff", "#E30D2A"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      wellness: {
        annotations: {
          points: [
            {
              x: "Wellness",
              seriesIndex: 0,
              label: {
                borderColor: "#ff0000",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#ff0000",
                },
                // text: "Bananas are good",
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        colors: ["#8e60ff", "#ffa800"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["Wellness", "Behavior"],
        },
        yaxis: {
          title: {
            text: "Specialization",
          },
        },
      },
      behavior: [
        {
          name: "Specialization",
          data: [1, 2],
        },
      ],

      In: {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
                // text: "Bananas are good",
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#267dff", "#0fb5c2"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["In", "Out"],
        },
        yaxis: {
          title: {
            text: "Network",
          },
        },
      },
      Out: [
        {
          name: "Network",
          data: [3, 4],
        },
      ],

      code: {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#3b72c5", "#ffb526", "#419541", "#343470"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["99453", "99454", "99457", "99458 "],
        },
        yaxis: {
          title: {
            text: "Minutes",
          },
        },
      },
      value: [
        {
          name: "Minutes",
          data: [120, 80, 90, 30],
        },
      ],

      option1: {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#267dff", "#00897b", "#E30D2A"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["Normal", "High", "Critical"],
        },
        yaxis: {
          title: {
            text: "Patients",
          },
        },
      },
      series1: [
        {
          name: "Patients",
          data: [45, 12, 34],
        },
      ],
      calloption: {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#269b8f", "#269b8f", "#121258", "#218421"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },

        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["Jane Doe", "Steve Smith", "Henry Joseph", "Carol Liam"],
        },
        yaxis: {
          title: {
            text: "Number of Calls",
          },
        },
      },
      callseries: [
        {
          name: "Value",
          data: [10, 12, 8, 9],
        },
      ],
      callqueoption: {
        annotations: {
          points: [
            {
              x: "In",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "20%",
            barHeight: "100%",
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#121258", "#218421", "#ffb526"],
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },

        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["Going On", "Completed", "In Queue"],
        },
        yaxis: {
          title: {
            text: "Number of Calls",
          },
        },
      },
      callqueseries: [
        {
          name: "Value",
          data: [12, 8, 6],
        },
      ],
    };
  },

  setup() {
    const router = useRouter();
    function clickHandler(event, chartContext, config) {
      router.push({ path: "corrdinator-summary" });
    }
    function clickHandler2(event, chartContext, config) {
      toggle.value = false;
      // router.push({ path: "time-tracking-report" });
    }
    const columns5 = [
      {
        title: "Patient Name",
        dataIndex: "patient",
        slots: {
          customRender: "patientName",
        },
      },
      {
        title: "Appointment Type",
        dataIndex: "appt",
      },
      {
        title: "Time",
        dataIndex: "time",
      },
      {
        title: "Action ",
        dataIndex: "action",
        slots: {
          customRender: "action",
        },
      },
    ];
    const data5 = [
      {
        key: "1",
        patient: "Steve Smith",
        appt: "Wellness",
        time: "01:30 PM",
      },
      {
        key: "2",
        patient: "Jane Doe",
        appt: "Clinical",
        time: "11:30 AM",
      },
      {
        key: "3",
        patient: "Joseph Spouse",
        appt: "Wellness",
        time: "02:30 PM",
      },
    ];
    const columns6 = [
      {
        title: "Patient Name",
        dataIndex: "patient",
        slots: {
          customRender: "patientName",
        },
      },
      {
        title: "Appointment Type",
        dataIndex: "appt",
      },
      {
        title: "Time",
        dataIndex: "time",
      },
    ];
    const data6 = [
      {
        key: "1",
        patient: "Robert",
        appt: "Wellness",
        time: "02:30 PM",
      },
      {
        key: "2",
        patient: "Steve",
        appt: "Clinical",
        time: "10:30 AM",
      },
      {
        key: "3",
        patient: "Jane",
        appt: "Wellness",
        time: "03:30 PM",
      },
      {
        key: "4",
        patient: "Joseph",
        appt: "Clinical",
        time: "04:15 PM",
      },
    ];

    const toggle = ref(true);
    const openNotification = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>Email</h2>,
        description: (
          <div class="notificationBody">
            <p>
              Date Time : <span>December 20, 2021 12:00 PM</span>
            </p>
            <p>
              Patient Name : <span>Jane Doe</span>
            </p>
            <p class="summary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              at incidunt !
            </p>
          </div>
        ),
        btn: h(
          Button,
          {
            type: "primary",
            onClick: () => notification.close(key),
          },
          "Reply"
        ),
        key,
        onClose: close,
        placement,
      });
    };
    const openNotification1 = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>SMS</h2>,
        description: (
          <div class="notificationBody">
            <p>
              Date Time : <span>December 20, 2021 12:00 PM</span>
            </p>
            <p>
              Patient Name : <span>Jane Doe</span>
            </p>
            <p class="summary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              at incidunt !
            </p>
          </div>
        ),
        btn: h(
          Button,
          {
            type: "primary",
            onClick: () => notification.close(key),
          },
          "Reply"
        ),
        key,
        onClose: close,
        placement,
      });
    };
    const openNotification2 = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>Reminder</h2>,
        description: (
          <div class="notificationBody">
            <p>
              Date Time : <span>December 20, 2021 12:00 PM</span>
            </p>
            <p>
              Patient Name : <span>Jane Doe</span>
            </p>
            <p class="summary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              at incidunt !
            </p>
          </div>
        ),
        key,
        onClose: close,
        placement,
      });
    };
    const openNotification3 = (placement) => {
      const key = `open${Date.now()}`;
      notification.open({
        message: <h2>Call</h2>,
        description: (
          <div class="notificationBody">
            <p>
              Date Time : <span>December 20, 2021 12:00 PM</span>
            </p>
            <p>
              Patient Name : <span>Jane Doe</span>
            </p>
            <p class="summary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              at incidunt !
            </p>
          </div>
        ),
        btn: [
          h(
            Button,
            {
              onClick: () => notification.close(key),
            },
            "Cancel "
          ),
          h(
            Button,
            {
              type: "primary",
              onClick: () => notification.close(key),
            },
            "Accept"
          ),
        ],
        key,
        onClose: close,
        placement,
      });
    };

    const CommunicationsModal = ref(false);

    const showEmailpop = ref(false);
    const hideEmailpop = ref(false);
    const showEmail = () => {
      showEmailpop.value = true;
    };
    const hideEmail = () => {
      showEmailpop.value = false;
    };

    const showModal = () => {
      CommunicationsModal.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      CommunicationsModal.value = false;
    };

    return {
      CommunicationsModal,
      showModal,
      handleOk,
      showEmail,
      hideEmail,
      showEmailpop,
      hideEmailpop,

      data,
      columns,
      toggle,
      data6,
      columns6,
      data5,
      columns5,
      openNotification,
      openNotification1,
      openNotification2,
      openNotification3,
      clickHandler,
      clickHandler2,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
    };
  },
};
</script>
