<template>
  <a-modal width="60%" :title="$t('staffGroups.manageStaff')">
    <a-form ref="formRef" :model="addStaffToGroupForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :span="21">
          <div class="form-group">
            <a-form-item :label="$t('global.staff')" name="staff">
              <StaffDropDown mode="multiple" v-model:value="addStaffToGroupForm.staff" @handleStaffChange="handleStaffChange($event)" :placeholder="$t('staffGroups.searchStaffPlaceholder')" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :span="3">
          <div class="form-group">
            <div class="text-right mt-28">
              <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.save')}}</a-button>
            </div>
          </div>
        </a-col>
        
      </a-row>
    </a-form>

    <a-row :gutter="24">
      <a-col :span="24" class="mt-25">
        <GroupStaffTable :groupId="groupId" @closeModal="closeModal" />
      </a-col>
    </a-row>

  </a-modal>
</template>

<script>
import {
  reactive,
  ref,
  watchEffect,
  defineAsyncComponent
} from "vue";
import { useStore } from 'vuex';

export default {
  components: {
    StaffDropDown: defineAsyncComponent(()=>import("@/components/modals/search/StaffDropdownSearch")),
    GroupStaffTable: defineAsyncComponent(()=>import("@/components/administration/staffGroups/tables/GroupStaffTable")),
  },
  props: {
    groupId: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const formRef = ref()
    const store = useStore()

    watchEffect(() => {
      if(props.groupId) {
        store.dispatch('groupStaffList', props.groupId)
      }
    })

    const addStaffToGroupForm = reactive({
      staff: [],
    })
    const form = reactive({ ...addStaffToGroupForm })

		const handleStaffChange = (val) => {
			addStaffToGroupForm.staff = val;
		};

    const submitForm = () => {
      const id = props.groupId;
      const data = {
        id: id,
        data: addStaffToGroupForm
      }
      store.dispatch('addStaffToGroup', data).then(() => {
        formRef.value.resetFields();
        Object.assign(addStaffToGroupForm, form)
        store.dispatch('groupStaffList', props.groupId)
      })
    }

    const closeModal = () => {
      emit('closeModal')
    }

    return {
      formRef,
      value: ref([]),
      checked: ref([]),
      submitForm,
      addStaffToGroupForm,
      handleStaffChange,
      closeModal,
    };
  },
};
</script>