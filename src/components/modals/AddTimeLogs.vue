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
              <a-select ref="select" v-model:value="addTimeLogForm.loggedBy" style="width: 100%" size="large">
                <a-select-option value="" hidden>Select Logged By</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id">{{ staff.fullName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.performedBy')" name="performedBy" :rules="[{ required: true, message: $t('timeLogs.performedBy')+' '+$t('global.validation')  }]">
              <a-select ref="select" v-model:value="addTimeLogForm.performedBy" style="width: 100%" size="large">
                <a-select-option value="" hidden>Select Performed By</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id">{{ staff.fullName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.date')" name="date" :rules="[{ required: true, message: $t('timeLogs.date')+' '+$t('global.validation')  }]">
              <a-date-picker v-model:value="addTimeLogForm.date" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('timeLogs.timeAmount')" name="timeAmount" :rules="[{ required: true, message: $t('timeLogs.timeAmount')+' '+$t('global.validation')  }]">
              <a-time-picker v-model:value="addTimeLogForm.timeAmount" format="HH:mm" :size="size" style="width: 100%"/>
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
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from "vuex";
import { timeStamp } from '@/commonMethods/commonMethod';
export default defineComponent({
  components: {
    ModalButtons,
  },
  props: {
    timeLogUdid: {
      type: Number
    },
    isEdit: {
      type: Boolean
    }
  },
  setup(props) {
    const store = useStore();
    const formRef = ref();
    const form = reactive({ ...addTimeLogForm });
    const timeLogId = reactive(props.timeLogUdid);
    // const isEditValue = reactive(props.isEdit);
    // console.log('isEditValue', isEditValue)
    // const isAdd = isEditValue == true ? false : true;
    
    watchEffect(() => {
      store.dispatch("staffList")
      store.dispatch('timeLogDetails', timeLogId)
    })

    const staffList = computed(() => {
      return store.state.common.staffList
    })

    const timeLogDetails = computed(() => {
      return store.state.timeLogs.timeLogDetails;
    })
    console.log('timeLogDetails', timeLogDetails.value)

    const timeLogCategories = computed(() => {
      return store.state.common.timeLogCategories
    })

    const addTimeLogForm = reactive({
      category: "",
      loggedBy: "",
      performedBy: "",
      date: "",
      timeAmount: "",
      // category: timeLogDetails.value != null ? timeLogDetails.value.categoryId : "",
      // loggedBy: timeLogDetails.value != null ? timeLogDetails.value.loggedId : "",
      // performedBy: timeLogDetails.value != null ? timeLogDetails.value.performedId : "",
      // date: timeLogDetails.value != null ? timeLogDetails.value.date : "",
      // timeAmount: timeLogDetails.value != null ? timeLogDetails.value.timeAmount : "",
    })

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addTimeLogForm, form)
    }

    const submitForm = () => {
      addTimeLogForm.date = timeStamp(addTimeLogForm.date);
      addTimeLogForm.timeAmount = timeStamp(addTimeLogForm.timeAmount);
      // console.log('timeLogId', timeLogId);
      // console.log('addTimeLogForm', addTimeLogForm);
      // if(isAdd == true) {
        store.dispatch('addTimeLog', addTimeLogForm);
      // }
      // else {
      //   alert("Edit")
      //   store.dispatch('updateTimeLog', {timeLogId, addTimeLogForm});
      // }
    }

    return {
      size: ref("large"),
      handleClear,
      formRef,
      submitForm,
      addTimeLogForm,
      staffList,
      timeLogCategories,
      timeLogDetails,
    };
  },
});
</script>
