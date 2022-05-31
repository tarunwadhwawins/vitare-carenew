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
                                <div class="addtaskButton" v-if="arrayToObjact(screensPermissions,113)">
                                    <Button :name="buttonName" @click="showModal({id:'',value:true})" />
                                </div>
                                <div class="filter">
                                    <button class="btn dashboardView" :class="toggle ? 'active' : ''" @click="toggleButton('dashboard')">
                                        <span class="btn-content">{{$t('tasks.dashboardView')}}</span>
                                    </button>
                                    <button class="btn listView" :class="!toggle ? 'active' : ''" @click="toggleButton('list')">
                                        <span class="btn-content">{{$t('global.listView')}}</span>
                                    </button>
                                </div>
                            </h2>
                        </a-col>
                    </a-row>

                    <!-- Dashboard View -->
                    <div class="dashboard-view" v-show="toggle && dashboardView">
                        <TasksDashboardView v-if="arrayToObjact(screensPermissions,109)" />
                    </div>

                    <!-- List View -->
                    <div class="list-view" v-show="!toggle && listView">
                        <TasksListView @isEdit="showModal($event)" />
                    </div>

                </div>

            </a-layout-content>
        </a-layout>
    </a-layout>
    <!---->
    <TasksModal v-model:visible="visible" @saveTaskModal="handleOk($event)" :taskId="taskID" />
    <!---->
</div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import TasksModal from "@/components/modals/TasksModal";
import { ref,computed, watchEffect, onMounted, onUnmounted } from "vue";
import Button from "@/components/common/button/Button";
import TasksDashboardView from "@/components/tasks/TasksDashboardView";
import TasksListView from "@/components/tasks/TasksListView";
import {useStore} from "vuex"

import { arrayToObjact } from "@/commonMethods/commonMethod";
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        Header,
        Sidebar,
        TasksModal,
        Button,
        TasksDashboardView,
        TasksListView,

    },
    setup() {
        const store = useStore();
        const router = useRouter()
        const route = useRoute()
        const toggle = ref(true);
        const visible = ref(false);
        const dashboardView = ref(true)
        const listView = ref(false)
        const taskID = ref(false);

        const showModal = (task) => {
            console.log('=>', task)
            if (task.id) {
                store.dispatch('editTask', task.id)
                taskID.value = task.id.id
                visible.value = task.check;
            } else {
                taskID.value = false
                visible.value = true;
            }
        };
        const handleOk = (value) => {
            visible.value = value;

        };
onMounted(()=>{
    store.state.tasks.task = ''
})
        watchEffect(() => {

            if (route.query.view == 'list') {
                dashboardView.value = false
                listView.value = true
                toggle.value = false
            } else if (route.query.view == 'dashboard') {
                dashboardView.value = true
                listView.value = false
                toggle.value = true
            }
        })

        function toggleButton(val) {
            store.commit('loadingStatus', true)

            if (val == 'list') {
                router.replace({
                    query: {
                        view: 'list'
                    }
                });
                dashboardView.value = false
                listView.value = true
                toggle.value = false
            } else if (val == 'dashboard') {
                router.replace({
                    query: {
                        view: 'dashboard'
                    }
                });
                dashboardView.value = true
                listView.value = false
                toggle.value = true
            }

            setTimeout(() => {
                // toggle.value=!toggle.value
                store.commit('loadingStatus', false)
            }, 1000)
        }
        const tasks = computed(() => {
            return store.state.tasks
        })
 onUnmounted(()=>{
     store.state.tasks.task = ''
 })
        return {
            screensPermissions: store.getters.screensPermissions,
            tasks,
            arrayToObjact,
            toggleButton,
            taskID,
            buttonName: "Add New Task",
            toggle,
            visible,
            showModal,
            handleOk,
            dashboardView,
            listView,
        };
    },
};
</script>
