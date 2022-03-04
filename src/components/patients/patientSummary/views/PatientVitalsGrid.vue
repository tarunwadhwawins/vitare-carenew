<template>
  <a-row :gutter="24">
    
    <VitalsGrid
      v-if="bloodPressure"
      title="Blood Pressure"
      :activeKey="activeKey1"
      className="dangerValue"
      :tableColumns="bloodPressureColumns"
      :tableData="bloodPressure"
      :chartOptions="bloodPressureOptions"
      :chartSeries="bloodPressureSeries"
      @showModal="showAddBPModal"
    />

    <VitalsGrid
      v-if="bloodGlucose"
      title="Blood Glucose"
      :activeKey="activeKey2"
      className="dangerValue"
      :tableColumns="bloodGlucoseColumns"
      :tableData="bloodGlucose"
      :chartOptions="bloodGlucoseOptions"
      :chartSeries="bloodGlucoseSeries"
      @showModal="showBloodGlucoseModal"
    />

    <VitalsGrid
      v-if="bloodOxygen"
      title="Blood Oxygen Saturation"
      :activeKey="activeKey3"
      className="dangerValue"
      :tableColumns="bloodOxygenColumns"
      :tableData="bloodOxygen"
      :chartOptions="bloodOxygenOptions"
      :chartSeries="bloodOxygenSeries"
      @showModal="showBloodOxygenModal"
    />

  </a-row>
  <AddVitals v-model:visible="visibleAddVitals" @ok="handleOk" />
  <AddPulse v-model:visible="visibleAddPulse" @ok="handleOk" />
  <BloodGlucose v-model:visible="visibleBloodGlucose" @ok="handleOk" />
  <BloodOxygen v-model:visible="visibleBloodOxygen" @ok="handleOk" />
</template>

<script>
import { computed, ref } from 'vue-demi';
import AddVitals from "@/components/modals/AddVitals";
import AddPulse from "@/components/modals/AddPulse";
import BloodGlucose from "@/components/modals/BloodGlucose";
import BloodOxygen from "@/components/modals/BloodOxygen";
import VitalsGrid from "@/components/patients/patientSummary/common/VitalsGrid";
import { useStore } from 'vuex';
export default {
  components: {
    AddVitals,
    AddPulse,
    BloodGlucose,
    BloodOxygen,
    VitalsGrid,
  },
  setup() {
    const store = useStore();
    const visibleAddVitals = ref(false);
    const visibleAddPulse = ref(false);
    const visibleBloodGlucose = ref(false);
    const visibleBloodOxygen = ref(false);
    const bloodPressureSeries = ref(null)
    const bloodPressureTimesArray = ref(null)
    const bloodGlucoseSeries = ref(null)
    const bloodGlucoseTimesArray = ref(null)
    const bloodOxygenSeries = ref(null)
    const bloodOxygenTimesArray = ref(null)

    const patients = computed(() => {
      return store.state.patients
    })

    const bloodPressure = patients.value.bloodPressure
    const bloodGlucose = patients.value.bloodGlucose
    const bloodOxygen = patients.value.bloodOxygen
    const bloodPressureGraph = patients.value.bloodPressureGraph
    const bloodOxygenGraph = patients.value.bloodOxygenGraph
    const bloodGlucoseGraph = patients.value.bloodGlucoseGraph

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

    const bloodPressureColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
        slots: {
          customRender: "takeTime",
        },
      },
      {
        title: "Systolic",
        dataIndex: "blood_pressure_systolic",
        key: "blood_pressure_systolic",
        slots: {
          customRender: "blood_pressure_systolic",
        },
      },
      {
        title: "Diastolic",
        dataIndex: "blood_pressure_diastolic",
        key: "blood_pressure_diastolic",
        slots: {
          customRender: "blood_pressure_diastolic",
        },
      },
      {
        title: "BPM",
        dataIndex: "blood_pressure_bpm",
        key: "blood_pressure_bpm",
        slots: {
          customRender: "blood_pressure_bpm",
        },
      },
    ];

    const bloodGlucoseColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
        slots: {
          customRender: "takeTime",
        },
      },
      {
        title: "Random Blood Sugar",
        dataIndex: "glucose_random_blood_sugar",
        key: "glucose_random_blood_sugar",
        slots: {
          customRender: "glucose_random_blood_sugar",
        },
      },
      {
        title: "Fasting Blood Sugar",
        dataIndex: "glucose_fasting_blood_sugar",
        key: "glucose_fasting_blood_sugar",
        slots: {
          customRender: "glucose_fasting_blood_sugar",
        },
      },
    ];

    const bloodOxygenColumns = [
      {
        title: "Date Recorded",
        dataIndex: "takeTime",
        key: "takeTime",
        slots: {
          customRender: "takeTime",
        },
      },
      {
        title: "SPO2",
        dataIndex: "oxymeter_spo2",
        key: "oxymeter_spo2",
        slots: {
          customRender: "oxymeter_spo2",
        },
      },
      {
        title: "BPM",
        dataIndex: "oxymeter_bpm",
        key: "oxymeter_bpm",
        slots: {
          customRender: "oxymeter_bpm",
        },
      },
    ];
    
    if(bloodPressureGraph != null) {
      bloodPressureSeries.value = bloodPressureGraph.records
      bloodPressureTimesArray.value = bloodPressureGraph.timesArray
    }

    if(bloodGlucoseGraph != null) {
      bloodGlucoseSeries.value = bloodGlucoseGraph.records
      bloodGlucoseTimesArray.value = bloodGlucoseGraph.timesArray
    }

    if(bloodOxygenGraph != null) {
      bloodOxygenSeries.value = bloodOxygenGraph.records
      bloodOxygenTimesArray.value = bloodOxygenGraph.timesArray
    }
    
    const bloodPressureOptions = {
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
        categories: bloodPressureTimesArray,
      },
    };
    
    const bloodOxygenOptions = {
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
        categories: bloodOxygenTimesArray,
      },
    };
    
    const bloodGlucoseOptions = {
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
        categories: bloodGlucoseTimesArray,
      },
    };

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

      bloodPressureColumns,
      bloodGlucoseColumns,
      bloodOxygenColumns,
      bloodPressure,
      bloodGlucose,
      bloodOxygen,
      
      bloodPressureOptions,
      bloodPressureSeries,
      
      bloodGlucoseOptions,
      bloodGlucoseSeries,
      
      bloodOxygenOptions,
      bloodOxygenSeries,
    }
  }
}
</script>