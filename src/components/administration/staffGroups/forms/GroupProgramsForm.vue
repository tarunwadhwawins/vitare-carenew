<template>
  <a-form ref="formRef" :model="addProgramToGroupForm" layout="vertical" @finish="submitForm">
    <a-row :gutter="24">

      <a-col :span="21">
        <div class="form-group">
          <a-form-item :label="$t('global.program')" name="program" :rules="[{ required: true, message: $t('global.program')+' '+$t('global.validation') }]">
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

</template>

<script>
import { 
  reactive,
  ref,
  defineAsyncComponent,
  computed,
  watchEffect
} from "vue";
import { useStore } from 'vuex';

export default {
  components: {
    ProgramsDropdownSearch: defineAsyncComponent(()=>import("@/components/modals/search/ProgramsDropdownSearch")),
  },
  props: {
    isEdit: {
      type: Boolean
    },
    groupID: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const formRef = ref()
    const store = useStore()
    const groupId = ref(null)

    const addProgramToGroupForm = reactive({
      program: [],
    })
    const form = reactive({ ...addProgramToGroupForm })

		const handleProgramChange = (val) => {
			addProgramToGroupForm.program = val;
		};

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const groupDetails = computed(() => {
      return store.state.staffGroups.groupDetails
    })

    watchEffect(() => {
      if(createGroup.value != null) {
        groupId.value = props.groupID ? props.groupID : createGroup.value.udid;
      }
      else if(groupDetails.value != null) {
        groupId.value = props.groupID ? props.groupID : groupDetails.value.udid;
      }
    })

    const submitForm = () => {
      const data = {
        id: groupId.value,
        data: addProgramToGroupForm
      }
      store.dispatch('addProgramToGroup', data).then(() => {
        formRef.value.resetFields();
        Object.assign(addProgramToGroupForm, form)
        store.dispatch('groupProgramsList', groupId.value)
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