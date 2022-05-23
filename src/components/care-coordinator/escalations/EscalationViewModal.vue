<template>
<a-modal max-width="1140px" width="70%" title="Details" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24" >
            <a-table :dataSource="dataArray" :columns="columnData" :pagination="false" rowKey="id">
                <template #escalationType="{ record }">
            <span v-for="esc,i in record.escalationType.data" :key="esc.id" >
                {{i==0?' ':','}} {{ esc.escalationType }}
            </span>
        </template>
        <template #flag="{ record }">
            <Flags :flag="record.flagColor"/>
        </template>
            </a-table>
        </a-col>
        <a-col :span="24">
        <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="2" header="Escalation Description">
                <p>{{ record.escalationDescription }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="Notes" v-show="record?record.escalationNotes.data:false">
               <a-table  rowKey="id"  :columns="notesColumns" :data-source="record.escalationNotes.data" :pagination="false">
                </a-table>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="Vitals"  v-show="record?record.escalationVital.data:false">
                <!-- <p>{{ record.escalationVital.data }}</p> -->
            </a-collapse-panel>
            <a-collapse-panel key="5" header="Care Plans"  v-show="record?record.escalationCarePlan.data:false">
                <!-- <p>{{ record.escalationCarePlan.data }}</p> -->
            </a-collapse-panel>
            <a-collapse-panel key="6" header="Flags" v-show="record?record.escalationFlag.data:false">
                <!-- <p>{{ record.escalationFlag.data }}</p> -->
            </a-collapse-panel>
            
        </a-collapse>
        </a-col>
    </a-row>
<Loader/>

</a-modal>
</template>

<script>
import {computed, ref } from 'vue';
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
    title: "Select All",
    dataIndex: "select",
    key: "select",
    slots: {
      customRender: "select",
    },
    className: "note-select",
  },
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
export default {
    components:{
        Flags,
        Loader
    },
 setup() {
    const activeKey = ref([])
    const store = useStore()
    const record = computed(()=>{
        return store.state.patients.singleEscalationRecord
    })

    
    return {
        notesColumns,
        dataArray:store.getters.singleEscalationDataArray,
      columnData,
      activeKey,
      record
    };
  },
}
</script>

<style>

</style>
