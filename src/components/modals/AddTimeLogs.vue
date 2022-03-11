<template>
  <a-modal width="1000px" title="Add Time Logs " centered>
    <a-form layout="vertical" ref="formRef" :model="addTimeLogForm" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.category')" name="category" :rules="[{ required: true, message: $t('timeLogs.category')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-model:value="addTimeLogForm.category" style="width: 100%" size="large" >
                <a-select-option value="" hidden>Select Category</a-select-option>
                <a-select-option v-for="category in timeLogCategories.globalCode" :key="category.id">{{ category.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.loggedBy')" name="loggedBy" :rules="[{ required: true, message: $t('timeLogs.loggedBy')+' '+$t('global.validation')  }]">
              <a-select ref="select" :disabled="isDisabled" v-model:value="addTimeLogForm.loggedBy" style="width: 100%" size="large">
                <a-select-option value="" hidden>Select Logged By</a-select-option>
                <a-select-option v-for="staff in staffList" :value="staff.id" :key="staff.id">{{ staff.fullName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.performedBy')" name="performedBy" :rules="[{ required: true, message: $t('timeLogs.performedBy')+' '+$t('global.validation')  }]">
              <a-select ref="select" :disabled="isDisabled" v-model:value="addTimeLogForm.performedBy" style="width: 100%" size="large">
                <a-select-option value="" hidden>Select Performed By</a-select-option>
                <a-select-option v-for="staff in staffList" :value="staff.id" :key="staff.id">{{ staff.fullName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.date')" name="date" :rules="[{ required: true, message: $t('timeLogs.date')+' '+$t('global.validation')  }]">
              <a-date-picker :disabled="isDisabled" v-model:value="addTimeLogForm.date" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.timeAmount')" name="timeAmount" :rules="[{ required: true, message: $t('timeLogs.timeAmount')+' '+$t('global.validation')  }]">
              <a-time-picker :disabled="isDisabled" v-model:value="addTimeLogForm.timeAmount" :default-value="defaultValue" format="HH:mm:ss" :size="size" style="width: 100%"/>
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.cptCode')" name="cptCode" :rules="[{ required: true, message: $t('timeLogs.cptCode')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-model:value="addTimeLogForm.cptCode" style="width: 100%" size="large" >
                <a-select-option value="" hidden>Select CPT Code</a-select-option>
                <a-select-option v-for="code in cptCodesList" :key="code.udid" :value="code.udid">{{ code.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.note')" name="note" :rules="[{ required: true, message: $t('timeLogs.note')+' '+$t('global.validation')  }]">
              <a-textarea v-model:value="addTimeLogForm.note" size="large" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :sm="24" :span="24">
          <ModalButtons @is_click="handleClear"/>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect,
} from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from "vuex";
import {
  timeStamp,
  // getSeconds,
} from '@/commonMethods/commonMethod';
import { useRoute } from "vue-router";
import moment from "moment";

export default defineComponent({
  components: {
    ModalButtons,
  },
  props: {
    timeLogDetails: {
      type: Object
    },
    isEditForm: {
      type: Boolean
    },
    isTimeLog: {
      type: Boolean
    },
    timerValue: {
      type: String
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute()
    const formRef = ref();
    const form = reactive({ ...addTimeLogForm });
    const isEdit = reactive(props.isEditForm);
    const isTimerLog = reactive(props.isTimeLog);
    const isDisabled = props.isTimeLog == true ? true : false;
    const loggedInUserDetails = JSON.parse(localStorage.getItem('auth'))
    /* const seconds = moment(props.timerValue, "HH:mm:ss").format('ss')
    const timer = ref(null);
    timer.value = seconds != 0 ?
                  moment(props.timerValue, "HH:mm:ss").add(1, 'minutes').format('HH:mm') :
                  moment(props.timerValue, "HH:mm:ss").format('HH:mm');
    const timerVal = ref(moment(timer.value, "HH:mm")); */
    const timerVal = ref(moment(props.timerValue, "HH:mm:ss"));

    const staffList = computed(() => {
      return store.state.common.staffList
    })

    const timeLogCategories = computed(() => {
      return store.state.common.timeLogCategories
    })

    const addTimeLogForm = reactive({
      category: "",
      loggedBy: "",
      performedBy: "",
      date: "",
      timeAmount: ref(),
      cptCode: "",
      note: "",
    })

    const loggedInUserId = ref(null);
    staffList.value.forEach(staff => {
      if(staff.uuid == loggedInUserDetails.user.staffUdid) {
        loggedInUserId.value = staff.uuid;
      }
    });

    watchEffect(() => {
      if(isTimerLog == true) {
        Object.assign(addTimeLogForm, {
          loggedBy: loggedInUserId.value != null ? loggedInUserId.value : "",
          performedBy: loggedInUserId.value != null ? loggedInUserId.value : "",
          date: moment(),
          timeAmount: timerVal.value ? timerVal.value : ""
        })
      }
    })

    const cptCodesList = computed(() => {
      return store.state.cptCodes.cptCodesList
    })

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addTimeLogForm, form)
    }

    const submitForm = () => {
      if(isEdit) {
        // store.dispatch('updateTimeLog', {timeLogId, addTimeLogForm});
      }
      else {
        // addTimeLogForm.date = timeStamp(addTimeLogForm.date);
        // addTimeLogForm.timeAmount = timeStamp(addTimeLogForm.timeAmount);
        const data = {
          category: addTimeLogForm.category,
          loggedBy: addTimeLogForm.loggedBy,
          performedBy: addTimeLogForm.performedBy,
          date: timeStamp(addTimeLogForm.date),
          timeAmount: timeStamp(addTimeLogForm.timeAmount),
          cptCode: addTimeLogForm.cptCode,
          note: addTimeLogForm.note,
        }
        const patientId = route.params.udid;
        store.dispatch('addTimeLog', {id: patientId, data: data}).then(() => {
          store.dispatch('latestTimeLog', route.params.udid)
          emit('closeModal');
          formRef.value.resetFields();
          Object.assign(addTimeLogForm, form)
        });
      }
    }

    return {
      // getSeconds,
      size: ref("large"),
      handleClear,
      formRef,
      submitForm,
      addTimeLogForm,
      staffList,
      timeLogCategories,
      isDisabled,
      cptCodesList,
    };
  },
});
</script>
