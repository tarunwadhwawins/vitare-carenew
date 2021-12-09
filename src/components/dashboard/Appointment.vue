<template>
  <a-col :sm="12" :xs="24">
    <a-card title="Today's Appointment" class="common-card">
      <a-table :columns="columns4" :data-source="data4" :pagination="false">
        <template #patientName="text">
          <router-link to="patients-summary">{{ text.text }}</router-link>
        </template>
        <template #appt="text">
          <router-link to="manage-care-coordinator">{{
            text.text
            }}</router-link>
        </template>
      </a-table>
    </a-card>
  </a-col>
</template>
<script>
  import { reactive } from "vue"
  const columns4 = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      slots: {
        customRender: "patientName",
      },
    },
    {
      title: "Date Time ",
      dataIndex: "date",
    },
    {
      title: "  Appointment With",
      dataIndex: "appointment_type",
      slots: {
        customRender: "appt",
      },
    },
  ];
  export default {
    props: ["todayappointment"],
    setup(props) {
      const data = reactive(props.todayappointment)
      return {
        data,
        columns4,
      }
    }
  }
</script>