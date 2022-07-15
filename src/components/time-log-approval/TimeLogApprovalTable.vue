<template>
<a-col :sm="24" :xs="24">
    <a-table rowKey="id" :columns="meta.timeLogReportColumns" :pagination="false" :scroll="{ y:'calc(100vh - 370px)'}" :data-source="meta.timeApproval" @change="handleTableChange">
        <template #staff="{record}">

            <router-link :to="{ name: 'CoordinatorSummary', params: { udid:record.staff.id  }}" v-if="arrayToObjact(screensPermissions,38)">{{record.staff.fullName}}</router-link>
            <a v-if="arrayToObjact(screensPermissions,38)" @click="showStaffModal( record.staff.id)" class="nameInfoIcon">
                <InfoCircleOutlined /></a>
            <span v-else>{{record.staff}}</span>
        </template>
        <template #patient="{record}">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patient.id } }" v-if="arrayToObjact(screensPermissions, 63) || record.patientAccess==true">{{record.patient.fullName}}</router-link>
            <a v-if="arrayToObjact(screensPermissions, 63) || record.patientAccess==true" @click="showPatientModal( record.patient.id)" class="nameInfoIcon">
                <InfoCircleOutlined /></a>
            <span v-else :title="messages.access">{{record.patient.fullName}}</span>
        </template>
        <template #flags="{ record }">
            <!-- <Flags :flag="record.flagColor" :data="record" /> -->
            <span>{{record.flagName}}</span>
        </template>
        <template #flag="{ text }">
            <span>
                <img class="reportFlag" src="../../assets/images/flag-orange.svg" alt="image" /></span>
            <span v-if="text.match(/two/g)"><img class="reportFlag" src="../../assets/images/flag-red.svg" alt="image" /></span>
        </template>
        <template #actions="{record}">
            <!-- <a-tooltip placement="bottom" @click="editTimeLog(record.id)" v-if="arrayToObjact(screensPermissions, 334)">
                <template #title>
                    <span>{{$t('global.edit')}}</span>
                </template>
                <a class="icons">
                    <EditOutlined /></a>
            </a-tooltip> -->
            <!-- <a-tooltip placement="bottom" @click="viewTimeLog(record.id)" v-if="arrayToObjact(screensPermissions, 332)">
                <template #title>
                    <span>{{ $t("common.view") }}</span>
                </template> -->
            <div>
                <a-button :disabled="record?.statusId==329 || record?.statusId==330" class="modal-button handleClear" type="primary" html-type="submit" @click="editTimeLog(record.id)" v-if="arrayToObjact(screensPermissions, 334)">{{'Approve'}}</a-button>
                <a-button :disabled="record?.statusId==329 || record?.statusId==330" @click="rejectButton(record.id)" class="modal-button">Reject</a-button>
            </div>
            <!-- <a class="icons">
                    <EyeOutlined />
                </a>
            </a-tooltip> -->
        </template>
        <template #active="key">
            <a-switch v-model:checked="checked[key.record.key]" :disabled="!arrayToObjact(screensPermissions,334)" />
        </template>
    </a-table>
    <TableLoader />

    <AuditTimeLog v-model:visible="visible" @saveAuditTimeLog="handleOk($event)" :Id="Id" />
</a-col>
<ViewTimeLogTable v-if="viewReport" v-model:visible="viewReport" :id="auditId" />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
  // DeleteOutlined,
  // EditOutlined,
  // EyeOutlined
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import AuditTimeLog from "./AuditTimeLogs.vue";
import ViewTimeLogTable from "./ViewTimeLogTable";
import { messages } from "@/config/messages";
import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import {
  warningSwal,
  arrayToObjact,
  timeStampFormate,
  showStaffModal,
  showPatientModal,
} from "@/commonMethods/commonMethod";

// import Flags from "@/components/common/flags/Flags";
import { useRoute } from "vue-router";

export default {
  components: {
    InfoCircleOutlined,
    // DeleteOutlined,
    // EyeOutlined,
    // EditOutlined,
    TableLoader,
    AuditTimeLog,
    ViewTimeLogTable,
    // Flags,
  },
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const visible = ref(false);
    const viewReport = ref(false);
    const Id = ref();
    const handleOk = (event) => {
      visible.value = event;
      emit("scrolller");
    };
    const route = useRoute();
    const editTimeLog = (id) => {
      console.log(id);
      store.commit("errorMsg", null);
      store.dispatch("editAuditTimeLogApproval", id);
      visible.value = true;
      Id.value = id;
    };
    const auditId = ref("");

    function viewTimeLog(id) {
      store.dispatch("timeLogView", id);
      viewReport.value = true;
      auditId.value = id;
    }
    // const modalData = store.getters.timeLogView
    const columns = store.getters.viuewTimeReportModal;

    const meta = store.getters.timeLogApproval;
    const loader = ref(false);
    let data = [];

    let filter = "";
    let date = "";

    function checkDate() {
      filter = route.query.filter ? route.query.filter : "";
      date =
        route.query.fromDate && route.query.toDate
          ? "?fromDate=" +
            timeStampFormate(route.query.fromDate, "YYYY-MM-DD") +
            "&toDate=" +
            timeStampFormate(route.query.toDate, "YYYY-MM-DD")
          : store.getters.auditTimeLogFilterDates.value
          ? store.getters.auditTimeLogFilterDates.value
          : "?fromDate=&toDate=";
    }

    let scroller = "";
    onMounted(() => {
      checkDate();
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.timeLogeMeta.current_page + 1;
          if (current_page <= meta.timeLogeMeta.total_pages) {
            scroller = maxScroll;
            data = meta.timeLogReportList;

            loader.value = true;

            store.state.timeLogReport.timeLogeMeta = "";

            store
              .dispatch(
                "timeLogApprovalList",
                date +
                  "&filter=" +
                  filter +
                  "&page=" +
                  current_page +
                  store.getters.orderTable.value.data +
                  store.getters.searchTable.value
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = meta.timeLogReportList;

      newData.forEach((element) => {
        data.push(element);
      });
      meta.timeLogReportList = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);

      loader.value = false;
    }

    //timeLogReport
    const auditTimes = computed(() => {
      return store.state.timeLogReport;
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
          "timeLogApprovalList",
          date +
            "&filter=" +
            filter +
            store.getters.searchTable.value +
            orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "timeLogApprovalList",
          date +
            "&filter=" +
            filter +
            store.getters.searchTable.value +
            store.getters.orderTable.value.data
        );
      }
    };

    const rejectButton = (id) => {
      warningSwal("Are you sure you want to reject ?").then((response) => {
        if (response == true) {
          store
            .dispatch("rejectApproval", {
              data: {
                status: 330,
              },
              id: id,
            })
            .then(() => {
              store.dispatch("timeLogApprovalList");
            });
        } else {
          // emit("saveAuditTimeLog", true);
          // disableButton.value = false;
        }
      });
    };

    return {
      rejectButton,
      showPatientModal,
      showStaffModal,
      screensPermissions: store.getters.screensPermissions,
      handleTableChange,
      Id,
      arrayToObjact,
      auditTimes,
      editTimeLog,
      handleOk,
      loader,
      visible,
      meta,
      viewTimeLog,
      modalData: store.getters.timeLogView,
      columns,
      viewReport,
      timeStampFormate,
      auditId,
    };
  },
};
</script>

<style scoped>
.handleClear {
  margin-right: 10px;
}
</style>
