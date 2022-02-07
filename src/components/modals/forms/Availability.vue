<template>
<a-form :model="availability" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addAvailability" @finishFailed="availabilityDataFailed">
    <a-row :gutter="24">
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.startTime')" name="startTime" :rules="[{ required: true, message: $t('global.startTime')+' '+$t('global.validation') }]">
                    <a-time-picker v-model:value="availability.startTime" format="HH:mm" value-format="HH:mm" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.startTime?errorMsg.startTime[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.endTime')" name="endTime" :rules="[{ required: true, message: $t('global.endTime')+' '+$t('global.validation') }]">
                    <a-time-picker v-model:value="availability.endTime" format="HH:mm" value-format="HH:mm" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.endTime?errorMsg.endTime[0]:''" />
                </a-form-item>
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
        <a-table :pagination="false" :columns="staffs.availabilityListColms" :data-source="staffs.availabilityList" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom" @click="deleteAvailability(text.record.id)">
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
import { defineComponent, reactive, ref, computed } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader";
export default defineComponent({
  components: {
    // EditOutlined,
    DeleteOutlined,
    Loader,
  },
  setup() {
    const store = useStore();
    const availability = reactive({
      startTime: "",
      endTime: "",
    });

    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    function addAvailability() {
      store.dispatch("addAvailability", {
        id: staffs.value.addStaff.id,
        data: availability,
      });
      setTimeout(() => {
        store.dispatch("availabilityList", staffs.value.addStaff.id);
      }, 2000);
    }

    function deleteAvailability(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteAvailability", {
            id: staffs.value.addStaff.id,
            availabilityID: id,
          });
          setTimeout(() => {
            store.dispatch("availabilityList", 21);
          }, 2000);
        }
      });
    }

    return {
      deleteAvailability,
      staffs,
      addAvailability,
      availability,
      size: ref("large"),
    };
  },
});
</script>
