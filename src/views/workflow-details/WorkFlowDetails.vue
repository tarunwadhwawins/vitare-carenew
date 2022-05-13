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
                                <router-link to="/work-flow"> Workflow Setup</router-link> > {{workflow?workflow.eventTitle:''}}
                            </h2>
                        </a-col>
                        <a-col :span="24" class="mt-25 ">
                            <a-steps v-model:current="current">
                                <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
                            </a-steps>
                            <div class="steps-content" v-if="steps[current].title == 'Workflow Criteria'">
                                <WorkFlowCriteria />
                                
                            </div>
                            <div class="steps-content" v-if="steps[current].title == 'Action Groups'">
                                <a-col :span="24">
                                    <h3 class="pageTittle">
                                        <a-button class="btn primaryBtn" @click="showModal">Create New</a-button>
                                    </h3>
                                </a-col>
                                <a-col :span="24" class="mt-25 ">
                                    <WorkFlowActionTable :columns="columns" :data-source="data" @showEditModal="showEditModal($event)" @groupEditModal="groupEditModal($event)" />
                                </a-col>
                                <div class="steps-action">
                                    <a-button type="primary" v-if="current > 0" style="margin-right: 8px;margin-top: 20px;" @click="prev">{{$t('global.previous')}}</a-button>
                                </div>
                            </div>
                        </a-col>
                        
                    </a-row>
                </div>
                <!-- <div class="common-bg">
                    <a-row class="row">
                        <a-col :span="24">
                            <h3 class="pageTittle">
                                Action Groups
                                <div class="commonBtn">
                                    <a-button class="btn primaryBtn" @click="showModal">Create New</a-button>
                                </div>
                            </h3>
                        </a-col>
                        <a-col :span="24" class="mt-25 ">
                            <WorkFlowActionTable :columns="columns" :data-source="data" @showEditModal="showEditModal($event)" @groupEditModal="groupEditModal($event)" />
                        </a-col>
                    </a-row>
                </div> -->
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!-- modal -->
    <WorkFlowGroupAction v-model:visible="visibleGroupAction" @saveModal="handleOk($event)" :update="update" />
    <WorkFlowEditGroupAction v-model:visible="visibleEditGroupAction" @saveModal="handleOk($event)" :actionId="actionId" />

</div>
<Loader />
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import WorkFlowCriteria from "@/components/workFlow-details/modals/WorkFlowCriteria";
import WorkFlowActionTable from "@/components/workFlow-details/tables/WorkFlowActionGroupTable";
import WorkFlowGroupAction from "@/components/workFlow-details/modals/WorkFlowGroupAction";
import WorkFlowEditGroupAction from "@/components/workFlow-details/modals/WorkFlowEditGroupAction";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Loader from "@/components/loader/Loader";
const columns = [
  {
    title: "Action Group Description",
    dataIndex: "title",
    slots: {
      customRender: "title",
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
    title: "Settings",
    dataIndex: "settings",
    slots: {
      customRender: "settings",
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
export default {
  name: "WorkFlowDetails",
  components: {
    Header,
    Sidebar,
    WorkFlowCriteria,
    WorkFlowActionTable,
    WorkFlowGroupAction,
    WorkFlowEditGroupAction,
    Loader,
  },
  setup() {
    const visibleGroupAction = ref(false);
    const visibleEditGroupAction = ref(false);
    const actionId = ref();
    const store = useStore();
    const router = useRoute();
    const update = ref(false);
    const showModal = () => {
      update.value = false;
      visibleGroupAction.value = true;
    };

    const current = computed({
      get: () => store.state.workflow.counter,
      set: (value) => {
        store.state.workflow.counter = value;
      },
    });

    const next = () => {
      store.commit("counterPlus");
    };
    const prev = () => {
      store.commit("counterMinus");
    };

    const groupEditModal = (value) => {
      update.value = true;
      visibleGroupAction.value = value;
    };

    const showEditModal = (value) => {
      visibleEditGroupAction.value = value.type;
      actionId.value = value.id;
    };

    const handleOk = (value) => {
      visibleGroupAction.value = value;
      visibleEditGroupAction.value = value;
    };

    const workflow = computed(() => {
      return store.state.workflow.workflowCriteria;
    });

    onMounted(() => {
      store.dispatch("workflowColumn", router.params.udid);
      store.dispatch("groupActionList", router.params.udid);
       store.commit("resetCounter")
    });
    return {
      actionId,
      current,
      workflow,
      update,
      groupEditModal,
      visibleEditGroupAction,
      showModal,
      showEditModal,
      handleOk,
      visibleGroupAction,
      size: ref(),
      columns,
      data: store.getters.groupActionList,
      next,
      prev,
      steps: [
        {
          title: "Workflow Criteria",
          content: "First-content",
        },
        {
          title: "Action Groups",
          content: "Second-content",
        },
      ],
    };
  },
};
</script>

<style scoped>
.common-bg {
  margin-bottom: 20px;
}
</style>
