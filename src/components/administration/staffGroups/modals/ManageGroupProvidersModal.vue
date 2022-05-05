<template>
  <a-modal width="60%" :title="$t('staffGroups.manageProviders')">
    <a-form ref="formRef" :model="addProviderToGroupForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :span="21">
          <div class="form-group">
            <a-form-item :label="$t('global.provider')" name="provider">
              <ProvidersDropdownSearch mode="multiple" v-model:value="addProviderToGroupForm.provider" @handleProviderChange="handleProviderChange($event)" :placeholder="$t('staffGroups.searchProvidersPlaceholder')" />
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
        <GroupProvidersTable :groupId="groupId" @closeModal="closeModal" />
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
    ProvidersDropdownSearch: defineAsyncComponent(()=>import("@/components/modals/search/ProvidersDropdownSearch")),
    GroupProvidersTable: defineAsyncComponent(()=>import("@/components/administration/staffGroups/tables/GroupProvidersTable")),
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
        store.dispatch('groupProvidersList', props.groupId)
      }  
    })

    const addProviderToGroupForm = reactive({
      provider: [],
    })
    const form = reactive({ ...addProviderToGroupForm })

		const handleProviderChange = (val) => {
			addProviderToGroupForm.provider = val;
		};

    const submitForm = () => {
      const data = {
        id: props.groupId,
        data: addProviderToGroupForm
      }
      store.dispatch('addProviderToGroup', data).then(() => {
        formRef.value.resetFields();
        Object.assign(addProviderToGroupForm, form)
        store.dispatch('groupProvidersList', props.groupId)
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
      addProviderToGroupForm,
      handleProviderChange,
      closeModal,
    };
  },
};
</script>