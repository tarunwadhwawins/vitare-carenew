<template>
  <a-row>
    <a-col :span="12">
      <a-select
        v-model:value="value2"
        :size="size"
        mode="tags"
        style="width: 100%"
        placeholder="Search . . ."
        :options="searchoptions"
        @change="handleChange">
      </a-select>
    </a-col>
    <a-col :span="12">
      <div class="text-right mb-24">
        <a-button class="primaryBtn">{{ $t('global.exportToExcel') }}</a-button>
      </div>
    </a-col>
    <a-col :span="24">
      <a-table
        v-if="communicationsList"
        :columns="columns"
        :data-source="communicationsList"
        :scroll="{ x: 900 }"
        @change="onChange">
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            {{ record.description }}
          </p>
        </template>
        <template #resend>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('communications.message')}}</span>
            </template>
            <a class="icons"><MessageOutlined /></a>
          </a-tooltip>
        </template>
        <template #patient="text">
          <router-link to="patients-summary">
            {{ text.text }}
          </router-link>
        </template>
        <template #staff="{ record }">
          <router-link v-for="staff in record.staff.data" :key="staff.id" to="corrdinator-summary">
            {{ staff.staff }}
          </router-link>
        </template>

        <template #status="{ record }">
          <!-- <span class="circleBox"></span> -->
          <span class="circleBox greenBgColor" v-if="record.status=='completed'" ></span>
          <span class="circleBox three" v-if="record.status=='pending'" ></span>
        </template>

        <template #type="{ record }">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.comment') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'SMS'">
              <CommentOutlined />
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.sent') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Call'">
              <PhoneOutlined/>
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.mail') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Email'">
              <MailOutlined/>
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.reminder') }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Reminder'">
              <AlertOutlined/>
            </a>
          </a-tooltip>
        </template>

        <template #action>
          <a class="icons">
            <MessageOutlined />
          </a>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
const columns = [
  /* {
    dataIndex: "id",
    key: "key",
    rowKey: "id",
  }, */
  {
    title: "Patient",
    dataIndex: "patient",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
  },
  {
    title: "Sent To",
    dataIndex: "sentTo",
    sorter: {
      compare: (a, b) => a.sentTo - b.sentTo,
      multiple: 2,
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    slots: {
      customRender: "type",
    },
  },
  {
    title: "Staff",
    dataIndex: "staff",
    slots: {
      customRender: "staff",
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: {
      compare: (a, b) => a.category - b.category,
      multiple: 2,
    },
  },
  {
    title: "Date Sent",
    dataIndex: "createdAt",
    sorter: {
      compare: (a, b) => a.createdAt - b.createdAt,
      multiple: 2,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];

import { ref/* , watchEffect, computed */ } from 'vue';
// import { useStore } from "vuex"
import {
  MessageOutlined,
  CommentOutlined,
  PhoneOutlined,
  MailOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    MessageOutlined,
    CommentOutlined,
    PhoneOutlined,
    MailOutlined,
    AlertOutlined,
  },
  props: {
    data: {
      type: Array
    }
  },
  setup(props) {
    // const store = useStore()
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    
    const communicationsList = []
    // const communicationsList = ref(props.data)
    // watchEffect(() => {
    //   store.dispatch('communicationsList')
    // })
    // const communicationsList = computed(() => {
    //   return store.state.communications.communicationsList
    // })
    // console.log('Data', communicationsList)

    const searchoptions = ref(
      [
        {
          value: "Jane Doe",
          label: "Jane Doe",
        },
        {
          value: "Steve Smith",
          label: "Steve Smith",
        },
        {
          value: "Joseph Spouse",
          label: "Joseph Spouse",
        },
        {
          value: "Robert Henry",
          label: "Robert Henry",
        },
        {
          value: "Appointment Reminder",
          label: "Appointment Reminder",
        },
        {
          value: "Recall Reminder",
          label: "Recall Reminder",
        },
        {
          value: "Patient Message",
          label: "Patient Message",
        },
      ]
    );

    return {
      communicationsList,
      columns,
      handleChange,
      searchoptions,

      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
    };
  },
};
</script>

<style lang="scss">
@media (max-width: 1199px) {
  .communications {
    padding: 0px 0 60px;
    .addtaskButton {
      left: 0;
      right: auto;
      top: 50px;
    }
  }
}
</style>