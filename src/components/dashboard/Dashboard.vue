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
              <h2 class="pageTittle">
                Dashboard

                <div class="filter">
                  <a-button
                    @click="showButton1"
                    :class="button == 1 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton2"
                    :class="button == 2 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton3"
                    :class="button == 3 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton4"
                    :class="button == 4 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
              </h2>
            </a-col>
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox one">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Total Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox two">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>New Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox three">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Critical Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox four">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Out of Range</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox redBgColor">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Non Compliant</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox five">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Active Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="3" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox six">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Inactive Patients</p>
                    </div>
                  </router-link>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
              <a-card title="Today's Appointment" class="common-card">
                <div class="apptNumber">
                  <h3>Total Apppointments</h3>
                  <h2>15</h2>
                </div>
                <!-- <a-table
                  :columns="columns4"
                  :data-source="data4"
                  :pagination="false"
                >
                  <template #patientName="text">
                    <router-link to="patients-summary">{{
                      text.text
                    }}</router-link>
                  </template>
                  <template #appt="text">
                    <router-link to="corrdinator-summary">{{
                      text.text
                    }}</router-link>
                  </template>
                </a-table> -->
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="Call Queue" class="common-card">
                <div class="filter">
                  <a-button
                    @click="showButton5"
                    :class="button1 == 5 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton6"
                    :class="button1 == 6 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton7"
                    :class="button1 == 7 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton8"
                    :class="button1 == 8 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <apexchart
                  type="bar"
                  height="250"
                  :options="calloption"
                  :series="callseries"
                  @click="clickHandler"
                ></apexchart>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card
                title="Clinical RPM Stats / CCM Stats"
                class="common-card"
              >
                <div class="filter">
                  <a-button
                    @click="showButton9"
                    :class="button2 == 9 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton10"
                    :class="button2 == 10 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton11"
                    :class="button2 == 11 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton12"
                    :class="button2 == 12 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <apexchart
                  type="bar"
                  height="412"
                  :options="option1"
                  :series="series1"
                  @click="clickHandler2"
                ></apexchart>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="Care Coordinator Stats " class="common-card">
                <div class="filter">
                  <a-button
                    @click="showButton13"
                    :class="button3 == 13 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton14"
                    :class="button3 == 14 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton15"
                    :class="button3 == 15 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton16"
                    :class="button3 == 16 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <a-tabs v-model:activeKey="activeKey1">
                  <a-tab-pane key="1" tab="Specialization ">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="wellness"
                      :series="behavior"
                      @click="clickHandler3"
                    ></apexchart>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Network " force-render>
                    <apexchart
                      type="bar"
                      height="350"
                      :options="In"
                      :series="Out"
                      @click="clickHandler3"
                    ></apexchart>
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="CPT Code Billing Summary" class="common-card">
                <div class="filter">
                  <a-button
                    @click="showButton17"
                    :class="button4 == 17 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton18"
                    :class="button4 == 18 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton19"
                    :class="button4 == 19 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton20"
                    :class="button4 == 20 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <apexchart
                  type="bar"
                  height="350"
                  :options="code"
                  :series="value"
                  @click="clickHandler4"
                ></apexchart>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="Financial Stats" class="common-card">
                <div class="filter">
                  <a-button
                    @click="showButton21"
                    :class="button5 == 21 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton22"
                    :class="button5 == 22 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton23"
                    :class="button5 == 23 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton24"
                    :class="button5 == 24 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <!-- <div class="list-group">
                  <div class="list-group-item">
                    <div class="name">Billed</div>
                    <div class="value">4567 $</div>
                  </div>
                </div> -->
                <apexchart
                  type="pie"
                  height="362"
                  :options="billed"
                  :series="due"
                  @click="clickHandler6"
                ></apexchart>
              </a-card>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
              <a-card title="Total Patients Chart" class="common-card">
                <div class="filter">
                  <a-button
                    @click="showButton25"
                    :class="button6 == 25 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton26"
                    :class="button6 == 26 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton27"
                    :class="button6 == 27 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton28"
                    :class="button6 == 28 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <apexchart
                  type="area"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                  @click="clickHandler2"
                ></apexchart>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="Appointment Summary" class="common-card">
                <div class="filter">
                  <a-button
                    @click="showButton29"
                    :class="button7 == 29 ? 'active' : ''"
                    >1 Day</a-button
                  >
                  <a-button
                    @click="showButton30"
                    :class="button7 == 30 ? 'active' : ''"
                    >1 Week</a-button
                  >
                  <a-button
                    @click="showButton31"
                    :class="button7 == 31 ? 'active' : ''"
                    >1 Month</a-button
                  >
                  <a-button
                    @click="showButton32"
                    :class="button7 == 32 ? 'active' : ''"
                    >Year</a-button
                  >
                </div>
                <apexchart
                  type="area"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                  @click="clickHandler5"
                ></apexchart>
              </a-card>
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
import { provide } from "vue";
import { ref, computed } from "vue";

