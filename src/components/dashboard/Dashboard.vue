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
                {{$t('global.dashboard')}}
                <div class="filter">
                  <button class="btn active">
                    <span class="btn-content">{{$t('global.day')}}</span>
                  </button>
                  <button class="btn">
                    <span class="btn-content">{{$t('global.week')}}</span>
                  </button>
                  <button class="btn">
                    <span class="btn-content">{{$t('global.month')}}</span>
                  </button>
                </div>
              </h2>
            </a-col>
            <a-col :span="24">
              <a-row :gutter="24">
                <Card customClass="one" :count="10" :text='totalPatients' link="manage-patients"></Card>
                <Card customClass="two" :count="10" text='newPatients' link="manage-patients"></Card>
                <Card customClass="three" :count="10" text='criticalPatients' link="manage-patients"></Card>
                <Card customClass="four" :count="10" text='abnormalPatients' link="manage-patients"></Card>
                <Card customClass="five" :count="10" text='activePatients' link="manage-patients"></Card>
                <Card customClass="six" :count="10" text='inactivePatients' link="manage-patients"></Card>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <Appointement :appointment="data4" :columns="columns4" :title="$t('dashboard.todayAppointment')">
            </Appointement>
            <a-col :sm="12" :xs="24">
              <ApexChart :title="$t('global.callQueue')" type="bar" height="250" :options="calloption"
                :series="callseries" linkTo="communications" />
            </a-col>
            <a-col :sm="12" :xs="24">

              <ApexChart title="Patients Stats" type="bar" height="412" :options="option1" :series="series1"
                link="manage-patients"></ApexChart>

            </a-col>
            <a-col :sm="12" :xs="24">
              <a-card :title="$t('dashboard.careCoordinatorStats') " class="common-card">
                <a-tabs v-model:activeKey="activeKey1">
                  <a-tab-pane key="1" tab="Specialization ">
                    <ApexChart type="bar" height="350" :options="wellness" :series="behavior"
                      linkTo="manage-care-coordinator"></ApexChart>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Network " force-render>
                    <ApexChart type="bar" height="350" :options="In" :series="Out" linkTo="manage-care-coordinator">
                    </ApexChart>
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-col>
            <a-col :sm="12" :xs="24">

              <ApexChart :title="$t('dashboard.cPTCodeBillingSummary')" type="bar" height="350" :options="code"
                :series="value" linkTo="cpt-codes"></ApexChart>

            </a-col>
            <a-col :sm="12" :xs="24">

              <!-- <div class="list-group">
                  <div class="list-group-item">
                    <div class="name">Billed</div>
                    <div class="value">4567 $</div>
                  </div>
                </div> -->
              <ApexChart :title="$t('dashboard.financialStats')" type="pie" height="362" :options="billed" :series="due"
                linkTo="time-tracking-report"></ApexChart>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :sm="12" :xs="24">

              <ApexChart :title="$t('dashboard.totalPatientsChart')" type="area" height="350" :options="chartOptions"
                :series="series" linkTo="manage-patients"></ApexChart>

            </a-col>
            <a-col :sm="12" :xs="24">
              <ApexChart :title="$t('dashboard.appointmentSummary')" type="area" height="350" :options="chartOptions"
                :series="series" linkTo="appointment-calendar"></ApexChart>
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
import Card from "@/components/common/cards/Card"
import Appointement from "./Appointment"
import ApexChart from "@/components/common/charts/ApexChart";
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
    Card,
    Appointement,
    ApexChart
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

    setup(props, { emit }) {

      const totalPatients = "totalPatients"
      const router = useRouter();



      function logout() {
        localStorage.removeItem("auth");
        localStorage.clear();
      }

      const button = ref(1);

      function showButton1() {
        button.value = 1;
      }
      function showButton2() {
        button.value = 2;
      }
      function showButton3() {
        button.value = 3;
      }
      return {
        logout,
        data4,
        columns4,
        data5,
        columns5,
        data6,
        columns6,
        button,
        showButton1,
        showButton2,
        showButton3,
        totalPatients,
      };
    },
  };
</script>