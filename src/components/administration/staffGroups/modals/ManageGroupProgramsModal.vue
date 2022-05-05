<template>
  <a-modal width="60%" :title="$t('staffGroups.managePrograms')">
    <a-form ref="formRef" :model="addProgramToGroupForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :span="21">
          <div class="form-group">
            <a-form-item :label="$t('global.program')" name="program">
              <ProgramsDropdownSearch mode="multiple" v-model:value="addProgramToGroupForm.program" @handleProgramChange="handleProgramChange($event)" :placeholder="$t('staffGroups.searchProgramsPlaceholder')" />
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
        <GroupProgramsTable :groupId="groupId" @closeModal="closeModal" />
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
    ProgramsDropdownSearch: defineAsyncComponent(()=>import("@/components/modals/search/ProgramsDropdownSearch")),
    GroupProgramsTable: defineAsyncComponent(()=>import("@/components/administration/staffGroups/tables/GroupProgramsTable")),
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
      store.dispatch('groupProgramsList', props.groupId)
    })

    const addProgramToGroupForm = reactive({
      program: [],
    })
    const form = reactive({ ...addProgramToGroupForm })

		const handleProgramChange = (val) => {
			addProgramToGroupForm.program = val;
		};

    const submitForm = () => {
      const data = {
        id: props.groupId,
        data: addProgramToGroupForm
      }
      store.dispatch('addProgramToGroup', data).then(() => {
        formRef.value.resetFields();
        Object.assign(addProgramToGroupForm, form)
        store.dispatch('groupProgramsList', props.groupId)
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
      addProgramToGroupForm,
      handleProgramChange,
      closeModal,
    };
  },
};
</script>