<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <PatientInfoTop :patientDetails="patientDetails"/>
      </a-col>
    </a-row>
    <div class="patientsVitals">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24" class="mb-24">
          <a-card title="Blood Pressure">
            <a-tabs v-model:activeKey="activeKey1">
              <a-tab-pane key="8" tab="Table" force-render>
                <a-table  rowKey="id" :columns="columns4" :data-source="data4" :pagination="false" @change="onChange" >
                  <template #value="text">
                    <span class="dangerValue">{{ text.text }}</span>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="7" tab="Graph">
                <apexchart type="area" height="210" :options="chartOptions" :series="chartSeries"></apexchart>
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
          <a-card title="Pulse">
            <a-tabs v-model:activeKey="activeKey2">
              <a-tab-pane key="10" tab="Table" force-render>
                <a-table  rowKey="id" :columns="columns5" :data-source="data5" :pagination="false" @change="onChange" />
              </a-tab-pane>
              <a-tab-pane key="9" tab="Graph">
                <apexchart type="area" height="210" :options="chartOptions" :series="chartSeries"></apexchart>
              </a-tab-pane>
            </a-tabs>
            <template #extra>
              <a>
                <a-button class="btn blackBtn" @click="showAddPulseModal">
                  <PlusOutlined/>
                </a-button>
              </a>
            </template>
          </a-card>
        </a-col>
        <a-col :sm="12" :xs="24" class="mb-24">
          <a-card title="Blood Glucose">
            <a-tabs v-model:activeKey="activeKey3">
              <a-tab-pane key="12" tab="Table" force-render>
                <a-table  rowKey="id" :columns="columns6" :data-source="data6" :pagination="false" @change="onChange"/>
              </a-tab-pane>
              <a-tab-pane key="11" tab="Graph">
                <apexchart type="area" height="210" :options="chartOptions" :series="chartSeries"></apexchart>
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
            <a-tabs v-model:activeKey="activeKey4">
              <a-tab-pane key="14" tab="Table" force-render>
                <a-table  rowKey="id" :columns="columns6" :data-source="data6" :pagination="false" @change="onChange"/>
              </a-tab-pane>
              <a-tab-pane key="13" tab="Graph">
                <apexchart type="area" height="210" :options="chartOptions" :series="chartSeries" />
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
    </div>
  </div>
  <AddVitals v-model:visible="visibleAddVitals" @ok="handleOk" />
  <AddPulse v-model:visible="visibleAddPulse" @ok="handleOk" />
  <BloodGlucose v-model:visible="visibleBloodGlucose" @ok="handleOk" />
  <BloodOxygen v-model:visible="visibleBloodOxygen" @ok="handleOk" />
</template>

<script>
import {
  PlusOutlined,
} from "@ant-design/icons-vue";
import { ref } from 'vue-demi';
import AddVitals from "@/components/modals/AddVitals";
import AddPulse from "@/components/modals/AddPulse";
import BloodGlucose from "@/components/modals/BloodGlucose";
import BloodOxygen from "@/components/modals/BloodOxygen";
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
export default {
  components: {
    PlusOutlined,
    AddVitals,
    AddPulse,
    BloodGlucose,
    BloodOxygen,
    PatientInfoTop,
  },
  props: {
    patientDetails:{
      type: Array
    }
  },
  setup() {
    const visibleAddVitals = ref(false);
    const visibleAddPulse = ref(false);
    const visibleBloodGlucose = ref(false);
    const visibleBloodOxygen = ref(false);
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
    const patientSummaryColumns = [
      {
        title: "Date Recorded",
        dataIndex: "recorded",
      },
      {
        title: "Value",
        dataIndex: "value",
        slots: {
          customRender: "value",
        },
      },
    ];
    const patientSummaryData = [
      {
        key: "1",
        recorded: "Nov 05, 2021 10:00 AM",
        value: "120/80",
      },
      {
        key: "2",
        recorded: "Nov 06, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "3",
        recorded: "Nov 08, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "4",
        recorded: "Nov 09, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "5",
        recorded: "Nov 11, 2021 10:00 AM",
        value: "122/80",
      },
    ];
    const columns4 = [
      {
        title: "Date Recorded",
        dataIndex: "recorded",
      },
      {
        title: "Value",
        dataIndex: "value",
        slots: {
          customRender: "value",
        },
      },
    ];
    const data4 = [
      {
        key: "1",
        recorded: "Nov 05, 2021 10:00 AM",
        value: "120/80",
      },
      {
        key: "2",
        recorded: "Nov 06, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "3",
        recorded: "Nov 08, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "4",
        recorded: "Nov 09, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "5",
        recorded: "Nov 11, 2021 10:00 AM",
        value: "122/80",
      },
    ];
    const columns5 = [
      {
        title: "Date Recorded",
        dataIndex: "recorded",
      },
      {
        title: "Value",
        dataIndex: "value",
      },
    ];
    const data5 = [
      {
        key: "1",
        recorded: "Nov 05, 2021 10:00 AM",
        value: "68",
      },
      {
        key: "2",
        recorded: "Nov 06, 2021 10:00 AM",
        value: "70",
      },
      {
        key: "3",
        recorded: "Nov 08, 2021 10:00 AM",
        value: "75",
      },
      {
        key: "4",
        recorded: "Nov 09, 2021 10:00 AM",
        value: "80",
      },
      {
        key: "5",
        recorded: "Nov 11, 2021 10:00 AM",
        value: "60",
      },
    ];
    const columns6 = [
      {
        title: "Date Recorded",
        dataIndex: "recorded",
      },
      {
        title: "Value",
        dataIndex: "value",
      },
    ];
    const data6 = [
      {
        key: "1",
        recorded: "Nov 05, 2021 10:00 AM",
        value: "105",
      },
      {
        key: "2",
        recorded: "Nov 06, 2021 10:00 AM",
        value: "100",
      },
      {
        key: "3",
        recorded: "Nov 08, 2021 10:00 AM",
        value: "95",
      },
      {
        key: "4",
        recorded: "Nov 09, 2021 10:00 AM",
        value: "120",
      },
      {
        key: "5",
        recorded: "Nov 11, 2021 10:00 AM",
        value: "130",
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
      visibleAddVitals,
      visibleAddPulse,
      visibleBloodGlucose,
      visibleBloodOxygen,
      showAddBPModal,
      showAddPulseModal,
      showBloodGlucoseModal,
      showBloodOxygenModal,
      patientSummaryColumns,
      patientSummaryData,
      columns4,
      data4,
      columns5,
      data5,
      columns6,
      data6,
      chartOptions,
      chartSeries,
      activeKey1: ref("8"),
      activeKey2: ref("10"),
      activeKey3: ref("12"),
      activeKey4: ref("14"),
    }
  }
}
</script>

<style lang="scss">
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
</style>