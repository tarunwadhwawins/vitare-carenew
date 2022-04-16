<template>
  <a-row :span="24">
    <a-col :sm="24" :xs="24">
      <a-table rowKey="id" :columns="careTeamColumns" :data-source="patientStaff" :pagination="false">
        <template #actions="{record}">
          <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,298)">
            <template #title>
              <span>Edit</span>
            </template>
            <a class="icons" >
              <EditOutlined @click="editStaff(record.id);actionTrack(patientUdid,298,'patient')" />
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,319)">
            <template #title>
              <span>Delete</span>
            </template>
            <a class="icons">
              <DeleteOutlined @click="deletePatientCareCoordinator(record.id);actionTrack(patientUdid,319,'patient')" />
            </a>
          </a-tooltip>
        </template>
        <template #checkbox>
          <a-checkbox v-model:checked="checked"></a-checkbox>
        </template>
      </a-table>
    </a-col>
  </a-row>
  <AddCoordinatorsModal v-if="careCoordinatorsVisible" v-model:visible="careCoordinatorsVisible" @closeModal="handleOk" :staffType="staffType" :title="title" :isEditCareCoordinator="true"/>
</template>

<script>

import { computed, defineComponent, defineAsyncComponent, watchEffect, ref } from "vue";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal, actionTrack,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from '@/config/messages';

  export default defineComponent({
    props: {
      staffType: {
        type: Number
      },
    },
    components: {
      DeleteOutlined,
      EditOutlined,
      AddCoordinatorsModal: defineAsyncComponent(()=>import("@/components/modals/AddCoordinatorsModal")),
    },
    setup(props, { emit }) {
      const store = useStore();
      const route = useRoute();
      const patientUdid = route.params.udid;
      const careCoordinatorsVisible = ref(false);
      const title = props.staffType == 1 ? 'Edit Care Coordinator' : 'Edit Health Team'

      const careTeamColumns = [
        {
          title: "Care Coordinator",
          dataIndex: "staff",
          key: "staff",
        },
        {
          title: "Is Primary",
          dataIndex: "isPrimary",
          key: "isPrimary",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          slots: {
            customRender: "actions"
          },
        },
      ]

      watchEffect(() => {
        console.log('props.staffType', props.staffType)
        store.dispatch('patientCareCoordinatorsList', {
          patientUdid: patientUdid,
          type: props.staffType
        })
      })

      const careTeamList = computed(() => {
        return store.state.careTeam.careTeamList
      })

      const physiciansList = computed(() => {
        return store.state.careTeam.physiciansList
      })

      const deletePatientCareCoordinator = (patientStaffUdid) => {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
              store.dispatch('deletePatientCareCoordinator', { patientUdid: patientUdid, patientStaffUdid: patientStaffUdid }).then(() => {
              store.dispatch('patientCareCoordinatorsList', {
                patientUdid: patientUdid,
                type: props.staffType
              })
              const newPatientStaff = props.staffType == 0 ? careTeamList.value : physiciansList.value
              if(newPatientStaff.length <= 1) {
                emit("closeModal", {
                  modal: 'deleteCareTeam',
                  value: false
                });
              }
            })
          }
        })
      }

      const editStaff = (patientStaffUdid) => {
        store.dispatch('patientCareCoordinatorDetails', {
          patientUdid: route.params.id,
          patientStaffUdid: patientStaffUdid,
        }).then(() => {
          careCoordinatorsVisible.value = true;
        })
      }

      const handleOk = ({modal, value}) => {
        careCoordinatorsVisible.value = modal == 'addCareTeam' ? value : false;
      }

      const patientStaff = props.staffType == 0 ? careTeamList : physiciansList

      return {
        screensPermissions: store.getters.screensPermissions,
        arrayToObjact,
        actionTrack,
        patientUdid,
        careTeamColumns,
        patientStaff,
        deletePatientCareCoordinator,
        editStaff,
        careCoordinatorsVisible,
        title,
        handleOk,
      };
    },
  });
</script>

<style>
  th.actions,
  td.actions {
    text-align: center !important;
  }
</style>