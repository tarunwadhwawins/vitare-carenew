<template>
  <a-modal width="1000px" :title="title" centered @cancel="closeModal()">
    <a-form ref="formRef" :model="addVitalForm" layout="vertical" @finish="submitForm" autocomplete="off">
      <a-row :gutter="24">
        
        <a-col :sm="8" :xs="24" :xl="24 ">
          <div class="form-group">
            <a-form-item label="Date & Time" name="takeTime" :rules="[{ required: true, message: $t('vitals.dateTime')+$t('global.validation')  }]">
              <a-date-picker @change="checkChangeInput()" v-model:value="addVitalForm.takeTime" size="large" style="width: 100%" format="MM/DD/YYYY" />
            </a-form-item>
          </div>
        </a-col>
        
        <template v-if="idDevice != 101">
          <a-col :sm="8" :xs="24" :xl="12" v-for="field in vitalFieldsByDeviceId" :key="field.id" :value="field.id">
            <div class="form-group">
              <a-form-item :label="field.field" :id="field.id" :name="field.fieldName" :rules="[{ required: true, message: field.field+' '+$t('global.validation')  }]">
                <a-input @change="checkChangeInput($event)" v-model="addVitalForm.value" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
        </template>
        
        <template v-else>
          <a-col :sm="8" :xs="24" :xl="12">
            <div class="form-group">
              <a-form-item label="Vital Type" name="type" :rules="[{ required: false, message: 'Type '+$t('global.validation')  }]">
                <a-select
                  ref="select"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  v-model="value1"
                  style="width: 100%"
                  size="large"
                  @focus="focus"
                  @change="checkChangeInput()"
                  v-model:value="addVitalForm.type">
                  <a-select-option v-for="field in vitalFieldsByDeviceId" :key="field.id">{{ field.field }}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </a-col>

          <a-col :sm="8" :xs="24" :xl="12">
            <div class="form-group">
              <a-form-item label="Value" :rules="[{ required: true, message: 'Type '+$t('global.validation')  }]">
                <a-input @change="checkChangeInput($event)" v-model:value="addVitalForm.value" style="width: 100%" size="large" />
              </a-form-item>
            </div>
          </a-col>
        </template>
        
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item label="Note" name="comment" :rules="[{ required: true, message: $t('vitals.note')+$t('global.validation')  }]">
              <a-textarea @change="checkChangeInput()" v-model:value="addVitalForm.comment" size="large" />
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
		patientId: {
			type: Number
		},
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const formRef = ref()
    const idDevice = reactive(props.deviceId)
    const patientId = props.patientId ? reactive(props.patientId) : route.params.udid

    const addVitalForm = reactive({
      takeTime: '',
      type: '',
      value: '',
      comment: '',
    })
    const form = reactive({ ...addVitalForm })

    const vitalTypes = [{
      type: "",
      value: "",
      name: "",
    }]

    const vitalFieldsByDeviceId = computed(() => {
      return store.state.common.vitalFieldsByDeviceId
    })

    watchEffect(() => {
      store.dispatch('vitalFieldsByDeviceId', idDevice).then(() => {
        vitalFieldsByDeviceId.value.map(item => {
          if(idDevice != 101) {
            const field = item.fieldName
            addVitalForm[field] = ""
            vitalTypes.push({
              type: item.id,
              value: '',
              name: item.fieldName,
            })
          }
        })
      })
    })

    function checkChangeInput(event) {
      vitalTypes.some(element => {
        if(idDevice != 101 && event && (element.type === Number(event.target.id))) {
          element.value = event.target.value
          const field = element.name
          addVitalForm[field] = event.target.value
        }
      })
      store.commit("checkChangeInput", true);
    }

    const submitForm = () => {
      let vitalsData = []
      if(idDevice != 101) {
        vitalTypes.forEach(element => {
          vitalsData.push({
            type: element.type,
            value: Number(element.value),
            takeTime: timeStamp(addVitalForm.takeTime),
            comment: addVitalForm.comment,
            deviceType: idDevice,
          })
        });
        vitalsData.splice(0, 1)
      }
      else {
        vitalsData = [{
          type: addVitalForm.type,
          value: Number(addVitalForm.value),
          comment: addVitalForm.comment,
          deviceType: idDevice,
          takeTime: timeStamp(addVitalForm.takeTime),
        }]
      }
      const data = {
        'vital': vitalsData
      }

      store.dispatch('addVital', { patientId, data }).then(() => {
        store.dispatch('patientVitals', {patientId: patientId, deviceType: 99});
        store.dispatch('patientVitals', {patientId: patientId, deviceType: 100});
        store.dispatch('patientVitals', {patientId: patientId, deviceType: 101});
        store.dispatch('patientTimeline', {id:patientId, type:''});
        formRef.value.resetFields()
        Object.assign(addVitalForm, form)
        emit('closeModal', false)
      })
    }
    
    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(addVitalForm, form)
    };

    const checkChangedInput = computed(() => {
      return store.state.common.checkChangeInput
    })
    
    const closeModal = () => {
      emit('closeModal', checkChangedInput.value)
    }

    return {
      closeModal,
      formRef,
      addVitalForm,
      submitForm,
      handleCancel,
      vitalFieldsByDeviceId,
      checkChangeInput,
      idDevice,
    };
  },
}
</script>
