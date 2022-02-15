<template>
  <a-row class="mb-24" :gutter="24">
    <a-col :xl="6" :sm="8" :xs="12" v-for="status in tasks.taskStatus" :key="status.id" >
      <FilterCard :filterCount="CompletedTasksFilterCount" :count="status.total?status.total:0" :color="status.color" class="blockLists five" :heading="status.text" />
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Task Priority" class="common-card">
        <IncompleteTasksFilter/>
        <ApexChart type="bar" :height="250" v-if="tasks.taskPriority" :options="tasks.taskPriority.optionPriority" :series="tasks.taskPriority.seriesPriority" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="Team Member" class="common-card">
        <TeamMemberFilter/>
        <ApexChart type="bar" :height="250" v-if="tasks.taskTeamMember" :options="tasks.taskTeamMember.optionTeamMember" :series="tasks.taskTeamMember.seriesTeamMember" />
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
        <ApexChart type="pie" v-if="tasks.taskCategory.premium"  :height="3050" :options="tasks.taskCategory.premium" :series="tasks.taskCategory.business" />
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
import { ref, watchEffect,computed } from "vue";
import FilterCard from "@/components/common/cards/FilterCard";
import ApexChart from "@/components/common/charts/ApexChart";
import IncompleteTasksFilter from "@/components/tasks/chartFilters/IncompleteTasks";
import TeamMemberFilter from "@/components/tasks/chartFilters/TeamMember";
import AllTasksFilter from "@/components/tasks/chartFilters/AllTasks";
import CategoryViewFilter from "@/components/tasks/chartFilters/CategoryView";
import {useStore} from "vuex"
export default {
  components: {
    FilterCard,
    ApexChart,
    IncompleteTasksFilter,
    TeamMemberFilter,
    AllTasksFilter,
    CategoryViewFilter,
  },
  setup() {
    const store = useStore();
    const toggle = ref(true);
    function clickHandler() {
      toggle.value = false;
    }
    function clickHandler2() {
      toggle.value = false;
    }

    watchEffect(()=>{
      store.dispatch('taskStatus')
      store.dispatch('taskPriority')
      store.dispatch('taskTeamMember')
      store.dispatch('taskCategory')
    })
   

    // const incompleteOptions = {
    //   annotations: {
    //     points: [
    //       {
    //         x: "In",
    //         seriesIndex: 0,
    //         label: {
    //           borderColor: "#775DD0",
    //           offsetY: 0,
    //           style: {
    //             color: "#fff",
    //             background: "#775DD0",
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   chart: {
    //     height: 350,
    //     type: "bar",
    //   },
    //   plotOptions: {
    //     bar: {
    //       borderRadius: 10,
    //       columnWidth: "20%",
    //       barHeight: "100%",
    //       distributed: true,
    //       horizontal: false,
    //       dataLabels: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   colors: ["#E30D2A", "#00897b", "#267dff"],
    //   stroke: {
    //     width: 1,
    //     colors: ["#fff"],
    //   },

    //   grid: {
    //     row: {
    //       colors: ["#fff", "#f2f2f2"],
    //     },
    //   },
    //   xaxis: {
    //     labels: {
    //       rotate: -45,
    //     },
    //     categories: ["Urgent  ", "High", "Normal"],
    //   },
    //   yaxis: {
    //     title: {
    //       text: "Task Count",
    //     },
    //   },
    // };
    // const incompleteSeries = [
    //   {
    //     name: "Task Count",
    //     data: [45, 32, 23],
    //   },
    // ];

    // const teamOptions = {
    //   annotations: {
    //     points: [
    //       {
    //         x: "In",
    //         seriesIndex: 0,
    //         label: {
    //           borderColor: "#775DD0",
    //           offsetY: 0,
    //           style: {
    //             color: "#fff",
    //             background: "#775DD0",
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   chart: {
    //     height: 412,
    //     type: "bar",
    //   },
    //   plotOptions: {
    //     bar: {
    //       borderRadius: 10,
    //       columnWidth: "20%",
    //       barHeight: "100%",
    //       distributed: true,
    //       horizontal: false,
    //       dataLabels: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   colors: ["#3b72c5", "#ffb526", "#419541", "#343470"],
    //   stroke: {
    //     width: 1,
    //     colors: ["#fff"],
    //   },

    //   grid: {
    //     row: {
    //       colors: ["#fff", "#f2f2f2"],
    //     },
    //   },
    //   xaxis: {
    //     labels: {
    //       rotate: -45,
    //     },
    //     categories: ["Badger ", "Devin ", "Matt ", "John"],
    //   },
    //   yaxis: {
    //     title: {
    //       text: "Task Count",
    //     },
    //   },
    // };
    // const teamSeries = [
    //     {
    //       name: "Task Count",
    //       data: [34, 23, 12, 15],
    //     },
    // ];

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

    // const business = [45, 12, 23, 20];
    // const premium = {
    //   chart: {
    //     width: 412,
    //     type: "pie",
    //   },
    //   labels: ["Clinical", "Comm", "Admin", "Internal"],
    //   colors: ["#0fb5c2", "#40a9ff", "#267dff", "#8e60ff"],
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200,
    //         },
    //         legend: {
    //           position: "bottom",
    //         },
    //       },
    //     },
    //   ],
    // };
    
    const CompletedTasksFilterCount = [{
      key: 0,
      text: 'Urgent',
      link: 'http://www.alipay.com/',
    },
    {
      key: 1,
      text: '2nd Menu Item',
      link: 'http://www.taobao.com/',
    }];
    const IncompleteTasksFilterCount = [{
      key: 0,
      text: '1st Menu Item',
      link: 'http://www.alipay.com/',
    },
    {
      key: 1,
      text: '2nd Menu Item',
      link: 'http://www.taobao.com/',
    }];
    const OverdueTasksFilterCount = [{
      key: 0,
      text: '1st Menu Item',
      link: 'http://www.alipay.com/',
    },
    {
      key: 1,
      text: '2nd Menu Item',
      link: 'http://www.taobao.com/',
    }];

    const tasks = computed(()=>{
      return store.state.tasks
    })

    return {
      tasks,
      clickHandler,
      clickHandler2,
      toggle,
      // incompleteOptions,
      // incompleteSeries,
      // teamOptions,
      // teamSeries,
      chartOptions,
      chartSeries,
      incomplete,
      completed,
      // business,
      // premium,
      CompletedTasksFilterCount,
      IncompleteTasksFilterCount,
      OverdueTasksFilterCount,
    }
  }
}
</script>