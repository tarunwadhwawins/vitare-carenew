<template>
<div>
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <PatientInfoTop :patientDetails="patientDetails" />
        </a-col>
    </a-row>
    <a-layout-content>
        <div class="common-bg">
            <a-row>
                <a-col :span="12" >
                    <h2 class="pageTittle">
                        Escalation Details
                    </h2>
                </a-col>
                <a-col :span="12" v-if="arrayToObjact(screensPermissions, 403)">
                    <div class="text-right">
                        <a-button @click="showEscalationModal" type="primary">{{'Add Escalation'}}</a-button>
                    </div>
                </a-col>
                <a-col :span="12" v-if="arrayToObjact(screensPermissions, 404)">
                        <SearchField :endPoint="'escalation'" :otherParam="'&referenceId='+patientId+'&entityType=patient'" />
                </a-col>
                <a-col :span="24" style="padding-top:20px" v-if="arrayToObjact(screensPermissions, 404)">
                    <EscaltionTable :otherParam="'&referenceId='+patientId+'&entityType=patient'" :columnData="columnData" :escalationList="escalationList"  @showEscalationData="showEscalationData($event)"/>
                </a-col>
                <!-- stepper -->
                <a-col :span="24">
                   <EscaltionModal v-model:visible="escaltionModal" @saveModal="saveModal($event)"/>
                </a-col>
            </a-row>
             <EscaltionViewModal v-model:visible="escaltionViewModal"/>
        </div>
       <Loader/>
     
    </a-layout-content>
</div>
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { globalDateFormat,arrayToObjact } from "@/commonMethods/commonMethod";
import EscaltionTable from "@/components/common/tables/EscalationTable"
// import EscaltionViewModal from "../escalations/EscalationViewModal"
import EscaltionViewModal from "@/components/escalations/EscalationViewModal";
import EscaltionModal from "@/components/escalations/EscalationModal"
import Loader from "@/components/loader/Loader";
import SearchField from "@/components/common/input/SearchField";
const columnData = [
    {
    title: "Escalation Type",
    dataIndex: "escalationType",
    slots:{
        customRender: "escalationType",
    },
  },
  {
    title: "Staff",
    dataIndex: "escalationStaff",
    slots:{
        customRender: "escalationStaff",
    },
  },
  {
    title: "Assigned By",
    dataIndex: "assignedBy",
    sorter: true,
    slots:{
        customRender: "escalationAssignedBy",
    },
  },
  { 
    title: "Description",
    dataIndex: "escalationDescription",
    sorter: true,
  },
  {
    title: "Flag",
    dataIndex: "flag",
    slots:{
        customRender: "flag",
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots:{
        customRender: "action",
    },
    
  },
  
]

export default {
  components: {
    PatientInfoTop,
    EscaltionTable,
    EscaltionModal,
    Loader,
    EscaltionViewModal,
    SearchField
  },
  props:{
      patientId:String
  },
  setup(props) {
    const store = useStore();
    const escaltionViewModal = ref(false)
    const escalationDetails = reactive({
      scalationType: "",
      description: "",
      flag: "",
      dueDate: "",
      staffId: [],
    });
    const escaltionModal = ref(false)

    const addNoteForm = reactive({
      notes: [],
    });
    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    });

    watchEffect(()=>{
        if(props.patientId){    
            store.dispatch('escalation', {referenceId:props.patientId,entityType:'patient'})
        }
        store.dispatch("searchTable", "&search=");
        store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    })

  onMounted(()=>{
     if (store.getters.filter.value) {
        store.dispatch(
          "escalation",
          "?filter=" +
            store.getters.filter.value +
            "&fromDate=" +
            store.getters.dateFilter.value.fromDate +
            "&toDate=" +
            store.getters.dateFilter.value.toDate,{referenceId:props.patientId,entityType:'patient'}
        );
      } else {
        store.commit("dateFilter", "");
        store.dispatch("escalation",{referenceId:props.patientId,entityType:'patient'});
      }

      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
  })
    
    const showEscalationModal=()=>{

        store.commit('resetEscalationCounter')
        store.state.escalations.addBasicEscalation=null
        escaltionModal.value =true
    }
    
    const handleStaffChange = (val) => {
      escalationDetails.staffId = val;
    };

    const saveModal = (value) =>{
      escaltionModal.value = value
    }

    const showEscalationData =(value)=>{
      console.log('testValue',value)
      escaltionViewModal.value = value
    }

    const escalationList = computed(() => {
      return store.state.escalations.escalation;
    });

    const screensPermissions = computed(()=>{
      return store.state.screenPermissions.screensPermissions
    })
    return {
      arrayToObjact,
      escalationList,
      columnData,
      escaltionViewModal,
      showEscalationData,
      saveModal,
      escaltionModal,
      showEscalationModal,
      handleStaffChange,
      addNoteForm,
      globalDateFormat,
      escalationDetails,
      patientDetails,
      size: ref("large"),
      screensPermissions
    };
  },
};
</script>

<style lang="scss">
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
</style>
