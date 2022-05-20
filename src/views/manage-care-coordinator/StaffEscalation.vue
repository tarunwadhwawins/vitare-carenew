<template>
<a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
    </a-layout-header>
    <a-layout>
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
            <Sidebar />
        </a-layout-sider>
        <a-layout-content>
            <div class="common-bg">
                <a-row>
                    <a-col :span="12">
                        <h2 class="pageTittle">
                            Escalation Details
                        </h2>
                    </a-col>
                     
                    <a-col :span="24">
                        <EscaltionTable :columnData="columnData" :escalationList="escalationList" @showEscalationData="showEscalationData($event)" />
                    </a-col>
                </a-row>
                <EscaltionViewModal v-model:visible="escaltionViewModal" />
            </div>
            <Loader />
        </a-layout-content>
    </a-layout>
    <Loader />
</a-layout>
</template>

<script>
import { computed, onMounted, onUnmounted, ref  } from "vue";
import { useStore } from "vuex";
import { globalDateFormat } from "@/commonMethods/commonMethod";
import EscaltionTable from "@/components/common/tables/EscalationTable";
import EscaltionViewModal from "@/components/care-coordinator/escalations/EscalationViewModal"
// import EscaltionModal from "../escalations/EscalationModal"
import Loader from "@/components/loader/Loader";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
const columnData = [
    {
    title: "Patient Name",
    dataIndex: "patientName",
    slots: {
      customRender: "patientName",
    },
  },
  {
    title: "Escalation Type",
    dataIndex: "escalationType",
    slots: {
      customRender: "escalationType",
    },
  },
  {
    title: "Due Date",
    dataIndex: "dueBy",
  },
  {
    title: "Flag",
    dataIndex: "flag",
    slots: {
      customRender: "flag",
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];

export default {
  components: {
    EscaltionTable,
    // EscaltionModal,
    Loader,
    EscaltionViewModal,
    Header,
    Sidebar,
  },

  setup() {
    const store = useStore();
    const escaltionViewModal = ref(false);
    const button = ref(2)
  
    const escaltionModal = ref(false);


    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    });

    onMounted(() => {
        // store.dispatch("staffEscalation")
        if (store.getters.filter.value) {
                 store.dispatch("staffEscalation","?filter="+store.getters.filter.value  +"&fromDate=" + store.getters.dateFilter.value.fromDate + "&toDate=" + store.getters.dateFilter.value.toDate)
               
            } else {
               store.commit("dateFilter",'')
                store.dispatch("staffEscalation")
            }
    });
    const showEscalationModal = () => {
      store.commit("resetEscalationCounter");
      store.state.patients.addBasicEscalation = null;
      escaltionModal.value = true;
    };

    const saveModal = (value) => {
      escaltionModal.value = value;
    };

    const showEscalationData = (value) => {
      console.log("testValue", value);
      escaltionViewModal.value = value;
    };

    const escalationList = computed(() => {
      return store.state.careCoordinator.staffEscalation;
    });
onUnmounted(()=>{
    store.commit("filter",'')
    store.commit("dataFilter",'')
})
    
    return {
      button,
      escalationList,
      columnData,
      escaltionViewModal,
      showEscalationData,
      saveModal,
      escaltionModal,
      showEscalationModal,
      globalDateFormat,
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
