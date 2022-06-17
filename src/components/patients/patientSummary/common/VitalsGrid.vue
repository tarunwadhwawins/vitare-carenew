<template>
  <a-col :sm="24" :xs="24" class="mb-24">
    <a-card :title="title">
      <DateFilter :Buttons="filterButtons" @clickButtons="showButton(deviceId)" :custom="false" :commit="commit" />

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
    filterButtons: {
      type: Object
    },
    commit: {
      type: String
    },
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()

    const showModal = () => {
      emit('showModal')
    }
    
    const bloodOxygenTimeline = store.getters.bloodOxygenTimeline
    const bloodGlucoseTimeline = store.getters.bloodGlucoseTimeline
    const bloodPressureTimeline = store.getters.bloodPressureTimeline

    onMounted(() => {
      if (bloodOxygenTimeline.value == null) {
        store.dispatch("timeLine", {
          id: 122,
          commit: "bloodOxygenTimeline"
        }).then(() => {
          apiCall(bloodOxygenTimeline.value, 100)
        })
      } else {
        console.log('timeLine', bloodOxygenTimeline.value)
        apiCall(bloodOxygenTimeline.value, 100)
      }

      if (bloodGlucoseTimeline.value == null) {
        store.dispatch("timeLine", {
          id: 122,
          commit: "bloodGlucoseTimeline"
        }).then(() => {
          apiCall(bloodGlucoseTimeline.value, 101)
        })
      } else {
        apiCall(bloodGlucoseTimeline.value, 101)
      }

      if (bloodPressureTimeline.value == null) {
        store.dispatch("timeLine", {
          id: 122,
          commit: "bloodPressureTimeline"
        }).then(() => {
          apiCall(bloodPressureTimeline.value, 99)
        })
      } else {
        apiCall(bloodPressureTimeline.value, 99)
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
      if(deviceId == 99) {
        apiCall(bloodPressureTimeline.value, deviceId)
      }
      if(deviceId == 100) {
        apiCall(bloodOxygenTimeline.value, deviceId)
      }
      if(deviceId == 101) {
        apiCall(bloodGlucoseTimeline.value, deviceId)
      }
    }

    return {
      showModal,
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