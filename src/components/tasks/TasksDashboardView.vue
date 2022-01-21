<template>
  <a-row class="mb-24" :gutter="24">
    <a-col :xl="6" :sm="8" :xs="12">
      <div class="blockLists five">
        <h4>{{$t('tasks.completedTasks')}}</h4>
        <div class="filter">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <FilterOutlined /> {{$t('global.filter')}}
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
        <p>{{$t('global.taskCount')}}</p>
      </div>
    </a-col>
    <a-col :xl="6" :sm="8" :xs="12">
      <div class="blockLists three">
        <h4>{{$t('tasks.inCompleteTasks')}}</h4>
        <div class="filter">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <FilterOutlined /> {{$t('global.filter')}}
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
        <p>{{$t('global.taskCount')}}</p>
      </div>
    </a-col>
    <a-col :xl="6" :sm="8" :xs="12">
      <div class="blockLists six">
        <h4>{{$t('tasks.overdueTasks')}}</h4>
        <div class="filter">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <FilterOutlined /> {{$t('global.filter')}}
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
        <p>{{$t('global.taskCount')}}</p>
      </div>
    </a-col>
    <a-col :xl="6" :sm="8" :xs="12">
      <div class="blockLists two">
        <h4>{{$t('tasks.totalTasks')}}</h4>
        <div class="filter"></div>
        <h5>118</h5>
        <p>{{$t('global.taskCount')}}</p>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Incomplete Tasks" class="common-card">
        <IncompleteTasksFilter/>
        <ApexChart type="bar" :height="250" :options="incompleteOptions" :series="incompleteSeries" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Team Member" class="common-card">
        <TeamMemberFilter/>
        <ApexChart type="bar" :height="250" :options="teamOptions" :series="teamSeries" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Task Completion over" class="common-card">
        <ApexChart type="area" :height="250" :options="chartOptions" :series="chartSeries" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="All Tasks" class="common-card">
        <AllTasksFilter/>
        <ApexChart type="pie" :height="350" :options="completed" :series="incomplete" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Category View" class="common-card">
        <CategoryViewFilter/>
        <ApexChart type="pie" :height="3050" :options="premium" :series="business" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Completion Rate" class="common-card">
        <h4>85%</h4>
        <p>Sum of Completion Rate</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import {
  FilterOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import ApexChart from "@/components/common/charts/ApexChart";
import IncompleteTasksFilter from "@/components/tasks/chartFilters/IncompleteTasks";
import TeamMemberFilter from "@/components/tasks/chartFilters/TeamMember";
import AllTasksFilter from "@/components/tasks/chartFilters/AllTasks";
import CategoryViewFilter from "@/components/tasks/chartFilters/CategoryView";

export default {
  components: {
    FilterOutlined,
    ApexChart,
    IncompleteTasksFilter,
    TeamMemberFilter,
    AllTasksFilter,
    CategoryViewFilter,
  },
  setup() {
    const toggle = ref(true);
    function clickHandler() {
      toggle.value = false;
    }
    function clickHandler2() {
      toggle.value = false;
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

    const incompleteOptions = {
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
    };
    const incompleteSeries = [
      {
        name: "Task Count",
        data: [45, 32, 23],
      },
    ];

    const teamOptions = {
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
    };
    const teamSeries = [
        {
          name: "Task Count",
          data: [34, 23, 12, 15],
        },
    ];

    const chartOptions = {
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
    };
    const chartSeries = [
      {
        name: "Complete",
        data: [50, 90],
      },
      {
        name: "Incomplete",
        data: [8, 10],
      },
    ];

    const incomplete = [4567, 1000];
    const completed = {
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
    };

    const business = [45, 12, 23, 20];
    const premium = {
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
    };
    
    return {
      clickHandler,
      clickHandler2,
      toggle,
      checked,
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
      incompleteOptions,
      incompleteSeries,
      teamOptions,
      teamSeries,
      chartOptions,
      chartSeries,
      incomplete,
      completed,
      business,
      premium,
    }
  }
}
</script>