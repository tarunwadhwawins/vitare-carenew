<template>
  <a-form ref="formRef" layout="vertical" :model="addCareTeamForm" @finish="submitForm">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-form-item :label="$t('tasks.tasksModal.staff')" name="staff" :rules="[{ required: true, message: $t('tasks.tasksModal.staff')+' '+$t('global.validation') }]">
            <StaffDropDown v-model:value="addCareTeamForm.staff" @handleStaffChange="handleStaffChange($event)" @change="checkChangeInput()" :close="closeValue" />
        </a-form-item>
      </a-col>
      <a-col :sm="24" :xs="24">
        <a-form-item :label="$t('global.isPrimary')" name="isPrimary" :rules="[{ required: true, message: $t('global.isPrimary')+' '+$t('global.validation') }]">
          <a-switch v-model:checked="addCareTeamForm.isPrimary" size="large" />
        </a-form-item>
      </a-col>
      <a-col :sm="4" :xs="24">
        <a-button class="add-button" size="large" html-type="submit">Add</a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>

import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {warningSwal,actionTrack} from "@/commonMethods/commonMethod";
import { messages } from '@/config/messages';
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue"

export default defineComponent({
  props: {
    staffType: {
      type: Number
    },
  },
  components: {
    StaffDropDown,
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const patientUdid = route.params.udid;
    const isValueChanged = ref(false);

    watchEffect(() => {
      console.log('props.staffType', props.staffType)
      store.dispatch('careTeamList', {
        patientUdid: patientUdid,
        type: props.staffType
      })
    })

    const staffList = computed(() => {
      return store.state.common.allStaffList
    })

    const addCareTeamForm = reactive({
      staff: "",
      isPrimary: false,
      type: props.staffType
    })

    const handleStaffChange = (val) => {
      addCareTeamForm.staff = val;
    };

    function checkChangeInput() {
      store.commit('checkChangeInput', true)
    }

    const form = reactive({ ...addCareTeamForm })

    const changedValue = () => {
      isValueChanged.value = true;
    }

    function onCloseModal() {
      if(isValueChanged.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("closeModal", {
              modal: 'addCareTeam',
              value: false
            });
            Object.assign(addCareTeamForm, form);
            isValueChanged.value = false;
          }
          else {
            emit("closeModal", {
              modal: 'addCareTeam',
              value: true
            });
          }
        })
      }
    }
    
    const formRef = ref();
    const submitForm = () => {
      store.dispatch('addCareTeam', { patientUdid: patientUdid, data: addCareTeamForm }).then(() => {
        store.dispatch('careTeamList', {
          patientUdid: patientUdid,
          type: props.staffType
        })
        formRef.value.resetFields();
        Object.assign(addCareTeamForm, form);
        emit("closeModal", {
          modal: 'addCareTeam',
          value: false
        });
      })
    }

    const deleteStaff = (patientStaffUdid) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
            store.dispatch('deleteStaff', { patientUdid: patientUdid, patientStaffUdid: patientStaffUdid }).then(() => {
            store.dispatch('careTeamList', {
              patientUdid: patientUdid,
              type: props.staffType
            })
          })
        }
      })
    }

    return {
      actionTrack,
      paramsId:route.params.udid,
      deleteStaff,
      addCareTeamForm,
      submitForm,
      formRef,
      staffList,
      isValueChanged,
      changedValue,
      onCloseModal,
      handleStaffChange,
      checkChangeInput,
    };
  },
});
</script>


<style>
  .add-button {
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    width: 70%;
  }
</style>