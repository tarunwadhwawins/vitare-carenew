<template>
<a-row>
    <div class="commonTags">
        <a-tag v-if="route.query.filter" closable @close="remove('filter')">{{route.query.filter}}</a-tag>
        <!-- <a-tag v-if="route.query.toDate && route.query.fromDate" closable @close="remove('date')"></a-tag> -->
    </div>
</a-row>

<a-row :gutter="24">
    <a-col :span="6">
        <SearchField endPoint="task" />
    </a-col>
    <a-col :span="6">
        <StaffDropDown mode="multiple" @handleStaffChange="handleStaffChange($event, 'assignedTo')" placeholder="Assigned To" />
    </a-col>
    <a-col :span="6">
        <StaffDropDown mode="multiple" @handleStaffChange="handleStaffChange($event, 'assignedBy')" placeholder="Reported By" />
    </a-col>
    <a-col :span="6">
        <DatePicker @onChange="handleStaffChange($event, 'dateRange')" v-model:value="dateRange" datePickerType="range" :dateRange="dateRange" />
    </a-col>
</a-row>

<a-row :gutter="24" class="tasktable">
    <a-col :span="24">
        <div class="text-right mb-24">
            <ExportToExcel @click="exportExcel('task_report','?fromDate=&toDate='+search)" v-if="arrayToObjact(screensPermissions, 118)" />
        </div>
    </a-col>
    <TaskTable @is-Edit="editTask($event)" :tasksListColumns="tasksListColumns" @onChange="handleStaffChange($event, 'search')" :fromAll='true'></TaskTable>
</a-row>

<TableLoader />
</template>

<script>
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch";
import { ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
import TaskTable from "@/components/tasks/TaskTable";
import TableLoader from "@/components/loader/TableLoader";
import { arrayToObjact,exportExcel,timeStampFormate,globalDateFormat } from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import DatePicker from "@/components/common/DatePicker";
import { useRoute, useRouter } from 'vue-router';
import { timeStamp } from '../../commonMethods/commonMethod';
const tasksListColumns = [{
        title: 'Priority ',
        dataIndex: 'priority',
        sorter: true

    },
    {
        title: 'Due Date ',
        dataIndex: 'dueDate',
        sorter: true,
        slots: {
            customRender: 'dueDate'
        }
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: true,
        slots: {
            customRender: 'taskName'
        }
    },
    {
        title: 'Status ',
        dataIndex: 'taskStatus',
        sorter: true,
        slots: {
            customRender: 'status'
        }
    },

    {
        title: 'Category',
        dataIndex: 'category',
        sorter: true,
        slots: {
            customRender: 'category'
        }
    },
    // {
    //     title: 'Start Date ',
    //     dataIndex: 'startDate',
    //     sorter: true
    // },

    // {
    //     title: 'Assigned To',
    //     dataIndex: 'assignedTo',
    //     sorter: true,
    //     slots: {
    //         customRender: 'assignedTo'
    //     }

    // },
    // {
    //     title: 'Type',
    //     dataIndex: 'taskType',
    //     sorter: true,
    //     slots: {
    //         customRender: 'taskType'
    //     }
    // },
    {
        title: 'Assigned By',
        dataIndex: 'assignedBy',
        sorter: true,
        slots: {
            customRender: 'assignedBy'
        }
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
        StaffDropDown,
        DatePicker,
    },
    setup(props, {
        emit
    }) {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const toDate = ref('')
        const dateRange = ref()
        var dateRangeQuery = []

        //const params = ref("")
        const assignedByValue = ref("&assignedBy=")
        const assignedToValue = ref("&assignedTo")
        const fromDateValue = ref("&fromDate=")
        const toDateValue = ref("&toDate=")
        //const filterValue = ref("")
        //const searchValue = ref("")

        onMounted(() => {
            store.commit('otherFilters', null)
            // store.dispatch('otherFilters', "&fromDate=&toDate=")
            if (route.query.filter || route.query.fromDate) {
                toDate.value = route.query.toDate
                let filter = route.query.filter ? route.query.filter : ''
                if (route.query.fromDate && route.query.toDate) {
                    dateRangeQuery.push(timeStampFormate(route.query.fromDate, 'YYYY-MM-DD'))
                    dateRangeQuery.push(timeStampFormate(route.query.toDate, 'YYYY-MM-DD'))
                    fromDateValue.value = '&fromDate=' +route.query.fromDate
                    toDateValue.value = '&toDate=' + route.query.toDate
                    dateRange.value = dateRangeQuery
                }

                let date = store.getters.otherFilters.value ? store.getters.otherFilters.value : route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
                store.dispatch("tasksList", "?filter=" + filter + date + store.getters.orderTable.value.data);
            } else {

                store.dispatch("tasksList")
            }
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        });

        const handleStaffChange = (value, type) => {
            if (type == 'dateRange') {
                let newValue = value.value
                fromDateValue.value = newValue.length > 0 ? `&fromDate=${timeStamp(newValue[0])}` : ''
                toDateValue.value = newValue.length > 0 ? `&toDate=${timeStamp(newValue[1])}` : ''
                remove('date')
            } else if (type == 'assignedBy') {
                assignedByValue.value = value.length > 0 ? `&assignedBy=${value}` : ''
            } else if (type == 'assignedTo') {
                assignedToValue.value = value.length > 0 ? `&assignedTo=${value}` : ''
            }
            let filter = route.query.filter ? route.query.filter : ''
            store.commit('otherFilters', fromDateValue.value + toDateValue.value + assignedByValue.value + assignedToValue.value)
            store.dispatch("tasksList", '?active=1' + store.getters.otherFilters.value + '&filter=' + filter + store.getters.searchTable.value + store.getters.orderTable.value.data)

            //store.dispatch('searchTasks', params.value)
        };

        const editTask = (id) => {
            emit("isEdit", {
                check: true,
                id: id
            });
        };

        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit('otherFilters', null)
            //store.state.common.filter=''
        })

        function remove(event) {
            if (event == "filter") {
                if (route.query.fromDate && route.query.toDate) {

                    
                        router.replace({
                            query: {
                                view: 'list',
                                toDate: toDate.value,
                                fromDate: route.query.fromDate,

                            }
                        }).then(()=>{
store.dispatch("tasksList", "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
                        })
                   

                    
                } else {
                    router.replace({
                        query: {
                            view: 'list',
                        }
                    }).then(()=>{
store.dispatch("tasksList")
                    })
                    
                }

            } else {

                if (route.query.filter) {

                    store.dispatch("tasksList", "?filter=" + route.query.filter)
                    setTimeout(() => {
                        router.replace({
                            query: {
                                view: 'list',
                                filter: route.query.filter,

                            }
                        }, 5000)
                    })
                } else {
                    router.replace({
                        query: {
                            view: 'list',
                        }
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
            // tasksColumns,
            editTask,
            remove,
            route,
            timeStampFormate,
            globalDateFormat,
            tasksListColumns,
            handleStaffChange,
            dateRange,
        };
    },
};
</script>

<style>
.tasktable {
    position: relative;
    top: 25px;
}
</style>