// import { UserOutlined } from "@ant-design/icons-vue";
const columns4 = [
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
const data4 = [
  {
    key: "1",
    patient: "Steve Smith",
    date: "Dec 20, 2021 - 10:30 AM",
    appt: "Joseph",
  },
  {
    key: "2",
    patient: "Jane Doe",
    date: "Dec 20, 2021 - 11:30 AM",
    appt: "Robert",
  },
  {
    key: "3",
    patient: "Henry Joseph",
    date: "Dec 20, 2021 - 01:00 PM",
    appt: "Robert",
  },
  {
    key: "4",
    patient: "Carol Liam",
    date: "Dec 20, 2021 - 04:15 PM",
    appt: "Robert",
  },
  {
    key: "6",
    patient: "Brett William",
    date: "Dec 20, 2021 - 04:45 PM",
    appt: "Joseph",
  },
  {
    key: "7",
    patient: "John Smith",
    date: "Dec 20, 2021 - 05:20 PM",
    appt: "Joseph",
  },
];
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
    patient: "	Steve",
    appt: "Clinical",
    time: "10:30 AM",
  },
];
export default {
  components: {
    Header,
    Sidebar,
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
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
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
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            borderRadius: 10,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#267dff", "#00897b", "#E30D2A"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2", "#e3e3e3"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["2020", "2021", "2022"],
        },
        yaxis: {
          title: {
            text: "Patients",
          },
        },
      },
      series1: [
        {
          name: "Normal",
          data: [44, 55, 57],
        },
        {
          name: "High",
          data: [76, 85, 101],
        },
        {
          name: "Critical",
          data: [35, 41, 36],
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
          categories: ["Call scheduled", "Call made", "Avg Duration"],
        },
        yaxis: {
          title: {
            text: "Number of Count",
          },
        },
      },
      callseries: [
        {
          name: "Value",
          data: [12, 8, 6],
        },
      ],
    };
  },
  setup(props, { emit }) {
    const router = useRouter();
    function clickHandler(event, chartContext, config) {
      // emit('listView',false)
      provide("listView", false);
      router.push({ path: "communications" });
    }
    function clickHandler2(event, chartContext, config) {
      router.push({ path: "manage-patients" });
    }
    function clickHandler3(event, chartContext, config) {
      router.push({ path: "manage-care-coordinator" });
    }
    function clickHandler4(event, chartContext, config) {
      router.push({ path: "cpt-codes" });
    }
    function clickHandler5(event, chartContext, config) {
      router.push({ path: "appointment-calendar" });
    }
    function clickHandler6(event, chartContext, config) {
      router.push({ path: "time-tracking-report" });
    }

    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
      // router.push({
      //     path: '/'
      // })
    }

    const button = ref(1);
    const button1 = ref(5);
    const button2 = ref(9);
    const button3 = ref(13);
    const button4 = ref(17);
    const button5 = ref(21);
    const button6 = ref(25);
    const button7 = ref(29);

    function showButton1() {
      button.value = 1;
    }
    function showButton2() {
      button.value = 2;
    }
    function showButton3() {
      button.value = 3;
    }
    function showButton4() {
      button.value = 4;
    }
    function showButton5() {
      button1.value = 5;
    }
    function showButton6() {
      button1.value = 6;
    }
    function showButton7() {
      button1.value = 7;
    }
    function showButton8() {
      button1.value = 8;
    }
    function showButton9() {
      button2.value = 9;
    }
    function showButton10() {
      button2.value = 10;
    }
    function showButton11() {
      button2.value = 11;
    }
    function showButton12() {
      button2.value = 12;
    }
    function showButton13() {
      button3.value = 13;
    }
    function showButton14() {
      button3.value = 14;
    }
    function showButton15() {
      button3.value = 15;
    }
    function showButton16() {
      button3.value = 16;
    }
    function showButton17() {
      button4.value = 17;
    }
    function showButton18() {
      button4.value = 18;
    }
    function showButton19() {
      button4.value = 19;
    }
    function showButton20() {
      button4.value = 20;
    }
    function showButton21() {
      button5.value = 21;
    }
    function showButton22() {
      button5.value = 22;
    }
    function showButton23() {
      button5.value = 23;
    }
    function showButton24() {
      button5.value = 4;
    }
    function showButton25() {
      button6.value = 25;
    }
    function showButton26() {
      button6.value = 26;
    }
    function showButton27() {
      button6.value = 27;
    }
    function showButton28() {
      button6.value = 28;
    }
    function showButton29() {
      button7.value = 29;
    }
    function showButton30() {
      button7.value = 30;
    }
    function showButton31() {
      button7.value = 31;
    }
    function showButton32() {
      button7.value = 32;
    }
    return {
      logout,
      data4,
      columns4,
      data5,
      columns5,
      data6,
      columns6,
      clickHandler,
      clickHandler2,
      clickHandler3,
      clickHandler4,
      clickHandler5,
      clickHandler6,
      button,
      button1,
      button2,
      button3,
      button4,
      button5,
      button6,
      button7,
      showButton1,
      showButton2,
      showButton3,
      showButton4,
      showButton5,
      showButton6,
      showButton7,
      showButton8,
      showButton9,
      showButton10,
      showButton11,
      showButton12,
      showButton13,
      showButton14,
      showButton15,
      showButton16,
      showButton17,
      showButton18,
      showButton19,
      showButton20,
      showButton21,
      showButton22,
      showButton23,
      showButton24,
      showButton25,
      showButton26,
      showButton27,
      showButton28,
      showButton29,
      showButton30,
      showButton31,
      showButton32,
    };
  },
};
</script>
