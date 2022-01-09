<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :style="{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }"
          ><Sidebar
        /></a-layout-sider>
        <a-layout-content>
          <a-row>
            <a-col :span="24">
              <h2 class="pageTittle">
                {{$t('patient.patients')}}
                <div class="commonBtn">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >{{$t('patient.addNewPatients')}}</a-button
                  >
                </div>
              </h2>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col :xl="4" :sm="8" :xs="24">
                  <div class="colorBox red">
                    <UserOutlined />
                    <h3>5</h3>
                    <p>{{$t('patient.critical')}}</p>
                  </div>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="24">
                  <div class="colorBox orangeBg">
                    <UserOutlined />
                    <h3>10</h3>
                    <p>{{$t('patient.trending')}}</p>
                  </div>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="24">
                  <div class="colorBox greenBg">
                    <UserOutlined />
                    <h3>15</h3>
                    <p>{{$t('patient.WNL')}}</p>
                  </div>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="24">
                  <div class="colorBox yellowBg">
                    <UserOutlined />
                    <h3>8</h3>
                    <p>{{$t('patient.watchList')}}</p>
                  </div>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="24">
                  <div class="colorBox blue">
                    <UserOutlined />
                    <h3>6</h3>
                    <p>{{$t('patient.messages')}}</p>
                  </div>
                </a-col>
                <a-col :xl="4" :sm="8" :xs="24">
                  <div class="colorBox whiteBg">
                    <UserOutlined />
                    <h3>12</h3>
                    <p>{{$t('patient.escalations')}}</p>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
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
                :scroll="{ x: 1024 }"
                @change="onChange"
              >
                <template #firstName="text">
                  <router-link to="patients-summary">{{ text.text }}</router-link>
                </template>
                <!-- <template #lastName="text">
                  <router-link to="patients-summary">{{
                    text.text
                  }}</router-link>
                </template> -->
                <template #flags="{ text }">
                  <span class="box" :class="text"></span>
                  <span
                    class="box"
                    :class="(text = text.match(/yellowBgColor/g))"
                    v-if="text.match(/yellowBgColor/g)"
                  ></span>
                </template>
                <template #compliance>
                  <a class="icons"><WarningOutlined /></a>
                </template>

                <template #lastReadingValues>
                  <WarningOutlined />
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modal-->
    <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
    <!---->
  </div>
</template>
<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import PatientsModal from "@/components/modals/PatientsModal";
import { ref } from "vue";
import { UserOutlined, WarningOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Flags",
    dataIndex: "flags",
    slots: {
      customRender: "flags",
    },
  },
  {
    title: "Name",
    dataIndex: "firstName",
    slots: {
      customRender: "firstName",
    },
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },
  // {
  //   title: "Last Name",
  //   dataIndex: "lastName",
  //   slots: {
  //     customRender: "lastName",
  //   },
  // },
  {
    title: "Last Reading Date",
    dataIndex: "reading",
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },
  {
    title: "Last Reading Values",
    dataIndex: "readingvalues",
    sorter: {
      compare: (a, b) => a.readingvalues - b.readingvalues,
      multiple: 1,
    },
    slots: {
      customRender: "lastReadingValues",
    },
    children: [
      {
        title: "Sp02",
        dataIndex: "sp02",
        key: "sp02",
      },
      {
        title: "BP",
        dataIndex: "bp",
        key: "bp",
      },
      {
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
      },
    ],
  },
  // {
  //   title: "Age",
  //   dataIndex: "age",
  //   sorter: {
  //     compare: (a, b) => a.age - b.age,
  //     multiple: 3,
  //   },
  // },
  // {
  //   title: "Sex",
  //   dataIndex: "sex",
  //   sorter: {
  //     compare: (a, b) => a.sex - b.sex,
  //     multiple: 2,
  //   },
  // },

  {
    title: "Non Compliance",
    dataIndex: "compliance",
    sorter: {
      compare: (a, b) => a.compliance - b.compliance,
      multiple: 1,
    },
    slots: {
      customRender: "compliance",
    },
  },
  {
    title: "Last Message Sent",
    dataIndex: "message",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 1,
    },
    filters: [
      {
        text: "Flag",
        value: "flag",
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Last Reading Date",
        value: "readdate",
      },
      {
        text: "Last Reading Value",
        value: "readvalue",
      },
      {
        text: "Non Compliance ",
        value: "noncompliance",
      },
      {
        text: "Last Message Seen",
        value: "messagseen",
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
];
const data = [
  {
    key: "1",
    flags: "redBgColor",
    firstName: "Jane Doe",
    // lastName: "Doe",
    // age: "85",
    // sex: "male",
    reading: "5 months ago",
    compliance: "",
    message: "5 months ago",
    readingvalues: "",
    sp02: "	95%",
    bp: "115/81",
    weight: "189.2",
  },
  {
    key: "2",
    flags: "purpleBgColor",
    firstName: "Steve Smith",
    // lastName: "Smith",
    // age: "78",
    // sex: "Female",
    reading: "15 days ago",
    compliance: "",
    message: "2 months ago",
    readingvalues: "",
    sp02: "-",
    bp: "105/81",
    weight: "-",
  },
  {
    key: "3",
    flags: "blueBgColor yellowBgColor ",
    firstName: "Joseph Spouse",
    // lastName: "Spouse",
    // age: "72",
    // sex: "male",
    reading: "2 months ago",
    compliance: "",
    message: "4 months ago",
    readingvalues: "",
    sp02: "-",
    bp: "-",
    weight: "-",
  },
  {
    key: "4",
    flags: "greenBgColor",
    firstName: "Robert Henry",
    // lastName: "Henry",
    // age: "79",
    // sex: "Female",
    reading: "4 months ago",
    compliance: "",
    message: "15 days ago",
    readingvalues: "",
    sp02: "92%",
    bp: "-",
    weight: "181.2",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    PatientsModal,
    UserOutlined,
    WarningOutlined,
  },

  setup() {
    const PatientsModal = ref(false);
    const showModal = () => {
      PatientsModal.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      PatientsModal.value = false;
    };
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([
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
    ]);
    return {
      PatientsModal,
      showModal,
      handleOk,
      data,
      columns,
      handleChange,
      searchoptions,
      size: ref([]),
    };
  },
};
</script>
