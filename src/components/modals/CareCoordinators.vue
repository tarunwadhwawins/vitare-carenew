<template>
  <a-modal width="1000px" title="Add Care Coordinators" centered>
    <a-form ref="formRef" :model="addCareTeamForm" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="20" :xs="24">
          <a-form-item :label="$t('tasks.tasksModal.staff')" name="staff" :rules="[{ required: true, message: $t('tasks.tasksModal.staff')+' '+$t('global.validation') }]">
            <a-select v-model:value="addCareTeamForm.staff" style="width: 100%" size="large">
              <a-select-option value="" hidden>Choose Staff</a-select-option>
              <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{ staff.fullName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :sm="4" :xs="24">
          <a-button class="modal-button" size="large" html-type="submit"> Add New </a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-row :span="24">
      <a-col :sm="24" :xs="24">
        <a-table rowKey="id" :columns="careTeamColumns" :data-source="careTeamList" :pagination="false" @change="onChange">
          <template #actions="{record}">
            <!-- <a-tooltip placement="bottom">
              <template #title>
                <span>View</span>
              </template>
              <a class="icons"><EyeOutlined @click="viewStaff(record.id)" /></a>
            </a-tooltip> -->
            <!-- <a-tooltip placement="bottom">
              <template #title>
                <span>Edit</span>
              </template>
              <a class="icons"><EditOutlined @click="viewStaff(record.id)" /></a>
            </a-tooltip> -->
            <a-tooltip placement="bottom">
              <template #title>
                <span>Delete</span>
              </template>
              <a class="icons"> <DeleteOutlined @click="deleteStaff(record.id)" /></a>
            </a-tooltip>
          </template>
          <template #checkbox>
            <a-checkbox v-model:checked="checked"></a-checkbox>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { computed, defineComponent, reactive, watchEffect } from "vue";
import {
  DeleteOutlined,
  // EditOutlined,
  // EyeOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    DeleteOutlined,
    // EditOutlined,
    // EyeOutlined,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const patientId = route.params.udid;
    const careTeamColumns = [
      {
        title: "Staff",
        dataIndex: "staff",
        className: "staffCol",
        key: "staff",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        className: "actions",
        slots: {
          customRender: "actions"
        },
      },
    ]

    const careTeamList = [{
      id: '1',
      staff: 'Steve Smith',
      actions: ''
    }]
    
    watchEffect(() => {
      store.dispatch('careTeamList', patientId);
    })
    
    const staffList = computed(() => {
      return store.state.common.staffList
    })
    
    // const careTeamList = computed(() => {
    //   return store.state.patients.careTeamList
    // })

    const addCareTeamForm = reactive({
      staff: ''
    })
    
    const submitForm = () => {
      store.dispatch('addCareTeam', {id: patientId, data: addCareTeamForm}).then(() => {
        store.dispatch('careTeamList', patientId)
      })
    }
    const viewStaff = (value) => {
      console.log('viewStaff', value);
    }
    const deleteStaff = (value) => {
      console.log('deleteStaff', value);
    }

    return {
      careTeamColumns,
      careTeamList,
      viewStaff,
      deleteStaff,
      addCareTeamForm,
      submitForm,
      staffList,
    };
  },
});
</script>

<style scoped>
  .modal-button {
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
  }
  td.staffCol {
    width: 70%;
  }
</style>