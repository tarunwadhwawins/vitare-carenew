<template>
  <a-modal width="50%" title="Edit Availability" centered :footer="false">
    <a-form :model="editAvailabilityForm" ref="formRest" :footer="null" autocomplete="off" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('global.startTime')" name="startTime" :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
              <a-time-picker use12-hours :disabledHours="() => disableHours" format="hh:mm A" v-model:value="editAvailabilityForm.startTime" value-format="hh:mm"  @change="checkChangeInput(); getTime('startTime')" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.startTime ? errorMsg.startTime[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('global.endTime')" name="endTime" :rules="[{ required: true, message: $t('global.endTime')+' '+$t('global.validation') }]">
              <a-time-picker v-model:value="editAvailabilityForm.endTime" :disabledHours="() => disableHours" use12-hours format="hh:mm A" value-format="hh:mm"  @change="checkChangeInput(); getTime('endTime')" />
              <ErrorMessage v-if="errorMsg" :name="errorMsg.endTime ? errorMsg.endTime[0] : ''" />
            </a-form-item>
          </div>
        </a-col>
      </a-row>
      <a-col :span="24">
        <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
      </a-col>
    </a-form>
    <Loader />
  </a-modal>
</template>

<script>
import { computed, watchEffect, reactive, ref } from 'vue-demi'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { timeStamp,timeStampFormate,disableHours } from '../../commonMethods/commonMethod';
import moment from 'moment';
import Loader from "@/components/loader/Loader";

export default {
  props: {
    isAvailabilityEdit: {
      type: Number
    }
  },
  components: {
    Loader,
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

     const addStaff = computed(() => {
            return store.state.careCoordinator.addStaff;
        });

    
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
      console.log('object',editAvailabilityForm);
      const data = {
        startTime: startTime,
        endTime: endTime,
      }
      store.dispatch('updateAvailability', {
        id: addStaff.value?addStaff.value.id:route.params.udid,
        availabilityId: availabilityDetails.value.id,
        data: data,
      }).then(() => {
        emit('closeModal')
        Object.assign(editAvailabilityForm, form)
        store.dispatch("availabilityList", addStaff.value?addStaff.value.id:route.params.udid);
      })
    }

    function getTime(event) {
            if (event == 'startTime') {
                let timeSelect = timeStamp(moment().format('MM/DD/YYYY') + ' ' + editAvailabilityForm.startTime + ':00')

                if (timeStampFormate(timeSelect, 'HH:00') < '08:00' || timeStampFormate(timeSelect, 'HH:00') > '20:00') {

                    editAvailabilityForm.startTime = ''
                }
            } else {
                let timeSelect = timeStamp(moment().format('MM/DD/YYYY') + ' ' + editAvailabilityForm.endTime + ':00')
                if (timeStampFormate(timeSelect, 'HH:00') < '08:00' || timeStampFormate(timeSelect, 'HH:00') > '20:00') {
                    editAvailabilityForm.endTime = ''
                }
            }
        }

        function checkChangeInput() {
            store.commit('errorMsg', null)
            store.commit('checkChangeInput', true)
        }

    return {
      disableHours,
      checkChangeInput,
      addStaff,
      formRef,
      editAvailabilityForm,
      paramId,
      submitForm,
      getTime
    }
  }
}
</script>