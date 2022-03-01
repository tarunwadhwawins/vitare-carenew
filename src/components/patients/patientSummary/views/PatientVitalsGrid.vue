<template>
  <a-row :gutter="24">
  
    <a-col :sm="12" :xs="24" class="mb-24">
      <a-card title="Blood Pressure">
        <a-tabs v-model:activeKey="activeKey1">
          <a-tab-pane key="1" tab="Table" force-render>
            <Table :columns="vitalColumns" :data="bloodPressure" />
          </a-tab-pane>
          <a-tab-pane key="4" tab="Graph">
            <ApexChart type="area" height="210" :options="chartOptions" :series="chartSeries" />
          </a-tab-pane>
        </a-tabs>
        <template #extra>
          <a>
            <a-button class="btn blackBtn" @click="showAddBPModal">
              <PlusOutlined/>
            </a-button>
          </a>
        </template>
      </a-card>
    </a-col>
    
    <a-col :sm="12" :xs="24" class="mb-24">
      <a-card title="Blood Glucose">
        <a-tabs v-model:activeKey="activeKey2">
          <a-tab-pane key="2" tab="Table" force-render>
            <Table :columns="vitalColumns" :data="bloodGlucose" />
          </a-tab-pane>
          <a-tab-pane key="5" tab="Graph">
            <ApexChart type="area" height="210" :options="chartOptions" :series="chartSeries" />
          </a-tab-pane>
        </a-tabs>
        <template #extra>
          <a>
            <a-button class="btn blackBtn" @click="showBloodGlucoseModal">
              <PlusOutlined/>
            </a-button>
          </a>
        </template>
      </a-card>
    </a-col>
    
    <a-col :sm="12" :xs="24" class="mb-24">
      <a-card title="Blood Oxygen Saturation">
        <a-tabs v-model:activeKey="activeKey3">
          <a-tab-pane key="3" tab="Table" force-render>
            <Table :columns="vitalColumns" :data="bloodOxygen" />
          </a-tab-pane>
          <a-tab-pane key="6" tab="Graph">
            <ApexChart type="area" height="210" :options="chartOptions" :series="chartSeries" />
          </a-tab-pane>
        </a-tabs>
        <template #extra>
          <a>
            <a-button class="btn blackBtn" @click="showBloodOxygenModal">
              <PlusOutlined/>
            </a-button>
          </a>
        </template>
      </a-card>
    </a-col>

  </a-row>
  <AddVitals v-model:visible="visibleAddVitals" @ok="handleOk" />
  <AddPulse v-model:visible="visibleAddPulse" @ok="handleOk" />
  <BloodGlucose v-model:visible="visibleBloodGlucose" @ok="handleOk" />
  <BloodOxygen v-model:visible="visibleBloodOxygen" @ok="handleOk" />
</template>

<script>
import {
  PlusOutlined,
} from "@ant-design/icons-vue";
import { computed, reactive, ref, watchEffect } from 'vue-demi';
import AddVitals from "@/components/modals/AddVitals";
import AddPulse from "@/components/modals/AddPulse";
import BloodGlucose from "@/components/modals/BloodGlucose";
import BloodOxygen from "@/components/modals/BloodOxygen";
import Table from "@/components/patients/patientSummary/views/table/Table";
import ApexChart from "@/components/common/charts/ApexChart";
import { useStore } from 'vuex';
export default {
  components: {
    PlusOutlined,
    AddVitals,
    AddPulse,
    BloodGlucose,
    BloodOxygen,
    Table,
    ApexChart,
  },
  props: {
    patientId: {
      type: Number
    },
  },
  setup(props) {
    const store = useStore();
    const idPatient = reactive(props.patientId);
    const visibleAddVitals = ref(false);
    const visibleAddPulse = ref(false);
    const visibleBloodGlucose = ref(false);
    const visibleBloodOxygen = ref(false);

    watchEffect(() => {
      store.dispatch('patientVital', {patientId: idPatient, deviceType: 99});
      store.dispatch('patientVital', {patientId: idPatient, deviceType: 100});
      store.dispatch('patientVital', {patientId: idPatient, deviceType: 101});
    })

    const bloodPressure = computed(() => {
      return store.state.patients.bloodPressure
    })

    const bloodGlucose = computed(() => {
      return store.state.patients.bloodGlucose
    })

    const bloodOxygen = computed(() => {
      return store.state.patients.bloodOxygen
    })

    const showAddBPModal = () => {
      visibleAddVitals.value = true;
    };
    const showAddPulseModal = () => {
      visibleAddPulse.value = true;
    };
    const showBloodGlucoseModal = () => {
      visibleBloodGlucose.value = true;
    };
    const showBloodOxygenModal = () => {
      visibleBloodOxygen.value = true;
    };

    const vitalColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        slots: {
          customRender: "value",
        },
      },
    ];
    
    const chartOptions = {
      chart: {
        height: 210,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };
    const chartSeries = [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ];

    return {
      showAddBPModal,
      showAddPulseModal,
      showBloodGlucoseModal,
      showBloodOxygenModal,
      visibleAddVitals,
      visibleAddPulse,
      visibleBloodGlucose,
      visibleBloodOxygen,
      activeKey1: ref("1"),
      activeKey2: ref("2"),
      activeKey3: ref("3"),
      vitalColumns,
      chartOptions,
      chartSeries,
      bloodPressure,
      bloodGlucose,
      bloodOxygen,
    }
  }
}
</script>