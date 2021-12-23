<template>
  <div>
    <!---->
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
                <h2 class="pageTittle">Time Tracking Report

                  <div class="commonBtn">
                   <a-button class="btn primaryBtn" @click="showModal"
                    >Add New Report</a-button
                  >
                </div>
                </h2>
                
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-input-search
                  v-model:value="inputvalue"
                  placeholder="Search . . ."
                  enter-button="Search"
                  size="large"
                  @search="onSearch"
                  class="mb-24"
                />
              </a-col>
              <a-col :span="12">
                <div class="text-right mb-24">
                  <a-button class="primaryBtn">Export to Excel</a-button>
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #actions>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>Edit</span>
                    </template>
                    <a class="icons"><EditOutlined /></a>
                  </a-tooltip>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>Delete</span>
                    </template>
                    <a class="icons"> <DeleteOutlined /></a>
                  </a-tooltip>
            
                  </template>
                  <template #active="key">
                    <a-switch v-model:checked="checked[key.record.key]" />
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <TimeTrackingReportModal v-model:visible="TimeTrackingReportModal" @ok="handleOk" />
  </div>
</template>
<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import TimeTrackingReportModal from "@/components/modals/TimeTrackingReportModal";

const columns = [
  {
    title: "Staff Time Report",
    dataIndex: "staffreport",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Start Date",
    dataIndex: "cprsumm",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "End Date ",
    dataIndex: "billingsumm",
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
    key: "1",
    staffreport: "Report One",
    cprsumm: "Dec 10, 2021",
    billingsumm: "Dec 12, 2021",
    action: "",
  },
  {
    key: "2",
    staffreport: "Report Two",
    cprsumm: "Dec 11, 2021",
    billingsumm: "Dec 13, 2021",
    action: "",
  },
  {
    key: "3",
    staffreport: "Report Three",
    cprsumm: "Dec 13, 2021",
    billingsumm: "Dec 14, 2021",
    action: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    TimeTrackingReportModal
  },

  setup() {
    const checked = ref([false]);

     const TimeTrackingReportModal = ref(false);
    const showModal = () => {
      TimeTrackingReportModal.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      TimeTrackingReportModal.value = false;
    };
    return {
      columns,
      data,
      checked,
      TimeTrackingReportModal,
      showModal,
      handleOk,
      value1: ref(),
      size: ref("large"),
    };
  },
};
</script>
<style lang="scss">
</style>