<template>
  <a-form ref="formRef" :model="program" scrollToFirstError=true name="basic" autocomplete="off" layout="vertical" @finish="programs" @finishFailed="programFailed">
      <a-row :gutter="24">
        
          <a-col :md="8" :sm="12" :xs="24">
              <div class="form-group">
                  <a-form-item :label="$t('patient.programs.program')" name="program" :rules="[{ required: true, message: $t('patient.programs.program')+' '+$t('global.validation') }]">
                      <GlobalCodeDropDown v-model:value="program.program" :globalCode="patients.programList" @change="changedValue"/>
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.program?errorMsg.program[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
          <a-col :md="8" :sm="6" :xs="24">
              <div class="form-group">
                  <a-form-item :label="$t('patient.programs.onboardinScheduledDate')" name="onboardingScheduleDate" :rules="[{ required: true, message: $t('patient.programs.onboardinScheduledDate')+' '+$t('global.validation') }]">
                      <a-date-picker @change="changedValue" v-model:value="program.onboardingScheduleDate" format="MM/DD/YYYY" value-format="YYYY-MM-DD" style="width: 100%" size="large" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.onboardingScheduleDate?errorMsg.onboardingScheduleDate[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
          <a-col :md="8" :sm="6" :xs="24">
              <div class="form-group">
                  <a-form-item :label="$t('patient.programs.dischargeDate')" name="dischargeDate" :rules="[{ required: true, message: $t('patient.programs.dischargeDate')+' '+$t('global.validation') }]">
                      <a-date-picker @change="changedValue" v-model:value="program.dischargeDate" format="MM/DD/YYYY" value-format="YYYY-MM-DD" style="width: 100%" size="large" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.dischargeDate?errorMsg.dischargeDate[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
          <a-col :md="8" :sm="12" :xs="24">
              <div class="form-group">
                  <label>{{$t('global.status')}}</label>
                  <a-radio-group v-model:value="program.status">
                      <a-radio :value="1">{{$t('global.active')}}</a-radio>
                      <a-radio :value="0">{{$t('global.inactive')}}</a-radio>
                  </a-radio-group>
              </div>
          </a-col>
      </a-row>
      <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
              <a-button class="btn primaryBtn" html-type="submit">{{$t('global.save')}}</a-button>
          </a-col>
      </a-row>
      <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
              <a-table  rowKey="id" :columns="columns" :data-source="programsData" :pagination="false" :scroll="{ x: 900 }">
                  <template #action="text" v-if="arrayToObjact(screensPermissions,70)">
                      <a-tooltip placement="bottom">
                          <a class="icons" @click="editProgram(text.record.id)">
                            <EditOutlined />
                          </a>
                      </a-tooltip>
                      <a-tooltip placement="bottom">
                          <a class="icons" @click="deleteProgram(text.record.id)">
                            <DeleteOutlined />
                          </a>
                      </a-tooltip>
                  </template>
              </a-table>
          </a-col>
      </a-row>
  </a-form>
  <Loader />
</template>

<script>
import { defineComponent, reactive, computed, watchEffect, ref } from "vue";
import { 
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "../../loader/Loader"
import {
  warningSwal,
  timeStamp,
  arrayToObjact
} from "@/commonMethods/commonMethod"
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
    Loader,
    ErrorMessage,
    GlobalCodeDropDown
  },
  props: {
    idPatient: {
      type: String
    }
  },
  setup(props, {emit}) {
    const formRef = ref()
    const store = useStore();
    const route = useRoute();
    const patientId = reactive(props.idPatient);
    const program = reactive({
      program: "",
      onboardingScheduleDate: "",
      dischargeDate: "",
      status: 1,
    });
    const changedValue = () => {
      emit('onChange')
    }

    const isEdit = ref(false)
    const programId = ref(null)

    const patients = computed(() => {
      return store.state.patients;
    });
    
    watchEffect(() => {
       
      if(props.idPatient) {
       
        store.dispatch("program", patientId);
      }
    })

    const editProgram = (id) => {
      isEdit.value = true
      programId.value = id
      store.dispatch("programDetails", {
        patientUdid: route.params.udid,
        programId: id,
      }).then(() => {
        Object.assign(program, programDetails.value)
      })
    }
    
    const programs = () => {
      if(isEdit.value) {
        program.program = program.program == programDetails.value.program ? programDetails.value.programId : program.program
        store.dispatch("updatePatientProgram", {
          data: {
            program: program.program,
            onboardingScheduleDate: timeStamp(program.onboardingScheduleDate),
            dischargeDate:timeStamp(program.dischargeDate),
            status: program.status,
          },
          patientUdid: route.params.udid,
          programId: programId.value,
        }).then(() => {
          store.dispatch("program", patientId);
          emit('onChange', false)
          reset()
        });
      }
      else if(patientId != null) {
        store.dispatch("addPatientProgram", {
          data: {
            program: program.program,
            onboardingScheduleDate: timeStamp(program.onboardingScheduleDate),
            dischargeDate:timeStamp(program.dischargeDate),
            status: program.status,
          },
          id: patientId,
        }).then(() => {
          store.dispatch("program", patientId);
          emit('onChange', false)
          reset()
        });
      }
      else {
        store.dispatch("addPatientProgram", {
          data: {
            program: program.program,
            onboardingScheduleDate: timeStamp(program.onboardingScheduleDate),
            dischargeDate:timeStamp(program.dischargeDate),
            status: program.status,
          },
          id: patients.value.addDemographic.id,
        }).then(() => {
          store.dispatch("program", patients.value.addDemographic.id);
          emit('onChange', false)
          reset()
        });
      }
    };

    const columns = computed(() => {
      return store.state.patients.columns;
    });

    const programsData = computed(() => {
      return store.state.patients.program;
    });
    const form = reactive({
      ...program,
    });
    function reset() {
      formRef.value.resetFields();
      Object.assign(program,form)
    }

    const programDetails = computed(() => {
      return store.state.patients.programDetails
    })

    function deleteProgram(id) {
      store.commit('loadingStatus', true)
      if(patientId != null) {
        warningSwal(messages.deleteWarning).then((response) => {
          if(response==true) {
            store.dispatch('deleteProgram', {
              id: patientId,
              programID: id
            }).then(() => {
              store.dispatch("program", patientId);
              reset()
            });
          }
        })
      }
      else {
        warningSwal(messages.deleteWarning).then((response)=>{
          if(response==true) {
            store.dispatch('deleteProgram',{
              id:patients.value.addDemographic.id,
              programID:id
            })
            setTimeout(() => {
              store.dispatch("program",patients.value.addDemographic.id);
              reset()
            });
          }
        })
      }
    }
    // const programFailed = () => {
    //         errorSwal(messages.fieldsRequired)
    //     };
    
    return {
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      changedValue,
      // programFailed,
      timeStamp,
      editProgram,
      deleteProgram,
      columns,
      programsData,
      patients,
      program,
      programs,
      errorMsg:patients.value.errorMsg,
      reset,
      formRef,
    };
  },
});
</script>
