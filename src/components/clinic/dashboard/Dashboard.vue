<template>
    <a-layout-content>
        <a-row>
            <a-col :span="24">
                <h2 class="pageTittle">
                    Clinical Dashboard
                    <DateFilter :Buttons="Buttons"  @clickButtons="showButton($event)" :custom="false" commit="timelineSuccess" v-if="widgetsPermissions.length > 0"/>
                </h2>
            </a-col>
            <a-col :span="24">
                <a-row :gutter="24" v-if="arrayToObjact(screensPermissions, 65) && grid">
                    <PatientCounterCards :isPatient="false" />
                </a-row>
            </a-col>
        </a-row>
        <a-row :gutter="24">

            <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,13) &&  escalationCount">
                <ApexChart title="Escalations" type="bar" :height="350" :options="escalationCount.code" :series="escalationCount.value" :linkTo="arrayToObjact(screensPermissions,404)?'Escalation':''" :data="escalationRecord"></ApexChart>
            </a-col>
            <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,14) && escalationList">
                <a-card title="Escalations List" class="common-card" style="height:436px">
                    <template #extra v-if="escalationList.length > 0">
                        <router-link :to="{name:'Escalation'}">View All</router-link>
                    </template>
                    <EscaltionTable :columnData="columnData" :escalationList="escalationList" @showEscalationData="showEscalationData($event)" :height="286" :islimit="5"/>
                </a-card>
            </a-col>
            <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,5) &&  clicalTask">
                <ApexChart title="Tasks " type="bar" :height="350" :options="clicalTask.code" :series="clicalTask.value" :linkTo="arrayToObjact(screensPermissions,113)?'Tasks':''" listView="list" ></ApexChart>
            </a-col>
            <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,6) && tasksList">
                <a-card title="Tasks List" class="common-card" style="height:436px">
                    <template #extra v-if="tasksList.length > 0">
                        <router-link :to="{ name:'Tasks',query: {
                            view: 'list'
                        }}">View All</router-link>
                    </template>
                    <TaskTable @is-Edit="editTask($event)" :height="285" :tasksListColumns="tasksListColumns" @dashboard="taskApiCall" :islimit="5"></TaskTable>
                </a-card>
            </a-col>
            <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,1) && patientsFlag">
                <ApexChart title="Patient Flags" type="bar" :height="350" :options="patientsFlag.code" :series="patientsFlag.value" :linkTo="arrayToObjact(screensPermissions,65)?'PatientsWithFilter':''"></ApexChart>
            </a-col>
            <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,2) &&  appointmentCount">
                <ApexChart title="Appointments" type="bar" :height="350" :options="appointmentCount.chartOptions" :series="appointmentCount.value" :linkTo="arrayToObjact(screensPermissions,112) ? 'AppointmnetCalendar':''"></ApexChart>
            </a-col>

        </a-row>
        <Loader />
    </a-layout-content>
    <EscaltionViewModal v-model:visible="escaltionViewModal"  />
    <EscaltionModal v-model:visible="escaltionModal" @saveModal="saveModal($event)" :isEdit="isEdit"/>
    <TasksModal v-model:visible="visible" @saveTaskModal="handleOk($event)" :taskId="taskID" />
</template>

