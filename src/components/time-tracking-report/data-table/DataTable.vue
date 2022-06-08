<template>
<a-table rowKey="id" :columns="column" :data-source="dataList" :scroll="{ x: 1500,y:'calc(100vh - 490px)' }" :pagination="false" @change="handleTableChange">
    <template #patient="{ record }">
        <router-link :to="{ name: 'PatientSummary', params: { udid: record.patient.id },query:{filter:filter} }">{{ record.patient.name }}</router-link>
    </template>
    <template #typeOfService="{ record }">
        <span>{{record.typeOfService.name}}</span>
    </template>
    <template #cptCode="{ record }">
        <router-link :to="{ name: 'CptCodes', params: { udid: record.cptCode.id },query:{filter:filter} }">{{ record.cptCode.name }}</router-link>
    </template>
    <template #billingAmout="{ record }">
        <span>{{record.cptCode.billingAmout}}</span>
    </template>
    <template #TotalFee="{record}">
        <span>{{(record.cptCode.billingAmout * record.numberOfUnit).toFixed(2)}}</span>
    </template>
    <template #action="{record}">
        <a-tooltip placement="bottom" @click="showReportData(record.id)">
            <template #title>
                <span>{{ 'View' }}</span>
            </template>
            <a class="icons">
                <EyeOutlined /></a>
        </a-tooltip>
    </template>
</a-table>
<RecordView v-model:visible="reportViewModal" />
</template>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import { EyeOutlined } from "@ant-design/icons-vue";
import RecordView from "../modals/ReportView"
const column = [
  {
    title: "#ID",
    dataIndex: "id",
    sorter: true,
    //   slots: {
    //     customRender: "document",
    //   },
  },
  {
    title: "Patient Name",
    dataIndex: "patient",
    sorter: true,
    slots: {
      customRender: "patient",
    },
  },
  {
    title: "Date of Billed",
    dataIndex: "billingDate",
    sorter: true,
  },
  {
    title: "Type of Service",
    dataIndex: "typeOfService",
    slots: {
      customRender: "typeOfService",
    },
  },
  {
    title: "CPT Code",
    dataIndex: "cptCode",
    sorter: true,
    slots: {
      customRender: "cptCode",
    },
  },
  {
    title: "Number of Units",
    dataIndex: "numberOfUnit",
    sorter: true,
  },
  {
    title: "CPT Code Fee",
    dataIndex: "billingAmout",
    sorter: true,
    slots: {
      customRender: "billingAmout",
    },
  },
  {
    title: "Total Fee",
    // dataIndex: "TotalFee",
    sorter: true,
    slots: {
      customRender: "TotalFee",
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: true,
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
    EyeOutlined,
    RecordView
  },
  setup() {
    const store = useStore();
    const reportViewModal = ref()
    const dataList = computed(() => {
      return store.state.reports.reportList;
    })

    function showReportData(id){
        console.log(id)
        reportViewModal.value = true
    }

    return {
      reportViewModal,
      showReportData,
      column,
      dataList,
    };
  },
};
</script>

<style>
</style>
