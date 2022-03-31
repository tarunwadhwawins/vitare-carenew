<template>
  <a-modal width="1000px" :title="$t('global.addCareTeam')" @cancel="onCloseModal()">
    <a-form ref="formRef" :model="addCareTeamForm" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :sm="20" :xs="24">
          <a-form-item :label="$t('tasks.tasksModal.staff')" name="staff"
            :rules="[{ required: true, message: $t('tasks.tasksModal.staff')+' '+$t('global.validation') }]">
            <a-select @change="changedValue" ref="select" v-model:value="addCareTeamForm.staff" style="width: 100%" size="large">
              <a-select-option value="" hidden>Select Staff</a-select-option>
              <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{staff.fullName}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :sm="4" :xs="24">
          <a-button class="add-button" size="large" html-type="submit">Add</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-row :span="24">
      <a-col :sm="24" :xs="24">
        <a-table  rowKey="id"  :columns="careTeamColumns" :data-source="careTeamList" :pagination="false"
          @change="onChange">

          <template #actions="{record}">
            <!-- <a-tooltip placement="bottom">
              <template #title>
                <span>View</span>
              </template>
              <router-link class="icons" :to="{ name: 'CoordinatorSummary', params: { udid: record.id  }}"><EyeOutlined/></router-link>
            </a-tooltip> -->
            <a-tooltip placement="bottom">
              <template #title>
                <span>Delete</span>
              </template>
              <a class="icons">
                <DeleteOutlined @click="deleteStaff(record.id);actionTrack(paramsId,319,'patient')" />
              </a>
            </a-tooltip>
          </template>
          <template #checkbox>
            <a-checkbox v-model:checked="checked"></a-checkbox>
          </template>
        </a-table>
        <Loader />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>

import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import {
  DeleteOutlined,
  // EyeOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Loader from "@/components/loader/Loader";
import {warningSwal,actionTrack} from "@/commonMethods/commonMethod";
import { messages } from '@/config/messages';
  export default defineComponent({
    components: {
      DeleteOutlined,
      // EyeOutlined,
      Loader,
    },
    setup(props, { emit }) {
      const store = useStore();
      const route = useRoute();
      const patientUdid = route.params.udid;
      const isValueChanged = ref(false);
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

      watchEffect(() => {
        store.dispatch('careTeamList', patientUdid);
      })

      const staffList = computed(() => {
        return store.state.common.allStaffList
      })

      const careTeamList = computed(() => {
        return store.state.careTeam.careTeamList
      })

      const addCareTeamForm = reactive({
        staff: ""
      })

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
          store.dispatch('careTeamList', patientUdid);
          formRef.value.resetFields();
          Object.assign(addCareTeamForm, form);
        })
      }

      const deleteStaff = (patientStaffUdid) => {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.dispatch('deleteStaff', { patientUdid: patientUdid, patientStaffUdid: patientStaffUdid }).then(() => {
              store.dispatch('careTeamList', patientUdid)
            })
          }
        })
      }

      return {
        actionTrack,
        paramsId:route.params.udid,
        careTeamColumns,
        careTeamList,
        deleteStaff,
        addCareTeamForm,
        submitForm,
        formRef,
        staffList,
        isValueChanged,
        changedValue,
        onCloseModal,
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

  th.staffCol {
    width: 70% !important;
  }

  th.actions,
  td.actions {
    text-align: center !important;
  }
</style>