<template>
  <a-table :columns="columns" :data-source="groupProgramsList" >
    <template #actions="{record}">
      <a class="icons" @click="deleteGroupProgram(record.udid)"> <DeleteOutlined /></a>
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
    const groupProgramsList = computed(() => {
      return store.state.staffGroups.groupProgramsList
    })

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
    ];

    const deleteGroupProgram = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGroupProgram', {
            groupUdid: props.groupId,
            programUdid: id,
          }).then(() => {
            store.dispatch('groupProgramsList', props.groupId)
            if(groupProgramsList.value.length <= 1) {
              emit('closeModal')
            }
          })
        }
      })
    }

    return {
      columns,
      groupProgramsList,
      deleteGroupProgram,
    }
  }
}
</script>