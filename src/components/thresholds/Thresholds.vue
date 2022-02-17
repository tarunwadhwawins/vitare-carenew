<template>
  
    <!---->
   
   
      
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">
                  {{$t('thresholds.generalParameters')}}

                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >{{$t('thresholds.addNewParameters')}}</a-button
                    >
                  </div>
                </h2>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-select
                  v-model:value="value"
                  :size="size"
                  mode="tags"
                  style="width: 100%"
                  placeholder="Search . . ."
                  :options="options"
                  @change="handleChange"
                  
                >
                </a-select>
              </a-col>
              <a-col :span="12">
                <div class="text-right mb-24">
                  <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
                </div>
              </a-col>
              <ThresholdsTable :columns="columns" :thresholdsData="data"></ThresholdsTable>
              </a-row>
          </div>
        </a-layout-content>
     

    <Thresholds v-model:visible="Thresholds" @ok="handleOk" />
  
</template>
<script>


import { ref } from "vue";

import Thresholds from "@/components/modals/Thresholds";
import ThresholdsTable from "./ThresholdsTable"

const renderContent = ({ text }) => {
  const obj = {
    children: text,
    props: { colSpan: null },
  };

  return obj;
};
const columns = [
  {
    title: "General Parameters Group",
    dataIndex: "group",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    customRender: ({ text, index }) => {
      const obj = {
        children: text,
        props: {},
      };

      if (index === 0) {
        obj.props.rowSpan = 5;
      } // These two are merged into above cell

      if (index === 1) {
        obj.props.rowSpan = 0;
      }

      if (index === 2) {
        obj.props.colSpan = 0;
      }
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.rowSpan = 0;
      }

      // if (index === 4) {
      //   obj.props.colSpan = 0;
      // }
      // if (index === 5) {
      //   obj.props.colSpan = 0;
      // }

      if (index === 5) {
        obj.props.rowSpan = 3;
      } //

      if (index === 6) {
        obj.props.rowSpan = 0;
      }

      if (index === 7) {
        obj.props.colSpan = 0;
      }

      if (index === 8) {
        obj.props.rowSpan = 3;
      } //

      if (index === 9) {
        obj.props.rowSpan = 0;
      }

      if (index === 10) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    customRender: renderContent,
  },
  {
    title: "High Limit ",
    dataIndex: "high",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    customRender: renderContent,
  },
  {
    title: "Low Limit ",
    dataIndex: "low",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    customRender: renderContent,
  },

  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
const data = [
  {
    key: "1",
    group: "Group One",
    type: "Blood Glucose Non-Fasting",
    high: "120",
    low: "85",
    action: "",
  },
  {
    key: "2",
    group: "Group One",
    type: "Blood Glucose Fasting",
    high: "80",
    low: "60",
    action: "",
  },
  {
    key: "3",
    group: "Group One",
    type: "Systolic BP",
    high: "90",
    low: "80",
    action: "",
  },
  {
    key: "4",
    group: "Group One",
    type: "Weight",
    high: "80.50",
    low: "60.20",
    action: "",
  },
  {
    key: "5",
    group: "Group One",
    type: "Spo2",
    high: "100",
    low: "90",
    action: "",
  },
  {
    key: "6",
    group: "Group Two",
    type: "Blood Glucose",
    high: "120",
    low: "85",
    action: "",
  },
  {
    key: "7",
    group: "Group Two",
    type: "Systolic BP",
    high: "90",
    low: "80",
    action: "",
  },
  {
    key: "8",
    group: "Group Two",
    type: "Diastolic BP",
    high: "120",
    low: "110",
    action: "",
  },
  {
    key: "9",
    group: "Group Three",
    type: "Pulse (BP Cuff)",
    high: "80",
    low: "70",
    action: "",
  },
  {
    key: "10",
    group: "Group Three",
    type: "Weight",
    high: "70.50",
    low: "55.80",
    action: "",
  },
  {
    key: "11",
    group: "Group Three",
    type: "Spo2",
    high: "100",
    low: "90",
    action: "",
  },
];
export default {
  components: {
    ThresholdsTable,
    Thresholds,
  },

  setup() {
    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    const checked = ref([false]);

    const Thresholds = ref(false);
    const showModal = () => {
      Thresholds.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      Thresholds.value = false;
    };
    const options = ref([
      {
        value: 'Group One',
        label: 'Group One',
      },
      {
        value: 'Blood Glucose',
        label: 'Blood Glucose',
      },
      {
        value: 'Systolic BP',
        label: 'Systolic BP',
      },
      {
        value: 'Weight',
        label: 'Weight',
      },
      {
        value: 'Spo2',
        label: 'Spo2',
      },
      {
        value: 'Pulse (BP Cuff)',
        label: 'Pulse (BP Cuff)',
      },
      {
        value: 'Group Three',
        label: 'Group Three',
      },
    ]);
   
   return {
      columns,
      data,
      checked,
      Thresholds,
      showModal,
      handleOk,
      value: ref([]),
      handleChange,
      options,
      size: ref([]),
    };
  },
};
</script>
<style lang="scss">
</style>