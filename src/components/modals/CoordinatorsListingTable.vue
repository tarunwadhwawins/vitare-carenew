<template>
  <a-row :span="24">
    <a-col :sm="24" :xs="24">
      <a-table rowKey="id" :columns="careTeamColumns" :data-source="patientStaff" :pagination="false">
        <template #actions="{record}">
          <a-tooltip placement="bottom">
            <template #title>
              <span>Delete</span>
            </template>
            <a class="icons">
              <DeleteOutlined @click="deleteStaff(record.id);actionTrack(patientUdid,319,'patient')" />
            </a>
          </a-tooltip>
        </template>
        <template #checkbox>
          <a-checkbox v-model:checked="checked"></a-checkbox>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>

import { computed, defineComponent, watchEffect } from "vue";
import {
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal, actionTrack } from "@/commonMethods/commonMethod";
import { messages } from '@/config/messages';

  export default defineComponent({
    props: {
      staffType: {
        type: Number
      },
    },
    components: {
      DeleteOutlined,
    },
    setup(props) {
      const store = useStore();
      const route = useRoute();
      const patientUdid = route.params.udid;
      const careTeamColumns = [
        {
          title: "Staff",
          dataIndex: "staff",
          key: "staff",
        },
        /* {
          title: "Type",
          dataIndex: "type",
          key: "type",
        }, */
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
        store.dispatch('careTeamList', {
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

      const deleteStaff = (patientStaffUdid) => {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
              store.dispatch('deleteStaff', { patientUdid: patientUdid, patientStaffUdid: patientStaffUdid }).then(() => {
              store.dispatch('careTeamList', {
                patientUdid: patientUdid,
                type: props.staffType
              })
            })
          }
        })
      }

      const patientStaff = props.staffType == 0 ? careTeamList : physiciansList

      return {
        actionTrack,
        patientUdid,
        careTeamColumns,
        patientStaff,
        deleteStaff,
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