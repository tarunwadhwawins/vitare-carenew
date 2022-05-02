<template>
  <a-modal width="60%" :title="title">
    <a-form ref="formRef" :model="createGroupForm" layout="vertical" @finish="submitForm">
      <a-row>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('staffGroups.groupName')" name="group" :rules="[{required: true,message:$t('staffGroups.groupName') +$t('global.validation')}]">
              <a-input v-model:value="createGroupForm.group" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('staffGroups.status')" name="status">
              <a-switch v-model:checked="createGroupForm.status" />
            </a-form-item>
          </div>
        </a-col>
        
        <a-col :span="24">
          <div class="steps-action">
            <ModalButtons />
          </div>
        </a-col>
      </a-row>
    </a-form>
    <AddGroupStaffModal v-model:visible="visibleAddGroupStaffModal" @closeModal="closeModal" />
  </a-modal>

</template>

<script>

import AddGroupStaffModal from "@/components/modals/AddGroupStaffModal";
import { reactive, ref } from 'vue-demi';
import ModalButtons from "@/components/common/button/ModalButtons";
export default {
  components: {
    ModalButtons,
    AddGroupStaffModal,
  },
  props: {
    isEdit: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const visibleAddGroupStaffModal = ref(false)
    const title = props.isEdit ? 'Edit Group' : 'Create Group'

    const createGroupForm = reactive({
      group: "",
      status: "",
    })

    const submitForm = () => {
      if(props.isEdit != true) {
        visibleAddGroupStaffModal.value = true
      }
      emit('closeModal')
    }

    const closeModal = () => {
      visibleAddGroupStaffModal.value = false
      emit('closeModal')
    }

    return {
      title,
      closeModal,
      createGroupForm,
      visibleAddGroupStaffModal,
      submitForm
    };
  },
};
</script>