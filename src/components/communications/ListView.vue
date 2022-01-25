<template>
  <a-row>
    <a-col :span="12">
      <a-form>
        <a-select
          v-model:value="search"
          :size="size"
          mode="tags"
          style="width: 100%"
          placeholder="Search..."
          @change="handleChange">
        </a-select>
      </a-form>
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

        <template #priority="{ record }">
          <span class="circleBox" style="background-color: #008000" v-if="record.priority=='Urgent'" ></span>
          <span class="circleBox" style="background-color: #ffa800" v-if="record.priority=='Medium'" ></span>
          <span class="circleBox" style="background-color: #ff6061" v-if="record.priority=='Normal'" ></span>
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
  {
    title: "From",
    dataIndex: "from",
    sorter: {
      compare: (a, b) => a.from - b.from,
      multiple: 2,
    },
  },
  {
    title: "To",
    dataIndex: "to",
    sorter: {
      compare: (a, b) => a.to - b.to,
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
    title: "Priority",
    dataIndex: "priority",
    slots: {
      customRender: "priority",
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

import { ref, watchEffect, computed } from 'vue';
import { useStore } from "vuex"
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
  setup() {
    const store = useStore()
    // var searchParams = [];
    const handleChange = (value) => {
      // searchParams.push(value);
      // let newSearchParams = searchParams.slice(-1)[0];
      // store.dispatch('searchCommunications', newSearchParams)
    };
    
    watchEffect(() => {
      store.dispatch('communicationsList')
    })
    // const communicationsList = [];
    const communicationsList = computed(() => {
      return store.state.communications.communicationsList
    })
    const searchCommunications = computed(() => {
      return store.state.communications.searchCommunications
    })

    return {
      communicationsList,
      columns,
      handleChange,
      searchCommunications,
      onChange: (pagination, filters, sorter, extra) => {
        // console.log("params", pagination, filters, sorter, extra);
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