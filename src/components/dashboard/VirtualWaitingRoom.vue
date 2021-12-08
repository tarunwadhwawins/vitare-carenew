<template>
  <a-col :sm="12" :xs="24">
    <a-card title="Populate Waiting Room" class="common-card">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="New Requests">
          <a-table :columns="columns5" :data-source="data5" :pagination="false">
            <template #patientName="text">
              <router-link to="#">{{ text.text }}</router-link>
            </template>
            <template #action>
              <a-button class="btn blueBtn">Start</a-button>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Future Appointments" force-render>
          <a-table :columns="columns6" :data-source="data6" :pagination="false">
            <template #patientName="text">
              <router-link to="#">{{ text.text }}</router-link>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-col>
</template>
<script>
import { defineComponent, ref } from 'vue';

  
  const columns5 = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      slots: {
        customRender: "patientName",
      },
    },
    {
      title: "Appointment Type",
      dataIndex: "appt",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Action ",
      dataIndex: "action",
      slots: {
        customRender: "action",
      },
    },
  ];
  const data5 = [
    {
      key: "1",
      patient: "Steve Smith",
      appt: "Wellness",
      time: "01:30 PM",
    },
    {
      key: "2",
      patient: "Jane Doe",
      appt: "Clinical",
      time: "11:30 AM",
    },
  ];
  const columns6 = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      slots: {
        customRender: "patientName",
      },
    },
    {
      title: "Appointment Type",
      dataIndex: "appt",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];
  const data6 = [
    {
      key: "1",
      patient: "Robert",
      appt: "Wellness",
      time: "02:30 PM",
    },
    {
      key: "2",
      patient: "  Steve",
      appt: "Clinical",
      time: "10:30 AM",
    },
  ];
export default defineComponent({
  setup() {
    return {
     
        data5,
        columns5,
        data6,
        columns6,
    };
  },
});
</script>