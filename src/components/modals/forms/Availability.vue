<template>
  <a-row :gutter="24">
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.startTime')}}</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">{{$t('global.chooseStartTime')}}</a-select-option>
          <a-select-option value="Yiminghe">08:00 AM</a-select-option>
          <a-select-option value="Yiminghe">08:30 AM</a-select-option>
          <a-select-option value="Yiminghe">09:00 AM</a-select-option>
          <a-select-option value="Yiminghe">09:30 AM</a-select-option>
          <a-select-option value="Yiminghe">10:00 AM</a-select-option>
          <a-select-option value="Yiminghe">10:30 AM</a-select-option>
          <a-select-option value="Yiminghe">11:00 AM</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.endTime')}}</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">{{$t('global.chooseEndTime')}}</a-select-option>
          <a-select-option value="Yiminghe">02:00 PM</a-select-option>
          <a-select-option value="Yiminghe">02:30 PM</a-select-option>
          <a-select-option value="Yiminghe">03:00 PM</a-select-option>
          <a-select-option value="Yiminghe">03:30 PM</a-select-option>
          <a-select-option value="Yiminghe">04:00 PM</a-select-option>
          <a-select-option value="Yiminghe">04:30 PM</a-select-option>
          <a-select-option value="Yiminghe">05:00 PM</a-select-option>
          <a-select-option value="Yiminghe">05:30 PM</a-select-option>
        </a-select>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-button class="btn primaryBtn">{{$t('global.add')}}</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table
        :pagination="false"
        :columns="columns2"
        :data-source="data2"
        :scroll="{ x: 900 }"
      >
        <template #action>
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
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const columns2 = [
  {
    title: "Start Time",
    dataIndex: "start",
  },
  {
    title: "End Time",
    dataIndex: "end",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data2 = [
  {
    key: "1",
    start: "08:00 AM",
    end: "	02:30 PM",
    actions: "",
  },
  {
    key: "2",
    start: "09:00 AM",
    end: "03:30 PM",
    actions: "",
  },
];
export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    return {
      size: ref("large"),
      data2,
      columns2,
    };
  },
});
</script>
