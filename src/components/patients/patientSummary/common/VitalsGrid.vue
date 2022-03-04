<template>
  <a-col :sm="12" :xs="24" class="mb-24">
    <a-card :title="title">
      <a-tabs v-model:activeKey="activeKey1">
        <a-tab-pane key="1" tab="Table" force-render>
          <VitalsTable :columns="tableColumns" :data="tableData" :className="className" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Graph">
          <ApexChart type="area" height="210" :options="chartOptions" :series="chartSeries" />
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
export default {
  components: {
    PlusOutlined,
    VitalsTable,
    ApexChart,
  },
  props: {
    title: {
      type: String
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
    const showModal = () => {
      emit('showModal')
    }

    return {
      showModal
    }
  }
}
</script>