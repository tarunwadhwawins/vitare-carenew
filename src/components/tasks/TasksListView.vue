<template>
<a-row>
    <div class="commonTags">
        <a-tag v-if="route.query.filter" closable @close="remove('filter')">{{route.query.filter}}</a-tag>
        <a-tag v-if="route.query.toDate && route.query.fromDate" closable @close="remove('date')">{{timeStampFormate(route.query.fromDate,globalDateFormat) }} To {{timeStampFormate(route.query.toDate,globalDateFormat)}}</a-tag>
    </div>
</a-row>
<a-row :gutter="24">
    <a-col :span="12">
        <SearchField endPoint="task" />
    </a-col>
    <a-col :span="12">
        <div class="text-right mb-24">
            <ExportToExcel @click="exportExcel('task_report','?fromDate=&toDate='+search)" v-if="arrayToObjact(screensPermissions, 118)" />
        </div>
    </a-col>
    <TaskTable @is-Edit="editTask($event)"></TaskTable>
</a-row>
<TableLoader />
</template>

<script>
import { ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
import TaskTable from "@/components/tasks/TaskTable";
import TableLoader from "@/components/loader/TableLoader";
import { arrayToObjact,exportExcel,timeStampFormate,globalDateFormat } from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        SearchField,
        TaskTable,
        TableLoader,
        ExportToExcel,
    },
    setup(props, {
        emit
    }) {
        const store = useStore();
        const router = useRouter()
        const route = useRoute()
        onMounted(() => {
            if (route.query.filter || route.query.fromDate) {
                let filter= route.query.filter ? route.query.filter : ''
                let date = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate=" 
                store.dispatch("tasksList", "?filter=" + filter + date);
            } else {
                 
                store.dispatch("tasksList")
            }
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        });

        const handleChange = (value) => {
            store.dispatch("searchTasks", value);
        };

        const editTask = (id) => {
            emit("isEdit", {
                check: true,
                id: id
            });
        };

        const updateTask = () => {
            // console.log('updateTask', data)
        };

        const createAppointment = () => {
            // console.log('createAppointment', id)
        };

        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
           
            
            //store.state.common.filter=''
        })
         function remove(event) {
            if (event == "filter") {
                if (route.query.fromDate && route.query.toDate) {
                    
                    store.dispatch("tasksList", "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
                 
                     setTimeout(() => {
                        router.replace({
                            query: {

                                 view: 'list',
                            fromDate: route.query.fromDate,
                            toDate: route.query.todate

                            }
                        })
                    }, 3000)
                } else {
                    router.replace({
                        query: {view: 'list',}
                    })
                    store.dispatch("tasksList")
                }

            } else {

                if (route.query.filter) {
                    
                    store.dispatch("tasksList", "?filter=" + route.query.filter)
                    setTimeout(()=>{
                        router.replace({
                        query: {
                            view: 'list',
                            filter: route.query.filter
                        }
                    },5000)
                    })
                } else {
                    router.replace({
                        query: {view: 'list',}
                    })
                    store.dispatch("tasksList")
                }
            }

        }
        return {
            search: store.getters.searchTable,
            exportExcel,
            screensPermissions: store.getters.screensPermissions,
            arrayToObjact,
            size: ref([]),
            handleChange,
            // tasksColumns,
            editTask,
            updateTask,
            createAppointment,
            remove,
            route,
            timeStampFormate,
            globalDateFormat

        };
    },
};
</script>
