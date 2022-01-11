<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false">
    <template #patientName="text">
      <router-link to="patients-summary">
        {{ text.text }}
      </router-link>
    </template>
    <template #action>
      <a-button class="btn blueBtn">{{$t('communications.start')}}</a-button>
    </template>
  </a-table>
</template>

<script>
export default {
  setup() {
    
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
    const data = [
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
      {
        key: "3",
        patient: "Joseph Spouse",
        appt: "Wellness",
        time: "02:30 PM",
      },
    ];

    return {
      columns,
      data
    }
  }
}
</script>