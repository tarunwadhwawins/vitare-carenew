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
                <a-col :span="12">
                    <div class="text-right">
                        <a-button @click="showEscalationModal" type="primary">{{'Add Escalation'}}</a-button>
                    </div>
                </a-col>
                <a-col :span="24">
                    <EscaltionTable  :columnData="columnData" :escalationList="escalationList"  @showEscalationData="showEscalationData($event)"/>
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
import { computed, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { globalDateFormat } from "@/commonMethods/commonMethod";
import EscaltionTable from "@/components/common/tables/EscalationTable"
import EscaltionViewModal from "../escalations/EscalationViewModal"
import EscaltionModal from "../escalations/EscalationModal"
import Loader from "@/components/loader/Loader";
const columnData = [
    {
    title: "Escalation Type",
    dataIndex: "escalationType",
    slots:{
        customRender: "escalationType",
    },
  },
  { 
    title: "Description",
    dataIndex: "escalationDescription",
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
    EscaltionViewModal
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
            store.dispatch('escalationList', {referenceId:props.patientId,entityType:'patient'})
        }
    })
    const showEscalationModal=()=>{
        // store.commit('resetEscalationCounter')
        store.state.patients.escalationCounter=0
        store.state.patients.addBasicEscalation=null
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
      return store.state.patients.escalationList;
    });
    return {
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
