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
          ><Sidebar
        /></a-layout-sider>
        <a-layout-content>
          <a-row class="mb-24">
            <a-col :span="24">
              <h2 class="pageTittle">Dashboard</h2>
            </a-col>
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col flex="1 0 0%">
                  <div class="topBox one">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h5>10</h5>
                    <p>Total Patients</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
                  <div class="topBox two">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h5>10</h5>
                    <p>Total Patients</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
                  <div class="topBox three">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h5>10</h5>
                    <p>Total Patients</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
                  <div class="topBox four">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h5>10</h5>
                    <p>Total Patients</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
                  <div class="topBox five">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h5>10</h5>
                    <p>Total Patients</p>
                  </div>
                </a-col>
                <a-col flex="1 0 0%">
                  <div class="topBox six">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h5>10</h5>
                    <p>Total Patients</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-card title="Patients Stats" class="common-card">
                <div class="list-group">
                  <div class="list-group-item">
                    <div class="thumb-image">
                      <img src="../../assets/images/profile.jpg" alt="" width="30" />
                    </div>
                    <div class="name">Jane Doe</div>
                    <div class="progress-bar">
                      <a-progress :percent="30" />
                    </div>
                  </div>
                  <div class="list-group-item">
                    <div class="thumb-image">
                      <img src="../../assets/images/profile.jpg" alt="" width="30" />
                    </div>
                    <div class="name">Jane Doe</div>
                    <div class="progress-bar">
                      <a-progress :percent="30" />
                    </div>
                  </div>
                  <div class="list-group-item">
                    <div class="thumb-image">
                      <img src="../../assets/images/profile.jpg" alt="" width="30" />
                    </div>
                    <div class="name">Jane Doe</div>
                    <div class="progress-bar">
                      <a-progress :percent="30" />
                    </div>
                  </div>
                  <div class="list-group-item">
                    <div class="thumb-image">
                      <img src="../../assets/images/profile.jpg" alt="" width="30" />
                    </div>
                    <div class="name">Jane Doe</div>
                    <div class="progress-bar">
                      <a-progress :percent="30" />
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card title="Virtual Waiting Room" class="common-card">
                <a-tabs v-model:activeKey="activeKey">
                  <a-tab-pane key="1" tab="New Requests">
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" size="small" />
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Future Appointments" force-render>
                   <a-table :dataSource="dataSource" :columns="columns" :pagination="false" size="small" />
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-card title="Total Patients Chart" class="common-card">
                <apexchart
                  type="area"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card title="Appointment Summary" class="common-card">
                <apexchart
                  type="area"
                  height="350"
                  :options="chartOptions"
                  :series="series"
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
import Header from "../layout/header/header";
import Sidebar from "../layout/sidebar/sidebar";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  data: function () {
    return {
      activeKey: ref("1"),

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
    };
  },
  setup() {
    const router = useRouter();
    function logout() {
      localStorage.removeItem("auth");
      localStorage.clear();
      // router.push({
      //     path: '/'
      // })
    }
    return {
      logout,
      dataSource: [
          {
            key: '1',
            date: 'Mike',
            patient: 'John',
            action: '10 Downing Street',
          },
          {
            key: '2',
            date: 'John',
            patient: 'John',
            action: 'John',
          },
        ],

        columns: [
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
          },
        ],


    };
  },
};
</script>
