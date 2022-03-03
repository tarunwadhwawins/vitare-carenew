<template>
  <a-row :gutter="24">

    <VitalsGrid
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
      title="Blood Glucose"
      :activeKey="activeKey2"
      className="dangerValue"
      :tableColumns="bloodGlucoseColumns"
      :tableData="bloodGlucose"
      :chartOptions="bloodPressureOptions"
      :chartSeries="bloodPressureSeries"
      @showModal="showBloodGlucoseModal"
    />

    <VitalsGrid
      title="Blood Oxygen Saturation"
      :activeKey="activeKey3"
      className="dangerValue"
      :tableColumns="bloodOxygetColumns"
      :tableData="bloodOxygen"
      :chartOptions="bloodPressureOptions"
      :chartSeries="bloodPressureSeries"
      @showModal="showBloodOxygenModal"
    />

  </a-row>
  <AddVitals v-model:visible="visibleAddVitals" @ok="handleOk" />
  <AddPulse v-model:visible="visibleAddPulse" @ok="handleOk" />
  <BloodGlucose v-model:visible="visibleBloodGlucose" @ok="handleOk" />
  <BloodOxygen v-model:visible="visibleBloodOxygen" @ok="handleOk" />
</template>

<script>
import { computed, reactive, ref, watchEffect } from 'vue-demi';
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
      store.dispatch('patientVitals', {patientId: idPatient, deviceType: 99});
      store.dispatch('patientVitals', {patientId: idPatient, deviceType: 100});
      store.dispatch('patientVitals', {patientId: idPatient, deviceType: 101});
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

    const bloodOxygetColumns = [
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

    const bloodPressureGraph = computed(() => {
      return store.state.patients.bloodPressureGraph
    })
    console.log('bloodPressureGraph', bloodPressureGraph.value)

    const bloodPressureSeries = []
    const bloodPressureTimesArray = []

    const bloodOxygenGraph = computed(() => {
      return store.state.patients.bloodOxygenGraph
    })

    const bloodGlucoseGraph = computed(() => {
      return store.state.patients.bloodGlucoseGraph
    })
    
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
        type: "datetime",
        categories: bloodPressureTimesArray,
      },
      tooltip: {
        x: {
          format: "HH:mm",
        },
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
      
      bloodPressureOptions,
      bloodPressureSeries,

      bloodPressure,
      bloodGlucose,
      bloodOxygen,

      bloodPressureColumns,
      bloodGlucoseColumns,
      bloodOxygetColumns,

      bloodPressureGraph,
      bloodOxygenGraph,
      bloodGlucoseGraph,
    }
  }
}
</script>