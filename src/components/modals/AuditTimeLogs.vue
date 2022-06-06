
<template>
<a-modal width="1000px" title="Edit Audit Time Log" :footer="false" :maskClosable="false" @cancel="closeModal()" centered>
    <a-form :model="auditTimeLog" name="auditTimeLog" autocomplete="off" layout="vertical" @finish="updateAuditTime" @finishFailed="auditTimeLogFailed">
        <a-row :gutter="24">
            <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.category')" name="categoryId" :rules="[{ required: true, message: $t('timeLogs.category')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown :disabled="disabledCategory" size="large" v-model:value="auditTimeLog.categoryId" :globalCode="timeLogCategories" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.cptCode')" name="cptCodeId" :rules="[{ required: true, message: $t('timeLogs.cptCode')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown :disabled="disabledCptCode" size="large" v-model:value="auditTimeLog.cptCodeId" :globalCode="cptCodesList" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown size="large" v-model:value="auditTimeLog.flag" :globalCode="flagsList" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.timeAmount')" name="timeAmount" :rules="[{ required: true, message: $t('timeLogs.timeAmount')+' '+$t('global.validation')  }]">
                        <a-time-picker v-model:value="auditTimeLog.timeAmount" format="HH:mm:ss" value-format="HH:mm:ss" size="large" style="width: 100%" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="24" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogReport.note')" name="note" :rules="[{ required: true, message: $t('timeLogReport.note')+' '+$t('global.validation') }]">
                        <a-textarea v-model:value="auditTimeLog.note" allow-clear @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="24" :span="24">
                <ModalButtons :Id="Id" @is_cancel="closeModal()" :disableButton="disableButton" />
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>
<script>
import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  ref,
  onUnmounted,
} from "vue";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import { getSeconds, warningSwal } from "@/commonMethods/commonMethod";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import { messages } from "../../config/messages";
export default defineComponent({
  components: {
    ModalButtons,
    GlobalCodeDropDown,
  },
  props: {
    Id: String,
  },
  setup(props, { emit }) {
    const store = useStore();
    const disabledFlag = ref(false);
    const disabledCptCode = ref(false);
    const disabledCategory = ref(false);
    const disableButton = ref(true);
    const auditTimeLog = reactive({
      staff: "",
      patient: "",
      timeAmount: "",
      flag: "",
      note: "",
      noteId: "",
      cptCodeId: "",
      categoryId: "",
    });

    const timeLogReports = computed(() => {
      return store.state.timeLogReport.editAuditTimeLog;
    });

    const flagsList = computed(() => {
      return store.state.flags.flagsList;
    });

    const updateAuditTime = () => {
      store
        .dispatch("updateAuditTimeLog", {
          data: {
            timeAmount: getSeconds(auditTimeLog.timeAmount),
            flag: auditTimeLog.flag,
            note: auditTimeLog.note,
            noteId: auditTimeLog.noteId,
            cptCode: auditTimeLog.cptCodeId,
            category: auditTimeLog.categoryId,
          },
          id: props.Id,
        })
        .then(() => {
          store.getters.timeLogReports.value.timeLogReportList = "";
          store.dispatch(
            "timeLogReportList",
            store.getters.auditTimeLogFilterDates.value
          );
          emit("saveAuditTimeLog");
        });
    };

    const staffList = computed(() => {
      return store.state.common.staffList;
    });

    const patients = computed(() => {
      return store.state.common.allPatientsList;
    });

    watchEffect(() => {
      store.dispatch("activeCptCodes");
      disabledFlag.value = false;
      disabledCptCode.value = false;
      disabledCategory.value = false;
      if (props.Id) {
        if (timeLogReports.value) {
          if (timeLogReports.value.flag != "") {
            disabledFlag.value = true;
          }
          if (timeLogReports.value.cptCodeId != "") {
            disabledCptCode.value = true;
          }
          if (timeLogReports.value.categoryId != "") {
            disabledCategory.value = true;
          }
        }
        Object.assign(auditTimeLog, timeLogReports.value);
      }
    });

    function checkChangeInput() {
        disableButton.value = false;
        store.commit("checkChangeInput", true);
    }

    
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });
    const closeModal = () => {
      if (checkFieldsData.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("saveAuditTimeLog", false);
            store.commit("errorMsg", null);
            store.commit("checkChangeInput", false);
            disableButton.value = true;
          } else {
            emit("saveAuditTimeLog", true);
            disableButton.value = false;
          }
        });
      } else {
        store.commit("checkChangeInput", false);
      }
    };

    onUnmounted(() => {
      store.commit("errorMsg", null);
    });

    return {
      disableButton,
      closeModal,
      disabledFlag,
      disabledCptCode,
      disabledCategory,
      getSeconds,
      updateAuditTime,
      timeLogReports,
      staffList,
      auditTimeLog,
      patients,
      cptCodesList: store.getters.activeCptCodes,
      timeLogCategories: store.getters.timeLogCategories,
      flagsList,
      checkChangeInput,
    };
  },
});
</script>
