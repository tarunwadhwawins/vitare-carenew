<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <a-row>
            <a-col :xl="5" :lg="10">
              <h2 class="pageTittle">{{$t('patientSummary.patientSummary')}}</h2>
            </a-col>
            <a-col :xl="11" :lg="14">
              <div class="pageTittle">
                <div class="filter">
                  <a-button @click="showButton1" :class="button == 1 ? 'active' : ''" >Default</a-button>
                  <a-button @click="showButton2" :class="button == 2 ? 'active' : ''" >Timeline</a-button>
                  <a-button @click="showButton3" :class="button == 3 ? 'active' : ''" >Care Plan</a-button>
                  <a-button @click="showButton4" :class="button == 4 ? 'active' : ''" >Patient Vitals</a-button>
                </div>
              </div>
            </a-col>
            <a-col :xl="8" :lg="24">
              <div class="timer">
                <h3>{{$t('patientSummary.currentSession')}} : 0:00</h3>
                <a-button class="primaryBtn" @click="showStopTimerModal">{{$t('patientSummary.stopTimer')}}</a-button>
              </div>
            </a-col>
            <a-col :sm="24">
              <a-alert class="mb-24" message="Patient has dimentia. Talk to wife - Marry when calling. Prefers evening calling." type="error" closable @close="onClose2"/>
            </a-col>
            <a-col :sm="24" :xs="24">
              <div v-if="button == 1">
                <DefaultView/>
              </div>
              <div v-if="button == 2">
                <TimelineView/>
              </div>
              <div v-if="button == 3">
                <CarePlanView/>
              </div>
              <div v-if="button == 4">
                <PatientVitalsView/>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <AddDocument v-model:visible="visible" @ok="handleOk" />
    <AddTimeLogs v-model:visible="visible1" @ok="handleOk" />
    <AddDevice v-model:visible="visible2" @ok="handleOk" />
    <AddNote v-model:visible="addnotesvisible" @ok="handleOk" />
    <NotesDetail v-model:visible="notevisible" @ok="handleOk" />
    <DeviceDetail v-model:visible="devicevisible" @ok="handleOk" />
    <DocumentDetail v-model:visible="documentvisible" @ok="handleOk" />
    <TimeLogsDetail v-model:visible="timelogsvisible" @ok="handleOk" />
    <BloodPressureDetail v-model:visible="bloodpressurevisible" @ok="handleOk" />
    <BloodOxygenDetail v-model:visible="bloodoxygenvisible" @ok="handleOk" />
    <BloodGlucoseDetail v-model:visible="bloodglucosevisible" @ok="handleOk" />
    <AddAppointment v-model:visible="appointmentvisible" @ok="handleOk" />
    <TimeTracker v-model:visible="stoptimervisible" @ok="handleOk" />
    <VitalSummary v-model:visible="visible3" @ok="handleOk" />
    <AddPulse v-model:visible="visible4" @ok="handleOk" />
    <BloodGlucose v-model:visible="visible5" @ok="handleOk" />
    <BloodOxygen v-model:visible="visible6" @ok="handleOk" />
    <AddHealth v-model:visible="visible7" @ok="handleOk" />
    <CareCoordinators v-model:visible="visible8" @ok="handleOk" />
    <FamilyCoordinators v-model:visible="visible9" @ok="handleOk" />
    <TaskModal v-model:visible="TaskModal" @ok="handleOk" />
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import VitalSummary from "@/components/modals/VitalSummary";
import FamilyCoordinators from "@/components/modals/FamilyCoordinators";
import CareCoordinators from "@/components/modals/CareCoordinators";
import AddHealth from "@/components/modals/AddHealth";
import BloodOxygen from "@/components/modals/BloodOxygen";
import BloodGlucose from "@/components/modals/BloodGlucose";
import AddPulse from "@/components/modals/AddPulse";
import TimeTracker from "@/components/modals/TimeTracker";
import BloodGlucoseDetail from "@/components/modals/BloodGlucoseDetail";
import BloodOxygenDetail from "@/components/modals/BloodOxygenDetail";
import BloodPressureDetail from "@/components/modals/BloodPressureDetail";
import TimeLogsDetail from "@/components/modals/TimeLogsDetail";
import DocumentDetail from "@/components/modals/DocumentDetail";
import DeviceDetail from "@/components/modals/DeviceDetail";
import NotesDetail from "@/components/modals/NotesDetail";
import AddNote from "@/components/modals/AddNote";
import AddDevice from "@/components/modals/AddDevice";
import AddDocument from "@/components/modals/AddDocument";
import AddTimeLogs from "@/components/modals/AddTimeLogs";
import AddAppointment from "@/components/modals/AddAppointment";
import TaskModal from "@/components/modals/TasksModal";
import DefaultView from "@/components/patients/patientSummary/views/DefaultView";
import TimelineView from "@/components/patients/patientSummary/views/TimelineView";
import CarePlanView from "@/components/patients/patientSummary/views/CarePlanView";
import PatientVitalsView from "@/components/patients/patientSummary/views/PatientVitalsView";

