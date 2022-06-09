<template>
<a-table rowKey="id" :columns="column" :data-source="dataList" :scroll="{ x: 1500,y:'calc(100vh - 390px)' }" :pagination="false" @change="handleTableChange">
    <template #patient="{ record }">
        <router-link :to="{ name: 'PatientSummary', params: { udid: record.patient.id },query:{filter:filter} }">{{ record.patient.patientFullName }}</router-link>
    </template>
    <template #typeOfService="{ record }">
        <span>{{record.typeOfService.name}} </span>
        <p>{{record.device?.length>0?record.device[0]?.deviceType:record.vital[0]?.deviceType}}</p>
    </template>
    <template #cptCode="{ record }">
        <!-- <router-link :to="{ name: 'CptCodes', params: { udid: record.cptCode.id },query:{filter:filter} }">{{ record.cptCode.name }}</router-link> -->
        <span>{{record.cptCode.name}}</span>
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
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { EyeOutlined } from "@ant-design/icons-vue";
import RecordView from "../modals/ReportView";
import { useRoute } from "vue-router";
const column = [
  {
    title: "#",
    dataIndex: "serviceId",
    align: "right",
    width: "5%",
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
    title: "Date of Service",
    dataIndex: "billingDate",
    sorter: true,
  },
  {
    title: "Type of Service",
    dataIndex: "typeOfService",
    slots: {
      customRender: "typeOfService",
    },
    sorter: true,
  },
  {
    title: "CPT Code",
    dataIndex: "cptCode",
    sorter: true,
    slots: {
      customRender: "cptCode",
    },
    align: "right",
  },
  {
    title: "#Units",
    dataIndex: "numberOfUnit",
    align: "right",
  },
  {
    title: "Fee($)",
    dataIndex: "billingAmout",
    slots: {
      customRender: "billingAmout",
    },
    align: "right",
  },
  {
    title: "Total Fee($)",
    // dataIndex: "TotalFee",
    slots: {
      customRender: "TotalFee",
    },
    align: "right",
  },
  {
    title: "Status",
    dataIndex: "status",
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
    RecordView,
  },
  setup() {
    const store = useStore();
    const reportViewModal = ref();
    let data = [];
    const meta = store.getters.cptCodesMeta;
    const dataList = store.getters.cptCodes;
    const route = useRoute();
    let dateFilter = "";
    let filter = "";

    function checkDate() {
      filter = route.query.filter
        ? "&filter=" + route.query.filter
        : "&filter=";
      dateFilter =
        route.query.fromDate && route.query.toDate
          ? "&fromDate=" +
            route.query.fromDate +
            "&toDate=" +
            route.query.toDate
          : "&fromDate=&toDate=";
    }
    let scroller = "";
    onMounted(() => {
      checkDate();
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.value.current_page + 1;

          if (current_page <= meta.value.total_pages) {
            scroller = maxScroll;
            data = dataList.value;

            store.state.reports.cptCodesMeta = "";

            store
              .dispatch(
                "cptCodes",
                "?page=" +
                  current_page +
                  dateFilter +
                  filter +
                  store.getters.searchTable.value +
                  store.getters.orderTable.value.data
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    const handleTableChange = (pag, filters, sorter) => {
      checkDate();
      if (sorter.order) {
        let order = sorter.order == "ascend" ? "ASC" : "DESC";
        let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
        store.dispatch("orderTable", {
          data: orderParam,
          orderBy: order,
          page: pag,
          filters: filters,
        });
        store.dispatch(
          "cptCodes",
          "?page=" +
            store.getters.searchTable.value +
            dateFilter +
            filter +
            orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "cptCodes",
          "?page=" +
            store.getters.searchTable.value +
            store.getters.orderTable.value.data +
            dateFilter +
            filter +
            store.getters.orderTable.value.data
        );
      }
    };

    function loadMoredata() {
      const newData = dataList.value;
      newData.forEach((element) => {
        data.push(element);
      });

      store.state.reports.cptCodes = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
    }

   

    function showReportData(id) {
      store.dispatch("reportDetailList", id);
      reportViewModal.value = true;
    }

    return {
      loadMoredata,
      handleTableChange,
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
