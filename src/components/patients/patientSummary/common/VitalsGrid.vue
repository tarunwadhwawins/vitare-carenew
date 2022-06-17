<template>
  <a-col :sm="24" :xs="24" class="mb-24">
    <a-card :title="title">
      <DateFilter :Buttons="filterButtons" @clickButtons="showButton(deviceId)" :custom="false" commit="patientVitalsTimeline" v-if="widgetsPermissions.length > 0"/>

      <a-tabs v-model:activeKey="activeKey1">
        <a-tab-pane key="1" tab="Table" force-render>
          <VitalsTable :columns="tableColumns" :data="tableData" :className="className" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Graph">
          <ApexChart type="area" height="350" :options="chartOptions" :series="chartSeries" />
        </a-tab-pane>
      </a-tabs>
      <template #extra>
        <a>
          <a-button class="btn blackBtn" @click="showModal">
            <PlusOutlined/>
          </a-button>
        </a>
      </template>
    </a-card>
  </a-col>
</template>

<script>
import {
  PlusOutlined,
} from "@ant-design/icons-vue";
import VitalsTable from "@/components/patients/patientSummary/common/VitalsTable";
import ApexChart from "@/components/common/charts/ApexChart";
import DateFilter from "@/components/common/DateFilter"
import { onMounted } from 'vue-demi';
import { useStore } from 'vuex';
import { dayWeekMonthdate } from '../../../../commonMethods/commonMethod';
import { useRoute } from 'vue-router';

export default {
  components: {
    PlusOutlined,
    VitalsTable,
    ApexChart,
    DateFilter,
  },
  props: {
    title: {
      type: String
    },
    deviceId: {
      type: Number
    },
    activeKey: {
      type: String
    },
    className: {
      type: String
    },
    tableColumns: {
      type: Array
    },
    tableData: {
      type: Array
    },
    chartOptions: {
      type: Array
    },
    chartSeries: {
      type: Array
    },
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()

    const showModal = () => {
      emit('showModal')
    }
    const patientVitalsTimeline = store.getters.patientVitalsTimeline

    onMounted(() => {
      if (patientVitalsTimeline.value == null) {
        store.dispatch("timeLine", {
          id: 122,
          commit: 'patientVitalsTimeline'
        }).then(() => {
          apiCall(patientVitalsTimeline.value)
        })
      } else {
        apiCall(patientVitalsTimeline.value)
      }
    })

    function apiCall(data, deviceId) {
      let dateFormat = dayWeekMonthdate(data)
      let dateFilter = dateFormat ? "&fromDate=" + dateFormat.fromDate + "&toDate=" + dateFormat.toDate : ''
      console.log('dateFormat', dateFilter)
      if(deviceId) {
        store.dispatch("patientVitals", {
          patientId: route.params.udid,
          deviceType: deviceId,
          filter: dateFilter,
        });
      }
      else {
        store.dispatch("patientVitals", {
          patientId: route.params.udid,
          deviceType: 99,
          filter: dateFilter,
        });
        store.dispatch("patientVitals", {
          patientId: route.params.udid,
          deviceType: 100,
          filter: dateFilter,
        });
        store.dispatch("patientVitals", {
          patientId: route.params.udid,
          deviceType: 101,
          filter: dateFilter,
        });
      }
    }

    function showButton(deviceId) {
      apiCall(patientVitalsTimeline.value, deviceId)
    }

    return {
      showModal,
      filterButtons: store.getters.patientVitalsTimeline,
      widgetsPermissions: store.getters.widgetsPermissions,
      showButton,
    }
  }
}
</script>

<style>
.active {
  background-color: #777;
  color: #fff;
}
</style>