<template>
  <a-form ref="formRef" :model="conditions" name="basic" scrollToFirstError=true autocomplete="off" layout="vertical" @finish="submitForm">
    <a-row :gutter="24" class="mb-24">
      {{conditionDetails}}
      <a-col :md="24" :sm="24" :xs="24" :xl="12">
        <div class="form-group">
          <a-form-item :label="$t('patient.patientConditions')" name="condition" :rules="[{ required: true, message: $t('patient.patientConditions')+' '+$t('global.validation') }]">
            <ConditionCodeDropDown :editDataCondition="editDataCondition"  v-model:value="conditions.condition" @handleConditionChange="handleConditionChange($event)" @change="changedValue" mode="multiple" :disabled="isConditionEdit" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.condition ? errorMsg.condition[0] : ''" />
          </a-form-item>
        </div>
      </a-col>
      <a-col :md="8" :sm="6" :xs="24" :xl="6">
        <div class="form-group">
          <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: true, message: $t('global.startDate')+' '+$t('global.validation') }]">
            <a-date-picker @change="changedValue" v-model:value="conditions.startDate" :format="globalDateFormat" value-format="YYYY-MM-DD" :disabledDate="d => !d || d.isSameOrAfter(dateSelect)" style="width: 100%" size="large" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
          </a-form-item>
        </div>
      </a-col>
      <a-col :md="8" :sm="6" :xs="24" :xl="6">
        <div class="form-group">
          <a-form-item :label="$t('global.endDate')" name="endDate" :rules="[{ required: false, message: $t('global.endDate')+' '+$t('global.validation') }]">
            <a-date-picker @change="changedValue();dateChange();" v-model:value="conditions.endDate" :format="globalDateFormat" :disabledDate="d => !d || d.isSameOrBefore(conditions.startDate)" value-format="YYYY-MM-DD" style="width: 100%" size="large" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.endDate?errorMsg.endDate[0]:''" />
          </a-form-item>
        </div>
      </a-col>
      <a-col :span="24">
        <a-button class="btn primaryBtn" html-type="submit">{{$t('global.save')}}</a-button>
      </a-col>
    </a-row>
    
  </a-form>

  <ConditionsTable @editCondition="editCondition" />
</template>

<script>
import ConditionsTable from '@/components/patients/data-table/ConditionsTable';
import { reactive, computed, ref, watchEffect } from 'vue-demi';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
// import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import ConditionCodeDropDown from "@/components/modals/search/ConditionSearch.vue";
import { 
  timeStampLocal,
  globalDateFormat,
} from '@/commonMethods/commonMethod';
export default {
  components: {
    ConditionsTable,
    // GlobalCodeDropDown,
    ConditionCodeDropDown
  },
  props: {
    idPatient: {
      type: String
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const conditionUdid = ref(null)
    const formRef = ref()

    const patientId = props.idPatient ? props.idPatient : route.params.udid

    const conditions = reactive({
      condition: [],
      startDate: "",
      endDate: "",
    });

    const form = reactive({ ...conditions })
    
    watchEffect(() => {
      store.dispatch('healthConditions')
    })

    const errorMsg = computed(() => {
      return store.state.common.errorMsg;
    });

    const isConditionEdit = computed(() => {
      return store.state.patients.isConditionEdit;
    });
    
    const conditionDetails = computed(() => {
      return store.state.patients.conditionDetails;
    });
    
    const healthConditions = computed(() => {
      return store.state.patients.healthConditions;
    });
    console.log('healthConditions', healthConditions.value)

    const changedValue = () => {
      emit('onChange')
    }

    const editCondition = (value) => {
      Object.assign(conditions, value)
      conditionUdid.value = value.id
    }

    const submitForm = () => {
      if(!isConditionEdit.value) {
        const patientConditions = {
          condition: conditions.condition,
          startDate: timeStampLocal(conditions.startDate),
          endDate: conditions.endDate ? timeStampLocal(conditions.endDate) : '',
        };
        store.dispatch("addCondition", {
          data: patientConditions,
          id: patientId,
        })
        .then(() => {
          store.dispatch("patientConditions", patientId);
          reset()
        });
      }
      else {
        const patientConditions = {
          condition: conditions.condition,
          startDate: timeStampLocal(conditions.startDate),
          endDate: conditions.endDate ? timeStampLocal(conditions.endDate) : '',
        };
        store.dispatch("updateCondition", {
          data: patientConditions,
          patientUdid: patientId,
          conditionUdid: conditionUdid.value ? conditionUdid.value : conditionDetails.value.id,
        })
        .then(() => {
          store.commit('isConditionEdit', false)
          store.dispatch("patientConditions", patientId);
          reset()
        });
      }
    };

    function reset() {
      formRef.value.resetFields()
      Object.assign(conditions, form)    
    }

    const handleConditionChange = (val) => {
            conditions.condition = val;
        };

    const editDataCondition = computed(() => {
      return store.state.patients.editConditionDetails;
    });

    return {
      editDataCondition,
      handleConditionChange,
      formRef,
      conditions,
      healthConditions,
      errorMsg,
      submitForm,
      changedValue,
      editCondition,
      isConditionEdit,
      globalDateFormat,
    }
  }
}
</script>