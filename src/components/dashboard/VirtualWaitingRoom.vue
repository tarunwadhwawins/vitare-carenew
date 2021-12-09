<template>
  <a-col :sm="12" :xs="24">
    <a-card title="Populate Waiting Room" class="common-card">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="New Requests">
          <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 2 }">
            <template #patientName="text">
              <router-link to="#">{{ text.text }}</router-link>
              
            </template>
            <template #action>
              <a-button class="btn blueBtn">Start</a-button>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Future Appointments" force-render>
          <a-table :columns="columns1" :data-source="data1" :pagination="{ pageSize: 2 }">
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

  import { reactive } from "vue"
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      slots: {
        customRender: "patientName",
      },
    },
    {
      title: "Appointment Type",
      dataIndex: "appointment_type",
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
  const columns1 = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      slots: {
        customRender: "patientName",
      },
    },
    {
      title: "Appointment Type",
      dataIndex: "appointment_type",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];

  export default {
    props: ["newappointment", "future"],
    setup(props) {


      const data = reactive(props.newappointment)

      const data1 = reactive(props.future)
      return {
        data,
        columns,
        data1,
        columns1,
      };
    },
  };
</script>