<template>
<a-form :model="provider" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addProvider" @finishFailed="roleDataFailed">
    <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <label>{{$t('global.provider')}}</label>
                <a-select v-if="staffs.providers!=null" v-model:value="provider.provider" mode="multiple" size="large" placeholder="Select Tags" style="width: 100%" :options="staffs.providers.map((item) => ({ label: item.name, value: item.id }))" @change="handleChange" />
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
        <a-table  rowKey="id" :pagination="false" :columns="columns4" :data-source="data4" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom" @click="deleteProvider(text.record.id)">
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
    const provider = reactive({
      provider: "",
    });

    function addProvider() {
      store.dispatch("addProvider", {
        id: staffs.value.addStaff.id,
        data: provider,
      });
    }

    function deleteProvider(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteProvider", {
            id: staffs.value.addStaff.id,
            providerID: id,
          });
          setTimeout(() => {
            store.dispatch("providerList", staffs.value.addStaff.id);
          }, 2000);
        }
      });
    }

    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    watchEffect(() => {
      store.dispatch("providers");
    });
    return {
      staffs,
      deleteProvider,
      addProvider,
      size: ref("large"),
    };
  },
});
</script>
