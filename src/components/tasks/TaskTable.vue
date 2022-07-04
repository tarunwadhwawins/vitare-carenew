<template>
<a-col :sm="24">
    <a-table rowKey="id" :columns="tasksListColumns" :data-source="tasksList"  :scroll="height ? {  y:height } :{ x: 900,y:'calc(100vh - 470px)'  }" :pagination="false" @change="handleTableChange">

        <template #taskName="{text,record}">
            <a v-if="arrayToObjact(screensPermissions,115)" @click="taskDetails(record.id)"><span>{{ text }}</span></a>
            <span v-else> {{ text }}</span>
        </template>
        <!-- <template #assignedBy="text">
            <router-link to="coordinator-summary">{{ text.text }}</router-link>
        </template> -->

        <template #category="{ record }">
            <span v-for="category,i in record.category" :key="category.id" to="coordinator-summary">
                <br v-if="i > 0"/> {{ category.taskCategory ? category.taskCategory : category }}
            </span>
        </template>
        <template #assignedTo="{ record }">
            <span v-for="assignee,i in record.assignedTo" :key="assignee.id">
                <br v-if="i > 0"/>
                <router-link v-if="assignee.entityType == 'staff'" :to="{ name: 'CoordinatorSummary', params: { udid:assignee.id}}">
                    {{ assignee.name }}
                </router-link>
                <router-link v-else :to="{ name: 'PatientSummary', params: { udid:assignee.id}}">
                    {{ assignee.name }}
                </router-link>
            </span>
        </template>
        <template #assignedBy="{ record }">
            <router-link :to="{ name: 'CoordinatorSummary', params: { udid: record.assignedById}}">
                {{ record.assignedBy }}
            </router-link>
        </template>
        <template #action="{ record }">
            <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,115)">
                <template #title>
                    <span>{{ $t('global.edit') }}</span>
                </template>
                <a class="icons">
                    <EditOutlined @click="editTask(record.id)" /></a>
            </a-tooltip>
            <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,116)">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons">
                    <DeleteOutlined @click="deleteTask(record.id)" /></a>
            </a-tooltip>
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{$t('tasks.createAppointment')}}</span>
                </template>
                <router-link to="appointment-calendar" class="icons" v-if="arrayToObjact(screensPermissions,112)">
                    <CalendarOutlined @click="createAppointment(record.id)" />
                </router-link>
            </a-tooltip>
        </template>
    </a-table>
</a-col>
<TasksModal v-model:visible="taskVisibleView" @saveTaskModal="handleOk($event)" :taskId="taskID" :onlyView="onlyView" @clinicalDashboard="callApiFromModal" />
<!-- <TaskDetails v-model:visible="taskVisibleView"  :taskId="taskID" :onlyView="onlyView"/> -->
</template>

<script>
import { onMounted, computed,defineAsyncComponent , ref} from "vue"
import { useStore } from "vuex"
import {  DeleteOutlined, EditOutlined, CalendarOutlined} from "@ant-design/icons-vue"
import { messages } from "@/config/messages"
import { warningSwal,  arrayToObjact} from "@/commonMethods/commonMethod"
import { useRoute } from 'vue-router'
export default {
    name: "TaskTable",
    components: {
        DeleteOutlined,
        EditOutlined,
        CalendarOutlined,
        TasksModal: defineAsyncComponent(() => import("@/components/modals/TasksModal.vue"))
    },
    props: {
        height: Number,
        tasksListColumns: Array,
        fromAll: Boolean,
        islimit:Number
    },
    setup(props, {
        emit
    }) {
        const searchAll = props.fromAll ? ref(props.fromAll) : ref(false)
        const store = useStore();
        const route = useRoute()
        const taskID = ref(false);
        let data = [];
        const meta = store.getters.taskRecords.value;
        const tasksList = store.getters.tasksList
        const taskVisibleView = ref(false)
        const onlyView = ref(false)
    
        let dateFilter = ''
        let filter = ''

        function checkDate() {
            dateFilter = store.getters.otherFilters.value ? route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate=" : store.getters.dateFilter.value ? "&fromDate="+store.getters.dateFilter.value.fromDate+"&toDate="+store.getters.dateFilter.value.toDate : "&fromDate=&toDate="
            filter = route.query.filter ? "&filter=" + route.query.filter : "&filter="
        }
       
            let scroller = "";
        onMounted(() => {
             checkDate()
            var tableContent = document.querySelector(".ant-table-body");
            tableContent.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
                    let current_page = meta.taskMeta.current_page + 1;
                    if (current_page <= meta.taskMeta.total_pages) {
                       scroller = maxScroll;
                        data = meta.tasksList;
                        store.state.tasks.taskMeta = ''
                        // console.log('filters', store.getters.orderTable.value.data)
                        if(!searchAll.value) {
                            store
                                .dispatch(
                                    "tasksList",
                                    "?page=" +
                                    current_page +
                                    dateFilter + filter +
                                    store.getters.searchTable.value +
                                    store.getters.orderTable.value.data
                                )
                                .then(() => {
                                    loadMoredata();
                                });
                        }
                    }
                }
            });
        });

        function loadMoredata() {
            const newData = meta.tasksList;

            newData.forEach((element) => {
                data.push(element);
            });

            meta.tasksList = data;
            var tableContent = document.querySelector(".ant-table-body");

            setTimeout(() => {
                tableContent.scrollTo(0, scroller);
            }, 50);
            
        }
        const editTask = (id) => {
            emit("is-Edit", {
                check: true,
                id: id,
            });
        };
        const taskDetails = (id) => {
            store.dispatch('editTask', {
                id: id
            })
            onlyView.value = true
            taskID.value = id
            taskVisibleView.value = true
        };

        function deleteTask(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch("tasksDelete", id);
                    setTimeout(() => {
                        store.state.tasks.tasksList = null;
                        store.dispatch("tasksList");
                    }, 2000);
                }
            });
        }
        const tasks = computed(() => {
            return store.state.tasks;
        });

        function handleOk(event) {
            onlyView.value = event
            taskVisibleView.value = event
        }
        const handleTableChange = (pag, filters, sorter) => {
            checkDate()
           let islimit = props.islimit? "&islimit="+props.islimit:"&islimit="
            if (sorter.order) {
                
                let order = sorter.order == "ascend" ? "ASC" : "DESC";
                let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
                store.dispatch("orderTable", {
                    data: orderParam,
                    orderBy: order,
                    page: pag,
                    filters: filters,
                });
                store.dispatch(
                    "tasksList",
                    "?page=" +
                    dateFilter + filter +
                    orderParam+islimit

                );
            } else {
                store.dispatch("orderTable", {
                    data: "&orderField=&orderBy=",
                });
                store.dispatch(
                    "tasksList",
                    "?page=" +
                    store.getters.searchTable.value +
                    dateFilter + filter +
                    store.getters.orderTable.value.data+islimit
                );
            }
        };

        function callApiFromModal() {
            taskVisibleView.value = false
            if (props.height) {
                emit("dashboard")

            } else {
                store.dispatch("tasksList");
            }

        }
        return {
            callApiFromModal,
            screensPermissions: store.getters.screensPermissions,
            tasks,
            arrayToObjact,
            editTask,
            deleteTask,
            meta,
           
            handleTableChange,
            taskID,
            taskDetails,
            taskVisibleView,
            onlyView,
            handleOk,
            tasksList,

        };
    },
};
</script>
