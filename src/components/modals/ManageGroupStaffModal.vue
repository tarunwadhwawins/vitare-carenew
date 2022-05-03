<template>
  <a-modal width="60%" :title="$t('staffGroups.manageStaff')">
    <a-form :model="searchStaffForm" layout="vertical" @finish="searchStaff">
      <a-row :gutter="24">

        <a-col :span="21">
          <div class="form-group">
            <a-form-item :label="$t('global.staff')" name="staff" :rules="[{required: true, message:$t('global.staff')+' '+$t('global.validation')}]">
              <a-input v-model:value="searchStaffForm.staff" size="large" :placeholder="$t('staffGroups.searchStaffPlaceholder')" />
            </a-form-item>
          </div>
        </a-col>

        <a-col :span="3">
          <div class="form-group">
            <div class="text-right mt-28">
              <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.search')}}</a-button>
            </div>
          </div>
        </a-col>
        
      </a-row>
    </a-form>

    <a-form :model="addStaffToGroupForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">

        <a-col :span="24" class="mt-25">
          <a-table :columns="columns" :data-source="searchGroupStaff" >
            <template #actions="{record}">
              <a-checkbox v-model:checked="checked[record.id]" @change="changeStatus($event, record.id)"></a-checkbox>
            </template>
          </a-table>
        </a-col>
        
        <a-col :span="24" v-if="searchGroupStaff && searchGroupStaff.length > 0">
          <div class="steps-action">
            <ModalButtons />
          </div>
        </a-col>

      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, reactive, ref } from "vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useStore } from 'vuex';
export default {
  components: {
    ModalButtons
  },
  props: {
    groupId: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const columns = [
      {
        title: "Select",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
      {
        title: "Name",
        dataIndex: "fullName",
      },
      {
        title: "Department",
        dataIndex: "designation",
      },
      // {
      //   title: "Tags",
      //   dataIndex: "tags",
      // },
    ];

    const searchStaffForm = reactive({
      staff: "",
    })

    const addStaffToGroupForm = reactive({
      staff: [],
    })

    const searchGroupStaff = computed(() => {
      return store.state.staffGroups.searchStaff
    })

    const groupStaffList = computed(() => {
      return store.state.staffGroups.groupStaffList
    })

    const createGroup = computed(() => {
      return store.state.staffGroups.createGroup
    })

    const searchStaff = () => {
      store.dispatch('searchStaff', searchStaffForm.staff)
    }

    var staffIds = []
    const changeStatus = (event, value) => {
      if(event.target.checked) {
        staffIds.push(value);
      }
      else {
        var index = staffIds.indexOf(value);
        if (index !== -1) {
          staffIds.splice(index, 1);
        }
      }
    }

    const submitForm = () => {
      const data = {
        id: props.groupId ? props.groupId : createGroup.value.id,
        data: {
          staff: staffIds
        }
      }
      store.dispatch('addStaffToGroup', data).then(() => {
        store.dispatch('groupsList')
        emit('closeModal')
      })
    }

    return {
      value: ref([]),
      checked: ref([]),
      columns,
      submitForm,
      searchStaffForm,
      addStaffToGroupForm,
      searchGroupStaff,
      searchStaff,
      groupStaffList,
      changeStatus,
    };
  },
};
</script>