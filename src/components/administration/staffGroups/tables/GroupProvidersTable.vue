<template>
  <a-table :columns="columns" :data-source="groupProvidersList" >
    <template #actions="{record}">
      <a class="icons" @click="deleteGroupProvider(record.udid)"> <DeleteOutlined /></a>
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
    const groupProvidersList = computed(() => {
      return store.state.staffGroups.groupProvidersList
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

    const deleteGroupProvider = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGroupProvider', {
            groupUdid: props.groupId,
            providerUdid: id,
          }).then(() => {
            store.dispatch('groupProvidersList', props.groupId)
            if(groupProvidersList.value.length <= 1) {
              emit('closeModal')
            }
          })
        }
      })
    }

    return {
      columns,
      groupProvidersList,
      deleteGroupProvider,
    }
  }
}
</script>