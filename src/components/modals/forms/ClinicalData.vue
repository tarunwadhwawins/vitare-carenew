
<template>
<a-form ref="formRef" :model="clinicals" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalHistory" @finishFailed="clinicalDataFailed">
    <div class="form-group">
        <a-form-item :label="$t('patient.clinicalData.medicalHistory')" name="history" :rules="[{ required: true, message: $t('patient.clinicalData.medicalHistory')+' '+$t('global.validation') }]">
            <a-input @change="changedValue" v-model:value="clinicals.history" size="large" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.history?errorMsg.history[0]:''" />
        </a-form-item>
    </div>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
</a-form>
<a-row :gutter="24" class="mb-24">
    <a-col :span="24">
        <a-table  rowKey="id" :columns="clinicalHistoryColumns" :data-source="clinicalsData" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons" @click="deleteClinicalData(text.record.id,'deleteClinicalData')">
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
                    <a-date-picker @change="changedValue" v-model:value="clinicalMedication.startDate" format="MM/DD/YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.endDate')" name="endDate" :rules="[{ required: true, message: $t('global.endDate')+' '+$t('global.validation') }]">
                    <a-date-picker @change="changedValue" v-model:value="clinicalMedication.endDate" format="MM/DD/YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.endDate?errorMsg.endDate[0]:''" />
                </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
</a-form>
<a-row :gutter="24" class="mb-24">
    <a-col :span="24">
        <a-table  rowKey="id" :columns="clinicalMedicatColumns" :data-source="clinicalMedicatData" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
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
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "../../loader/Loader.vue";
import { warningSwal,timeStamp} from "../../../commonMethods/commonMethod";
import { messages } from "../../../config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
export default defineComponent({
  components: {
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
    const patientId = reactive(props.idPatient);
    const formRef = ref()
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

    const clinicalHistory = () => {
      if(patientId != null) {
        store.dispatch("addClinicalHistory", {
          data: clinicals,
          id: patientId,
        }).then(() => {
          store.dispatch("clinicalHistoryList", patientId);
          formRef.value.resetFields();
          Object.assign(clinicals, clinicalsForm)
        });
      }
      else {
        store.dispatch("addClinicalHistory", {
          data: clinicals,
          id: patients.value.addDemographic.id,
        }).then(() => {
          formRef.value.resetFields();
          Object.assign(clinicals, clinicalsForm)
        })

        setTimeout(() => {
          store.dispatch("clinicalHistoryList", patients.value.addDemographic.id);
        }, 2000);
      }
    };

    const clinicalMedicat = () => {
      if(patientId != null) {
        store.dispatch("addClinicalMedicat", {
          data: {
            medicine: clinicalMedication.medicine,
            frequency: clinicalMedication.frequency,
            startDate: timeStamp(clinicalMedication.startDate ),
            endDate: timeStamp(clinicalMedication.endDate )
          },
          id: patientId,
        }).then(() => {
          store.dispatch("clinicalMedicatList", patientId);
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
          id: patients.value.addDemographic.id,
        }).then(() => {
          store.dispatch("clinicalMedicatList", patients.value.addDemographic.id);
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

    function deleteClinicalData(id, name) {
      warningSwal(messages.deleteWarning).then((response) => {
        if(response == true) {
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
      changedValue,
      // clinicalDataFailed,
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
