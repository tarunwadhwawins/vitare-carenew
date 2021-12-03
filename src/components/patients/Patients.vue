<template>
  <div>
    <a-layout>
      <!-- Top Header -->
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header/>
      </a-layout-header>
      <a-layout>
        <!-- Sidebar -->
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
          <Sidebar/>
        </a-layout-sider>
        <a-layout-content>

          <!-- Below Header -->
          <a-row class="mb-24">
            <MainHeader heading="Manange Patients" buttonText="Add New Patient" modalScreen="patients"></MainHeader>
          </a-row>
          
          <!-- Cards -->
          <a-row>
            <LongCard customClass="bg-red" count="10" text="Critical"></LongCard>
            <LongCard customClass="bg-teal" count="10" text="High"></LongCard>
            <LongCard customClass="bg-sky" count="10" text="Normal"></LongCard>
          </a-row>

          <!-- Table -->
          <a-row>
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="data"
                :scroll="{ x: 1600 }">
                <template #firstName="text">
                  <a href="">{{ text.text }}</a>
                </template>
                <template #lastName="text">
                  <a href="">{{ text.text }}</a>
                </template>
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
          <!-- Table Ends Here -->

        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import MainHeader from "@/components/common/MainHeader";
import LongCard from "@/components/common/cards/LongCard";
import { ref, computed } from "vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
import {
  WarningOutlined,
} from "@ant-design/icons-vue";

const columns = [
  {
    title: "Flags",
    dataIndex: "flags",
    slots: {
      customRender: "flags",
    },
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    slots: {
      customRender: "firstName",
    },
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    slots: {
      customRender: "lastName",
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 3,
    },
  },
  {
    title: "Sex",
    dataIndex: "sex",
    sorter: {
      compare: (a, b) => a.sex - b.sex,
      multiple: 2,
    },
  },
  {
    title: "Last Reading Date",
    dataIndex: "reading",
    sorter: {
      compare: (a, b) => a.reading - b.reading,
      multiple: 1,
    },
  },
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
];
const data = [
  {
    key: "1",
    flags: "redBgColor",
    firstName: "Jane",
    lastName: "Doe",
    age: "85",
    sex: "male",
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
    firstName: "Steve",
    lastName: "Smith",
    age: "78",
    sex: "Female",
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
    firstName: "Joseph",
    lastName: "Spouse",
    age: "72",
    sex: "male",
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
    firstName: "Robert",
    lastName: "Henry",
    age: "79",
    sex: "Female",
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
    MainHeader,
    LongCard,
    WarningOutlined,
  },
  setup() {
    const visible = ref(false);
    const current = ref(0);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    
    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    const value = ref(1); 
    return {
      visible,
      showModal,
      handleOk,
      data,
      columns,
      filteredOptionsForTag,
      selectedItemsForTag,
      checked: ref(false),
      current,
      steps: [
        {
          title: "Demographics",
          content: "First-content",
        },
        {
          title: "Conditions",
          content: "Second-content",
        },
        {
          title: "Programs",
          content: "Second-content",
        },
        {
          title: "Assessments",
          content: "Second-content",
        },
        {
          title: "Clinical Data",
          content: "Second-content",
        },
        {
          title: "Billing",
          content: "Second-content",
        },
        {
          title: "Documents",
          content: "Last-content",
        },
      ],
      next,
      prev,
      size: ref("large"),
      value: ref(["Manger", "Billing Admin", "User Admin"]),
      options: [...Array(3)].map((i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
    };
  },
};
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  min-height: 200px;
  text-align: left;
  padding: 12px 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.steps-action {
  text-align: right;
}
</style>