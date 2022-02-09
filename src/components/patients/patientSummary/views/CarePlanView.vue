<template>
  <a-row>
    <a-col :sm="24" :xs="24">
      <PatientInfo/>
    </a-col>
    <a-col :span="24">
      <div class="text-right mb-24">
        <a-button class="primaryBtn" @click="AddCarePlan">Add Goal</a-button>
      </div>
      <a-table :columns="carePlanColumns" :data-source="carePlanData" :pagination="false" @change="onChange" >

      <template #actions>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <a class="icons"><EditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Delete</span>
        </template>
        <a class="icons"> <DeleteOutlined /></a>
      </a-tooltip>
    </template>
      </a-table>
    </a-col>
  </a-row>
  <CarePlan v-model:visible="CarePlan" @ok="handleOk" />
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import CarePlan from "@/components/modals/CarePlan";
import PatientInfo from "@/components/patients/patientSummary/PatientInfo";
import { ref } from 'vue-demi';
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    CarePlan,
    PatientInfo,
  },
  setup() {
    const CarePlan = ref(false);
    const AddCarePlan = () => {
      CarePlan.value = true;
    };

    const carePlanColumns = [
      {
        title: "Goal",
        dataIndex: "goal",
      },
      {
        title: "Start date",
        dataIndex: "startdate",
      },
      {
        title: "End date",
        dataIndex: "enddate",
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
      },
      {
        title: "Duration",
        dataIndex: "duration",
      },
      {
        title: "Notes",
        dataIndex: "notes",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
    ];
    const carePlanData = [
      {
        key: "1",
        goal: "Blood Pressure",
        startdate: "Jan 15, 2022",
        enddate: "Jan 30, 2022",
        frequency: "5 Daily",
        duration: "Any Time",
        notes: "notes",
        action: "",
      },
      {
        key: "2",
        goal: "SPO2",
        startdate: "Jan 20, 2022",
        enddate: "Jan 30, 2022",
        frequency: "1 Month",
        duration: "Any Time",
        notes: "notes",
        action: "",
      },
      {
        key: "3",
        goal: "Walk",
        startdate: "Feb 01, 2022",
        enddate: "Feb 10, 2022",
        frequency: "5 Week",
        duration: "Time Range 5:00 AM - 6:00 AM",
        notes: "notes",
        action: "",
      },
      
    ];

    return {
      AddCarePlan,
      CarePlan,
      carePlanColumns,
      carePlanData
    }
  }
}
</script>

<style lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
}
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
.ant-alert-error {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  .ant-alert-message {
    color: #842029;
  }
}
.patientSummary img {
  height: 160px;
  width: 150px;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>