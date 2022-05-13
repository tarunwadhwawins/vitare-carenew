<template>
  <a-form ref="formRef" :model="addStaffToGroupForm" layout="vertical" @finish="submitForm">
    <a-row :gutter="24">

      <a-col :span="21">
        <div class="form-group">
          <a-form-item :label="$t('global.staff')" name="staff" :rules="[{ required: true, message: $t('global.staff')+' '+$t('global.validation') }]">
            <StaffDropDown mode="multiple" v-model:value="addStaffToGroupForm.staff" @handleStaffChange="handleStaffChange($event)" :placeholder="$t('staffGroups.searchStaffPlaceholder')" :targetRecords="groupStaffList" :dropdownList="dropdownList" />
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
import Services from "@/services/serviceMethod";

export default {
  components: {
    StaffDropDown: defineAsyncComponent(()=>import("@/components/modals/search/StaffDropdownSearch")),
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

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const groupDetails = computed(() => {
      return store.state.staffGroups.groupDetails
    })

    const groupStaffList = computed(() => {
      return store.state.staffGroups.groupStaffList
    })

    const dropdownList = computed(() => {
      return store.state.staffGroups.dropdownList
    })

    watchEffect(() => {
      if(props.isEdit) {
        groupId.value = groupDetails.value.udid
      }
      else {
        groupId.value = createGroup.value ? createGroup.value.udid : null
      }
    })

    const addStaffToGroupForm = reactive({
      staff: [],
    })
    const form = reactive({ ...addStaffToGroupForm })

		const handleStaffChange = (val) => {
			addStaffToGroupForm.staff = val;
		};
    const staffData = ref([]);

    const submitForm = () => {
      const data = {
        id: groupId.value,
        data: addStaffToGroupForm
      }
      store.dispatch('addStaffToGroup', data).then(() => {
        formRef.value.resetFields();
        Object.assign(addStaffToGroupForm, form)
        store.dispatch('groupsList')
        store.dispatch('groupStaffList', groupId.value).then(() => {
          Services.singleDropdownSearch("", (d) => (staffData.value = d), groupStaffList.value, "staff");
        })
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
      groupId,
      groupStaffList,
      dropdownList,
    };
  },
};
</script>