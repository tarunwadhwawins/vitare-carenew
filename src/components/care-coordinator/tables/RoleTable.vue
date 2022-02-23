
<template>
<a-table :pagination="false" :columns="staffs.roleListColms" :data-source="staffs.roleList" :scroll="{ x: 900 }">
    <template #action="text">
        <a-tooltip placement="bottom" @click="deleteRole(text.record.id)">
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
import { warningSwal } from "@/commonMethods/commonMethod";
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
    console.log("==", router.params.udid);

    function deleteRole(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteStaffRole", {
            id: props.Id ? props.Id : router.params.udid,
            roleID: id,
          });
          setTimeout(() => {
            store.dispatch(
              "roleList",
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
      staffs,
      deleteRole,
    };
  },
};
</script>
