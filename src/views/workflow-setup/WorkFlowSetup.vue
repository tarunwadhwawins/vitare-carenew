<template>
<div>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <Sidebar />
            <a-layout-content>
                <div class="common-bg">
                    <a-row>
                        <a-col :span="24">
                            <h2 class="pageTittle">
                                WorkFlow Setup
                                <div class="commonBtn">
                                    <a-button class="btn primaryBtn" @click="showModal">Create New</a-button>
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12" class="search">
                            <a-select v-model:value="search" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange2">
                            </a-select>
                        </a-col>
                        <a-col :span="24" class="mt-25 ">
                            <WorkFlowTable :columns="columns" :data-source="data" @showEditModal="showEditModal($event)"/>
                             <Loader />
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!--modals-->
    <CreateWorkFlow v-model:visible="showWorkFlowModal" @saveModal="handleOk($event)" :update="update"/>
</div>
</template>
<script>
import Header from "@/components/layout/header/Header"
import Sidebar from "@/components/administration/layout/sidebar/Sidebar"
import WorkFlowTable from "@/components/work-flow/tables/WorkFlowTable.vue"
import { defineAsyncComponent,ref } from "vue"
import Loader from "@/components/loader/Loader"
import {useStore} from "vuex"
const columns = [
  {
    title: "Workflow Description",
    dataIndex: "title",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "workflowDescription",
    },
  },
  {
    title: "Event Description",
    dataIndex: "eventTitle",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Configure Workflow",
    dataIndex: "configureWorkflow",
    slots: {
      customRender: "configureWorkflow",
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
// const data = [
//     {
//         "workflowDescription":"Health Care",
//         "eventDescription":"Client Diet",
//         "comments":"Fitness Issues",
//         "startDate":"05/15/20222",
//         "endDate":"",
//         "configureWorkflow":"Configration"
//     },
// ];
export default {
    name:"WorkFlowSetup",
    components: {
    Header,
    Sidebar,
    CreateWorkFlow:defineAsyncComponent(()=>import("@/components/work-flow/modals/CreateWorkFlow")),
    WorkFlowTable,
    Loader
  },

  setup() {
    const search = ref()
    const update = ref()
    const store = useStore()
    const showWorkFlowModal = ref(false);
    const showModal = () => {
      update.value=false;
      showWorkFlowModal.value = true;
    };

    const showEditModal = (value) => {
      update.value=true;
      showWorkFlowModal.value = value;
    };

    const handleOk = (value) => {
      console.log(value);
      showWorkFlowModal.value = value;
    };
    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([]);
    return {
      update,
      columns,
      data:store.getters.workflowList,
      search,
      showWorkFlowModal,
      showModal,
      handleOk,
      handleChange2,
      searchoptions,
      size: ref(),
      showEditModal
    };
  },
};
</script>
<style scoped>
.search {
  padding-bottom: 15px;
}
</style>