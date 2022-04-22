
<template>
  <a-form ref="formRef" scrollToFirstError=true :model="clinicals" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalHistory" @finishFailed="clinicalDataFailed">
      <div class="form-group">
          <a-form-item :label="$t('patient.clinicalData.medicalHistory')" name="history" :rules="[{ required: true, message: $t('patient.clinicalData.medicalHistory')+' '+$t('global.validation') }]">
              <a-input @change="changedValue" v-model:value="clinicals.history" size="large" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.history?errorMsg.history[0]:''" />
          </a-form-item>
      </div>
      <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
              <a-button class="btn primaryBtn" html-type="submit">{{$t('global.save')}}</a-button>
          </a-col>
      </a-row>
  </a-form>

  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-table  rowKey="id" :columns="clinicalHistoryColumns" :data-source="clinicalsData" :scroll="{ x: 500 }">
        <template #history="text">
          <a-popover>
            <template #content>
              <p :ellipsis=true>{{ text.record.history }}</p>
            </template>
            {{ text.record.history }}
          </a-popover>
        </template>
        
        <template #action="text" v-if="arrayToObjact(screensPermissions,77)">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons" @click="editClinicalData(text.record.id)">
              <EditOutlined />
            </a>
            <a class="icons" @click="deleteClinicalData(text.record.id, 'deleteClinicalData')">
              <DeleteOutlined />
            </a>
          </a-tooltip>
        </template>

      </a-table>
      <Loader />
    </a-col>
  </a-row>

  <a-form :model="clinicalMedication" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalMedicat" @finishFailed="onFinishFailed">
      <a-row :gutter="24">
          <a-col :span="24">
              <div class="formHeading">
                  <h2>{{$t('patient.clinicalData.medication')}}</h2>
              </div>
          </a-col>
          <a-col :sm="12" :xs="24">
              <div class="form-group">
                  <a-form-item :label="$t('patient.clinicalData.medicine')" name="medicine" :rules="[{ required: true, message: $t('patient.clinicalData.medicine')+' '+$t('global.validation') }]">
                      <a-input @change="changedValue" v-model:value="clinicalMedication.medicine" size="large" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.medicine?errorMsg.medicine[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
          <a-col :sm="12" :xs="24">

              <div class="form-group">
                  <a-form-item :label="$t('patient.clinicalData.frequency')" name="frequency" :rules="[{ required: true, message: $t('patient.clinicalData.frequency')+' '+$t('global.validation') }]">
                      <a-input @change="changedValue" v-model:value="clinicalMedication.frequency" size="large" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.frequency?errorMsg.frequency[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
          <a-col :sm="12" :xs="24">
              <div class="form-group">
                  <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: true, message: $t('global.startDate')+' '+$t('global.validation') }]">
                      <a-date-picker @change="changedValue" v-model:value="clinicalMedication.startDate" format="MM/DD/YYYY" value-format="YYYY-MM-DD" size="large" style="width: 100%" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
          <a-col :sm="12" :xs="24">
              <div class="form-group">
                  <a-form-item :label="$t('global.endDate')" name="endDate" :rules="[{ required: true, message: $t('global.endDate')+' '+$t('global.validation') }]">
                      <a-date-picker @change="changedValue" v-model:value="clinicalMedication.endDate" format="MM/DD/YYYY" value-format="YYYY-MM-DD" size="large" style="width: 100%" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg.endDate?errorMsg.endDate[0]:''" />
                  </a-form-item>
              </div>
          </a-col>
      </a-row>
      <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
              <a-button class="btn primaryBtn" html-type="submit">{{$t('global.save')}}</a-button>
          </a-col>
      </a-row>
  </a-form>

  <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
          <a-table  rowKey="id" :columns="clinicalMedicatColumns" :data-source="clinicalMedicatData" :scroll="{ x: 900 }">
              <template #action="text"  v-if="arrayToObjact(screensPermissions,80)">
                  <a-tooltip placement="bottom">
                      <template #title>
                          <span>{{$t('global.delete')}}</span>
                      </template>
                      <a class="icons" @click="editMedication(text.record.id, null)">
                        <EditOutlined />
                      </a>
                      <a class="icons" @click="deleteClinicalData(text.record.id, null)">
                          <DeleteOutlined />
                      </a>
                  </a-tooltip>
              </template>
          </a-table>
          <Loader />
      </a-col>
  </a-row>

