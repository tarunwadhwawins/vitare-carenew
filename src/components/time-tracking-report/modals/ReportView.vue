<template>
<a-modal max-width="1140px" width="70%" :title="`${devicesList?.entity.charAt(0).toUpperCase() + devicesList?.entity.slice(1)}`+' '+`Details`" centered :footer="false" :maskClosable="false">
    <a-row :gutter="24" class="row" v-if="devicesList?.entity == 'device'">
        <a-col :sm="24" :xs="24">
            <a-table rowKey="id" :columns="devicesColumns" :data-source="devicesList?.device" :pagination="false" @change="onChange">
            </a-table>
            <TableLoader />
        </a-col>
    </a-row>
    <a-row v-else>
        <PatientVitalsGrid />
    <Loader />
    </a-row>
</a-modal>
</template>

<script>
import { computed, defineComponent, watchEffect } from "vue";
import TableLoader from "@/components/loader/TableLoader";
import // DeleteOutlined
"@ant-design/icons-vue";
import { useStore } from "vuex";
import {
  warningSwal,
  actionTrack,
  arrayToObjact,
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import { useRoute } from "vue-router";
import PatientVitalsGrid from "@/components/patients/patientSummary/views/PatientVitalsGrid";
import Loader from "@/components/loader/Loader";
export default defineComponent({
  components: {
    // DeleteOutlined,
    TableLoader,
    PatientVitalsGrid,
    Loader
  },

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    watchEffect(() => {});
    const devicesList = computed(() => {
      return store.state.reports.reportDetailList;
    });
    const devicesColumns = [
      {
        title: "Home Unit Type",
        dataIndex: "deviceType",
        sorter: true,
      },
      {
        title: "Model No",
        dataIndex: "modelNumber",
        sorter: true,
      },
      {
        title: "Serial No",
        dataIndex: "serialNumber",
        sorter: true,
      },
      {
        title: "MAC Address",
        dataIndex: "macAddress",
      },
    //   {
    //     title: "Action",
    //     dataIndex: "action",
    //     slots: {
    //       customRender: "action",
    //     },
    //   },
    ];

    const deleteDevice = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store
            .dispatch("deleteDevice", {
              id: id,
              deviceId: id,
            })
            .then(() => {
              if (devicesList.value.length <= 1) {
                emit("closeModal", {
                  modal: "devicesListing",
                  value: false,
                });
              }
              store.dispatch("devices", route.params.udid);
              if (route.name == "PatientSummary") {
                store.dispatch("latestDevice", route.params.udid);
                store.dispatch("patientTimeline", {
                  id: route.params.udid,
                  type: "",
                });
              }
            });
        }
      });
    };

    return {
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      actionTrack,
      paramsId: route.params.udid,
      devicesColumns,
      devicesList,
      deleteDevice,
    };
  },
});
</script>

<style>
</style>
