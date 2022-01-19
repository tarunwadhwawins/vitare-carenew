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
        <template #staff="text">
          <router-link to="corrdinator-summary">
            {{ text.text[0] }}
          </router-link>
          <br />
          <router-link to="corrdinator-summary">
            {{ text.text[1] }}
          </router-link>
        </template>

        <template #status="{ text }">
          <span class="circleBox" :class="text"></span>
          <span
            class="box"
            :class="(text = text.match(/yellowBgColor/g))"
            v-if="text.match(/yellowBgColor/g)">
          </span>
        </template>

        <template #type="{ text }">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.comment') }}</span>
            </template>
            <a class="icons" v-if="text == 'comment'">
              <CommentOutlined />
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.voiceMail') }}</span>
            </template>
            <a class="icons" v-if="text == 'voiceMail'">
              <PhoneOutlined/>
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.sent') }}</span>
            </template>
            <a class="icons" v-if="text == 'sent'">
              <PhoneOutlined/>
            </a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('communications.mail') }}</span>
            </template>
            <a class="icons" v-if="text == 'mail'">
              <MailOutlined/>
            </a>
          </a-tooltip>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
const columns = [
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
    sorter: {
      compare: (a, b) => a.type - b.type,
      multiple: 2,
    },
  },
  {
    title: "Staff",
    dataIndex: "staff.data.staff",
    sorter: {
      compare: (a, b) => a.staff - b.staff,
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 2,
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
];

import { ref, watchEffect, computed } from 'vue';
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    
    const communicationsList = []
    watchEffect(() => {
      store.dispatch('communicationsList')
    })
    // const communicationsList = computed(() => {
      // return store.state.communications.communicationsList
    // })
    // const communicationsList = store.state.communications.communicationsList
    console.log('Communications List', communicationsList)

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