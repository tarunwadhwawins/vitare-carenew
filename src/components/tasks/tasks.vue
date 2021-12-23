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
          <div class="tasks">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  Tasks
                  <div class="addtaskButton">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add New Task</a-button
                    >
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
            </a-row>
            <div class="dashboard-view" v-show="toggle">
              <a-row class="mb-24" :gutter="24">
                <a-col :xl="6" :sm="8" :xs="12">
                  <div class="blockLists five">
                    <h4>Completed Tasks</h4>
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="0">
                              <a href="http://www.alipay.com/">Urgent</a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="http://www.taobao.com/">2nd menu item</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <h5>100</h5>
                    <p>Task Count</p>
                  </div>
                </a-col>
                <a-col :xl="6" :sm="8" :xs="12">
                  <div class="blockLists three">
                    <h4>InComplete Tasks</h4>
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="0">
                              <a href="http://www.alipay.com/">1st menu item</a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="http://www.taobao.com/">2nd menu item</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <h5>18</h5>
                    <p>Task Count</p>
                  </div>
                </a-col>
                <a-col :xl="6" :sm="8" :xs="12">
                  <div class="blockLists six">
                    <h4>Overdue Tasks</h4>
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="0">
                              <a href="http://www.alipay.com/">1st menu item</a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="http://www.taobao.com/">2nd menu item</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <h5>0</h5>
                    <p>Task Count</p>
                  </div>
                </a-col>
                <a-col :xl="6" :sm="8" :xs="12">
                  <div class="blockLists two">
                    <h4>Total Tasks</h4>
                    <div class="filter"></div>
                    <h5>118</h5>
                    <p>Task Count</p>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :md="8" :sm="12" :xs="24">
                  <a-card title="Incomplete Tasks" class="common-card">
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked1"
                                  >Urgent</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked2"
                                  >High</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked3"
                                  >Normal</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <apexchart
                      type="bar"
                      height="250"
                      :options="Incompleteoption"
                      :series="Incompleteseries"
                       @click="clickHandler2"
                    ></apexchart>
                  </a-card>
                </a-col>
                <a-col :md="8" :sm="12" :xs="24">
                  <a-card title="Team Member" class="common-card">
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked4"
                                  >Badger</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked5"
                                  >Devin</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked6"
                                  >Matt</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked7"
                                  >John</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <apexchart
                      type="bar"
                      height="250"
                      :options="teamoption"
                      :series="teamseries"
                       @click="clickHandler"
                    ></apexchart>
                  </a-card>
                </a-col>
                <a-col :md="8" :sm="12" :xs="24">
                  <a-card title="Task Completion over" class="common-card">
                    <apexchart
                      type="area"
                      height="250"
                      :options="chartOptions"
                      :series="series"
                      @click="clickHandler2"
                    ></apexchart>
                  </a-card>
                </a-col>
                <a-col :md="8" :sm="12" :xs="24">
                  <a-card title="All Tasks" class="common-card">
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked8"
                                  >Completed</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked9"
                                  >Incomplete</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <apexchart
                      type="pie"
                      height="350"
                      :options="completed"
                      :series="incomplete"
                      @click="clickHandler2"
                    ></apexchart>
                  </a-card>
                </a-col>
                <a-col :md="8" :sm="12" :xs="24">
                  <a-card title="Category View" class="common-card">
                    <div class="filter">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent>
                          <FilterOutlined /> Filter
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked10"
                                  >Clinical</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked11"
                                  >Comm</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked12"
                                  >Admin</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="checkbox">
                                <a-checkbox v-model:checked="checked13"
                                  >Internal</a-checkbox
                                >
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <apexchart
                      type="pie"
                      height="300"
                      :options="premium"
                      :series="business"
                      @click="clickHandler2"
                    ></apexchart>
                  </a-card>
                </a-col>
                <a-col :md="8" :sm="12" :xs="24">
                  <a-card title="Completion Rate" class="common-card">
                    <h4>85%</h4>
                    <p>Sum of Completion Rate</p>
                  </a-card>
                </a-col>
              </a-row>
            </div>
            <div class="list-view" v-show="!toggle">
              <a-row :gutter="24">
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
                <a-col :sm="24">
                  <a-table
                    :columns="columns"
                    :data-source="data"
                    :scroll="{ x: 900 }"
                    :pagination="false"
                    @change="onChange"
                  >
                    <template #name="text">
                      <router-link to="#">{{ text.text }}</router-link>
                    </template>
                    <template #assigned="text">
                      <router-link to="corrdinator-summary">{{ text.text }}</router-link>
                    </template>
                    <template #status="key">
                      <a-switch v-model:checked="checked[key.record.key]" />
                    </template>
                    <template #action>
                      <a class="icons"><EditOutlined /></a>
                      <a class="icons"> <DeleteOutlined /></a>
                      <router-link to="appointment-calendar" class="icons">
                        <CalendarOutlined
                      /></router-link>
                    </template>
                  </a-table>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
    <TasksModal v-model:visible="TasksModal" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import TasksModal from "@/components/modals/TasksModal";
