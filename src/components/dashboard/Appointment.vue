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
      dataIndex: "appt",
      slots: {
        customRender: "appt",
      },
    },
  ];
  const data4 = [
    {
      key: "1",
      patient: "Steve Smith",
      date: "Dec 20, 2021 - 01:30 PM",
      appt: "Joseph",
    },
    {
      key: "2",
      patient: "Jane Doe",
      date: "Dec 23, 2021 - 11:30 AM",
      appt: "Robert",
    },
  ];
  export default {

    setup(){
      return{
        data4,
        columns4,
      }
    }
  }
</script>