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
              <a-date-picker v-model:value="addCarePlanForm.startDate" size="large" style="width: 100%"/>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="End Date" name="endDate" :rules="[{ required: true, message: 'End Date '+$t('global.validation')  }]">
              <a-date-picker v-model:value="addCarePlanForm.endDate" size="large" style="width: 100%"/>
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
        
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Vital Type" name="vitalField" :rules="[{ required: true, message: 'Vital Type '+$t('global.validation')  }]">
              <a-select
                ref="select"
                v-model:value="addCarePlanForm.vitalField"
                style="width: 100%"
                size="large">
                <a-select-option value="" hidden>Choose Vital Type</a-select-option>
                <a-select-option v-for="field in common.vitalFieldsByDeviceId" :key="field.id" :value="field.id">{{ field.field }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
      
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="High Value" name="highValue" :rules="[{ required: true, message: 'High Value '+$t('global.validation')  }]">
              <a-input v-model:value="addCarePlanForm.highValue" style="width: 100%" size="large" />
            </a-form-item>
          </div>
        </a-col>
        
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Low Value" name="lowValue" :rules="[{ required: true, message: 'Low Value '+$t('global.validation')  }]">
              <a-input v-model:value="addCarePlanForm.lowValue" style="width: 100%" size="large" />
            </a-form-item>
          </div>
        </a-col>

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
      vitalField: '',
      highValue: '',
      lowValue: '',
      note: '',
    })
    const form = reactive({ ...addCarePlanForm })
    const submitForm = () => {
      addCarePlanForm.startDate = timeStamp(addCarePlanForm.startDate)
      addCarePlanForm.endDate = timeStamp(addCarePlanForm.endDate)
      console.log('Patient ID', route.params.udid)
      console.log('addCarePlanForm', addCarePlanForm)
      store.dispatch('addCarePlan', {
        patientId: route.params.udid,
        data: addCarePlanForm
      }).then(() => {
        store.dispatch('carePlansList', route.params.udid)
        formRef.value.resetFields();
        Object.assign(addCarePlanForm, form)
        emit('closeModal')
      })
    }
    
    const handleCancel = () => {
      formRef.value.resetFields();
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
    }

    return {
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
    };
  },
});
</script>