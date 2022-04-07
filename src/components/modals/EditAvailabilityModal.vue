<template>
  <a-modal width="50%" title="Edit Availability" centered >
    <a-form :model="editAvailabilityForm" ref="formRest" autocomplete="off" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('global.startTime')" name="startTime" :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
              <a-time-picker use12-hours :disabledHours="() => disableHours" format="hh:mm A" v-model:value="editAvailabilityForm.startTime" value-format="HH:mm" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.startTime ? errorMsg.startTime[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('global.endTime')" name="endTime" :rules="[{ required: true, message: $t('global.endTime')+' '+$t('global.validation') }]">
              <a-time-picker v-model:value="editAvailabilityForm.endTime" :disabledHours="() => disableHours" use12-hours format="hh:mm A" value-format="HH:mm" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.endTime ? errorMsg.endTime[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
      </a-row>
      <a-col :span="24">
        <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
      </a-col>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, watchEffect, reactive, ref } from 'vue-demi'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { timeStamp } from '../../commonMethods/commonMethod';
import moment from 'moment';

export default {
  props: {
    isAvailabilityEdit: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const paramId = route.params.udid
    const formRef = ref()
    var isEdit = reactive(props.isAvailabilityEdit)

    const availabilityDetails = computed(() => {
      return store.state.careCoordinator.availabilityDetails
    })

    const editAvailabilityForm = reactive({
      startTime: "",
      endTime: "",
    })

    
    watchEffect(() => {
      if(isEdit) {
        Object.assign(editAvailabilityForm, availabilityDetails.value)
      }
    })

    const form = reactive({ ...editAvailabilityForm })
    const submitForm = () => {
      isEdit = false
      let startTime = timeStamp(moment().format('MM/DD/YYYY') + ' ' + editAvailabilityForm.startTime + ':00');
      let endTime = timeStamp(moment().format('MM/DD/YYYY') + ' ' + editAvailabilityForm.endTime + ':00')
      const data = {
        startTime: startTime,
        endTime: endTime,
      }
      store.dispatch('updateAvailability', {
        id: route.params.udid,
        availabilityId: availabilityDetails.value.id,
        data: data,
      }).then(() => {
        emit('closeModal')
        Object.assign(editAvailabilityForm, form)
        store.dispatch("availabilityList", route.params.udid);
      })
    }

    return {
      formRef,
      editAvailabilityForm,
      paramId,
      submitForm,
    }
  }
}
</script>