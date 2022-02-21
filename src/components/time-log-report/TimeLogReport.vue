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
                            <h2 class="pageTittle">{{$t('timeLogReport.auditTimeLog')}}</h2>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :sm="10" :xs="24">
                            <div class="form-group">
                                <label>{{$t('timeLogReport.filterBy')}}</label>
                                <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                    <a-select-option value="lucy">Patient</a-select-option>
                                    <a-select-option value="lucy">Staff</a-select-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :sm="10" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.name')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                        <a-col :sm="4" :xs="24">
                            <div class="text-right mt-28">
                                <a-button class="btn primaryBtn" @click="showModal">{{$t('timeLogReport.view')}}</a-button>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :sm="24" :xs="24">
                            <a-table :columns="timeLogReports.timeLogReportColumns" :data-source="timeLogReports.timeLogReportList" :scroll="{ x: 900 }" @change="onChange">
                                <template #staff="text">
                                    <!-- <router-link to="coordinator-summary">{{
                      text.text
                    }}</router-link> -->
                    <span>{{text.text}}</span>
                                </template>
                                <template #patient="text">
                                    <!-- <router-link :to="linkTo">{{
                      text.text
                    }}</router-link> -->
                    <span>{{text.text}}</span>
                                </template>
                                <template #flag="{ text }">
                                    <span>
                                        <img class="reportFlag" src="../../assets/images/flag-orange.svg" alt="image" /></span>
                                    <span v-if="text.match(/two/g)"><img class="reportFlag" src="../../assets/images/flag-red.svg" alt="image" /></span>
                                </template>
                                <template #actions="text">
                                    <a-tooltip placement="bottom" @click="editTimeLog(text.text)">
                                      <AuditTimeLog v-model:visible="visible" @saveAuditTimeLog="handleOk($event)" :Id="text.text"/>
                                        <template #title>
                                            <span>{{$t('global.edit')}}</span>
                                        </template>
                                        <a class="icons">
                                            <EditOutlined /></a>
                                    </a-tooltip>
                                    <a-tooltip placement="bottom" @click="deleteTimeLog(text.text)">
                                        <template #title>
                                            <span>{{$t('global.delete')}}</span>
                                        </template>
                                        <a class="icons">
                                            <DeleteOutlined /></a>
                                    </a-tooltip>
                                </template>
                                <template #active="key">
                                    <a-switch v-model:checked="checked[key.record.key]" />
                                </template>
                            </a-table>
                            <Loader />
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</div>
</template>

<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import AuditTimeLog from "../modals/AuditTimeLogs";
import { ref, watchEffect } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    Loader,
    AuditTimeLog,
  },

  setup() {
    const store = useStore();
    const checked = ref([false]);
    const visible = ref(false);
    const linkTo = "patients-summary";

    const editTimeLog = (id) => {
      console.log(id);
      store.dispatch("editAuditTimeLog", id);
      visible.value = true;
    };

    watchEffect(() => {
      store.dispatch("timeLogReportList");
    });

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    // const timeLogReports = computed(() => {
    //   return store.state.timeLogReport;
    // });

    function deleteTimeLog(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteTimeLog", id);
          setTimeout(() => {
            store.dispatch("timeLogReportList");
          }, 2000);
        }
      });
    }

    return {
      editTimeLog,
      deleteTimeLog,
      linkTo,
      checked,
      visible,
      handleOk,
      value1: ref(),
      size: ref("large"),
      timeLogReports:store.getters.timeLogReports
    };
  },
};
</script>

<style lang="scss">
</style>