<script>
import {
    ref,
    onMounted,
    computed,
    onUnmounted,
    
} from 'vue'
import PatientCounterCards from "@/components/common/cards/PatientCounterCards"
import ApexChart from "@/components/common/charts/ApexChart"
import {
    startimeAdd,
    endTimeAdd,
    timeStamp,
    arrayToObjact
} from '@/commonMethods/commonMethod'
import {
    useStore
} from 'vuex'
import Loader from "@/components/loader/Loader";
import moment from "moment"
import EscaltionTable from "@/components/common/tables/EscalationTable"
import EscaltionViewModal from "@/components/escalations/EscalationViewModal"
import TaskTable from "@/components/tasks/TaskTable";
import TasksModal from "@/components/modals/TasksModal";
import DateFilter from "@/components/common/DateFilter.vue"
import EscaltionModal from "@/components/escalations/EscalationModal"
const columnData = [{
        title: "Name",
        dataIndex: "patientName",
        sorter: true,
        width: '19%',
        slots: {
            customRender: "patientName",
        },
    },
    {
        title: "Type",
        dataIndex: "escalationType",
        width: '17%',
    sorter: true,

        slots: {
            customRender: "escalationType",
        },
    },

    {
        title: "Due Date",
        dataIndex: "dueBy",
        width: '20%',
        sorter: true,
    },
    {
        title: "Assigned By",
        dataIndex: "assignedBy",
        sorter: true,
        width: '23%',
        slots: {
            customRender: "escalationAssignedBy",
        }
    },

    {
        title: "Flag",
        dataIndex: "flag",
        width: '12%',
        slots: {
            customRender: "flag",
        },
    },
    {
        title: "Action",
        dataIndex: "action",
        width: '15%',
        slots: {

            customRender: "action",
        },
    },
];
const tasksListColumns = [{
        title: 'Task Name',
        dataIndex: 'title',
sorter: true,
        slots: {
            customRender: 'taskName'
        }

    },

    {
        title: 'Priority ',
        dataIndex: 'priority',

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
        title: 'Start Date ',
        dataIndex: 'startDate',
sorter: true
    },

    {
        title: 'Due Date ',
        dataIndex: 'dueDate',
sorter: true
    },

];
export default {
    components: {
        PatientCounterCards,
        ApexChart,
        Loader,
        EscaltionTable,
        EscaltionViewModal,
        TaskTable,
        TasksModal,
        DateFilter,
        EscaltionModal
    },

    setup() {
        const store = useStore()
        const fromDate = ref()
        const toDate = ref()
        const dateFilter = ref('')
        const timeLineButton = store.getters.dashboardTimeLineButton
        const escaltionViewModal = ref(false);
        const escaltionModal = ref(false);
        const isEdit = ref();
        const showEscalationModal = () => {
            store.commit("resetEscalationCounter");
            store.state.patients.addBasicEscalation = null;
            escaltionModal.value = true;
            isEdit.value = null
        };
         const showEscalationData =(data)=>{
      if(data.type=='view'){
        escaltionViewModal.value = data.value
      }else{
         escaltionModal.value = data.value
         isEdit.value = data.id
      }
    }

    const saveModal = (value) =>{
      escaltionModal.value = value
       store.dispatch("timeLine", {
                    id: 122,
                    commit: 'timelineSuccess'
                }).then(() => {
                    apiCall(timeLineButton.value)
                })
    }
 
        function apiCall(data) {
            let from = moment()
            let to = moment()
            if (data.globalCodeId == 122) {

                from = moment()
                to = moment().subtract(data.number, data.intervalType);
            } else if (data.globalCodeId == 123) {
                from = moment();

                to = moment().subtract(data.number, data.intervalType);
            } else if (data.globalCodeId == 124) {
                from = moment();
                to = moment().subtract(data.number, data.intervalType);
            } else {
                from = moment();
                to = moment().subtract(data.number, data.intervalType);
            }
            let dateFormate = {
                fromDate: '',
                toDate: ''
            }

            if (data.globalCodeId == 122) {
                dateFormate = {
                    fromDate: from ? timeStamp(startimeAdd(from)) : '',
                    toDate: to ? timeStamp(endTimeAdd(to)) : ''
                }

            } else {
                dateFormate = {
                    fromDate: timeStamp(startimeAdd(to)),
                    toDate: timeStamp(endTimeAdd(from))
                }

            }
            fromDate.value = dateFormate.fromDate
            toDate.value = dateFormate.toDate
            dateFilter.value = dateFormate
            store.dispatch("counterCard", dateFormate)
            store.commit("dateFilter", dateFilter.value)
            store.dispatch("permissions")
            store.dispatch("clicalTask", dateFormate)
            store.dispatch("callStatus", dateFormate)
            store.dispatch("patientsFlag", dateFormate)

            store.dispatch("tasksList", "?fromDate=" + dateFormate.fromDate + "&toDate=" + dateFormate.toDate + '&islimit=5');
            store.dispatch("appointmentCount", dateFormate)
            store.dispatch("escalationCount", dateFormate)
            store.dispatch("escalation", "?fromDate=" + dateFormate.fromDate + "&toDate=" + dateFormate.toDate + "&islimit=5")

        }
        const escalationList = computed(() => {
            return store.state.escalations.escalation;
        });

        onMounted(() => {
             store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.state.escalations.escalation = ''
            store.state.tasks.task = ''
           // if (timeLineButton.value == null) {

                store.dispatch("timeLine", {
                    id: 122,
                    commit: 'timelineSuccess'
                }).then(() => {
                    apiCall(timeLineButton.value)
                })

            ///} else {
                //apiCall(timeLineButton.value)
           //}

        })

        function logout() {
            localStorage.removeItem("auth");
            localStorage.clear();
        }

        function showButton() {
          
                apiCall(timeLineButton.value)
          

        }
        ///task list
        const visible = ref(false);

        const taskID = ref();
        const editTask = (id) => {
            console.log("check", id.id)
            visible.value = id.check,
                taskID.value = id.id
            store.dispatch('editTask', {
                id: id.id
            })

        };

        function taskApiCall() {
            store.dispatch("tasksList", "?fromDate=" + fromDate.value + "&toDate=" + toDate.value + '&status=notIn');
        }
        onUnmounted(() => {
            store.state.escalations.escalation = ''
            store.state.tasks.task = ''
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            
        })
        return {
            saveModal,
            isEdit,
            editTask,
            visible,
            taskID,
            clicalTask: store.getters.clicalTask,
            grid: store.getters.grid,
            escalationCount: store.getters.escalationCount,
            patientsFlag: store.getters.patientsFlag,
            logout,
            appointmentCount: store.getters.appointmentCount,
            Buttons: store.getters.dashboardTimeLineButton,
            showButton,
            
            widgetsPermissions: store.getters.widgetsPermissions,
            escalationRecord: store.getters.escalationRecord,
            // totalPatients: store.getters.totalPatientcount,
            arrayToObjact,
            columnData,
            escalationList,
            showEscalationModal,
            escaltionViewModal,
            escaltionModal,
            showEscalationData,
            tasksList: store.getters.tasksList,
            tasksListColumns,
            taskApiCall,
            screensPermissions: store.getters.screensPermissions,
            
        };
    },
};
</script>
