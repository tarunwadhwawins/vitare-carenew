<template>
  <a-modal width="1000px" :title="title" centered>
    <a-form ref="formRef" :model="addVitalForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Date & Time" name="takeTime" :rules="[{ required: true, message: $t('vitals.dateTime')+$t('global.validation')  }]">
              <a-date-picker v-model:value="addVitalForm.takeTime" size="large" style="width: 100%" format="MM/DD/YYYY" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Vital Type" name="type" :rules="[{ required: true, message: $t('vitals.vitalType')+$t('global.validation')  }]">
              <a-select
                ref="select"
                v-model:value="addVitalForm.type"
                style="width: 100%"
                size="large">
                <a-select-option value="" hidden>{{ $t('vitals.chooseVitalType') }}</a-select-option>
                <a-select-option v-for="field in vitalFieldsByDeviceId" :key="field.id" :value="field.id">{{ field.field }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <a-form-item label="Value" name="value" :rules="[{ required: true, message: $t('vitals.value')+$t('global.validation')  }]">
              <a-input v-model:value="addVitalForm.value" size="large" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item label="Note" name="comment" :rules="[{ required: true, message: $t('vitals.note')+$t('global.validation')  }]">
              <a-textarea v-model:value="addVitalForm.comment" size="large" />
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
    <Loader />

  </a-modal>
</template>
<script>
import { computed, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import { timeStamp } from "@/commonMethods/commonMethod";
import Loader from "@/components/loader/Loader"
export default {
  components: {
    ModalButtons,
    Loader,
  },
  props: {
    title: {
      type: String
    },
    deviceId: {
      type: Number
    },
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const formRef = ref()
    const idDevice = reactive(props.deviceId)

    watchEffect(() => {
      store.dispatch('vitalFieldsByDeviceId', idDevice)
    })

    const vitalFieldsByDeviceId = computed(() => {
      return store.state.common.vitalFieldsByDeviceId
    })

    const addVitalForm = reactive({
      takeTime: '',
      type: '',
      value: '',
      comment: '',
    })
    const form = reactive({ ...addVitalForm })

    const submitForm = () => {
      const patientId = route.params.udid;
      addVitalForm.takeTime = timeStamp(addVitalForm.takeTime)
      const data = {
        'vital': [{
          'deviceType': idDevice,
          'takeTime': addVitalForm.takeTime,
          'type': addVitalForm.type,
          'value': Number(addVitalForm.value),
          'comment': addVitalForm.comment
        }]
      }
      store.dispatch('addVital', { patientId, data }).then(() => {
        store.dispatch('patientVitals', {patientId: patientId, deviceType: 99});
        store.dispatch('patientVitals', {patientId: patientId, deviceType: 100});
        store.dispatch('patientVitals', {patientId: patientId, deviceType: 101});
          store.dispatch('patientTimeline', {id:route.params.udid, type:''});
        formRef.value.resetFields()
        Object.assign(addVitalForm, form)
        emit('closeModal')
      })
    }
    
    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(addVitalForm, form)
    };

    return {
      formRef,
      addVitalForm,
      submitForm,
      handleCancel,
      vitalFieldsByDeviceId,
    };
  },
}
</script>
