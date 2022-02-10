<template>
<a-form :model="roles" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addRole" @finishFailed="roleDataFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <label>{{$t('careCoordinator.roles.role')}}</label>
                <a-select v-if="staffs.roles!=null" v-model:value="roles.roles" mode="multiple" size="large" placeholder="Select Role" style="width: 100%" :options="staffs.roles.map((item) => ({ label: item.name?item.name:'', value: item.id }))" @change="handleChange" />
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
</a-form>
<a-row :gutter="24">
    <a-col :span="24">
        <a-table :pagination="false" :columns="rolecolumns" :data-source="roledata" :scroll="{ x: 900 }">
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
        <Loader />
    </a-col>
</a-row>
</template>

<script>
import { defineComponent, reactive, ref, computed, watchEffect } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader";
export default defineComponent({
  components: {
    DeleteOutlined,
    Loader,
  },
  setup() {
    const store = useStore();
    const roles = reactive({
      roles: [],
    });

    function addRole() {
      store.dispatch("addStaffRole", {
        id: staffs.value.addStaff.id,
        data: roles,
      });
      setTimeout(() => {
        store.dispatch("roleList", staffs.value.addStaff.id);
      }, 2000);
    }

    function deleteRole(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteRole", {
            id: staffs.value.addStaff.id,
            roleID: id,
          });
          setTimeout(() => {
            store.dispatch("roleList",staffs.value.addStaff.id);
          }, 2000);
        }
      });
    }
    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    watchEffect(() => {
      store.dispatch("roles");
    });
    return {
      staffs,
      deleteRole,
      addRole,
      size: ref("large"),
      roles,
    };
  },
});
</script>
