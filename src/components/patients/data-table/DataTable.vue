<template>
<div class="patientTable">
    <a-table rowKey="id" :columns="meta.column" :data-source="meta.patientList" :scroll="{ y: tableYScrollerCounterPage, x: 1500 }" :pagination="false" @change="handleTableChange">
        <template #firstName="{ text, record }" v-if="arrayToObjact(screensPermissions, 63)">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">{{ text }}</router-link>
        </template>
        <template #firstName="{ text }" v-else>
            <span>{{ text }}</span>
        </template>
        <template #flags="text">
            <span class="box" :style="{ 'background-color': text.text }"></span>
        </template>
        <template #patientVitals>
            <WarningOutlined />
        </template>

        <template #lastReadingDate>
            <WarningOutlined />
        </template>
        <template #action="{ record }" v-if="arrayToObjact(screensPermissions,63)">
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons">
                    <DeleteOutlined @click="deletePatients(record.id)" /></a>
            </a-tooltip>
        </template>
    </a-table>
</div>
</template>

<script>
import {WarningOutlined,DeleteOutlined} from "@ant-design/icons-vue";
import {  messages} from "@/config/messages";
import {  warningSwal} from "@/commonMethods/commonMethod";
import {  onMounted} from "vue";
import {   useStore} from "vuex";
import {   tableYScrollerCounterPage,   arrayToObjact} from "@/commonMethods/commonMethod";
import {   useRoute} from 'vue-router';
export default {
    name: "DataTable",
    components: {
        WarningOutlined,
        DeleteOutlined
    },
    props: {},
    setup() {
        const store = useStore();
        const meta = store.getters.patientsRecord.value;
        let data = [];
        let scroller = "";
        const route = useRoute()
        if (route.query) {
            store.dispatch("patients", "?filter=" + route.query.filter + "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
        }
        let filter = route.query.filter ? "&filter=" + route.query.filter : "&filter="
        let dateFilter = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");
            tableContent.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
                    let current_page = meta.patientMeta.current_page + 1;
                    if (current_page <= meta.patientMeta.total_pages) {
                        scroller = maxScroll;
                        meta.patientMeta = "";

                        data = meta.patientList
                        //store.state.patients.patientList = ""

                        store.dispatch("patients", "?page=" + current_page + dateFilter + filter + store.getters.searchTable.value +
                            store.getters.orderTable.value.data).then(() => {
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
                    "?page=" + dateFilter + filter + store.getters.searchTable.value + orderParam
                );
            } else {
                store.dispatch("orderTable", {
                    data: "&orderField=&orderBy=",
                });
                store.dispatch(
                    "patients",
                    "?page=" + dateFilter + filter +
                    store.getters.searchTable.value +
                    store.getters.orderTable.value.data
                )
            }
        }

        function deletePatients(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {

                    var index = meta.patientList.findIndex(function (o) {
                        return o.id === id;
                    })

                    store.dispatch("patientsDelete", id)
                    meta.patientList.splice(index, 1)
                }
            })
        }
        return {
            screensPermissions: store.getters.screensPermissions,
            arrayToObjact,
            meta,
            tableYScrollerCounterPage,
            handleTableChange,
            deletePatients
        };
    },
};
</script>
