<template>
<a-modal max-width="1000px" width="60%" title="WorkFlow Details" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-form :model="eventDetails" ref="formRef" name="eventDetails"  autocomplete="off" scrollToFirstError=true layout="vertical" @finish="update?updateForm():submitForm()" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="Event For" name="eventTypeId" :rules="[{ required: true, message: 'Event For' +' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="checkChangeInput();eventType(eventDetails.eventTypeId)" v-model:value="eventDetails.eventTypeId" :globalCode="globalCode.workflowEventType" disabled/>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                   <a-form-item label="Event" name="eventId" :rules="[{ required: true, message: 'Event' +' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="eventDetails.eventId" :globalCode="events" :disabled="update"/>
                    </a-form-item>
                </div>

            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="WorkFlow Name" name="title" :rules="[{required: true,message:'Title ' +$t('global.validation'),},]">
                        <a-input v-model:value="eventDetails.title" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>

            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item label="Description" name="description" :rules="[{required: false,message:'Description ' +$t('global.validation'),},]">
                        <a-textarea v-model:value="eventDetails.description" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: true, message: $t('global.startDate')+' '+$t('global.validation')  }]">
                        <a-date-picker  :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="eventDetails.startDate" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('global.endDate')" name="endDate" :rules="[{ required: false, message: $t('global.endDate')+' '+$t('global.validation')  }]">
                        <a-date-picker  :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="eventDetails.endDate" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="steps-action" v-if="update==true">
                    <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                </div>
                <div class="steps-action" v-else>
                   <a-button html-type="reset"  style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>
<script>
import { reactive, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch";
import {
  timeStamp,
  endTimeAdd,
  warningSwal,
  globalDateFormat,
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import moment from "moment";
export default {
  name: "CreateWorkFlow",
  components: {
    GlobalCodeDropDown,
  },
  props: {
    update: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const eventDetails = reactive({
      eventTypeId: 225,
      eventId: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    const formRef = ref();

    function eventType(id) {
      console.log(id);
      store.dispatch("eventType", id);
    }

    const editWorkflow = computed(() => {
      return store.state.workflow.editWorkflow;
    });

    function submitForm() {
      eventDetails.startDate = timeStamp(
        endTimeAdd(moment(eventDetails.startDate))
      );
      eventDetails.endDate = timeStamp(
        endTimeAdd(moment(eventDetails.endDate))
      );
      store.dispatch("addWorkFlow", eventDetails).then((response) => {
        if (response == true) {
          store.dispatch("workflowList");
          emit("saveModal", false);
        }
      });
    }
    function updateForm() {
      eventDetails.startDate = timeStamp(
        endTimeAdd(moment(eventDetails.startDate))
      );
      eventDetails.endDate = timeStamp(
        endTimeAdd(moment(eventDetails.endDate))
      );
      store
        .dispatch("updateWorkFlow", {
          data: eventDetails,
          id: editWorkflow.value.id,
        })
        .then((response) => {
          if (response == true) {
            store.dispatch("workflowList");
            emit("saveModal", false);
          }
        });
    }
    function onFinishFailed(value) {
      console.log(value);
    }

    function reset() {
      formRef.value.resetFields();
    }
    function checkChangeInput() {
      store.commit("checkChangeInput", true);
    }
    function changeDate() {
      if (moment(eventDetails.startDate) > moment(eventDetails.endDate)) {
        eventDetails.endDate = "";
      }
    }
    const form = reactive({
      ...eventDetails,
    });
    const globalCode = computed(() => {
      return store.state.common;
    });
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });
    function closeModal() {
      if (checkFieldsData.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("saveModal", false);
            Object.assign(eventDetails, form);
            store.state.common.checkChangeInput = false;
          } else {
            emit("saveModal", true);
          }
        });
      } else {
        formRef.value.resetFields();
      }
    }

    watchEffect(() => {
      if (editWorkflow.value) {
        Object.assign(eventDetails, editWorkflow.value);
      } else if(props.update==false) {
        Object.assign(eventDetails, form);
      }
      store.dispatch("eventType", 225);
      store.dispatch("workflowList");
    });
    return {
      updateForm,
      globalDateFormat,
      checkFieldsData,
      closeModal,
      moment,
      changeDate,
      eventType,
      globalCode,
      checkChangeInput,
      formRef,
      onFinishFailed,
      submitForm,
      reset,
      size: ref("large"),
      eventDetails,
      events: store.getters.events,
      editWorkflow,
    };
  },
};
</script>