import { useRouter } from "vue-router";
import { ref } from "vue";
import {
  FilterOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";

const columns = [
  {
    title: "Task Name",
    dataIndex: "name",
    slots: {
      customRender: "name",
    },
    filters: [
      {
        text: "Task 1",
        value: "task 1",
      },
      {
        text: "Task 2",
        value: "task 2",
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Status ",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "Priority ",
    dataIndex: "priority",
    filters: [
      {
        text: "High",
        value: "high",
      },
      {
        text: "Normal",
        value: "normal",
      },
      {
        text: "Urgent",
        value: "urgent",
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Category ",
    dataIndex: "category",
    filters: [
      {
        text: "Clinical",
        value: "clinical",
      },
      {
        text: "Comm",
        value: "comm",
      },
      {
        text: "Admin",
        value: "admin",
      },
      {
        text: "Internal",
        value: "internal",
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Due Date ",
    dataIndex: "duedate",
    filters: [
      {
        text: "Dec 24, 2021",
        value: "Dec 24, 2021",
      },
      {
        text: "Dec 28, 2021",
        value: "Dec 28, 2021",
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Assigned By",
    dataIndex: "assigned",
    filters: [
      {
        text: "John",
        value: "John",
      },
      {
        text: "	Devin",
        value: "	Devin",
      },
    ],
     slots: {
      customRender: "assigned",
    },
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data = [
  {
    key: "1",
    name: " Task 1",
    status: "",
    priority: "High",
    category: "Clinical",
    duedate: "Dec 24, 2021",
    assigned: "John",
    actions: "",
  },
  {
    key: "2",
    name: "Task 2",
    status: "",
    priority: "Normal",
    category: "Internal",
    duedate: "Dec 28, 2021",
    assigned: "Devin",
    actions: "",
  },
  {
    key: "3",
    name: " Task 3",
    status: "",
    priority: "Critical ",
    category: "Comm",
    duedate: "Dec 29, 2021",
    assigned: "Smith",
    actions: "",
  },
  {
    key: "4",
    name: "Task 4",
    status: "",
    priority: "Normal",
    category: "Admin",
    duedate: "Dec 30, 2021",
    assigned: "Andrew",
    actions: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    TasksModal,
    FilterOutlined,
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
  },

  data: function () {
    return {
      Incompleteoption: {
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
        colors: ["#E30D2A", "#00897b", "#267dff"],
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
          categories: ["Urgent  ", "High", "Normal"],
        },
        yaxis: {
          title: {
            text: "Task Count",
          },
        },
      },
      Incompleteseries: [
        {
          name: "Task Count",
          data: [45, 32, 23],
        },
      ],

      teamoption: {
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
          height: 412,
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
          categories: ["Badger ", "Devin ", "Matt ", "John"],
        },
        yaxis: {
          title: {
            text: "Task Count",
          },
        },
      },
      teamseries: [
        {
          name: "Task Count",
          data: [34, 23, 12, 15],
        },
      ],

      chartOptions: {
        chart: {
          height: 412,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#0fb5c2", "#ff6061"],
        stroke: {
          curve: "smooth",
        },
        // xaxis: {
        //   type: "datetime",
        //   categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z"],
        // },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      series: [
        {
          name: "Complete",
          data: [50, 90],
        },
        {
          name: "Incomplete",
          data: [8, 10],
        },
      ],

      incomplete: [4567, 1000],
      completed: {
        chart: {
          type: "pie",
        },
        labels: ["Completed", "Incomplete"],
        colors: ["#0fb5c2", "#ff6061"],
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

      business: [45, 12, 23, 20],
      premium: {
        chart: {
          width: 412,
          type: "pie",
        },
        labels: ["Clinical", "Comm", "Admin", "Internal"],
        colors: ["#0fb5c2", "#40a9ff", "#267dff", "#8e60ff"],
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
    };
  },
  setup() {
    const router = useRouter();

    function clickHandler(event, chartContext, config) {
      router.push({ path: "corrdinator-summary" });
    }
    function clickHandler2(event, chartContext, config) {
      router.push({ path: "time-tracking-report" });
    }
    const checked = ref([false]);
    const checked1 = ref(false);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const checked5 = ref(false);
    const checked6 = ref(false);
    const checked7 = ref(false);
    const checked8 = ref(false);
    const checked9 = ref(false);
    const checked10 = ref(false);
    const checked11 = ref(false);
    const checked12 = ref(false);
    const checked13 = ref(false);
    const toggle = ref(true);

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const TasksModal = ref(false);
    const showModal = () => {
      TasksModal.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      TasksModal.value = false;
    };

    return {
      data,
      columns,
      checked,
      toggle,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
      checked8,
      checked9,
      checked10,
      checked11,
      checked12,
      checked13,

      TasksModal,
      showModal,
      handleOk,
      clickHandler,
      clickHandler2,

      handleChange,
    };
  },
};
</script>