</template>
<script>
import { defineComponent, reactive, computed, watchEffect, ref } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "../../loader/Loader.vue";
import { warningSwal,timeStamp,arrayToObjact} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
    Loader,
    ErrorMessage
  },
  props: {
    idPatient: {
      type: Number
    }
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute()
    const patientId = reactive(props.idPatient);
    const formRef = ref()
    const isEditMedicalHistory = ref(false)
    const isEditMedicalRoutine = ref(false)
    const medicalHistoryUdid = ref(null)
    const medicalRoutineUdid = ref(null)
    const clinicals = reactive({
      history: "",
    });
    const changedValue = () => {
      emit('onChange')
    }

    watchEffect(() => {
      if(patientId != null) {
        store.dispatch("clinicalHistoryList", patientId);
        store.dispatch("clinicalMedicatList", patientId);
      }
    })

    const clinicalMedication = reactive({
      medicine: "",
      frequency: "",
      startDate: "",
      endDate: "",
    });
    const clinicalsForm = reactive({ ...clinicals })
    const medicationForm = reactive({ ...clinicalMedication })

    const globalCode = computed(() => {
      return store.state.common;
    });

    const editClinicalData = (id) => {

      isEditMedicalHistory.value = true;
      medicalHistoryUdid.value = id;
      store.dispatch('medicalHistoryDetails', {
        patientUdid: route.params.udid,
        medicalHistoryUdid: id,
      }).then(() => {
        Object.assign(clinicals, medicalHistoryDetails.value)
      })
    }

    const editMedication = (id) => {
      isEditMedicalRoutine.value = true;
      medicalRoutineUdid.value = id;
      store.dispatch('medicationDetails', {
        patientUdid: route.params.udid,
        medicalHistoryUdid: id,
      }).then(() => {
        Object.assign(clinicalMedication, medicationDetails.value)
      })
    }

    const clinicalHistory = () => {
      /* if(patientId != null) {
        store.dispatch("addClinicalHistory", {
          data: clinicals,
          id: patientId,
        }).then(() => {
          emit('onChange', false)
          store.dispatch("clinicalHistoryList", patientId);
          formRef.value.resetFields();
          Object.assign(clinicals, clinicalsForm)
        });
      } */
     
      if(isEditMedicalHistory.value) {
        store.dispatch("updateClinicalHistory", {
          data: clinicals,
          patientUdid: route.params.udid ? route.params.udid:patients.value.addDemographic.id,
          medicalHistoryUdid: medicalHistoryUdid.value,
        }).then(() => {
          emit('onChange', false)
          store.dispatch("clinicalHistoryList", route.params.udid ? route.params.udid:patients.value.addDemographic.id);
          formRef.value.resetFields();
          Object.assign(clinicals, clinicalsForm)
        });
      }
      else {
        store.dispatch("addClinicalHistory", {
          data: clinicals,
          id: patientId ==null? patients.value.addDemographic.id : patientId,
        }).then(() => {
          emit('onChange', false)
          formRef.value.resetFields();
          Object.assign(clinicals, clinicalsForm)
        }).then(() => {
          emit('onChange', false)
          store.dispatch("clinicalHistoryList", patientId ==null? patients.value.addDemographic.id : patientId);
        });
      }
    };

    const clinicalMedicat = () => {
      
      if(isEditMedicalRoutine.value) {
        store.dispatch("updateMedicalRoutine", {
          data: {
            medicine: clinicalMedication.medicine,
            frequency: clinicalMedication.frequency,
            startDate: timeStamp(clinicalMedication.startDate ),
            endDate: timeStamp(clinicalMedication.endDate )
          },
          patientUdid: route.params.udid ? route.params.udid:patients.value.addDemographic.id,
          medicalRoutineUdid: medicalRoutineUdid.value,
        }).then(() => {
          emit('onChange', false)
          store.dispatch("clinicalMedicatList", route.params.udid ? route.params.udid:patients.value.addDemographic.id);
          formRef.value.resetFields()
          Object.assign(clinicalMedication, medicationForm)
        });
      }
      else {
        store.dispatch("addClinicalMedicat", {
          data: {medicine: clinicalMedication.medicine,
          frequency: clinicalMedication.frequency,
          startDate: timeStamp(clinicalMedication.startDate ),
          endDate: timeStamp(clinicalMedication.endDate )},
          id: patientId ==null? patients.value.addDemographic.id : patientId,
        }).then(() => {
          emit('onChange', false)
          store.dispatch("clinicalMedicatList", patientId ==null? patients.value.addDemographic.id : patientId);
          formRef.value.resetFields()
          Object.assign(clinicalMedication, medicationForm)
        });
      }
    };

    const patients = computed(() => {
      return store.state.patients;
    });

    const clinicalHistoryColumns = computed(() => {
      return store.state.patients.clinicalHistoryListColumns;
    });

    const clinicalsData = computed(() => {
      return store.state.patients.clinicalHistoryList;
    });

    const clinicalMedicatData = computed(() => {
      return store.state.patients.clinicalMedicatList;
    });

    const clinicalMedicatColumns = computed(() => {
      return store.state.patients.clinicalMedicatListColumns;
    });

    const medicalHistoryDetails = computed(() => {
      return store.state.patients.medicalHistoryDetails
    })

    const medicationDetails = computed(() => {
      return store.state.patients.medicationDetails
    })

    function deleteClinicalData(id, name) {

      warningSwal(messages.deleteWarning).then((response) => {
        if(response == true) {
          formRef.value.resetFields()
          Object.assign(clinicalMedication, medicationForm)
          store.commit('loadingStatus', true)
          if(patientId != null) {
            if(name == "deleteClinicalData") {
              store.dispatch("deleteClinicalData", {
                id: patientId,
                clinicalId: id,
              }).then(() => {
                store.dispatch(
                  "clinicalHistoryList",
                  patientId
                );
              });
            }
            else {
              store.dispatch("deleteClinicalMedicat", {
                id: patientId,
                clinicalId: id,
              }).then(() => {
                store.dispatch(
                  "clinicalMedicatList",
                  patientId
                );
              });
            }
          }
          else {
            if (name == "deleteClinicalData") {
              store.dispatch("deleteClinicalData", {
                id: patients.value.addDemographic.id,
                clinicalId: id,
              });
              setTimeout(() => {
                store.dispatch(
                  "clinicalHistoryList",
                  patients.value.addDemographic.id
                );
              }, 3000);
            } else {
              store.dispatch("deleteClinicalMedicat", {
                id: patients.value.addDemographic.id,
                clinicalId: id,
              });
              setTimeout(() => {
                store.dispatch(
                  "clinicalMedicatList",
                  patients.value.addDemographic.id
                );
              }, 3000);
            }
          }
        }
      });
    }
    // const clinicalDataFailed = () => {
    //     errorSwal(messages.fieldsRequired)
    // };
    return {
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      changedValue,
      // clinicalDataFailed,
      editMedication,
      editClinicalData,
      deleteClinicalData,
      clinicalHistory,
      clinicalMedicat,
      clinicals,
      clinicalMedication,
      globalCode,
      patients,
      clinicalHistoryColumns,
      clinicalsData,
      clinicalMedicatData,
      clinicalMedicatColumns,
      formRef,
      errorMsg:patients.value.errorMsg
    };
  },
});
</script>

<style>
  .ant-popover {
    width: 80%;
    left: 24px !important;
  }
  /* .ant-tooltip {
    width: 75% !important;
    left: 24px !important;
    max-width: fit-content;
  } */
  .medicalHistory { width: 80%; }
  td.medicalHistory {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
  }
  th.medicalHistoryAction, td.medicalHistoryAction { text-align: center !important; }
</style>