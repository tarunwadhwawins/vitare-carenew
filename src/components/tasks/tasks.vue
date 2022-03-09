<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, }">
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <div class="tasks">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  {{$t('tasks.tasks')}}
                  <div class="addtaskButton"  v-if="arrayToObjact(tasksDashboardPermissions,113)">
                    <Button :name="buttonName" @click="showModal" />
                  </div>
                  <div class="filter">
                    <button class="btn" :class="toggle ? 'active' : ''" @click="toggleButton()"  >
                      <span class="btn-content">{{$t('tasks.dashboardView')}}</span>
                    </button>
                    <button class="btn" :class="toggle ? '' : 'active'" @click="toggleButton()">
                      <span class="btn-content">{{$t('global.listView')}}</span>
                    </button>
                  </div>
                </h2>
              </a-col>
            </a-row>

              <!-- Dashboard View -->
            <div class="dashboard-view" v-show="toggle" >
                <TasksDashboardView/>
            </div>

              <!-- List View -->
            <div class="list-view" v-show="!toggle">
                <TasksListView @isEdit="showModal($event)"/>
            </div>

          </div>
          <Loader />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!---->
    <TasksModal   v-model:visible="visible" @saveTaskModal="handleOk($event)"  :taskId="taskID" />
    <!---->
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import TasksModal from "@/components/modals/TasksModal";
import { ref,computed } from "vue";
import Button from "@/components/common/button/Button";
import TasksDashboardView from "@/components/tasks/TasksDashboardView";
import TasksListView from "@/components/tasks/TasksListView";
import {useStore} from "vuex"
import Loader from "@/components/loader/Loader";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default {
  components: {
    Header,
    Sidebar,
    TasksModal,
    Button,
    TasksDashboardView,
    TasksListView,
    Loader
  },
  setup() {
    const store = useStore();
    const toggle = ref(true);
    const visible = ref(false);
    const taskID =ref();
    const showModal = (task) => {
      // console.log('=>',task)
      if(task.id){
      store.dispatch('editTask',task.id)
      }
      taskID.value=task.id
      visible.value = true;
    };
    const handleOk = (value) => {
      visible.value = value;
    };

    function toggleButton(){
      store.commit('loadingStatus', true)
      setTimeout(()=>{
        toggle.value=!toggle.value
        store.commit('loadingStatus', false)
      },1000)
    }
    const tasks = computed(()=>{
      return store.state.tasks
    })
    const tasksDashboardPermissions = computed(()=>{
      return store.state.screenPermissions.tasksDashboardPermissions
    })
    return {
      tasksDashboardPermissions,
      tasks,
      arrayToObjact,
      toggleButton,
      taskID,
      buttonName: "Add New Task",
      toggle,
      visible,
      showModal,
      handleOk,
    };
  },
};
</script>
