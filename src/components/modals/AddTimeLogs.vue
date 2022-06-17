<template>
<a-modal width="1000px" title="Add Time Logs " centered @cancel="onCloseModal()" :maskClosable="false" :footer="false">
    <a-form layout="vertical" ref="formRef" :model="addTimeLogForm" @finish="submitForm">
        <a-row :gutter="24">

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.category')" name="category" :rules="[{ required: true, message: $t('timeLogs.category')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="changedValue" v-model:value="addTimeLogForm.category" :globalCode="timeLogCategories" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.loggedBy')" name="loggedBy" :rules="[{ required: true, message: $t('timeLogs.loggedBy')+' '+$t('global.validation')  }]">
                        <a-select :getPopupContainer="triggerNode => triggerNode.parentNode" @change="changedValue" ref="select" :disabled="isDisabled" v-model:value="addTimeLogForm.loggedBy" style="width: 100%" size="large">
                            <a-select-option value="" hidden>Select Logged By</a-select-option>
                            <a-select-option v-for="staff in staffList" :value="staff.id" :key="staff.id">{{ staff.fullName }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.performedBy')" name="performedBy" :rules="[{ required: true, message: $t('timeLogs.performedBy')+' '+$t('global.validation')  }]">
                        <a-select :getPopupContainer="triggerNode => triggerNode.parentNode" @change="changedValue" ref="select" :disabled="isDisabled" v-model:value="addTimeLogForm.performedBy" style="width: 100%" size="large">
                            <a-select-option value="" hidden>Select Performed By</a-select-option>
                            <a-select-option v-for="staff in staffList" :value="staff.id" :key="staff.id">{{ staff.fullName }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.date')" name="date" :rules="[{ required: true, message: $t('timeLogs.date')+' '+$t('global.validation')  }]">
                        <a-date-picker @change="changedValue" :disabled="isDisabled" :disabledDate="d => !d || d.isSameOrAfter(dateSelect)" v-model:value="addTimeLogForm.date" :size="size" style="width: 100%" :format="globalDateFormat" value-format="YYYY-MM-DD" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.timeAmount')" name="timeAmount" :rules="[{ required: true, message: $t('timeLogs.timeAmount')+' '+$t('global.validation')  }]">
                        <a-time-picker @change="changedValue" :disabled="isDisabled" v-model:value="addTimeLogForm.timeAmount" :default-value="defaultValue" format="HH:mm:ss" :size="size" style="width: 100%" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.cptCode')" name="cptCode" :rules="[{ required: true, message: $t('timeLogs.cptCode')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="changedValue" v-model:value="addTimeLogForm.cptCode" :globalCode="cptCodesList" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: false, message: $t('common.flag')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown v-model:value="addTimeLogForm.flag" :globalCode="flagsList" />
                        <ErrorMessage v-if="errorMsg" :name="errorMsg.flag ? errorMsg.flag[0] : ''" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.note')" name="note" :rules="[{ required: false, message: $t('timeLogs.note')+' '+$t('global.validation')  }]">
                        <a-textarea @change="changedValue" v-model:value="addTimeLogForm.note" size="large" style="width: 100%" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="24" :span="24">
                <div class="steps-action">
                    <a-button @click="cancelButton()" class="modal-button">Cancel</a-button>
                    <a-button class="modal-button" type="primary" html-type="submit" click="handleClear">{{$t('global.save')}}</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
    <Loader />
</a-modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
//import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from "vuex";
import {
  timeStamp,
  getSeconds,
  globalDateFormat,
} from "@/commonMethods/commonMethod";
import { useRoute } from "vue-router";
import moment from "moment";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";

import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import Loader from "@/components/loader/Loader";

export default defineComponent({
  components: {
    //ModalButtons,
    GlobalCodeDropDown,
    Loader,
  },
  props: {
    isEditForm: {
      type: Boolean,
    },
    isEditTimeLog: {
      type: Boolean,
    },
    isAutomatic: {
      type: Boolean,
    },
    timerValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const formRef = ref();
    const dateSelect = ref(moment().add(1, "day"));
    const isValueChanged = ref(false);
    // const isTimerLog = reactive(props.isAutomatic);
    const isDisabled = props.isAutomatic == true ? true : false;
    const loggedInUserDetails = JSON.parse(localStorage.getItem("auth"));
    /* const seconds = moment(props.timerValue, "HH:mm:ss").format('ss')
        const timer = ref(null);
        timer.value = seconds != 0 ?
                      moment(props.timerValue, "HH:mm:ss").add(1, 'minutes').format('HH:mm') :
                      moment(props.timerValue, "HH:mm:ss").format('HH:mm');
        const timerVal = ref(moment(timer.value, "HH:mm")); */
    const timerVal = ref(moment(props.timerValue, "HH:mm:ss"));

    const staffList = computed(() => {
      return store.state.common.allStaffList;
    });

    const timeLogCategories = computed(() => {
      return store.state.common.timeLogCategories;
    });

    const addTimeLogForm = reactive({
      category: "",
      loggedBy: "",
      performedBy: "",
      date: "",
      timeAmount: "",
      cptCode: "",
      flag: "",
      note: "",
    });
    const form = reactive({
      ...addTimeLogForm,
    });

    const changedValue = () => {
      isValueChanged.value = true;
    };

    function onCloseModal() {
      if (isValueChanged.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response != true) {
            emit("closeModal", {
              modal: "closeTimeLogModal",
              value: true,
            });
          } else {
            emit("closeModal", {
              modal: "closeTimeLogModal",
              value: false,
            });
            Object.assign(addTimeLogForm, form);
            isValueChanged.value = false;
          }
        });
      } else {
        formRef.value.resetFields();
        isValueChanged.value = false;
      }
    }

    const loggedInUserId = ref(null);
    if (staffList.value && staffList.value != null) {
      staffList.value.forEach((staff) => {
        if (staff.uuid == loggedInUserDetails.user.staffUdid) {
          loggedInUserId.value = staff.uuid;
        }
      });
    }

    watchEffect(() => {
      if (props.isEditTimeLog == true) {
        Object.assign(addTimeLogForm, {
          loggedBy: loggedInUserId.value != null ? loggedInUserId.value : "",
          performedBy: loggedInUserId.value != null ? loggedInUserId.value : "",
          date: moment(),
          timeAmount: timerVal.value ? timerVal.value : "",
        });
      }
    });

    const cptCodesList = computed(() => {
      return store.state.common.activeCptCodes;
    });

    const flagsList = computed(() => {
      return store.state.flags.flagsList;
    });

    const handleClear = () => {
      formRef.value.resetFields();
      Object.assign(addTimeLogForm, form);
    };

    function cancelButton() {
      warningSwal(messages.patientlogMessage).then((response) => {
        if (response == true) {
          emit("closeModal", {
            link: true,
            modal: "cancelButton",
            value: false,
          });
        } else {
          emit("closeTimeLogModal", {
              modal: "closeTimeLogModal",
              value: true,
            });
        }
      });
    }
    const submitForm = () => {
      // if(props.isEditForm) {
      //   // store.dispatch('updateTimeLog', {timeLogId, addTimeLogForm});
      // }
      // else {
      const timeLogId = localStorage.getItem("timeLogId");
      const timeAmount = getSeconds(
        moment(addTimeLogForm.timeAmount).format("HH:mm:ss")
      );
      if (timeLogId && timeLogId != null && props.isAutomatic == true) {
        const data = {
          category: addTimeLogForm.category,
          loggedBy: addTimeLogForm.loggedBy,
          performedBy: addTimeLogForm.performedBy,
          date: timeStamp(addTimeLogForm.date),
          timeAmount: timeAmount,
          cptCode: addTimeLogForm.cptCode,
          flag: addTimeLogForm.flag,
          note: addTimeLogForm.note,
          isAutomatic: false,
        };
        store
          .dispatch("updatePatientTimeLog", {
            timeLogId: timeLogId,
            patientUdid: route.params.udid,
            data: data,
          })
          .then(() => {
            store.dispatch("latestTimeLog", route.params.udid);
            store.dispatch("patientTimeline", {
              id: route.params.udid,
              type: "",
            });
            emit("closeModal", {
              modal: "addTimeLog",
              value: false,
            });
            formRef.value.resetFields();
            Object.assign(addTimeLogForm, form);
          });
      } else {
        const data = {
          category: addTimeLogForm.category,
          loggedBy: addTimeLogForm.loggedBy,
          performedBy: addTimeLogForm.performedBy,
          date: timeStamp(addTimeLogForm.date),
          timeAmount: timeAmount,
          cptCode: addTimeLogForm.cptCode,
          flag: addTimeLogForm.flag,
          note: addTimeLogForm.note,
          isAutomatic: false,
        };
        const patientId = route.params.udid;
        store
          .dispatch("addTimeLog", {
            id: patientId,
            data: data,
          })
          .then(() => {
            store.dispatch("latestTimeLog", route.params.udid);
            store.dispatch("patientTimeline", {
              id: route.params.udid,
              type: "",
            });
            emit("closeModal", {
              modal: "addTimeLog",
              value: false,
            });
            formRef.value.resetFields();
            Object.assign(addTimeLogForm, form);
          });
      }
      // }
    };

    return {
      globalDateFormat,
      size: ref("large"),
      handleClear,
      formRef,
      submitForm,
      addTimeLogForm,
      staffList,
      timeLogCategories,
      isDisabled,
      cptCodesList,
      isValueChanged,
      changedValue,
      onCloseModal,
      flagsList,
      dateSelect,
      cancelButton,
    };
  },
});
</script>
