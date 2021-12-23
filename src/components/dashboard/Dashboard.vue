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
                  <button class="btn active">
                    <span class="btn-content">Day</span>
                  </button>
                  <button class="btn">
                    <span class="btn-content">Week</span>
                  </button>
                  <button class="btn">
                    <span class="btn-content">Month</span>
                  </button>
                </div>
              </h2>
            </a-col>
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col :xl="4" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox one">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Total Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox two">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>New Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox three">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Critical Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox four">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Abnormal Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="12">
                  <router-link to="manage-patients">
                    <div class="topBox five">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <h5>10</h5>
                      <p>Active Patients</p>
                    </div>
                  </router-link>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="12">
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
                <a-table
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
                </a-table>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="Call Queue" class="common-card">
                <apexchart type="bar" height="250" :options="calloption" :series="callseries" @click="clickHandler"></apexchart>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card title="Patients Stats" class="common-card">
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
  setup() {
    const router = useRouter();
    function clickHandler(event, chartContext, config){
        router.push({path:'communications'})
    }
    function clickHandler2(event, chartContext, config){
        router.push({path:'manage-patients'})
    }
    function clickHandler3(event, chartContext, config){
        router.push({path:'manage-care-coordinator'})
    }
    function clickHandler4(event, chartContext, config){
        router.push({path:'cpt-codes'})
    }
    function clickHandler5(event, chartContext, config){
        router.push({path:'appointment-calendar'})
    }
    function clickHandler6(event, chartContext, config){
        router.push({path:'time-tracking-report'})
    }
    
    

    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
      // router.push({
      //     path: '/'
      // })
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
    };
  },
};
</script>
