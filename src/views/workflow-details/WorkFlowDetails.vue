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
                                WorkFlow Criteria
                            </h2>
                        </a-col>
                        <a-col :span="24" class="mt-25 ">
                            <WorkFlowCriteria />
                        </a-col>
                    </a-row>
                </div>
                <div class="common-bg">
                    <a-row class="row">
                        <a-col :span="24">
                            <h2 class="pageTittle">
                                Action Groups
                                 <div class="commonBtn">
                                    <a-button class="btn primaryBtn" @click="showModal">Create New</a-button>
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="24" class="mt-25 ">
                            <WorkFlowActionTable :columns="columns" :data-source="data"  @showEditModal="showEditModal($event)" @groupEditModal="groupEditModal($event)"/>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!-- modal -->
    <WorkFlowGroupAction v-model:visible="visibleGroupAction" @ok="handleOk" :update="update"/>
    <WorkFlowEditGroupAction v-model:visible="visibleEditGroupAction" @ok="handleOk"/>
</div>
</template>
<script>
import Header from "@/components/layout/header/Header"; 
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import WorkFlowCriteria from "@/components/workFlow-details/modals/WorkFlowCriteria"
import WorkFlowActionTable from "@/components/workFlow-details/tables/WorkFlowActionGroupTable"
import WorkFlowGroupAction from "@/components/workFlow-details/modals/WorkFlowGroupAction"
import WorkFlowEditGroupAction from "@/components/workFlow-details/modals/WorkFlowEditGroupAction"
import { ref } from "vue"; 
const columns = [
  {
    title: "Action Group Description",
    dataIndex: "ActionGroupDescription",
    slots: {
      customRender: "actionGroupDescription",
    },
    
  },
  {
    title: "Number Of Actions",
    dataIndex: "numberOfActions",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
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
const data = [
    {
        "ActionGroupDescription":"Group1",
        "numberOfActions":"1",
    },
];
export default {
    name:"WorkFlowDetails",
    components: {
    Header,
    Sidebar,
    WorkFlowCriteria, 
    WorkFlowActionTable,
    WorkFlowGroupAction,
    WorkFlowEditGroupAction
  },
  setup() {
    const visibleGroupAction = ref(false);
    const visibleEditGroupAction = ref(false)
    const update = ref(false)
    const showModal = () => {
      update.value=false;
      visibleGroupAction.value = true;
    };

    
    const groupEditModal = (value) => {
      update.value=true;
      visibleGroupAction.value = value;
    };

    const showEditModal = (value) => {
      visibleEditGroupAction.value = value;
    };

    const handleOk = (e) => {
      console.log(e);
      visibleGroupAction.value = false;
      visibleEditGroupAction.value = false;
    };
    return {
      update,
      groupEditModal,
      visibleEditGroupAction,
      showModal,
      showEditModal,
      handleOk,
      visibleGroupAction,
      size: ref(),
      columns,
      data
    };
  },
};
</script>
<style scoped>

.common-bg{
    margin-bottom: 20px;
}
</style>