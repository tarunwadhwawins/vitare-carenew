
<template>
<a-row v-if="arrayToObjact(patientsPermissions,62)">
    <a-col :span="24" >
        <ShowModalButton @isVisible="showModal($event)" :headingText="$t('patient.patients')" :buttonText="$t('patient.addNewPatients')" />
    </a-col>
</a-row>
<a-row>
    <a-col :span="24">
        <a-row :gutter="24">
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox red" :count="5" :text="$t('patient.critical')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox orangeBg" :count="10" :text="$t('patient.trending')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox greenBg" :count="15" :text="$t('patient.WNL')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox yellowBg" :count="8" :text="$t('patient.watchList')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox blue" :count="6" :text="$t('patient.messages')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox whiteBg" :count="12" :text="$t('patient.escalations')" />
            </a-col>
        </a-row>
    </a-col>
</a-row>
<a-row >
    <a-col :span="20">
        <SearchField @change="searchData" />
    </a-col>
    <a-col :span="4" v-if="arrayToObjact(patientsPermissions,66)">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24" >
      <template v-if="patients.patientList && patients.column == null">
        <DataTable :columns="columns" :patientRecords="patients.patientList"  />
      </template>
      <template v-else-if="patients.patientList && patients.column != null">
        <DataTable :columns="patients.column" :patientRecords="patients.patientList"  />
      </template>
    </a-col>
</a-row>

<!--modal-->
<PatientsModal v-model:visible="PatientsModal" @saveModal="handleOk($event)" />
<!--end-->
</template>
<script>
import {  ref, watchEffect,computed } from "vue";
import { useStore } from "vuex";
import PatientsModal from "@/components/modals/PatientsModal";
import CounterCard from "./counter-card/CounterCard";
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";

import { arrayToObjact } from "@/commonMethods/commonMethod";
// import { messages } from "../../config/messages";
import DataTable from "./data-table/DataTable"
import SearchField from "@/components/common/input/SearchField";
export default {
  name: "Patients",
  components: {
    PatientsModal,
    // UserOutlined,
    // WarningOutlined,
    CounterCard,
    ShowModalButton,
    DataTable,
    SearchField,
  },

  setup() {
    const store = useStore();
    const searchoptions = ref([]);
    const PatientsModal = ref(false);
    const entityType = ref(null);

    const showModal = (value) => {
      PatientsModal.value = value;
    };
    const handleOk = (status) => {
      PatientsModal.value = status;
    };
    const handleChange = () => {};

    watchEffect(() => {
      store.dispatch("programList");
      store.dispatch("patients");
    });

    const patientsPermissions=computed(()=>{
     return store.state.screenPermissions.patientsPermissions
    })
    
    const searchData = (event) => {
      if( event.target.selectionEnd >= 3 ) {
        store.state.patients.patientList = ""
        // const requestUrl = localStorage.getItem('requestUrl');
        // store.dispatch('abortApiRequest', requestUrl)
        store.dispatch('searchPatients', event.target.value)
      }
      else if( event.target.selectionEnd == 0 ) {
        store.state.patients.patientList = ""
        store.dispatch('patients')
      }
      // if( event.target.selectionEnd > 3 ) {
      //   const params = localStorage.getItem('searchParams');
      //   const entityType = 'patient';
      //   const endPoint = '/?search='+params;
      //   store.dispatch('abortApiRequest', {entityType, endPoint})
      //   console.log('Search Params', event.target.value)
      // }
    };

    const patients = store.getters.patientsRecord.value

    const columns = [
      {
        title: "Flags",
        dataIndex: "flags",
        slots: {
          customRender: "flags",
        },
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        slots: {
          customRender: "lastName",
        },
        sorter: {
          compare: (a, b) => a.reading - b.reading,
          multiple: 1,
        },
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        slots: {
          customRender: "firstName",
        },
        sorter: {
          compare: (a, b) => a.reading - b.reading,
          multiple: 1,
        },
      },
      {
        title: "Date of Readings ",
        dataIndex: "lastReadingDate",
        sorter: {
          compare: (a, b) => a.reading - b.reading,
          multiple: 1,
        },
      },
      {
        title: "Readings ",
        dataIndex: "patientVitals",
        sorter: {
          compare: (a, b) => a.readingvalues - b.readingvalues,
          multiple: 1,
        },
        slots: {
          customRender: "patientVitals",
        },
        children: [
          {
            title:<p>BP <p>(mmHg)</p></p>,
            dataIndex: "bp",
            key: "bp",
          },
          {
            title: "Spo2(%)",
            dataIndex: "spo2",
            key: "spo2",
          },
          {
            title: <p>Glucose <p>(mg/dL)</p></p> ,
            dataIndex: "glucose",
            key: "glucose",
          },
          {
            title:<p>Weight <p>(LBS)</p></p>,
            dataIndex: "weight",
            key: "weight",
          },
        ],
      },
      {
                title: "Non Compliant",
                dataIndex: "nonCompliance",
                sorter: {
                    compare: (a, b) => a.compliance - b.compliance,
                    multiple: 1,
        },
                slots: {
                    customRender: "compliance",
        },
      },
      {
                title: "Last Message Sent",
                dataIndex: "lastMessageSent",
                sorter: {
                    compare: (a, b) => a.message - b.message,
                    multiple: 1,
        },
                onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
      {
            title: "Age ",
            dataIndex: "dob",
            sorter: {
                compare: (a, b) => a.reading - b.reading,
                multiple: 1,
        },
      },
      {
              title: "Sex ",
              dataIndex: "gender",
              sorter: {
                  compare: (a, b) => a.reading - b.reading,
                  multiple: 1,
        },
      }
    ]

    return {
      patientsPermissions,
      arrayToObjact,
      PatientsModal,
      showModal,
      handleOk,
      handleChange,
      searchoptions,
      size: ref(),
      value2: ref(),
      patients,
      entityType,
      searchData,
      columns,
    };
  },
};
</script>
