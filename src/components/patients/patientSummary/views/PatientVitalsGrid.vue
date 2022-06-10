<template>
  <a-row :gutter="24" v-bind:class="vitalGrid">

    <template v-if="!patientDevices || patientDevices.length == 0">
      <a-col :sm="24">
        <a-alert message="No devices are assigned to this Patient. Please assign device(s) to see Vitals." type="error" />
      </a-col>
    </template>
    
    <template v-for="device in patientDevices" :key="device.id">
      
      <VitalsGrid
        v-if="device.deviceType == 'Blood Pressure'"
        title="Blood Pressure"
        :activeKey="activeKey1"
        :tableColumns="bloodPressureColumns"
        :tableData="bloodPressure"
        :chartOptions="bloodPressureOptions"
        :chartSeries="bloodPressureSeries"
        @showModal="showAddBPModal"
      />

      <VitalsGrid
        v-if="device.deviceType == 'Glucose'"
        title="Blood Glucose"
        :activeKey="activeKey2"
        :tableColumns="bloodGlucoseColumns"
        :tableData="bloodGlucose"
        :chartOptions="bloodGlucoseOptions"
        :chartSeries="bloodGlucoseSeries"
        @showModal="showAddBloodGlucoseModal"
      />

      <VitalsGrid
        v-if="device.deviceType == 'Oximeter'"
        title="Blood Oxygen Saturation"
        :activeKey="activeKey3"
        :tableColumns="bloodOxygenColumns"
        :tableData="bloodOxygen"
        :chartOptions="bloodOxygenOptions"
        :chartSeries="bloodOxygenSeries"
        @showModal="showAddBloodOxygenModal"
      />
    </template>

  </a-row>
  <AddVitalsModal v-if="visibleAddVitalsModal" v-model:visible="visibleAddVitalsModal" :title="title" :deviceId="deviceId" @closeModal="handleOk" :patientId="patientId" @ok="handleOk" />
</template>

<script>
import { computed, ref } from 'vue-demi';
import AddVitalsModal from "@/components/modals/AddVitalsModal";
import VitalsGrid from "@/components/patients/patientSummary/common/VitalsGrid";
import { useStore } from 'vuex';
import {
  yaxis,
} from '@/commonMethods/commonMethod'
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";

export default {
  components: {
    AddVitalsModal,
    VitalsGrid,
  },
  props: {
		patientId: {
			type: Number
		},
  },
  setup() {
    const store = useStore();
    const visibleAddVitalsModal = ref(false);
    const bloodPressureSeries = ref(null)
    const bloodPressureTimesArray = ref(null)
    const bloodGlucoseSeries = ref(null)
    const bloodGlucoseTimesArray = ref(null)
    const bloodOxygenSeries = ref(null)
    const bloodOxygenTimesArray = ref(null)
    const title = ref(null)
    const vitalType = ref(null)
    const deviceId = ref(null)
    const showVitals = ref(false)

    const patients = computed(() => {
      return store.state.patients
    })

    const checkChangedInput = computed(() => {
      return store.state.common.checkChangeInput
    })

    const handleOk = () => {
      visibleAddVitalsModal.value = true
      if(checkChangedInput.value) {
          warningSwal(messages.modalWarning).then((response) => {
              if (response == true) {
                  visibleAddVitalsModal.value = false
                  store.commit('checkChangeInput', false)
              }
              else {
                  visibleAddVitalsModal.value = true
              }
          });
      }
      else {
          visibleAddVitalsModal.value = false;
      }
    }

    const bloodPressureColumns = patients.value.bloodPressureColumns
    const bloodOxygenColumns = patients.value.bloodOxygenColumns
    const bloodGlucoseColumns = patients.value.bloodGlucoseColumns
    const bloodPressure = computed(() => {
      return store.state.patients.bloodPressure
    })
    const bloodGlucose = computed(() => {
      return store.state.patients.bloodGlucose
    })
    const bloodOxygen = computed(() => {
      return store.state.patients.bloodOxygen
    })
    if((bloodPressure.value != null && bloodPressure.value.length > 0) || (bloodGlucose.value != null && bloodGlucose.value.length > 0) || (bloodOxygen.value != null && bloodOxygen.value.length > 0)) {
      showVitals.value = true;
    }
    const bloodPressureGraph = patients.value.bloodPressureGraph
    const bloodOxygenGraph = patients.value.bloodOxygenGraph
    const bloodGlucoseGraph = patients.value.bloodGlucoseGraph
    const patientDevices = patients.value.devices

    const showAddBPModal = () => {
      deviceId.value = 99;
      visibleAddVitalsModal.value = true;
      title.value = 'Blood Pressure';
    };
    const showAddBloodOxygenModal = () => {
      deviceId.value = 100;
      visibleAddVitalsModal.value = true;
      title.value = 'Blood Oxygen Saturation';
    };
    const showAddBloodGlucoseModal = () => {
      deviceId.value = 101;
      visibleAddVitalsModal.value = true;
      title.value = 'Blood Glucose';
    };
    
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
        title:{
          text: 'Time'
        },
        categories: bloodPressureTimesArray,
      },
      yaxis: yaxis("Number of Vitals"),
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
        title:{
          text: 'Time'
        },
        categories: bloodOxygenTimesArray,
      },
      yaxis: yaxis("Number of Vitals"),
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
        title:{
          text: 'Time'
        },
        categories: bloodGlucoseTimesArray,
      },
      yaxis: yaxis("Number of Vitals"),
    };

    return {
      showAddBPModal,
      showAddBloodGlucoseModal,
      showAddBloodOxygenModal,
      title,
      vitalType,
      visibleAddVitalsModal,
      deviceId,
      handleOk,
      
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

      patientDevices,
      showVitals,
      vitalGrid:'vitalGrid',
    }
  }
}
</script>

<style scoped>
  .warningMessage {
    text-align: center;
    background: #f6c9af;
    padding: 15px;
    font-size: 16px !important;
  }
  .vitalGrid {
    margin-left: 5px !important;
    margin-right: 5px !important;
  }
</style>