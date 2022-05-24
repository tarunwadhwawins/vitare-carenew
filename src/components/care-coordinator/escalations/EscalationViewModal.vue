
<template>
<a-modal max-width="1140px" width="70%" title="Details" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <a-table :dataSource="dataArray" :columns="columnData" :pagination="false" rowKey="id">
                <template #escalationType="{ record }">
                    <span v-for="esc,i in record.escalationType.data" :key="esc.id">
                        {{i==0?' ':','}} {{ esc.escalationType }}
                    </span>
                </template>
                <template #flag="{ record }">
                    <Flags :flag="record.flagColor" />
                </template>
            </a-table>
        </a-col>
        <a-col :span="24">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="2" header="Escalation Description">
                    <p>{{ record.escalationDescription }}</p>
                </a-collapse-panel>
                
                <a-collapse-panel key="3" header="Notes" v-show="record?record.escalationNotes.data:false">
                    <!-- <a-table rowKey="id" :columns="notesColumns" :data-source="record.escalationNotes.data" :pagination="false">
                    </a-table> -->
                    <div v-for=" note in record.escalationNotes.data" :key="note.id">
                      <ul><li>{{note.note.data.note}}</li></ul>
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="4" header="Vitals" v-show="record?record.escalationVital.data:false">
                    <!-- <a-table rowKey="id" :columns="vitalColumns" :data-source="record.escalationVital.data" :pagination="false">
                        <template #color="{ record }">
                            <Flags :flag="record.color" />
                        </template>
                    </a-table> -->
                     <div v-for=" vital in record.escalationVital.data" :key="vital.id">
                      <ul><li>{{vital.patientVital.deviceType}} - {{vital.patientVital.vitalField}}</li></ul>
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="5" header="Care Plans" v-show="record?record.escalationCarePlan.data:false">
                    <!-- <p>{{ record.escalationCarePlan.data }}</p> -->
                    <!-- <a-table rowKey="id" :columns="carePlanColumns" :data-source="record.escalationCarePlan.data" :pagination="false">
                    </a-table> -->
                     <div v-for=" cp in record.escalationCarePlan.data" :key="cp.id">
                      <ul><li>{{cp.carePlan.data.deviceType}} - {{cp.carePlan.data.vitalField}}</li></ul>
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="6" header="Flags" v-show="record?record.escalationFlag.data:false">
                    <!-- <p>{{ record.escalationFlag.data }}</p> -->
                    <!-- <a-table rowKey="id" :columns="flagColumns" :data-source="record.escalationFlag.data" :pagination="false">
                        <template #name="{ record }">
                            <span>{{record.flagName}}</span>
                        </template>
                        <template #color="{ record }">
                            <Flags :flag="record.color" />
                        </template>
                    </a-table> -->
                    <div v-for=" flag in record.escalationFlag.data" :key="flag.id">
                      <ul><li>{{flag.flag.data.flags.data.name}} <Flags :flag="flag.flag.data.flags.data.color" /> </li></ul>
                    </div>
                </a-collapse-panel>

            </a-collapse>
        </a-col>
    </a-row>
    <Loader />

</a-modal>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
import Loader from "@/components/loader/Loader";
const columnData = [
  {
    title: "Patient Name",
    dataIndex: "patientName",
    slots: {
      customRender: "patientName",
    },
  },
  {
    title: "Escalation Type",
    dataIndex: "escalationType",
    slots: {
      customRender: "escalationType",
    },
  },
  {
    title: "Due Date",
    dataIndex: "dueBy",
  },
  {
    title: "Flag",
    dataIndex: "flag",
    slots: {
      customRender: "flag",
    },
  },
];
const notesColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    className: "note-date",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    className: "note-category",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    className: "note-type",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    className: "note-text",
    ellipsis: true,
  },
  {
    title: "Added By",
    dataIndex: "addedBy",
    key: "addedBy",
  },
];
const vitalColumns = [
  {
    title: "Vital",
    dataIndex: "vitalField",
    key: "vitalField",
    className: "vital-vitalField",
  },
  {
    title: "Device Type",
    dataIndex: "deviceType",
    key: "deviceType",
    className: "vital-deviceType",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    className: "vital-value",
  },
  {
    title: "Date",
    dataIndex: "startTime",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    className: "vital-color",
    slots: {
      customRender: "color",
    },
  },
];
const carePlanColumns = [
  {
    title: "Device",
    dataIndex: "deviceType",
  },
  {
    title: "Vital type",
    dataIndex: "vitalField",
  },
  {
    title: "Start date",
    dataIndex: "startDate",
  },
  {
    title: "End date",
    dataIndex: "endDate",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    slots: {
      customRender: "frequency",
    },
  },
  {
    title: "High Value",
    dataIndex: "highValue",
  },
  {
    title: "Low Value",
    dataIndex: "lowValue",
  },
  {
    title: "Note",
    dataIndex: "note",
  },
];
const flagColumns = [
 
  {
    title: "Name",
    dataIndex: "name",
    slots: {
      customRender: "name",
    },
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
  {
    title: "Color",
    dataIndex: "color",
    slots: {
      customRender: "color",
    },
  },
];

export default {
  components: {
    Flags,
    Loader,
  },
  setup() {
    const activeKey = ref([]);
    const store = useStore();
    const record = computed(() => {
      return store.state.patients.singleEscalationRecord;
    });

    return {
      flagColumns,
      carePlanColumns,
      vitalColumns,
      notesColumns,
      dataArray: store.getters.singleEscalationDataArray,
      columnData,
      activeKey,
      record,
    };
  },
};
</script>

<style>
</style>
