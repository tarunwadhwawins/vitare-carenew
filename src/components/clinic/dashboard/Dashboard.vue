<template>
<a-layout-content>
    <a-row>
        <a-col :span="24">
            <h2 class="pageTittle">
                Clinical Dashboard
                <div class="filter" v-if="timeline && Buttons">
                    <a-button v-for="item in timeline" :key="item.id" @click="showButton(item.id)" :class="Buttons.globalCodeId== item.id ? 'active' : ''"> {{item.name}}</a-button>
                </div>
            </h2>
        </a-col>
        <a-col :span="24">
            <a-row :gutter="24" v-if="arrayToObjact(widgetsPermissions,1) && grid">
                <Card v-for="item in totalPatients" :key="item.count" :count="item.total" :text='item.text' link="Patients with filter" :xl="grid.xlGrid" :color="item.color" :sm="grid.smGrid" :textColor="item.textColor">
                </Card>
            </a-row>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        
        
         <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,6) &&  escalationCount">
            <ApexChart title="Escalations" type="bar" :height="350" :options="escalationCount.code" :series="escalationCount.value" linkTo="Escalation" :data="escalationRecord"></ApexChart>
        </a-col>
         <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,7) && escalationList" >
             <a-card  title="Escalations List" class="common-card" style="height:436px">
                 <template #extra v-if="escalationList.length > 0"><router-link :to="{name:'Escalation'}">View All</router-link></template>
            <EscaltionTable :columnData="columnData" :escalationList="escalationList"  @showEscalationData="showEscalationData($event)" :height="286"/>
             </a-card>
        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,6) &&  clicalTask">
            <ApexChart title="My Tasks " type="bar" :height="350" :options="clicalTask.code" :series="clicalTask.value" linkTo="Tasks" listView="list"></ApexChart>
        </a-col>
         <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,6) && tasksList">
             <a-card  title="My Tasks List" class="common-card" style="height:436px">
                 <template #extra v-if="tasksList.length > 0"><router-link :to="{name:'Tasks'}">View All</router-link></template>
            <TaskTable @is-Edit="editTask($event)" :height="285" :tasksListColumns="tasksListColumns" @dashboard="taskApiCall"></TaskTable>
             </a-card>
        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,7) && patientsFlag">
            <ApexChart title="Patient Flags" type="bar" :height="350" :options="patientsFlag.code" :series="patientsFlag.value" linkTo="Patients with filter"></ApexChart>
        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,6) &&  appointmentCount">
            <ApexChart title="My Appointments" type="bar" :height="350" :options="appointmentCount.chartOptions" :series="appointmentCount.value" linkTo="AppointmnetCalendar"></ApexChart>
        </a-col>
        
    </a-row>
    <Loader />
</a-layout-content>
<EscaltionViewModal v-model:visible="escaltionViewModal" />
<TasksModal   v-model:visible="visible" @saveTaskModal="handleOk($event)"  :taskId="taskID" />
</template>

<script>
  import { ref, onMounted ,computed} from 'vue'
  import Card from "@/components/common/cards/Card"
  import ApexChart from "@/components/common/charts/ApexChart"
  import { startimeAdd, endTimeAdd, timeStamp ,arrayToObjact} from '@/commonMethods/commonMethod'
  import { useStore } from 'vuex'
  import Loader from "@/components/loader/Loader";
  import moment from "moment"
  import EscaltionTable from "@/components/common/tables/EscalationTable"
  import EscaltionViewModal from "@/components/escalations/EscalationViewModal"
  import TaskTable from "@/components/tasks/TaskTable";
  import TasksModal from "@/components/modals/TasksModal";
  const columnData = [
  {
    title: "Name",
    dataIndex: "patientName",
    //sorter: true,
    width: '17%',
    slots: {
      customRender: "patientName",
    },
  },
  {
    title: "Escalation Type",
    dataIndex: "escalationType",
    width: '20%',
    //sorter: true,
    
    slots: {
      customRender: "escalationType",
    },
  },
  
  {
    title: "Due Date",
    dataIndex: "dueBy",
    width: '17%',
    //sorter: true,
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
    width: '12%',
    slots: {
        
      customRender: "action",
    },
  },
];
const tasksListColumns=[
		{
			title: 'Task Name',
			dataIndex: 'title',
			
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
			//sorter: true,
			slots: {
				customRender: 'category'
			}
		},
        {
			title: 'Start Date ',
			dataIndex: 'startDate',
			
		},
		
		{
			title: 'Due Date ',
			dataIndex: 'dueDate',
			
		},
		
	];
