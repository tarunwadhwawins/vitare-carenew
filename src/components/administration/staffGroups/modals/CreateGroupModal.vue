<template>
  <a-modal width="60%" :title="title">
    <a-form :model="createGroupForm" layout="vertical" @finish="submitForm">
      <a-row>

        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('staffGroups.groupName')" name="group" :rules="[{required: true, message:$t('staffGroups.groupName')+' '+$t('global.validation')}]">
              <a-input v-model:value="createGroupForm.group" size="large" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('global.isActive')" name="isActive">
              <a-switch v-model:checked="createGroupForm.isActive" />
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
    <ManageGroupStaffModal v-if="visibleManageGroupStaffModal" v-model:visible="visibleManageGroupStaffModal" @closeModal="closeModal" :groupId="createGroup.udid" />
  </a-modal>

</template>

<script>
import { computed, reactive, ref, watchEffect, defineAsyncComponent } from 'vue-demi';
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from 'vuex';

export default {
  components: {
    ModalButtons,
    ManageGroupStaffModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupStaffModal")),
  },
  props: {
    isEdit: {
      type: Boolean
    },
    groupId: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const groupDetails = computed(() => {
      return store.state.staffGroups.groupDetails
    })

    const visibleManageGroupStaffModal = ref(false)
    const title = props.isEdit ? 'Edit Group' : 'Create Group'

    const createGroupForm = reactive({
      group: "",
      isActive: true,
    })

    watchEffect(() => {
      if(props.isEdit) {
        Object.assign(createGroupForm, groupDetails.value)
      }
    })

    const submitForm = () => {
      if(props.isEdit) {
        store.dispatch('updateGroup', {
          id: props.groupId,
          data: createGroupForm,
        }).then(() => {
          store.dispatch('groupsList')
          emit('closeModal')
        })
      }
      else {
        store.dispatch('createGroup', createGroupForm).then(() => {
          if(props.isEdit != true) {
            store.dispatch('groupsList')
            visibleManageGroupStaffModal.value = true
          }
          emit('closeModal')
        })
      }
    }

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const closeModal = () => {
      visibleManageGroupStaffModal.value = false
      emit('closeModal')
    }

    return {
      title,
      closeModal,
      createGroupForm,
      visibleManageGroupStaffModal,
      submitForm,
      createGroup,
    };
  },
};
</script>