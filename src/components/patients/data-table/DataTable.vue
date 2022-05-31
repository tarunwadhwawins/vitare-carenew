<template>
<div class="patientTable">
    <a-table rowKey="id" :columns="meta.column" :data-source="meta.patientList" :scroll="{ x: 1500,y:'calc(100vh - 470px)' }" :pagination="false" @change="handleTableChange">
        <template #firstName="{ text, record }" v-if="arrayToObjact(screensPermissions, 63)">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">{{ text }}</router-link>

        </template>
        <template #firstName="{ text }" v-else>
            <span>{{ text }}</span>
        </template>
        <template #flags="{ record }">
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{ record.flagName }}</span>
                </template>
                <a class="icons">
                    <Flags :flag="record.flagColor" /></a>
            </a-tooltip>
        </template>
        <template #patientVitals>
            <WarningOutlined />
        </template>

        <template #lastReadingDate>
            <WarningOutlined />
        </template>
        <template #status="{record}">
            <a-switch v-model:checked="record.isActive" @change="updateStatus(record.id, $event)" :disabled="!arrayToObjact(screensPermissions,63)" />
        </template>
        <template #action="{ record }" v-if="arrayToObjact(screensPermissions,63)">
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{'Reset Password'}}</span>
                </template>
                <a class="icons">
                    <KeyIcon height="16" width="16" alt="Reset Password" @click="resetPasseord(record.id)"/>
                    <!-- <img src="@/assets/images/key.svg" > -->
                    <!-- <KeyOutlined @click="resetPasseord(record.id)" /> -->
                </a>
            </a-tooltip>

            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons">
                    <DeleteOutlined @click="deletePatients(record.id)" /></a>
            </a-tooltip>
        </template>
    </a-table>
    <!-- <ResetPassword v-model:visible="resetPasswordVisible" @saveModal="saveModal($event)" endPoint="patient" :id="idData" /> -->
</div>
</template>

<script>
import {
  WarningOutlined,
  DeleteOutlined,
//   KeyOutlined,
} from "@ant-design/icons-vue";
import { messages } from "@/config/messages";
import { warningSwal } from "@/commonMethods/commonMethod";
import { onMounted,ref, defineComponent } from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
import KeyIcon from "@/components/common/KeyIcon";
import {
 // tableYScrollerCounterPage,
  arrayToObjact,
} from "@/commonMethods/commonMethod";
import { useRoute } from "vue-router";
// import ResetPassword from "@/components/reset-password/modal/ResetPassword";
export default defineComponent({
  name: "DataTable",
  components: {
    WarningOutlined,
    DeleteOutlined,
    // KeyOutlined,
    KeyIcon,
    Flags,
    // ResetPassword:defineAsyncComponent(()=>import("@/components/reset-password/modal/ResetPassword")),
  },
setup() {
const store = useStore();
const idData = ref();
const resetPasswordVisible = ref();
const meta = store.getters.patientsRecord.value;
let data = [];
const route = useRoute();

let filter = "";
let date = "";

function checkDate() {
    filter = route.query.filter ? route.query.filter : "";
    date =
        route.query.fromDate && route.query.toDate ?
        "&fromDate=" +
        route.query.fromDate +
        "?toDate=" +
        route.query.toDate :
        "&fromDate=&toDate=";
}
let scroller = "";
onMounted(() => {
    checkDate();

    var tableContent = document.querySelector(".ant-table-body");
    tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
            // you're at the bottom of the page
            let current_page = meta.patientMeta.current_page + 1;
            if (current_page <= meta.patientMeta.total_pages) {
                scroller = maxScroll;
                meta.patientMeta = "";

                data = meta.patientList;
                //store.state.patients.patientList = ""

                store
                    .dispatch(
                        "patients",
                        "?page=" +
                        current_page +
                        date +
                        "&filter=" +
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

function loadMoredata() {
    const newData = meta.patientList;
    newData.forEach((element) => {
        data.push(element);
    });
    meta.patientList = data;
    var tableContent = document.querySelector(".ant-table-body");

    setTimeout(() => {
        tableContent.scrollTo(0, scroller);
    }, 50);
}

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
            "patients",
            "?page=" +
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
            "patients",
            "?page=" +
            date +
            "&filter=" +
            filter +
            store.getters.searchTable.value +
            store.getters.orderTable.value.data
        );
    }
};

function deletePatients(id) {
    warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
            var index = meta.patientList.findIndex(function (o) {
                return o.id === id;
            });

            store.dispatch("patientsDelete", id);
            meta.patientList.splice(index, 1);
        }
    });
}
const updateStatus = (id, status) => {
    const data = {
        isActive: status,
    };
    store.dispatch("updatePatientStatus", {
        id,
        data,
    });
};

const resetPasseord = (id) => {
    warningSwal(messages.resetPassword).then((response) => {
          if (response == true) {
            store.dispatch("passwordReset", {endPoint:'patient',id:id})
          } else {
            // emit("saveModal", true);
          }
        });
    
};

const saveModal = (value) => {
    resetPasswordVisible.value = value
}

return {
    idData,
    saveModal,
    resetPasswordVisible,
    resetPasseord,
    screensPermissions: store.getters.screensPermissions,
    arrayToObjact,
    meta,
    //tableYScrollerCounterPage,
    handleTableChange,
    deletePatients,
    updateStatus,
};
},
});
</script>
