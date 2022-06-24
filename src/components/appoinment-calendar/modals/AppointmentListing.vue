
<template>
<a-modal width="1100px" centered  title="Appointment" @ok="handleOk" maskClosable="true" @cancel="closeModal()">
    <a-table rowKey="id" :columns="columns" :data-source="appointments">
      <template #staff="{text,record}" >
        <router-link :to="{ name: 'CoordinatorSummary', params: { udid:record.staff_id  }}">{{ text }}</router-link>
    </template>
    <template #patient="{ text, record }" v-if="arrayToObjact(screensPermissions, 63)">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patient_id } }">{{ text }}</router-link>

        </template>
      <template #flags="{ record }">
        
         <a-tooltip placement="bottom">
                <template #title>
                    <span>{{ record.flagName }}</span>
                </template>
                <a class="icons">
                    <Flags :flag="record.flags"/></a>
            </a-tooltip>
        <!-- <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
      </template>
    </a-table>
</a-modal>
</template>
<script>

import { dateAndTimeFormate , arrayToObjact} from "@/commonMethods/commonMethod";
import Flags from "@/components/common/flags/Flags";
import { useStore } from "vuex";
const columns = [
  {
    title: "Appointment Type",
    dataIndex: "appointmentType",
    key: "appointmentType",
  },
  {
    title: "Care Coordinator",
    dataIndex: "staff",
    key: "staff",
    slots: {
      customRender: "staff",
    },
  },
  {
    title: "Patient",
    dataIndex: "patient",
    key: "patient",
    slots: {
      customRender: "patient",
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    customRender: ({ record }) => {
      return dateAndTimeFormate(record.date, "MMM DD, yyyy");
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Start Time",
    dataIndex: "date",
    customRender: ({ record }) => {
      return dateAndTimeFormate(record.date, "hh:mm A");
    },
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    ellipsis: true,
  },
  {
    title: "Flags",
    dataIndex: "flags",
    key: "flags",
    slots: {
      customRender: "flags",
    },
  },
];
export default {
  components: {
   
    Flags
  },
  props: {
    appointments:Array
  },
  setup() {
    
    const store = useStore();

    function closeModal() {
      store.state.appointment.showMoreRecords = "";
    }
    return {
      screensPermissions: store.getters.screensPermissions,
    arrayToObjact,
      columns,
      closeModal,
      dateAndTimeFormate,
    };
  },
};
</script>
