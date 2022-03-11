<template>
  <a-row class="mb-24" :gutter="24" v-if="arrayToObjact(tasks.taskPermissions,4)">
    <a-col :xl="6" :sm="8" :xs="12" v-for="status in tasks.taskStatus" :key="status.id" >
      
      <FilterCard :filterCount="CompletedTasksFilterCount" :count="status.total?status.total:0" :color="status.color" class="blockLists five" :heading="status.text" />
    </a-col>
  </a-row>
  <a-row :gutter="24" v-if="arrayToObjact(tasks.taskPermissions,5)">
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
        <ApexChart type="area" v-if="tasks.completionOptions" :height="250" :options="tasks.completionOptions" :series="tasks.completionSeries" />
      </a-card>
    </a-col>
    <a-col :xl="8" :sm="12" :xs="24">
      <a-card title="All Tasks" class="common-card">
        <AllTasksFilter/>
        <ApexChart type="pie" v-if="tasks.completedAllTask" :height="350" :options="tasks.completedAllTask" :series="tasks.incompleteAllTask" />
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
import { arrayToObjact } from "@/commonMethods/commonMethod";
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
    

    const tasks = computed(()=>{
      return store.state.tasks
    })

    return {
      arrayToObjact,
      tasks,
      clickHandler,
      clickHandler2,
      toggle,
      CompletedTasksFilterCount,
    }
  }
}
</script>