export default {
    components: {
        Card,
        ApexChart,
        Loader,
        EscaltionTable,
        EscaltionViewModal,
        TaskTable,
        TasksModal
    },

    setup() {
        const store = useStore()
        const fromDate = ref()
        const toDate = ref()
        const dateFilter = ref('')
        const timeLineButton = store.getters.dashboardTimeLineButton
 const escaltionViewModal = ref(false);
 const escaltionModal = ref(false);
   const showEscalationModal = () => {
      store.commit("resetEscalationCounter");
      store.state.patients.addBasicEscalation = null;
      escaltionModal.value = true;
    };
     const showEscalationData = (value) => {
      
      escaltionViewModal.value = value;
    };
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
            store.commit("dateFilter",dateFilter.value)
            store.dispatch("permissions")
            store.dispatch("clicalTask", dateFormate)
            store.dispatch("callStatus", dateFormate)
            store.dispatch("patientsFlag", dateFormate)
             
                store.dispatch("tasksList", "?fromDate=" + dateFormate.fromDate + "&toDate=" + dateFormate.toDate+'&status=notIn');
            store.dispatch("appointmentCount", dateFormate)
            store.dispatch("escalationCount", dateFormate)
            store.dispatch("escalation","?fromDate=" + dateFormate.fromDate + "&toDate=" + dateFormate.toDate+"&islimit=5")

        }
         const escalationList = computed(() => {
      return store.state.escalations.escalation;
    });

        onMounted(() => {
          
         if(timeLineButton.value==null){
              
            store.dispatch("timeLine", 122).then(()=>{
                apiCall(timeLineButton.value)
            })
                
          }else{
            apiCall(timeLineButton.value)
          }
         
        })

        function logout() {
            localStorage.removeItem("auth");
            localStorage.clear();
        }

        function showButton(id) {
            store.dispatch("timeLine", id).then(() => {
                apiCall(timeLineButton.value)
            })

        }
///task list
const visible = ref(false);
   
    const taskID =ref();
const editTask = (id) => {
    console.log("check",id.id)
                visible.value = id.check,
                taskID.value =  id.id
                store.dispatch('editTask',{id:id.id})
            
        };
        function taskApiCall(){
             store.dispatch("tasksList", "?fromDate=" + fromDate.value + "&toDate=" + toDate.value+'&status=notIn');
        }
        return {
            editTask,
            visible,
            taskID,
           clicalTask:store.getters.clicalTask,
            grid:store.getters.grid,
            escalationCount:store.getters.escalationCount,
             patientsFlag:store.getters.patientsFlag,
            logout,
            appointmentCount:store.getters.appointmentCount,
            Buttons:store.getters.dashboardTimeLineButton,
            showButton,
            timeline:store.getters.timeline,
            widgetsPermissions:store.getters.widgetsPermissions,
            escalationRecord:store.getters.escalationRecord,
            totalPatients:store.getters.totalPatientcount,
            arrayToObjact,
            columnData,
            escalationList,
            showEscalationModal,
            escaltionViewModal,
            escaltionModal,
            showEscalationData,
            tasksList:store.getters.tasksList,
            tasksListColumns,
            taskApiCall
        };
    },
};
</script>
