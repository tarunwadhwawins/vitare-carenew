<template>
<a-modal width="1000px" title="Edit Audit Time Log" :footer="null" :maskClosable="false" @cancel="closeModal()" centered>
    <a-form :model="auditTimeLog" name="auditTimeLog" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="updateAuditTime" @finishFailed="auditTimeLogFailed">
        <a-row :gutter="24">
        
            <a-col :sm="12" :xs="24">
                <div class="form-group" >
                  <a-form-item :label="$t('timeLogs.category')" name="categoryId" :rules="[{ required: true, message: $t('timeLogs.category')+' '+$t('global.validation')  }]">
                     <GlobalCodeDropDown v-model:value="auditTimeLog.categoryId" :globalCode="timeLogCategories"/> 
                  </a-form-item>
                </div>
              </a-col>
              <a-col :sm="12" :xs="24">
               
                <div class="form-group"  >
                  <a-form-item :label="$t('timeLogs.cptCode')" name="cptCodeId" :rules="[{ required: true, message: $t('timeLogs.cptCode')+' '+$t('global.validation')  }]">
                    
                  <GlobalCodeDropDown v-model:value="auditTimeLog.cptCodeId" :globalCode="cptCodesList"/>
                  </a-form-item>
                </div>
              </a-col>
            <a-col :md="12" :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.timeAmount')" name="timeAmount" :rules="[{ required: true, message: $t('timeLogs.timeAmount')+' '+$t('global.validation')  }]">
                        <a-time-picker v-model:value="auditTimeLog.timeAmount" format="HH:mm:ss" value-format="HH:mm:ss" :size="size" style="width: 100%" />
                        <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" /> -->
                    </a-form-item>
                </div>
            </a-col>
            <a-col :md="12" :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogReport.note')" name="note" :rules="[{ required: false, message: $t('timeLogReport.note')+' '+$t('global.validation') }]">
                        <a-textarea v-model:value="auditTimeLog.note" allow-clear />
                        <!-- <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" /> -->
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="24" :span="24">
            <ModalButtons  :Id="Id"/>
            </a-col>
        </a-row>

    </a-form>
</a-modal>
</template>

<script>
import { defineComponent, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import { getSeconds} from '@/commonMethods/commonMethod'
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
export default defineComponent({
  components: {
    ModalButtons,
   GlobalCodeDropDown,
  },
  props:{
      Id:String
  },
  setup(props,{emit}) {
    const store = useStore();
    const auditTimeLog = reactive({
      staff: "",
      patient: "",
      timeAmount: "",
      note: "",
      noteId:"",
      cptCodeId:"",
      categoryId:""
    });
    const updateAuditTime = () => {
    // auditTimeLog.timeAmount = getSeconds(auditTimeLog.timeAmount)
      store.dispatch("updateAuditTimeLog", {
          data: {
              timeAmount:getSeconds(auditTimeLog.timeAmount),
              note:auditTimeLog.note,
              noteId:auditTimeLog.noteId,
              cptCode: auditTimeLog.cptCodeId,
              category: auditTimeLog.categoryId,
              },
          id: props.Id,
      });
      setTimeout(() => {
        store.getters.timeLogReports.value.timeLogReportList=""
        store.dispatch("timeLogReportList");
         emit('saveAuditTimeLog')
      }, 2000);
    };

    
   
    const staffList = computed(() => {
      return store.state.common.staffList;
    });
    const patients = computed(() => {
      return store.state.common.allPatientsList;
    });

    const timeLogReports = computed(() => {
            return store.state.timeLogReport.editAuditTimeLog
        })

    watchEffect(()=>{
        store.dispatch('activeCptCodes')
        if(props.Id){
        Object.assign(auditTimeLog,timeLogReports.value)
        }
    })

    return {
     getSeconds,
     updateAuditTime,
      timeLogReports,
      staffList,
      auditTimeLog,
      patients,
      cptCodesList:store.getters.activeCptCodes,
      timeLogCategories:store.getters.timeLogCategories
    };
  },
});
</script>
