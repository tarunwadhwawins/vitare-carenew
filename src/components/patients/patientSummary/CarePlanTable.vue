<template>
  <div class="text-right mb-24">
    <a-button class="primaryBtn" @click="AddCarePlan">Add Goal</a-button>
  </div>
  <a-table  rowKey="id" :columns="carePlanColumns" :data-source="carePlanData" :pagination="false" @change="onChange" >
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
  <CarePlan v-model:visible="CarePlan" @ok="handleOk" />
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { ref } from 'vue-demi';
import CarePlan from "@/components/modals/CarePlan";
export default {
  components: {
    CarePlan,
    DeleteOutlined,
    EditOutlined,
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