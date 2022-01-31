<template>
  <a-modal width="1000px" title="Blood Oxygen Saturation Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24" class="mb-24">
        <a-card title="Blood Oxygen Saturation">
          <a-tabs v-model:activeKey="activeKey4">
            <a-tab-pane key="13" tab="Graph">
              <apexchart
                type="area"
                height="350"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </a-tab-pane>
            <a-tab-pane key="14" tab="Table" force-render>
              <a-table
                :columns="columns6"
                :data-source="data6"
                :pagination="false"
                @change="onChange"
              />
            </a-tab-pane>
          </a-tabs>
          <template #extra
            ><a>
              <a-button class="btn blackBtn" @click="showModal6"
                ><PlusOutlined
              /></a-button> </a
          ></template>
        </a-card>
      </a-col>
    </a-row>
    <!---->
    <BloodOxygen v-model:visible="visible6" @ok="handleOk" />
    <!---->
  </a-modal>
</template>
<script>
import { defineComponent, ref, defineAsyncComponent } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
const columns6 = [
  {
    title: "Date Recorded",
    dataIndex: "recorded",
  },
  {
    title: "Value",
    dataIndex: "value",
  },
];
const data6 = [
  {
    key: "1",
    recorded: "Nov 05, 2021 10:00 AM",
    value: "105",
  },
  {
    key: "2",
    recorded: "Nov 06, 2021 10:00 AM",
    value: "100",
  },
  {
    key: "3",
    recorded: "Nov 08, 2021 10:00 AM",
    value: "95",
  },
  {
    key: "4",
    recorded: "Nov 09, 2021 10:00 AM",
    value: "120",
  },
  {
    key: "5",
    recorded: "Nov 11, 2021 10:00 AM",
    value: "130",
  },
];
export default defineComponent({
  components: {
    PlusOutlined,
    BloodOxygen: defineAsyncComponent(() => import("./BloodOxygen")),
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
    };
  },

  setup() {
    const visible6 = ref(false);
    const showModal6 = () => {
      visible6.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible6.value = false;
    };
    return {
      data6,
      columns6,
      visible6,
      showModal6,
      handleOk,
    };
  },
});
</script>
