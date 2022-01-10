<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
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
              <a-col :sm="24" :xs="24">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #actions>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>{{$t('global.edit')}}</span>
                      </template>
                      <a class="icons"><EditOutlined /></a>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>{{$t('global.delete')}}</span>
                      </template>
                      <a class="icons"> <DeleteOutlined /></a>
                    </a-tooltip>
                  </template>
                  <template #active="key">
                    <a-switch v-model:checked="checked[key.record.key]" />
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <Thresholds v-model:visible="Thresholds" @ok="handleOk" />
  </div>
</template>
<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import Thresholds from "@/components/modals/Thresholds";

const renderContent = ({ text, index }) => {
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
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
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