<template>
<a-modal width="1000px" title="Add Time Logs" zIndex="1050" centered @cancel="onCloseModal()" :maskClosable="false" :footer="false">
    <a-form layout="vertical" ref="formRef" :model="addTimeLogForm" @finish="submitForm">
        <a-row :gutter="24">

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.category')" name="category" :rules="[{ required: true, message: $t('timeLogs.category')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="changedValue" v-model:value="addTimeLogForm.category" :dataId="27" @handleGlobalChange="handleGlobalChange($event,'addTimeLogForm.category')" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.loggedBy')" name="loggedBy" :rules="[{ required: true, message: $t('timeLogs.loggedBy')+' '+$t('global.validation')  }]">
                      <StaffDropDown :getPopupContainer="triggerNode => triggerNode.parentNode" v-model:value="addTimeLogForm.loggedBy" @handleStaffChange="handleStaffChange($event, 'loggedBy');changedValue()" :isDisabled="isDisabled" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.performedBy')" name="performedBy" :rules="[{ required: true, message: $t('timeLogs.performedBy')+' '+$t('global.validation')  }]">
                      <StaffDropDown :getPopupContainer="triggerNode => triggerNode.parentNode" v-model:value="addTimeLogForm.performedBy" @handleStaffChange="handleStaffChange($event, 'performedBy');changedValue" :isDisabled="isDisabled" />
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
                        <a-time-picker @change="changedValue" v-model:value="addTimeLogForm.timeAmount" format="HH:mm:ss" :size="size" style="width: 100%" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('timeLogs.cptCode')" name="cptCode" :rules="[{ required: true, message: $t('timeLogs.cptCode')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="changedValue" v-model:value="addTimeLogForm.cptCode" :dataId="68" @handleGlobalChange="handleGlobalChange($event,'addTimeLogForm.cptCode')" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item label="Priority" name="flag" :rules="[{ required: false, message: $t('common.flag')+' '+$t('global.validation')  }]">
                        <ArrayDataSearch v-model:value="addTimeLogForm.flag" :globalCode="flagsList" />
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
import { computed, defineComponent, onBeforeUnmount, reactive, ref, watchEffect } from "vue";
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
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue"
import ArrayDataSearch from "@/components/modals/search/ArrayDataSearch";

export default defineComponent({
  components: {
    //ModalButtons,
    GlobalCodeDropDown,
    Loader,
    StaffDropDown,
    ArrayDataSearch,
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
    isLeftTimeLog: {
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
    const isDisabled = (props.isLeftTimeLog == true) || (props.isAutomatic == true) ? ref(true) : ref(false);
    const loggedInUserDetails = JSON.parse(localStorage.getItem("auth"));
    /* const seconds = moment(props.timerValue, "HH:mm:ss").format('ss')
        const timer = ref(null);
        timer.value = seconds != 0 ?
                      moment(props.timerValue, "HH:mm:ss").add(1, 'minutes').format('HH:mm') :
                      moment(props.timerValue, "HH:mm:ss").format('HH:mm');
        const timerVal = ref(moment(timer.value, "HH:mm")); */
    const timerVal = ref(moment());
    const cancelBtn = localStorage.getItem('cancelButton')

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
              cancelBtn: null,
            });
          } else {
            emit("closeModal", {
              modal: "closeTimeLogModal",
              value: false,
              cancelBtn: null,
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

    onBeforeUnmount(() => {
      localStorage.removeItem('cancelButton')
    })

    const loggedInUserId = ref(loggedInUserDetails.user.staffUdid);
    // const loggedInUserName = ref(null);

    watchEffect(() => {
      // if(staffList.value && staffList.value != null) {
      //   staffList.value.forEach((staff) => {
      //     if (staff.uuid == loggedInUserDetails.user.staffUdid) {
      //       alert('same')
      //       loggedInUserId.value = staff.uuid;
      //       loggedInUserName.value = staff.fullName;
      //     }
      //   });
      // }
      if (props.isEditTimeLog == true) {
        Object.assign(addTimeLogForm, {
          loggedBy: loggedInUserDetails.user.staff.fullName != null ? loggedInUserDetails.user.staff.fullName : "",
          performedBy: loggedInUserDetails.user.staff.fullName != null ? loggedInUserDetails.user.staff.fullName : "",
          date: moment(),
          timeAmount: timerVal.value ? timerVal.value : "",
        });
      }
      if(!props.isAutomatic) {
        Object.assign(addTimeLogForm, {
          loggedBy: loggedInUserDetails.user.staff.fullName != null ? loggedInUserDetails.user.staff.fullName : "",
          performedBy: loggedInUserDetails.user.staff.fullName != null ? loggedInUserDetails.user.staff.fullName : "",
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
      const cancelBtn = localStorage.getItem('cancelButton')
      if(cancelBtn) {
        warningSwal(messages.patientlogMessage).then((response) => {
          if (response == true) {
            emit("closeModal", {
              link: true,
              modal: "cancelButton",
              value: false,
              cancelBtn: cancelBtn,
            });
          } else {
            emit("closeTimeLogModal", {
                modal: "closeTimeLogModal",
                value: true,
                cancelBtn: cancelBtn,
              });
          }
        });
      }else{
        emit("closeModal", {
            link: true,
            modal: "cancelButton",
            value: true,
            cancelBtn: cancelBtn ? cancelBtn : null,
          });
      }
      
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
          loggedBy: loggedInUserId.value ? loggedInUserId.value : addTimeLogForm.loggedBy,
          performedBy: loggedInUserId.value ? loggedInUserId.value : addTimeLogForm.performedBy,
          date: timeStamp(addTimeLogForm.date),
          timeAmount: timeAmount,
          cptCode: addTimeLogForm.cptCode,
          flag: addTimeLogForm.flag,
          note: addTimeLogForm.note,
          isAutomatic: false,
        };
        store.dispatch("updatePatientTimeLog", {
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
              cancelBtn: cancelBtn,
            });
            formRef.value.resetFields();
            Object.assign(addTimeLogForm, form);
          });
      } else {
        const data = {
          category: addTimeLogForm.category,
          loggedBy: loggedInUserId.value ? loggedInUserId.value : addTimeLogForm.loggedBy,
          performedBy: loggedInUserId.value ? loggedInUserId.value : addTimeLogForm.performedBy,
          date: timeStamp(addTimeLogForm.date),
          timeAmount: timeAmount,
          cptCode: addTimeLogForm.cptCode,
          flag: addTimeLogForm.flag,
          note: addTimeLogForm.note,
          isAutomatic: false,
        };
        const patientId = route.params.udid;
        store.dispatch("addTimeLog", {
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
              cancelBtn: cancelBtn,
            });
            formRef.value.resetFields();
            Object.assign(addTimeLogForm, form);
          });
      }
      // }
    };

    const handleStaffChange = (val, user) => {
      if(user == 'loggedBy') {
        addTimeLogForm.loggedBy = val;
      }
      else {
        addTimeLogForm.performedBy = val;
      }
    };
    const handleGlobalChange = (data,type) =>{
            if(type =='addTimeLogForm.category'){
                addTimeLogForm.category = data
            }
            if(type=='addTimeLogForm.cptCode'){
                addTimeLogForm.cptCode = data
            }
        }

    return {
      handleGlobalChange,
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
      handleStaffChange,
    };
  },
});
</script>