import dayjs from "dayjs";
import { ref } from "vue";
const value = ref(dayjs("12:08", "HH:mm"));

export default {
  components: {
    Header,
    Sidebar,
    VitalSummary,
    FamilyCoordinators,
    CareCoordinators,
    AddHealth,
    BloodOxygen,
    BloodGlucose,
    AddPulse,
    TimeTracker,
    BloodGlucoseDetail,
    BloodOxygenDetail,
    BloodPressureDetail,
    TimeLogsDetail,
    DocumentDetail,
    DeviceDetail,
    NotesDetail,
    AddNote,
    AddDevice,
    AddDocument,
    AddTimeLogs,
    AddAppointment,
    TaskModal,
    DefaultView,
    TimelineView,
    CarePlanView,
    PatientVitalsView,
  },
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible7 = ref(false);
    const visible8 = ref(false);
    const visible9 = ref(false);
    const notevisible = ref(false);
    const devicevisible = ref(false);
    const documentvisible = ref(false);
    const addnotesvisible = ref(false);
    const timelogsvisible = ref(false);
    const bloodpressurevisible = ref(false);
    const bloodoxygenvisible = ref(false);
    const bloodglucosevisible = ref(false);
    const appointmentvisible = ref(false);
    const stoptimervisible = ref(false);

    const showStopTimerModal = () => {
      stoptimervisible.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const onClose = (e) => {
      console.log(e, "I was closed.");
    };

    const custom = ref(false);
    const current = ref(0);

    const handleOkcustom = (e) => {
      console.log(e);
      custom.value = false;
    };
    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const TaskModal = ref(false);

    const button = ref(1);

    function showButton1() {
      button.value = 1;
    }
    function showButton2() {
      button.value = 2;
    }
    function showButton3() {
      button.value = 3;
    }
    function showButton4() {
      button.value = 4;
    }

    const onClose2 = (e) => {
      console.log(e, "I was closed.");
    };

    return {
      handleOkcustom,
      custom,
      next,
      prev,
      handleChange,

      visible,
      visible1,
      visible2,
      visible7,
      visible8,
      visible9,
      notevisible,
      devicevisible,
      documentvisible,
      addnotesvisible,
      timelogsvisible,
      bloodpressurevisible,
      bloodoxygenvisible,
      bloodglucosevisible,
      appointmentvisible,
      stoptimervisible,

      showStopTimerModal,
      handleOk,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
      activeKey: ref("2"),
      activeKey1: ref("8"),
      activeKey2: ref("10"),
      activeKey3: ref("12"),
      activeKey4: ref("14"),
      value1: ref(),
      size: ref("large"),
      value3: ref([]),
      value,
      dayjs,
      onClose,
      button,
      showButton1,
      showButton2,
      showButton3,
      showButton4,
      value10: ref([]),
      TaskModal,
      onClose2,
    };
  },
};
</script>

<style lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
}
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
.ant-alert-error {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  .ant-alert-message {
    color: #842029;
  }
}
</style>
