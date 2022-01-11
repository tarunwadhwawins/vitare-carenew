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
        @change="handleChange"
      >
      </a-select>
    </a-col>
    <a-col :span="12">
      <div class="text-right mb-24">
        <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
      </div>
    </a-col>
    <a-col :span="24">
      <a-table
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 900 }"
        @change="onChange"
      >
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
          <router-link to="patients-summary">{{
            text.text
          }}</router-link>
        </template>
        <template #staff="text">
          <router-link to="corrdinator-summary">{{
            text.text[0]
          }}</router-link
          ><br />
          <router-link to="corrdinator-summary">{{
            text.text[1]
          }}</router-link>
        </template>

        <template #status="{ text }">
          <span class="circleBox" :class="text"></span>
          <span
            class="box"
            :class="(text = text.match(/yellowBgColor/g))"
            v-if="text.match(/yellowBgColor/g)"
          ></span>
        </template>

        <template #type="{ text }">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('communications.comment')}}</span>
            </template>
            <a class="icons" v-if="text == 'comment'"
              ><CommentOutlined
            /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('communications.voiceMail')}}</span>
            </template>
            <a class="icons" v-if="text == 'voiceMail'"
              ><PhoneOutlined
            /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('communications.sent')}}</span>
            </template>
            <a class="icons" v-if="text == 'sent'"
              ><PhoneOutlined
            /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('communications.mail')}}</span>
            </template>
            <a class="icons" v-if="text == 'mail'"
              ><MailOutlined
            /></a>
          </a-tooltip>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<!---->
<script>
const columns = [
  {
    title: "Patient",
    dataIndex: "patient",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
    slots: {
      customRender: "patient",
    },
  },
  {
    title: "Sent To",
    dataIndex: "sentto",
    sorter: {
      compare: (a, b) => a.sentto - b.sentto,
      multiple: 1,
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
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
      multiple: 2,
    },
    slots: {
      customRender: "status",
    },
  },
  {
    title: "Category",
    dataIndex: "message",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 3,
    },
  },

  {
    title: "Date Sent",
    dataIndex: "sent",
    sorter: {
      compare: (a, b) => a.sent - b.sent,
      multiple: 1,
    },
  },
  // {
  //   title: "Appt Type, Date, Time",
  //   dataIndex: "appt",
  //   sorter: {
  //     compare: (a, b) => a.appt - b.appt,
  //     multiple: 1,
  //   },
  // },
  {
    title: "Actions",
    dataIndex: "resend",
    slots: {
      customRender: "resend",
    },
  },
];
const data = [
  {
    key: "1",
    type: "comment",
    status: "greenBgColor",
    message: "Appointment Reminder",
    patient: "Jane Doe",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    // appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Steve Smith", "Jane Doe"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    key: "2",
    type: "voiceMail",
    status: "three",
    message: "Recall Reminder",
    patient: "Steve Smith",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    // appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Robert Henry"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    key: "3",
    type: "sent",
    status: "blue",
    message: "Patient Message",
    patient: "Joseph Spouse",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    // appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Jane Doe"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..",
  },
  {
    key: "4",
    type: "mail",
    status: "greenBgColor",
    message: "Portal Invitation",
    patient: "Robert Henry",
    sentto: 22998876654,
    sent: "Nov 11, 2021 - 11:30 Am",
    appt: "OLS APPT TYPE Nov 11, 2021 - 11:30 Am",
    resend: 70,
    staff: ["Jane Doe"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..",
  },
];
import { ref } from "vue";
export default {
  setup() {
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

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
      columns,
      data,
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