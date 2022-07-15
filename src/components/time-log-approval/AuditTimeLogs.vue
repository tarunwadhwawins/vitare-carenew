
<template>
<a-modal width="1000px" title="Timelog Approval" :footer="false" :maskClosable="false" @cancel="closeModal()" centered>
    <a-form :model="auditTimeLog" name="auditTimeLog" autocomplete="off" layout="vertical" @finish="updateAuditTime" @finishFailed="auditTimeLogFailed">
        <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.category')" name="categoryId" :rules="[{ required: true, message: $t('timeLogs.category')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown  v-model:value="auditTimeLog.categoryId" size="large" :dataId="27" @handleGlobalChange="handleGlobalChange($event,'auditTimeLog.categoryId'); checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="Type" name="typeId" :rules="[{ required: true, message: 'Type'+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown  v-model:value="auditTimeLog.typeId" size="large" :dataId="45" @handleGlobalChange="handleGlobalChange($event,'auditTimeLog.typeId'); checkChangeInput()" disabled/>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.cptCode')" name="cptCodeId" :rules="[{ required: true, message: $t('timeLogs.cptCode')+' '+$t('global.validation')  }]">
                        <CptCodeAtivitiesDropDown  size="large" v-model:value="auditTimeLog.cptCodeId"  @handleCptCodeChange="handleCptCodeChange($event)" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col>
            <!-- <a-col :sm="24" :md="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                        <ArrayDataSearch size="large" v-model:value="auditTimeLog.flag" :globalCode="flagsList" @change="checkChangeInput()" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
                    </a-form-item>
                </div>
            </a-col> -->
            <a-col :sm="24" :md="12" :xs="24" >
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
                <ModalButtons :Id="Id" @is_cancel="closeModal"  />
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
  onMounted,
} from "vue";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import { getSeconds, warningSwal ,arrayToObjact } from "@/commonMethods/commonMethod";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import CptCodeAtivitiesDropDown from "@/components/modals/search/CptCodeActivitiesSearch";
import { messages } from "@/config/messages";
// import ArrayDataSearch from "@/components/modals/search/ArrayDataSearch";
export default defineComponent({
  components: {
    ModalButtons,
    GlobalCodeDropDown,
    // ArrayDataSearch,
    CptCodeAtivitiesDropDown
  },
  props: {
    Id: String,
  },
  setup(props, { emit }) {
    const store = useStore();
    const disabledFlag = ref(false);
    const disabledCptCode = ref(false);
    const disabledMessageType = ref(false);
    const disableButton = ref(true);
    const auditTimeLog = reactive({
      staff: "",
      patient: "",
      timeAmount: "",
      flag: "",
      note: "",
      noteId: "",
      cptCodeId: "",
      categoryId:"",
      typeId: "",
    });

    const timeLogReports = computed(() => {
      return store.state.timeLogApproval.editAuditTimeLogApproval;
    });

    const flagsList = computed(() => {
      return store.state.flags.flagsList;
    });

    const updateAuditTime = () => {
      store
        .dispatch("updateAuditTimeLogApproval", {
          data: {
            timeAmount: getSeconds(auditTimeLog.timeAmount),
            flag: auditTimeLog.flag,
            note: auditTimeLog.note,
            noteId: auditTimeLog.noteId,
            cptCode: auditTimeLog.cptCodeId,
            category: auditTimeLog.categoryId,
            status:329
          },
          id: props.Id,
        })
        .then(() => {
          store.getters.timeLogReports.value.timeLogReportList = "";
           store.dispatch("timeLogApprovalList");
          emit("saveAuditTimeLog");
          disableButton.value = true;
        });
    };

    const staffList = computed(() => {
      return store.state.common.staffList;
    });

    const patients = computed(() => {
      return store.state.common.allPatientsList;
    });

    onMounted(()=>{
      store.dispatch("flagsList");
      store.dispatch("activeCptCodes");
    })

    watchEffect(() => {
      disabledFlag.value = false;
      disabledCptCode.value = false;
      disabledMessageType.value = false;
      if (props.Id) {
        if (timeLogReports.value) {
          if (timeLogReports.value.flag != "") {
            disabledFlag.value = true;
          }
          if (timeLogReports.value.cptCodeId != "") {
            disabledCptCode.value = true;
          }
          if (timeLogReports.value.typeId != "") {
            disabledMessageType.value = true;
          }
        }
        Object.assign(auditTimeLog, timeLogReports.value);
      }
    });

    function checkChangeInput() {
      // if(timeLogReports.value.note.trim() != auditTimeLog.note.trim()  || timeLogReports.value.timeAmount != auditTimeLog.timeAmount || timeLogReports.value.typeId != auditTimeLog.typeId || timeLogReports.value.cptCodeId != auditTimeLog.cptCodeId){
      //   disableButton.value = false
      //   store.commit("checkChangeInput", true)
      // }else{
        // disableButton.value = true
        store.commit("checkChangeInput", true)
      // }
    }

    
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });
    const closeModal = () => {
      emit("saveAuditTimeLog", true)
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
      }
      else {
        emit("saveAuditTimeLog", false)
        store.commit("checkChangeInput", false)
      }
    };

    onUnmounted(() => {
      store.commit("errorMsg", null);
    });

    const handleGlobalChange = (data,type) =>{
      if (type == "auditTimeLog.typeId") {
        auditTimeLog.typeId = data;
      }
      if(type == 'auditTimeLog.categoryId'){
        auditTimeLog.categoryId = data
      }
    }

    const handleCptCodeChange = (data) =>{
      auditTimeLog.cptCodeId =data
    }

    return {
      handleCptCodeChange,
      handleGlobalChange,
      disableButton,
      closeModal,
      disabledFlag,
      disabledCptCode,
      disabledMessageType,
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
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact
    };
  },
});
</script>
