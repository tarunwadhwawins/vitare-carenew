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
    <TaskTable @is-Edit="editTask($event)" :tasksListColumns="tasksListColumns"></TaskTable>
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
const tasksListColumns=[
		{
			title: 'Task Name',
			dataIndex: 'title',
			sorter: true,
			slots: {
				customRender: 'taskName'
			}
			// filters: [
			//   {
			//     text: "Task 1",
			//     value: "task 1",
			//   },
			//   {
			//     text: "Task 2",
			//     value: "task 2",
			//   },
			// ],
			// onFilter: (value, record) => record.taskName.indexOf(value) === 0,
		},
		{
			title: 'Task Status ',
			dataIndex: 'taskStatus',
			sorter: true,
			slots: {
				customRender: 'status'
			}
		},
		{
			title: 'Priority ',
			dataIndex: 'priority',
			sorter: true
			//   filters: [
			//     {
			//       text: "High",
			//       value: "high",
			//     },
			//     {
			//       text: "Normal",
			//       value: "normal",
			//     },
			//     {
			//       text: "Urgent",
			//       value: "urgent",
			//     },
			//   ],
			//   onFilter: (value, record) => record.status.indexOf(value) === 0,
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: true,
			slots: {
				customRender: 'category'
			}
		},
		
		{
			title: 'Due Date ',
			dataIndex: 'dueDate',
			sorter: true
			//   filters: [
			//     {
			//       text: "Dec 24, 2021",
			//       value: "Dec 24, 2021",
			//     },
			//     {
			//       text: "Dec 28, 2021",
			//       value: "Dec 28, 2021",
			//     },
			//   ],
			//   onFilter: (value, record) => record.dueDate.indexOf(value) === 0,
		},
		{
			title: 'Assigned By',
			dataIndex: 'assignedBy',
			// filters: [
			//   {
			//     text: "John",
			//     value: "John",
			//   },
			//   {
			//     text: "	Devin",
			//     value: "	Devin",
			//   },
			// ],
			slots: {
				customRender: 'assigned'
			}
			// onFilter: (value, record) => record.assignedBy.indexOf(value) === 0,
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
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
        const toDate = ref('')
        onMounted(() => {
            if (route.query.filter || route.query.fromDate) {
                toDate.value = route.query.toDate
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
                            toDate: toDate.value,
                            fromDate: route.query.fromDate,
                            

                            }
                        })
                    }, 2000)
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
                            filter: route.query.filter,
                            
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
            globalDateFormat,
            tasksListColumns

        };
    },
};
</script>
