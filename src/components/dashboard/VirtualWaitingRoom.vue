<template>
  <a-col :sm="12" :xs="24">
    <a-card title="Virtual Waiting Room" class="common-card">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="New Requests">New Requests</a-tab-pane>
        <a-tab-pane key="2" tab="Future Appointments" force-render>Future Appointments</a-tab-pane>
      </a-tabs>
    </a-card>
  </a-col>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      activeKey: ref('1'),
      
      columns: [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Patient',
          dataIndex: 'patient',
          key: 'patient',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        },
      ],
    
      newRequests: [
        {
          key: '1',
          date: '30/11/2021',
          patient: 'Mike Dang',
          action: 'View',
        },
      ],

      futureAppointments: [
        {
          key: '1',
          date: '05/12/2021',
          patient: 'John Doe',
          action: 'View',
        },
      ],
      
    };
  },
});
</script>