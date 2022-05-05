<template>
  <a-table :columns="columns" :data-source="groupStaffList" >
    <template #actions="{record}">
      <a class="icons" @click="deleteGroupStaff(record.udid)"> <DeleteOutlined /></a>
    </template>
  </a-table>
</template>

<script>
import { computed } from "vue";
import {
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useStore } from 'vuex';
import {
  warningSwal,
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";

export default {
  components: {
    DeleteOutlined,
  },
  props: {
    groupId: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const groupStaffList = computed(() => {
      return store.state.staffGroups.groupStaffList
    })

    const columns = [
      {
        title: "Name",
        dataIndex: "fullName",
      },
      {
        title: "Department",
        dataIndex: "department",
      },
      {
        title: "Tag",
        dataIndex: "tag",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
    ];

    const deleteGroupStaff = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGroupStaff', {
            groupUdid: props.groupId,
            staffUdid: id,
          }).then(() => {
            store.dispatch('groupStaffList', props.groupId)
            if(groupStaffList.value.length <= 1) {
              emit('closeModal')
            }
          })
        }
      })
    }

    return {
      columns,
      groupStaffList,
      deleteGroupStaff,
    }
  }
}
</script>