<template>
  <a-modal width="1000px" title="Add Goal" centered>
    <a-form ref="formRef" :model="addCarePlanForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Device Type" name="deviceType" :rules="[{ required: true, message: 'Device Type '+$t('global.validation')  }]">
              <a-select
                ref="select"
                v-model:value="addCarePlanForm.deviceType"
                style="width: 100%"
                size="large"
                 @select="selectDevice">
                <a-select-option value="" hidden>Choose Device Type</a-select-option>
                <a-select-option v-for="deviceType in deviceTypes.globalCode" :key="deviceType.id" :value="deviceType.id">{{ deviceType.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Start Date" name="startDate" :rules="[{ required: true, message: 'Start Date '+$t('global.validation')  }]">
              <a-date-picker v-model:value="addCarePlanForm.startDate" size="large" style="width: 100%" format="MM/DD/YYYY"/>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="End Date" name="endDate" :rules="[{ required: true, message: 'End Date '+$t('global.validation')  }]">
              <a-date-picker v-model:value="addCarePlanForm.endDate" size="large" style="width: 100%" format="MM/DD/YYYY"/>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item label="Frequency" name="frequency" :rules="[{ required: true, message: 'Frequency '+$t('global.validation')  }]">
              <a-input size="large" :min="1" :max="100000" v-model:value="addCarePlanForm.frequency" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item label=" " name="frequencyType" :rules="[{ required: true, message: 'This Field '+$t('global.validation')  }]">
              <a-select
                ref="select"
                v-model:value="addCarePlanForm.frequencyType"
                style="width: 100%"
                size="large">
                <a-select-option value="" hidden>Choose Frequency Type </a-select-option>
                <a-select-option v-for="frequencyType in frequencyTypes" :key="frequencyType.id" :value="frequencyType.id">{{ frequencyType.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        
        <a-row v-if="bloodPressureFields" :gutter="24">
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="systolic">
                <a-input v-model:value="addCarePlanForm.systolic" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="systolicHighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.systolicHighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="systolicLowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.systolicLowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="diastolic">
                <a-input v-model:value="addCarePlanForm.diastolic" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="diastolicHighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.diastolicHighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="diastolicLowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.diastolicLowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="bpm">
                <a-input v-model:value="addCarePlanForm.bpm" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="bpmHighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.bpmHighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="bpmLowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.bpmLowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        
        <a-row v-if="bloodOxygenFields" :gutter="24">
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="spo2">
                <a-input v-model:value="addCarePlanForm.spo2" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="spo2HighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.spo2HighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="spo2LowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.spo2LowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="oxygenBpm">
                <a-input v-model:value="addCarePlanForm.oxygenBpm" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="oxygenBpmHighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.oxygenBpmHighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="oxygenBpmLowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.oxygenBpmLowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        
        <a-row v-if="glucoseFields" :gutter="24">
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="fastingBloodSugar">
                <a-input v-model:value="addCarePlanForm.fastingBloodSugar" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="fastingBloodSugarHighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.fastingBloodSugarHighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="fastingBloodSugarLowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.fastingBloodSugarLowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Vital Type" name="randomBloodSugar">
                <a-input v-model:value="addCarePlanForm.randomBloodSugar" style="width: 100%" size="large" disabled />
              </a-form-item>
            </div>
          </a-col>
        
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="High Value" name="randomBloodSugarHighValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.randomBloodSugarHighValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
          
          <a-col :sm="8" :xs="24">
            <div class="form-group">
              <a-form-item label="Low Value" name="randomBloodSugarLowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
                <a-input v-model:value="addCarePlanForm.randomBloodSugarLowValue" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item label="Note" name="note" :rules="[{ required: true, message: 'Note '+$t('global.validation')  }]">
              <a-textarea v-model:value="addCarePlanForm.note" placeholder="Notes" :auto-size="{ minRows: 7 }" />
            </a-form-item>
          </div>
        </a-col>
        
        <a-col :span="24">
          <div class="steps-action">
            <ModalButtons @is_click="handleCancel"/>   
          </div>
        </a-col>
        
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import {
  timeStamp,
} from '@/commonMethods/commonMethod';
export default defineComponent({
  components: {
    ModalButtons,
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const formRef = ref()
    const bloodPressureFields = ref(false)
    const glucoseFields = ref(false)
    const bloodOxygenFields = ref(false)
    const deviceTypes = computed(() => {
      return store.state.common.deviceType;
    })

    const frequencyTypes = computed(() => {
      return store.state.common.frequencyTypes
    })
    const addCarePlanForm = reactive({
      deviceType: '',
      startDate: '',
      endDate: '',
      frequency: '',
      frequencyType: '',
      systolic: 'Systolic',
      systolicHighValue: '',
      systolicLowValue: '',
      diastolic: 'Diastolic',
      diastolicHighValue: '',
      diastolicLowValue: '',
      bpm: 'BPM',
      bpmHighValue: '',
      bpmLowValue: '',
      spo2: 'SPO2',
      spo2HighValue: '',
      spo2LowValue: '',
      oxygenBpm: 'BPM',
      oxygenBpmHighValue: '',
      oxygenBpmLowValue: '',
      fastingBloodSugar: 'Fasting Blood Sugar',
      fastingBloodSugarHighValue: '',
      fastingBloodSugarLowValue: '',
      randomBloodSugar: 'Random Blood Sugar',
      randomBloodSugarHighValue: '',
      randomBloodSugarLowValue: '',
      note: '',
    })
    const form = reactive({ ...addCarePlanForm })
    const submitForm = () => {
      if(addCarePlanForm.deviceType == 99) {
        const systolicData = {
          deviceType: 99,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 1,
          highValue: addCarePlanForm.systolicHighValue,
          lowValue: addCarePlanForm.systolicLowValue,
          note: addCarePlanForm.note,
        }
        const diastolicData = {
          deviceType: 99,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 2,
          highValue: addCarePlanForm.diastolicHighValue,
          lowValue: addCarePlanForm.diastolicLowValue,
          note: addCarePlanForm.note,
        }
        const bpmData = {
          deviceType: 99,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 3,
          highValue: addCarePlanForm.bpmHighValue,
          lowValue: addCarePlanForm.bpmLowValue,
          note: addCarePlanForm.note,
        }
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: systolicData
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: diastolicData
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: bpmData
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
      }
      if(addCarePlanForm.deviceType == 100) {
        const spo2Data = {
          deviceType: 100,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 4,
          highValue: addCarePlanForm.spo2HighValue,
          lowValue: addCarePlanForm.spo2LowValue,
          note: addCarePlanForm.note,
        }
        const bpmData = {
          deviceType: 100,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 3,
          highValue: addCarePlanForm.oxygenBpmHighValue,
          lowValue: addCarePlanForm.oxygenBpmLowValue,
          note: addCarePlanForm.note,
        }
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: spo2Data
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: bpmData
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
      }
      if(addCarePlanForm.deviceType == 101) {
        const fbsData = {
          deviceType: 101,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 5,
          highValue: addCarePlanForm.fastingBloodSugarHighValue,
          lowValue: addCarePlanForm.fastingBloodSugarLowValue,
          note: addCarePlanForm.note,
        }
        const rbsData = {
          deviceType: 101,
          startDate: timeStamp(addCarePlanForm.startDate),
          endDate: timeStamp(addCarePlanForm.endDate),
          frequency: addCarePlanForm.frequency,
          frequencyType: addCarePlanForm.frequencyType,
          vitalField: 6,
          highValue: addCarePlanForm.randomBloodSugarHighValue,
          lowValue: addCarePlanForm.randomBloodSugarLowValue,
          note: addCarePlanForm.note,
        }
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: fbsData
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
        store.dispatch('addCarePlan', {
          patientId: route.params.udid,
          data: rbsData
        }).then(() => {
          store.dispatch('carePlansList', route.params.udid)
          formRef.value.resetFields();
          Object.assign(addCarePlanForm, form)
          emit('closeModal')
        })
      }
    }
    
    const handleCancel = () => {
      formRef.value.resetFields();
      console.log('form', form)
      Object.assign(addCarePlanForm, form)
    };

    const common = computed(() => {
      return store.state.common
    })

    // const vitalFieldsList = ref(null)
    const selectDevice = (value) => {
      store.dispatch('vitalFieldsByDeviceId', value)
      // vitalFieldsList.value = vitalFields.value
      // console.log('vitalFields.value', vitalFieldsList.value)
      if(value == 99) {
        bloodPressureFields.value = true;
        glucoseFields.value = false;
        bloodOxygenFields.value = false;
      }
      if(value == 100) {
        bloodOxygenFields.value = true;
        bloodPressureFields.value = false;
        glucoseFields.value = false;
      }
      if(value == 101) {
        glucoseFields.value = true;
        bloodPressureFields.value = false;
        bloodOxygenFields.value = false;
      }
    }

    return {
      formRef,
      frequencyTypes,
      deviceTypes,
      addCarePlanForm,
      submitForm,
      handleCancel,
      selectDevice,
      common,
      // vitalFieldsList,
      
      size: ref("large"),
      value1: ref(),
      date1: ref(),
      date2: ref(),
      // value10: ref('lucy'),
      value10: ref({
        value: "lucy",
      }),
      value11: ref({
        value: "lucy",
      }),
      value12: ref({
        value: "1",
      }),
      value13: ref({
        value: "1",
      }),
      value14: ref({
        value: "1",
      }),
      bloodPressureFields,
      glucoseFields,
      bloodOxygenFields,
    };
  },
});
</script>