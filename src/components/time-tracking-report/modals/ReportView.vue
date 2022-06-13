<template>
<a-modal max-width="1140px" width="70%" :title="modalTitle" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24" class="row" v-if="devicesList?.entity == 'device'">
        <a-col :sm="24" :xs="24">
            <a-table rowKey="id" :columns="devicesColumns" :data-source="devicesList?.device" :pagination="false" @change="onChange">
            </a-table>
            <TableLoader />
        </a-col>
    </a-row>
    <a-row :gutter="24" v-else>
       <a-col :sm="24" :xs="24" class="mb-24" v-if="vitals.bloodPressure?.length>0">
            <a-card :title="`Total Compliance Days - ${vitals.takeLength.length}`">
                <VitalsTable :slectVitals="slectVitals" :columns="vitals.bloodPressureColumns" :data="vitals.bloodPressure" />
            </a-card>
        </a-col>
        <a-col :sm="24" :xs="24" class="mb-24" v-if="vitals.bloodOxygen?.length>0">
            <a-card :title="`Total Compliance Days - ${vitals.takeLength.length}`">
                <VitalsTable :slectVitals="slectVitals" :columns="vitals.bloodOxygenColumns" :data="vitals.bloodOxygen" />
            </a-card>
        </a-col>
        <a-col :sm="24" :xs="24" class="mb-24" v-if="vitals.bloodGlucose?.length>0">
            <a-card :title="`Total Compliance Days - ${vitals.takeLength.length}`">
                <VitalsTable :slectVitals="slectVitals" :columns="vitals.bloodGlucoseColumns" :data="vitals.bloodGlucose" />
            </a-card>
        </a-col>

        <TableLoader />
    </a-row>
</a-modal>
</template>

<script>
import { computed, defineComponent, watchEffect, ref } from "vue";
import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import {
  actionTrack,
  arrayToObjact,
} from "@/commonMethods/commonMethod";
import { useRoute } from "vue-router";
import VitalsTable from "../data-table/VitalsTable";
export default defineComponent({
  components: {
    TableLoader,
    VitalsTable,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const selectVitalsData = ref()
    const modalTitle = ref()

    const devicesList = computed(() => {
      return store.state.reports.reportDetailList;
    });
    watchEffect(() => {
      if (devicesList.value) {
        if (devicesList.value.device.length > 0) {
          modalTitle.value =
            devicesList.value.device.length > 0 ? "Device Details" : "Details";
        } else {
          if (devicesList.value.vital[0].deviceType == "Blood Pressure") {
            modalTitle.value = "Vital Detail - Blood Pressure";
          } else if (devicesList.value.vital[0].deviceType == "Oximeter") {
            modalTitle.value = "Vital Detail - Blood Oxygen Saturation";
          } else if (devicesList.value.vital[0].deviceType == "Glucose") {
            modalTitle.value = "Vital Detail - Blood Glucose";
          }
        }
      }
    })
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
      {
        title: "Issue Date",
        dataIndex: "issueDate",
      },
      {
        title: "Setup Date",
        dataIndex: "setupDate",
      },
      
    ]

    const vitals = computed(() => {
      return store.state.reports;
    })

    function closeModal() {
      store.state.reports.bloodPressure = null
      store.state.reports.bloodOxygen = null
      store.state.reports.bloodGlucose = null
      store.state.reports.reportDetailList = null
      store.state.reports.takeDateTime = null
      store.state.reports.takeLength = null
      modalTitle.value = null
    }

    
    const slectVitals = {
      onChange: (selectedRowKeys) => {
        selectVitalsData.value= selectedRowKeys;
      },
    };

    return {
      selectVitalsData,
      slectVitals,
      closeModal,
      vitals,
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      actionTrack,
      paramsId: route.params.udid,
      devicesColumns,
      devicesList,
      modalTitle,
    };
  },
});
</script>

<style>
</style>
