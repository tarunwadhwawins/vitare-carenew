<template>
<a-table  rowKey="id" :pagination="false" :columns="staffs.staffContactColms" :data-source="staffs.staffContactList" >
    <template #action="text" v-if="arrayToObjact(screensPermissions,49)">
        <a-tooltip placement="bottom" @click="deleteContact(text.record.id)">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
</a-table>
</template>

<script>
import { computed } from "vue";
import {
  DeleteOutlined,
  // EditOutlined,
  //   PlusOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
export default {
  components: {
    DeleteOutlined,
  },
  props: {
    Id: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRoute();
    function deleteContact(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteContact", {
            id: props.Id ? props.Id : router.params.udid,
            contactId: id,
          });
          setTimeout(() => {
            store.dispatch(
              "staffContactList",
              props.Id ? props.Id : router.params.udid
            );
          }, 2000);
        }
      });
    }
    const staffs = computed(() => {
      return store.state.careCoordinator;
    });
    
    return {
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      staffs,
      deleteContact,
    };
  },
};
</script>
